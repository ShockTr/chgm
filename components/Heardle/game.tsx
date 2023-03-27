import {PlaylistObjectTransformed} from "../../lib/util/transformPlaylist";
import {currentGame, sotdAPIResponse} from "../../types/sotd";
import {HeardleGuess} from "./guess";
import {HeardleTypeBox} from "./typeBox";
import {useState} from "react";
import {Spotify} from "../../types/spotify";
import TrackObjectFull = Spotify.TrackObjectFull;
import {useSavedState} from "../../lib/util/useSavedState";

export function HeardleGame({playlist, sotd}: {playlist: PlaylistObjectTransformed, sotd: sotdAPIResponse}){
    const maxGuesses = 5
    const [selected, setSelected] = useState<TrackObjectFull | null>(null)
    let initalState: currentGame = {
        game: {
            snapshot_id: sotd.snapshot_id,
            day: sotd.day,
        },
        track: sotd.track,
        guesses: [{correct: true, track: sotd.track}],
        finished: false,
        won: false,

    }
    const [gameState, setGameState] = useSavedState<currentGame>("gameState", initalState)
    if (JSON.stringify(gameState.game) !== JSON.stringify(initalState.game)) {
        setGameState(initalState)
    }

    return (
        <div className="flex flex-col max-w-screen-sm w-full items-center p-3 rounded space-y-3">
            <div className="flex flex-col w-full space-y-3">
                {
                    [...Array(maxGuesses)].map((_, i) => {
                        return (
                            <HeardleGuess key={i} guess={gameState.guesses[i]}/>
                        )
                    })
                }
            </div>
            <HeardleTypeBox selected={selected} onChange={setSelected} playlist={playlist}/>
            <div className="flex flex-row w-full space-x-3">
                <button className="w-full h-10 rounded bg-green-700 hover:bg-green-600" onClick={() => console.log(selected)}>
                    Submit
                </button>
                <button className="w-full h-10 rounded bg-slate-800 hover:bg-slate-600" onClick={() => console.log(selected)}>
                    Skip
                </button>
            </div>
        </div>
    )
}
