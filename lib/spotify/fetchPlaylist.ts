import {Spotify} from "../../types/spotify";
import getAccessToken from "./getAccessToken";
import fetchAllPages from "./fetchAllPages";

/**
 * @param token Provide a token to skip built-in token requester.
 */
export default async function fetchPlaylist (token?:string) {
    let realToken = token ?? await getAccessToken().then(r => r.access_token)
    let final_playlist: Spotify.PlaylistObjectFull
    let current_playlist = await fetch(`https://api.spotify.com/v1/playlists/${process.env.PLAYLIST}?market=US`, {headers: {Authorization: `Bearer ${realToken}`}}).then(r => r.json()) as Spotify.PlaylistObjectFull
    final_playlist = current_playlist
    final_playlist.tracks.items = await fetchAllPages(current_playlist.tracks)
    return final_playlist
}
