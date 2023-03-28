import {Spotify} from "./spotify";
import TrackObjectFull = Spotify.TrackObjectFull;
import {sotdGameData} from "./database";


//Clientside objects:
export interface currentGame {
    game: {
        snapshot_id: string
        day: number
    }
    track: TrackObjectFull
    guesses: sotdGuess[]
    finished: boolean
    won: boolean
}

export interface sotdGuess {
    correct: boolean
    track: TrackObjectFull | null
}

//API Response
export interface sotdAPIResponse extends sotdGameData {
    day: number
    snapshot_id: string
}

export type Nullable<T> = T | null | undefined;
