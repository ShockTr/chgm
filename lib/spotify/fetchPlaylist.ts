import {Spotify} from "../../types/spotify";
import getAccessToken from "./getAccessToken";

/**
 * @param token Provide a token to skip built-in token requester.
 */
export default async function fetchPlaylist (token?:string) {
    let realToken = token ?? await getAccessToken().then(r => r.access_token)
    let final_playlist: Spotify.PlaylistObjectFull
    let current_playlist = await fetch(`https://api.spotify.com/v1/playlists/${process.env.PLAYLIST}?market=US`, {headers: {Authorization: `Bearer ${realToken}`}}).then(r => r.json()) as Spotify.PlaylistObjectFull
    final_playlist = current_playlist
    while (current_playlist.tracks.next !== null) {
        let next = await fetch(current_playlist.tracks.next, {headers: {Authorization: `Bearer ${realToken}`}}).then(r => r.json()) as Spotify.PlaylistObjectFull
        final_playlist.tracks.items.push(...next.tracks.items)
        current_playlist = next
    }
    return final_playlist
}
