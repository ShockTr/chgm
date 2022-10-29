import fetchPlaylist from "./fetchPlaylist";
import getAccessToken from "./getAccessToken";
import fetchArtists from "./fetchArtists";
import {Spotify} from "../../../types/spotify";
import ArtistObjectFull = Spotify.ArtistObjectFull;
import ArtistObjectSimplified = Spotify.ArtistObjectSimplified;

export default async function getAllArtists() {
    const playlist = await fetchPlaylist()
    let token = await getAccessToken().then(r=>r.access_token)
    let artists_array = playlist.tracks.items.map(item => item.track?.artists).filter((e) => e !== undefined).flat(1) as ArtistObjectSimplified[]
    let uniqueIds = new Set<string>(artists_array.map(item => item.id))
    let remainingIds = [...uniqueIds]
    let finalObject: ArtistObjectFull[] = []
    for (let i = remainingIds.length; i > 0; i >= 50 ? i = i-50: i=0) {
        let idsToRequest:string[]
        idsToRequest = remainingIds.slice(0, i>=50?49:i-1)
        remainingIds = remainingIds.slice(i>=50?49:i-1)
        let result = await fetchArtists(idsToRequest, token)
        finalObject.push(...result)
    }
    return finalObject
}
