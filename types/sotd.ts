import {Spotify} from "./spotify";
import TrackObjectFull = Spotify.TrackObjectFull;
import {sotdGameData} from "./database";


//Clientside objects:
export interface currentGame {
    track: TrackObjectFull
    guesses: sotdGuess[]
    finished: boolean
    won: boolean
}

export interface sotdGuess {
    correct: boolean
    track: TrackObjectFull
}

//API Response
export interface sotdAPIResponse extends sotdGameData {
    day: number
    snapshot_id: string
}

export type Nullable<T> = T | null | undefined;
