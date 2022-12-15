import {Spotify} from "./spotify";
import TrackObjectFull = Spotify.TrackObjectFull;

//Database objects:
export interface sotdGamesData {
    snapshot_id: string
    games: sotdGameData[]
    epoch: string // Start of the first game ever played in ISO Date (KST)
    playlist: TrackObjectFull[]
}
export interface sotdGameData {
    track: TrackObjectFull
    //played: boolean
}

//Clientside objects:
export interface currentGame {
    track: TrackObjectFull
    guesses: TrackObjectFull[]
    finished: boolean
}

//API Response
export interface sotdAPIResponse extends sotdGameData {
    day: number
    playlist: TrackObjectFull[]
}
