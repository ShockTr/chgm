import getAccessToken from "./getAccessToken";
import {Spotify} from "../../../types/spotify";
import ArtistsAlbumsResponse = Spotify.ArtistsAlbumsResponse;
import AlbumObjectSimplified = Spotify.AlbumObjectSimplified

/**
 *
 * @param artistId ID of the artist to fetch
 * @param token Provide a token to skip built-in token requester.
 */
export default async function fetchArtistAlbums(artistId:string, token?:string) : Promise<AlbumObjectSimplified[]>{
    let realToken = token ?? await getAccessToken().then(r => r.access_token)
    let final: AlbumObjectSimplified[]
    let current = await fetch(`https://api.spotify.com/v1/artists/${artistId}/albums?limit=50&market=US`, {headers: {Authorization: `Bearer ${realToken}`}}).then(r => r.json()) as ArtistsAlbumsResponse
    final = current.items
    while (current.next !== null) {
        let next = await fetch(current.next, {headers: {Authorization: `Bearer ${realToken}`}}).then(r => r.json()) as ArtistsAlbumsResponse
        final.push(...next.items)
        current = next
    }
    return final
}
