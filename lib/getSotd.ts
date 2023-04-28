import {Nullable, sotdAPIResponse} from "../types/sotd";
import {DateTime} from "luxon";
import clientPromise from "./mongodb";
import {PlaylistData, sotdGamesData} from "../types/database";
import {PlaylistObjectTransformed} from "./util/transformPlaylist";
import {nodeCrypto, shuffle} from "random-js";
import {WithId} from "mongodb";
import {revalidatePlaylist} from "./util/revalidatePlaylist";

export interface getSotdResponse extends sotdAPIResponse {
    playlist: PlaylistObjectTransformed
}
export async function getSotd(): Promise<getSotdResponse>{
    let today = DateTime.now().setZone("Asia/Seoul")

    //Init mongo client
    let client = await clientPromise
    let SOTD = client.db(process.env.DBNAME).collection<sotdGamesData>("SOTD")
    await SOTD.createIndex({snapshot_id: 1}, {unique: true})
    let Playlists = client.db(process.env.DBNAME).collection<PlaylistData>("playlists")
    await Playlists.createIndex({snapshot_id: 1}, {unique: true})
    async function insertData (playlist: PlaylistObjectTransformed) {
        await SOTD.insertOne({
            snapshot_id: playlist.snapshot_id,
            startDate: today.toISODate(),
            games: shuffle(nodeCrypto, playlist.tracks.map((track) => {
                return {
                    track
                }
            })),
            generationDate: new Date()
        })
        return await SOTD.findOne({
            snapshot_id: {$eq: playlist.snapshot_id}
        }) as WithId<sotdGamesData>
    }

    let playlist = await revalidatePlaylist(Playlists)
    let document = await SOTD.findOne({
        snapshot_id: {$eq: playlist?.snapshot_id}
    })
    if (!document) {
        let oldSOTD = await SOTD.aggregate([
            {$addFields: {date: {$dateFromString: {dateString: "$startDate"}}}},
            {$sort: {date: -1}},
            {$limit: 1}
        ]).next() as Nullable<sotdGamesData>
        if (!oldSOTD) document = await insertData(playlist?.playlist)
        else {
            let oldStartDate = DateTime.fromISO(oldSOTD.startDate, {zone: "Asia/Seoul"})
            let diff = Math.floor(today.diff(oldStartDate, 'days').toObject().days ?? 0)
            let alreadyPlayed = oldSOTD.games.slice(0, diff)
            let newTracks = playlist.playlist.tracks.filter((track) => {
                return !alreadyPlayed.some((game) => game.track.id === track.id)
            })

            await SOTD.insertOne({
                snapshot_id: playlist.snapshot_id,
                startDate: oldSOTD.startDate,
                games: alreadyPlayed.concat(shuffle(nodeCrypto, newTracks.map((track) => { return {track} }))),
                generationDate: new Date()
            })
            document = await SOTD.findOne({
                snapshot_id: {$eq: playlist.snapshot_id}
            }) as WithId<sotdGamesData>
        }
    }
    let startDate = DateTime.fromISO(document.startDate, {zone: "Asia/Seoul"})
    let diff = Math.floor(today.diff(startDate, 'days').toObject().days ?? 0)
    let game = document.games[diff]

    if (game === undefined) {
        await SOTD.updateOne({
                _id: { $eq: document._id }
            },
            {
                $set: {
                    snapshot_id: `${document?.snapshot_id}_${document._id}`
                }
            })
        document = await insertData(playlist?.playlist)
        let startDate = DateTime.fromISO(document.startDate, {zone: "Asia/Seoul"})
        let diff = Math.floor(today.diff(startDate, 'days').toObject().days ?? 0)
        game = document.games[diff]
    }
    return {...game, snapshot_id: document.snapshot_id, day: diff, playlist: playlist?.playlist}
}
