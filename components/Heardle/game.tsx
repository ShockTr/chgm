import {PlaylistObjectTransformed} from "../../lib/util/transformPlaylist";
import {sotdAPIResponse} from "../../types/sotd";
import {HeardleGuess} from "./guess";
import {HeardleTypeBox} from "./typeBox";
import {useState} from "react";
import {Spotify} from "../../types/spotify";
import TrackObjectFull = Spotify.TrackObjectFull;

export function HeardleGame({playlist, sotd}: {playlist: PlaylistObjectTransformed, sotd?: sotdAPIResponse}){
    const maxGuesses = 5
    const [selected, setSelected] = useState<TrackObjectFull | null>(null)

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
