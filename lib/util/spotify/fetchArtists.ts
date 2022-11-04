import getAccessToken from "./getAccessToken";
import {Spotify} from "../../../types/spotify";

/**
 * @param ids IDs of the artists to get. max50
 * @param token Provide a token to skip built-in token requester.
 */
export default async function fetchArtists (ids: string[], token?:string) {
    let realToken = token ?? await getAccessToken().then(r => r.access_token)
    if (ids.length > 50) throw Error("You can only request 50 artists per request.")
    let url = new URL("https://api.spotify.com/v1/artists")
    url.searchParams.set("ids", ids.join(","))
    let response = await fetch(url, {headers: {Authorization: `Bearer ${realToken}`}}).then(r => r.json()) as {artists: Spotify.ArtistObjectFull[]}
    return response.artists
}
