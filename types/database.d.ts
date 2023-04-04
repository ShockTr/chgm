import {Spotify} from "./spotify";
import TrackObjectFull = Spotify.TrackObjectFull;
import {PlaylistObjectTransformed} from "../lib/util/transformPlaylist";
import ArtistObjectFull = Spotify.ArtistObjectFull;
import AlbumObjectFull = Spotify.AlbumObjectFull;

//SOTD Collection:
export interface sotdGamesData {
    snapshot_id: string
    games: sotdGameData[]
    startDate: string // Start of the first game ever played in ISO Date (KST)
}
export interface sotdGameData {
    track: TrackObjectFull
    //played: boolean
}

//Playlist Collection:
export interface PlaylistData extends updatingData {
    added_at: Date
    snapshot_id: string
    playlist: PlaylistObjectTransformed
}

//Artists Collection:
export interface ArtistData extends updatingData {
    artist: ArtistObjectFull
    topTracks: TrackObjectFull[]
    chgmTracks: TrackObjectFull[]
}

//Albums Collection:
export interface AlbumData {
    album: AlbumObjectFull
}

//Helper:
export interface updatingData {
    valid_until: Date
}
