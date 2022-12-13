import {Spotify} from "../../types/spotify";
import getAccessToken from "./getAccessToken";

/**
 * @param token Provide a token to skip built-in token requester.
 */
export default async function fetchPlaylistBasic (token?:string) {
    let realToken = token ?? await getAccessToken().then(r => r.access_token)
    return await fetch(`https://api.spotify.com/v1/playlists/${process.env.PLAYLIST}?market=US`, {headers: {Authorization: `Bearer ${realToken}`}}).then(r => r.json()) as Spotify.PlaylistObjectFull
}
