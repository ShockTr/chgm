import {Collection} from "mongodb";
import {PlaylistData} from "../../types/database";
import getAccessToken from "../spotify/getAccessToken";
import fetchPlaylist from "../spotify/fetchPlaylist";
import {transformPlaylist} from "./transformPlaylist";
import {DateTime} from "luxon";

export async function revalidatePlaylist(collection: Collection<PlaylistData>) {
    let doc = await collection.findOne({
        valid_until: {$gte: new Date()}
    })
    if (!doc) { //TODO: Maybe untangle this spaghetti.
        let {access_token: token} = await getAccessToken()
        let playlist = transformPlaylist(await fetchPlaylist(token))
        async function insertNewDoc() {
            await collection.insertOne({
                snapshot_id: playlist.snapshot_id,
                added_at: new Date(),
                playlist,
                valid_until: DateTime.fromISO(DateTime.now().setZone("Asia/Seoul").plus({day: 1}).toISODate(), {zone: "Asia/Seoul"}).toJSDate()
            })
        }

        let oldObject = await collection.findOne({
            snapshot_id: {$eq: playlist.snapshot_id}
        })

        if (oldObject) await collection.updateOne({_id: {$eq: oldObject._id}},{
            $set: {
                valid_until: DateTime.fromISO(DateTime.now().setZone("Asia/Seoul").plus({day: 1}).toISODate(), {zone: "Asia/Seoul"}).toJSDate()
            }
        })
        else await insertNewDoc()
        doc = await collection.findOne({
            valid_until: {$gte: new Date()}
        }) as NonNullable<typeof doc>
    }
    return doc
}
