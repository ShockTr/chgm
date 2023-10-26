import {Spotify} from "./spotify";
import TrackObjectFull = Spotify.TrackObjectFull;
import {PlaylistObjectTransformed} from "../lib/util/transformPlaylist";
import ArtistObjectFull = Spotify.ArtistObjectFull;
import AlbumObjectFull = Spotify.AlbumObjectFull;
import type {previousSotdGamesV2} from "./sotd";

//SOTD Collection:
export interface sotdGamesData {
    snapshot_id: string
    games: sotdGameData[]
    startDate: string // DEPRECATED field: Start of the first game ever played in ISO Date (KST)
    generationDate: Date
}
export interface sotdGameData {
    track: TrackObjectFull
    //played: boolean
}
export interface SeasonData {
    currentSeason: number
    startDate: string // Start of the first game ever played in ISO Date (KST)
    generationDate: Date
    sotds: sotdGamesData[]
    latestSnapshot: string
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

// User Collection:
export interface userData {
    userID: string
    games: previousSotdGamesV2
}
