import fetchPlaylist from "./fetchPlaylist";
import getAccessToken from "./getAccessToken";
import fetchArtists from "./fetchArtists";
import {Spotify} from "../../types/spotify";
import ArtistObjectFull = Spotify.ArtistObjectFull;
import ArtistObjectSimplified = Spotify.ArtistObjectSimplified;

/**
 * @param token Provide a token to skip built-in token requester.
 */
export default async function fetchAllArtists(token?:string) {
    let realToken = token ?? await getAccessToken().then(r => r.access_token)
    const playlist = await fetchPlaylist(realToken)
    let artists_array = playlist.tracks.items.map(item => item.track?.artists).filter((e) => e !== undefined).flat(1) as ArtistObjectSimplified[]
    let uniqueIds = new Set<string>(artists_array.map(item => item.id))
    let remainingIds = [...uniqueIds]
    let finalObject: ArtistObjectFull[] = []
    for (let i = remainingIds.length; i > 0; i >= 50 ? i = i-50: i=0) {
        let idsToRequest:string[]
        idsToRequest = remainingIds.slice(0, i>=50 ? 50 : i)
        remainingIds = remainingIds.slice(i>=50 ? 50 : i)
        let result = await fetchArtists(idsToRequest, realToken)
        finalObject.push(...result)
    }
    return finalObject
}
