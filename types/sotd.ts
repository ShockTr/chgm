import {Spotify} from "./spotify";
import {sotdGameData} from "./database";
import TrackObjectFull = Spotify.TrackObjectFull;
import { z } from "zod"
import {maxGuesses} from "../components/Heardle/config";


//Clientside objects:
export interface currentGame {
    game: {
        snapshot_id: string
        season: number
        day: number
    }
    track: TrackObjectFull
    maxGuesses: number
    guesses: sotdGuess[]
    finished: boolean
    won: boolean
    synced: boolean
}

export interface sotdGuess {
    correct: boolean
    skipped: boolean
    track: TrackObjectFull | null
}

export interface userSettings {
    volume: number
}

export const previousSotdGames = z.record(z.string(), z.object(
    {
        maxGuesses: z.number(),
        guesses: z.number().min(1).max(maxGuesses),
        finished: z.boolean(),
        won: z.boolean()
    }
))

export type previousSotdGames = z.infer<typeof previousSotdGames>
/* ISO-DATE, currentGame
export type previousSotdGames = Record<string, {
    maxGuesses: number,
    guesses: number
    finished:boolean
    won: boolean
}>*/

export const previousSotdGamesV2 = z.record(z.coerce.number().min(0), previousSotdGames)
export type previousSotdGamesV2 = z.infer<typeof previousSotdGamesV2>

//API Response
export interface sotdAPIResponse extends sotdGameData {
    day: number
    snapshot_id: string
    currentSeason: number
}

export type Nullable<T> = T | null | undefined;
export type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>

export interface endingMessage {
    titles: string[],
    messages: string[]
}
