import getAccessToken from "./getAccessToken";
import fetchPlaylist from "./fetchPlaylist";
import {transformPlaylist} from "../util/transformPlaylist";
import {fetchTrackFeatures} from "./fetchTrackFeatures";
import {Spotify} from "../../types/spotify";

export async function fetchAllTrackFeatures(token?: string) {
    let realToken = token ?? await getAccessToken().then(r => r.access_token)
    const playlist = await fetchPlaylist(realToken)
    const transformedPlaylist = transformPlaylist(playlist)
    let trackIds = transformedPlaylist.tracks.map(track => track.id)
    let remainingIds = [...trackIds]
    let finalObject: Spotify.AudioFeaturesObject[] = []
    for (let i = remainingIds.length; i > 0; i >= 100 ? i = i-100: i=0) {
        let idsToRequest:string[]
        idsToRequest = remainingIds.slice(0, i>=100 ? 100 : i)
        remainingIds = remainingIds.slice(i>=100 ? 100 : i)
        let result = await fetchTrackFeatures(idsToRequest, realToken)
        finalObject.push(...result)
    }
    return finalObject
}
