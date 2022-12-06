import getAccessToken from "./getAccessToken";
import {Spotify} from "../../types/spotify";
import MultipleAlbumsResponse = Spotify.MultipleAlbumsResponse;

/**
 * @param ids IDs of the artists to fetch. max20
 * @param token Provide a token to skip built-in token requester.
 */
export default async function fetchAlbums(ids:string[], token?:string) {
    let realToken = token ?? await getAccessToken().then(r => r.access_token)
    if (ids.length > 20) throw Error("You can only request 20 albums per request.")
    let url = new URL("https://api.spotify.com/v1/albums")
    url.searchParams.set("ids", ids.join(","))
    let response = await fetch(url, {headers: {Authorization: `Bearer ${realToken}`}}).then(r => r.json()) as MultipleAlbumsResponse
    return response.albums
}
