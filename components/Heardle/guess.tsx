import {sotdGuess} from "../../types/sotd";
import {TracksGridItem} from "../../pages/tracks";

export function HeardleGuess({guess}: {guess?: sotdGuess}){
    if (!guess) return (
        <div className="w-full h-24 border border-slate-700 rounded">

        </div>
    )
    else if (guess.track === null) return (
        <div className="flex w-full h-24 border bg-slate-800 border-slate-700 rounded items-center p-3 space-x-3">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8.688c0-.864.933-1.405 1.683-.977l7.108 4.062a1.125 1.125 0 010 1.953l-7.108 4.062A1.125 1.125 0 013 16.81V8.688zM12.75 8.688c0-.864.933-1.405 1.683-.977l7.108 4.062a1.125 1.125 0 010 1.953l-7.108 4.062a1.125 1.125 0 01-1.683-.977V8.688z" />
            </svg>
            <div className="font-medium text-xl">
                Skipped
            </div>
        </div>
    )
    else return (
        <div className={`h-24 rounded ring ${guess.correct? "ring-green-500": "ring-red-600"} `}>
            <TracksGridItem track={guess.track}/>
        </div>
    )
}
