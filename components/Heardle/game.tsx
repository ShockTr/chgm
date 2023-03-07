import {PlaylistObjectTransformed} from "../../lib/util/transformPlaylist";
import {sotdAPIResponse} from "../../types/sotd";
import {HeardleGuess} from "./guess";
import {HeardleTypeBox} from "./typeBox";

export function HeardleGame({playlist, sotd}: {playlist: PlaylistObjectTransformed, sotd?: sotdAPIResponse}){
    const maxGuesses = 5

    return (
        <div className="flex flex-col max-w-screen-sm w-full items-center p-3 rounded space-y-3">
            <div className="flex flex-col w-full space-y-3">
                <HeardleGuess guess={
                    sotd? {correct: true, track: sotd.track} : undefined
                }/>
                <HeardleGuess/>
                <HeardleGuess/>
                <HeardleGuess/>
                <HeardleGuess/>
            </div>
            <HeardleTypeBox playlist={playlist}/>
        </div>
    )
}
