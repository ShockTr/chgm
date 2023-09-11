import {PlaylistData, SeasonData, sotdGamesData} from "../types/database";
import {DateTime} from "luxon";
import clientPromise from "./mongodb";
import {revalidatePlaylist} from "./util/revalidatePlaylist";
import {Nullable} from "../types/sotd";
import {nodeCrypto, shuffle} from "random-js";
import {PlaylistObjectTransformed} from "./util/transformPlaylist";

export async function getSeason(returnPlaylist?: false): Promise<{seasonData: SeasonData, playlist: undefined}>
export async function getSeason(returnPlaylist: true): Promise<{seasonData: SeasonData, playlist: PlaylistObjectTransformed}>

export async function getSeason(returnPlaylist: boolean = false): Promise<{seasonData: SeasonData, playlist: undefined} | { seasonData: SeasonData, playlist: PlaylistObjectTransformed }>
{
    const today = DateTime.now().setZone("Asia/Seoul")

    //Init mongo client
    const client = await clientPromise
    const Playlists = client.db(process.env.DBNAME).collection<PlaylistData>("playlists")
    await Playlists.createIndex({snapshot_id: 1}, {unique: true})
    const Seasons = client.db(process.env.DBNAME).collection<SeasonData>("seasons")
    await Seasons.createIndex({currentSeason: 1}, {unique: true})

    let currentSeason: SeasonData = await Seasons.find().sort({currentSeason: -1}).limit(1).toArray().then((seasons) => seasons[0])
    const playlist = await revalidatePlaylist(Playlists)
    // If the function is run for the first time or collection is dropped
    if (currentSeason === undefined) {
        const SOTD = client.db(process.env.DBNAME).collection<sotdGamesData>("SOTD")
        await SOTD.createIndex({snapshot_id: 1}, {unique: true})

        currentSeason = {
            currentSeason: 1,
            startDate: today.toISODate(),
            generationDate: new Date(),
            sotds: [],
            latestSnapshot: ""
        }
        await Seasons.insertOne(currentSeason)
        currentSeason = await Seasons.find().sort({currentSeason: -1}).limit(1).toArray().then((seasons) => seasons[0])
        const oldSOTD = await SOTD.findOne({}, {sort: {generationDate: -1}}) as Nullable<sotdGamesData>

        //if there is a game from the old system.
        if (oldSOTD) {
            const oldStartDate = DateTime.fromISO(oldSOTD.startDate, {zone: "Asia/Seoul"})
            const diff = Math.floor(today.diff(oldStartDate, 'days').toObject().days ?? 0) + 1

            //if game is still going
            if (!(diff > oldSOTD.games.length)){
                //if the game is the same
                if (playlist.snapshot_id === oldSOTD.snapshot_id) {
                    currentSeason = await Seasons.findOneAndUpdate(
                        currentSeason,
                        {
                            $set: {sotds: [oldSOTD], latestSnapshot: oldSOTD.snapshot_id, startDate: oldSOTD.startDate}
                        },
                        {
                            returnDocument: "after"
                        }
                    ).then(doc => doc.value) as SeasonData
                }
                else {
                    // Add the new tracks to the game if game is still continuing and new tracks were added
                    const alreadyPlayed = oldSOTD.games.slice(0, diff)
                    const newTracks = playlist.playlist.tracks.filter((track) => {
                        return !alreadyPlayed.some((game) => game.track.id === track.id)
                    })
                    currentSeason = await Seasons.findOneAndUpdate(
                        currentSeason,
                        {
                            $set: {
                                sotds: [{
                                    snapshot_id: playlist.snapshot_id,
                                    startDate: oldSOTD.startDate,
                                    generationDate: new Date(),
                                    games: alreadyPlayed.concat(shuffle(nodeCrypto, newTracks.map((track) => { return {track} })))
                                }],
                                latestSnapshot: oldSOTD.snapshot_id,
                                startDate: oldSOTD.startDate
                            }
                        },
                        {
                            returnDocument: "after"
                        }
                    ).then(doc => doc.value) as SeasonData
                }
            }
        }
        //if there is no game
        else {
            currentSeason = await Seasons.findOneAndUpdate(
                currentSeason,
                {
                    $set:{
                        sotds: [
                            {
                                snapshot_id: playlist.snapshot_id,
                                startDate: "",
                                generationDate: new Date(),
                                games: shuffle(nodeCrypto, playlist.playlist.tracks.map((track) => {
                                    return {
                                        track
                                    }
                                }))
                            }
                        ],
                        latestSnapshot: playlist.snapshot_id
                    }
                },
                {
                    returnDocument: "after"
                }
            ).then(doc => doc.value) as SeasonData
        }
    }
    //we have a season
    else {
        const diff = Math.floor(today.diff(DateTime.fromISO(currentSeason.startDate, {zone: "Asia/Seoul"})).toObject().days ?? 0) + 1
        //Game is finished
        if (diff > currentSeason.sotds[currentSeason.sotds.length - 1].games.length) {
            let newSeason: SeasonData = {
                currentSeason: currentSeason.currentSeason + 1,
                startDate: today.toISODate(),
                generationDate: new Date(),
                sotds: [
                    {
                        snapshot_id: playlist.snapshot_id,
                        startDate: "",
                        generationDate: new Date(),
                        games: shuffle(nodeCrypto, playlist.playlist.tracks.map((track) => {
                            return {
                                track
                            }
                        }))
                    }
                ],
                latestSnapshot: playlist.snapshot_id
            }
            await Seasons.insertOne(newSeason)
            currentSeason = await Seasons.find().sort({currentSeason: -1}).limit(1).toArray().then((seasons) => seasons[0])

        }
        // Playlist is not up-to-date
        else if (currentSeason.latestSnapshot !== playlist.snapshot_id) {
            const oldSOTD = currentSeason.sotds[currentSeason.sotds.length - 1]
            const alreadyPlayed = oldSOTD.games.slice(0, diff)
            const newTracks = playlist.playlist.tracks.filter((track) => {
                return !alreadyPlayed.some((game) => game.track.id === track.id)
            })
            currentSeason = await Seasons.findOneAndUpdate(
                currentSeason,
                {
                    $set: {
                        latestSnapshot: playlist.snapshot_id,
                    },
                    $push: {
                        sotds: {
                            snapshot_id: playlist.snapshot_id,
                            startDate: "",
                            generationDate: new Date(),
                            games: alreadyPlayed.concat(shuffle(nodeCrypto, newTracks.map((track) => { return {track} })))
                        }
                    }
                },
                {
                    returnDocument: "after"
                }
            ).then(doc => doc.value) as SeasonData
        }
    }
    if (returnPlaylist) return {
        seasonData: currentSeason,
        playlist: playlist.playlist
    }
    else return {
        seasonData: currentSeason,
        playlist: undefined
    }
}
