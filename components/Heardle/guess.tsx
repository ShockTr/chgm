import {sotdGuess} from "../../types/sotd";
import {TracksGridItem} from "../../pages/tracks";

export function HeardleGuess({guess}: {guess?: sotdGuess}){
    if (!guess) return (
        <div className="w-96 h-24 border border-slate-700 rounded">

        </div>
    )
    else return (
        <div className={`h-24 rounded ring ${guess.correct? "ring-green-500": "ring-red-600"} `}>
            <TracksGridItem track={guess.track}/>
        </div>
    )
}
