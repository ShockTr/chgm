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
    maxGuesses: number
    guesses: sotdGuess[]
    finished: boolean
    won: boolean
}

export interface sotdGuess {
    correct: boolean
    track: TrackObjectFull | null
}

export interface userSettings {
    volume: number
}

// ISO-DATE, currentGame
export type previousSotdGames = Record<string, {
    maxGuesses: number,
    guesses: number
    finished:boolean
    won: boolean
}>

//API Response
export interface sotdAPIResponse extends sotdGameData {
    day: number
    snapshot_id: string
}

export type Nullable<T> = T | null | undefined;
export type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>
