import {Spotify} from "./spotify";
import TrackObjectFull = Spotify.TrackObjectFull;
import {sotdGameData} from "./database";


//Clientside objects:
export interface currentGame {
    track: TrackObjectFull
    guesses: TrackObjectFull[]
    finished: boolean
}

//API Response
export interface sotdAPIResponse extends sotdGameData {
    day: number
    snapshot_id: string
}
