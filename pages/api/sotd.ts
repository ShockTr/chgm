import type { NextApiRequest, NextApiResponse } from 'next'
import { DateTime } from 'luxon'
import {MongoClient, WithId} from "mongodb";
import {sotdAPIResponse, sotdGamesData} from "../../types/sotd";
import fetchPlaylist from "../../lib/spotify/fetchPlaylist";
import {Spotify} from "../../types/spotify";
import TrackObjectFull = Spotify.TrackObjectFull;
import {nodeCrypto, shuffle} from "random-js";
import fetchPlaylistBasic from "../../lib/spotify/fetchPlaylistBasic";
import getAccessToken from "../../lib/spotify/getAccessToken";

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse<sotdAPIResponse | string>) => {
    if (req.method !== "GET") return res.setHeader("Allow", "GET").status(405).send("Method Not Allowed")
    let today = DateTime.now().setZone("Asia/Seoul")

    //Init mongo client
    const client = new MongoClient(process.env.MONGODB_URI ?? "")
    await client.connect()
    let collection = client.db("CHGM").collection<sotdGamesData>("SOTD")
    await collection.createIndex({snapshot_id: 1}, {unique: true})

    //Check if a list exists and insert one if it doesn't
    let {access_token: token} = await getAccessToken()
    let {snapshot_id: currentSnapshot} = await fetchPlaylistBasic(token)
    let document = await collection.findOne({
        snapshot_id: {$eq: currentSnapshot}
    })
    async function insertData () {
        let playlist = await fetchPlaylist(token)
        await collection.insertOne({
            snapshot_id: playlist.snapshot_id,
            epoch: today.toISODate(),
            games: shuffle(nodeCrypto, playlist.tracks.items.filter((track) => !!track.track)).map((trck) => {
                return {
                    track: trck.track as TrackObjectFull,
                    //played: false
                }
            }),
            playlist
        })
        return await collection.findOne({
            snapshot_id: {$eq: currentSnapshot}
        }) as WithId<sotdGamesData>
    }
    if (!document) document = await insertData()
    let epoch = DateTime.fromISO(document.epoch, {zone: "Asia/Seoul"})
    let diff = Math.floor(today.diff(epoch, 'days').toObject().days ?? 0)
    let game = document.games[diff]

    //If all the tracks are played before
    if (game === undefined) {
        await collection.drop()
        document = await insertData()
        let epoch = DateTime.fromISO(document.epoch, {zone: "Asia/Seoul"})
        let diff = Math.floor(today.diff(epoch, 'days').toObject().days ?? 0)
        game = document.games[diff]
    }

    res.setHeader("Cache-Control", "s-maxage=300")
    res.send({...game, day: diff})
}
