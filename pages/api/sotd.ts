import type { NextApiRequest, NextApiResponse } from 'next'
import { DateTime } from 'luxon'
import {MongoClient, WithId} from "mongodb";
import {sotdAPIResponse} from "../../types/sotd";
import {nodeCrypto, shuffle} from "random-js";
import {PlaylistData, sotdGamesData} from "../../types/database";
import {PlaylistObjectTransformed} from "../../lib/util/transformPlaylist";
import {revalidatePlaylist} from "../../lib/util/revalidatePlaylist";

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse<sotdAPIResponse | string>) => {
    if (req.method !== "GET") return res.setHeader("Allow", "GET").status(405).send("Method Not Allowed")
    let today = DateTime.now().setZone("Asia/Seoul")

    //Init mongo client
    const client = new MongoClient(process.env.MONGODB_URI ?? "")
    await client.connect()
    let SOTD = client.db("CHGM").collection<sotdGamesData>("SOTD")
    await SOTD.createIndex({snapshot_id: 1}, {unique: true})
    let Playlists = client.db("CHGM").collection<PlaylistData>("playlists")
    await Playlists.createIndex({snapshot_id: 1}, {unique: true})
    async function insertData (playlist: PlaylistObjectTransformed) {
        await SOTD.insertOne({
            snapshot_id: playlist.snapshot_id,
            startDate: today.toISODate(),
            games: shuffle(nodeCrypto, playlist.tracks.map((track) => {
                return {
                    track
                }
            }))
            })
        return await SOTD.findOne({
            snapshot_id: {$eq: playlist.snapshot_id}
        }) as WithId<sotdGamesData>
    }
    let playlist = await revalidatePlaylist(Playlists)
    let document = await SOTD.findOne({
        snapshot_id: {$eq: playlist?.snapshot_id}
    })
    if (!document) document = await insertData(playlist?.playlist)
    let startDate = DateTime.fromISO(document.startDate, {zone: "Asia/Seoul"})
    let diff = Math.floor(today.diff(startDate, 'days').toObject().days ?? 0)
    let game = document.games[diff]

    if (game === undefined) {
        await SOTD.drop()
        document = await insertData(playlist?.playlist)
        let startDate = DateTime.fromISO(document.startDate, {zone: "Asia/Seoul"})
        let diff = Math.floor(today.diff(startDate, 'days').toObject().days ?? 0)
        game = document.games[diff]
    }



    res.setHeader("Cache-Control", "s-maxage=300")
    res.send({...game, day: diff})
}
