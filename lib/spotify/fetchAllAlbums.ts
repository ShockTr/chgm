import getAccessToken from "./getAccessToken";
import fetchPlaylist from "./fetchPlaylist";
import {Spotify} from "../../types/spotify";
import AlbumObjectSimplified = Spotify.AlbumObjectSimplified;
import AlbumObjectFull = Spotify.AlbumObjectFull;
import fetchAlbums from "./fetchAlbums";

/**
 * @param token Provide a token to skip built-in token requester.
 */
export default async function fetchAllAlbums(token?:string) {
    let realToken = token ?? await getAccessToken().then(r => r.access_token)
    const playlist = await fetchPlaylist(realToken)
    let albums_array = playlist.tracks.items.map(item => item.track?.album).filter((e) => e !== undefined) as AlbumObjectSimplified[]
    let uniqueIds = new Set<string>(albums_array.map(item => item.id))
    let remainingIds = [...uniqueIds]
    let finalObject: AlbumObjectFull[] = []
    for (let i = remainingIds.length; i > 0; i >= 20 ? i = i-20: i=0) {
        let idsToRequest:string[]
        idsToRequest = remainingIds.slice(0, i>=20?19:i-1)
        remainingIds = remainingIds.slice(i>=20?19:i-1)
        let result = await fetchAlbums(idsToRequest, realToken)
        finalObject.push(...result)
    }
    return finalObject
}
