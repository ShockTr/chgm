import getAccessToken from "./getAccessToken";
import {Spotify} from "../../types/spotify";
import ArtistsTopTracksResponse = Spotify.ArtistsTopTracksResponse;

/**
 * @param id ID of the artist.
 * @param token Provide a token to skip built-in token requester.
 */
export default async function fetchArtistTopTracks(id:string, token?:string): Promise<ArtistsTopTracksResponse> {
    let realToken = token ?? await getAccessToken().then(r => r.access_token)
    return await fetch(`https://api.spotify.com/v1/artists/${id}/top-tracks?market=US`, {headers: {Authorization: `Bearer ${realToken}`}}).then(r => r.json()) as ArtistsTopTracksResponse
}
