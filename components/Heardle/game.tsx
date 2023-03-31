import {PlaylistObjectTransformed} from "../../lib/util/transformPlaylist";
import {currentGame, sotdAPIResponse} from "../../types/sotd";
import {HeardleGuess} from "./guess";
import {HeardleTypeBox} from "./typeBox";
import {useState} from "react";
import {Spotify} from "../../types/spotify";
import TrackObjectFull = Spotify.TrackObjectFull;
import {useSavedState} from "../../lib/util/useSavedState";
import {HeardlePlayer} from "./player";

export function HeardleGame({playlist, sotd}: {playlist: PlaylistObjectTransformed, sotd: sotdAPIResponse}){
    const maxGuesses = 5 // Maximum number of guesses
    const segments = [2, 6, 13, 23] // Which second to stop at for each guess
    const [selected, setSelected] = useState<TrackObjectFull | null>(null)
    let initalState: currentGame = {
        game: {
            snapshot_id: sotd.snapshot_id,
            day: sotd.day,
        },
        track: sotd.track,
        guesses: [],
        finished: false,
        won: false,
        maxGuesses
    }
    const [gameState, setGameState] = useSavedState<currentGame>("gameState", initalState)
    if (JSON.stringify(gameState.game) !== JSON.stringify(initalState.game)) setGameState(initalState)

    function submitGuess(){
        if (selected === null) return
        let correct = selected.id === gameState.track.id
        let newGuesses = [...gameState.guesses, {correct, track: selected}]
        setGameState({
            ...gameState,
            guesses: newGuesses,
            finished: correct || newGuesses.length === maxGuesses,
            won: correct,
        })
        setSelected(null)
    }
    function skipGuess(){
        let newGuesses = [...gameState.guesses, {correct: false, track: null}]
        setGameState({
            ...gameState,
            guesses: newGuesses,
            finished: newGuesses.length === maxGuesses,
            won: false,
        })
        setSelected(null)
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
            <div className={`flex flex-col w-full space-y-3${gameState.finished? " hidden": ""}`}>
                <HeardleTypeBox selected={selected} onChange={setSelected} playlist={playlist}/>
                <div className="flex flex-row w-full space-x-3">
                    <button className="w-full h-10 rounded bg-green-700 hover:bg-green-600" onClick={() => submitGuess()}>
                        Submit
                    </button>
                    <button className="w-full h-10 rounded bg-slate-800 hover:bg-slate-600" onClick={() => skipGuess()}>
                        Skip
                    </button>
                </div>
            </div>
            <HeardlePlayer gameState={gameState} segments={segments} />
        </div>
    )
}
