import {Spotify} from "../../../types/spotify";
import getAccessToken from "./getAccessToken";

export default async function fetchPlaylist () {
    let {access_token: token} = await getAccessToken()
    let final_playlist: Spotify.PlaylistObjectFull
    let current_playlist = await fetch(`https://api.spotify.com/v1/playlists/${process.env.PLAYLIST}?market=US`, {headers: {Authorization: `Bearer ${token}`}}).then(r => r.json()) as Spotify.PlaylistObjectFull
    final_playlist = current_playlist
    while (current_playlist.tracks.next !== null) {
        let next = await fetch(current_playlist.tracks.next, {headers: {Authorization: `Bearer ${token}`}}).then(r => r.json()) as Spotify.PlaylistObjectFull
        final_playlist.tracks.items.push(...next.tracks.items)
        current_playlist = next
    }
    return final_playlist
}
