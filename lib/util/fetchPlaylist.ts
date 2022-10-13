import {Spotify} from "../../types/spotify";
import SpotifyPlaylist = Spotify.SpotifyPlaylist;

// eslint-disable-next-line import/no-anonymous-default-export
export default async function () {
    const urlencoded = new URLSearchParams();
    urlencoded.append("grant_type", "client_credentials");
    let {access_token: token} = await fetch("https://accounts.spotify.com/api/token", {
        headers:
            {
                Authorization: 'Basic ' + (new Buffer(process.env.CLIENT_ID + ':' + process.env.CLIENT_SECRET).toString('base64')),
                "Content-Type": "application/x-www-form-urlencoded"
            },
        body: urlencoded,
        method: "POST"
    })
        .then(res => res.json()) as { access_token: string, token_type: string, expires_in: number }
    let final_playlist: SpotifyPlaylist
    let current_playlist = await fetch(`https://api.spotify.com/v1/playlists/${process.env.PLAYLIST}?market=US`, {headers: {Authorization: `Bearer ${token}`}}).then(r => r.json()) as SpotifyPlaylist
    final_playlist = current_playlist
    while (current_playlist.tracks.next !== null) {
        let next = await fetch(current_playlist.tracks.next, {headers: {Authorization: `Bearer ${token}`}}).then(r => r.json()) as SpotifyPlaylist
        final_playlist.tracks.items.push(...next.tracks.items)
        current_playlist = next
    }
    return final_playlist
}
