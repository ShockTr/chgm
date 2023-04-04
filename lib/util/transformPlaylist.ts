import {Spotify} from "../../types/spotify";
import PlaylistObjectFull = Spotify.PlaylistObjectFull;
import TrackObjectFull = Spotify.TrackObjectFull;

export function transformPlaylist(playlist : PlaylistObjectFull): PlaylistObjectTransformed {
    return {
        ...playlist,
        tracks: playlist.tracks.items.filter((item) => item.track).map((item) => item.track) as TrackObjectFull[]
    }
}

export interface PlaylistObjectTransformed extends Omit<PlaylistObjectFull, 'tracks'> {
    tracks: TrackObjectFull[]
}
