import {Spotify} from "../../types/spotify";
import TrackObjectFull = Spotify.TrackObjectFull;

export function generateName(track: TrackObjectFull, dontSeparate?: boolean) {
    return `${track.artists[0].name} ${!dontSeparate? "-": ""} ${track.name}`
}
