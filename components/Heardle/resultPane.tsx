import { Dialog } from '@headlessui/react'
import {currentGame, previousSotdGames} from "../../types/sotd";
import {nodeCrypto, shuffle} from "random-js";
import {endingMessage, endingMessages, maxGuesses} from "./game";

export function HeardleResultPane({gameState, open, setOpen, previousGames}: {gameState: currentGame, open:boolean, setOpen: (open:boolean) => void, previousGames:previousSotdGames}) {
    function getRandomEnding(type: keyof endingMessage){
        const guessCount = gameState.guesses.length
        const won = gameState.won
        let selected: endingMessage
        if (!won) selected = endingMessages["-1"]
        else if (endingMessages[guessCount] === undefined) selected = endingMessages[0]
        else selected = endingMessages[guessCount]

        const shuffled = shuffle(nodeCrypto, selected[type])
        return shuffled[0]
    }

    return (
        <Dialog
            open={open}
            onClose={() => setOpen(false)}
            className="relative z-50"
        >
            {/* The backdrop, rendered as a fixed sibling to the panel container */}
            <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

            {/* Full-screen container to center the panel */}
            <div className="fixed inset-0 flex items-center justify-center p-3">
                {/* The actual dialog panel  */}
                <Dialog.Panel className=" text-white max-w-screen-sm w-full h-4/5 rounded bg-slate-800 p-3 drop-shadow-md space-y-3">
                    <Dialog.Title className="font-medium text-lg">{getRandomEnding("titles")}</Dialog.Title>
                    <Dialog.Description>
                        {getRandomEnding("messages")}
                    </Dialog.Description>
                    {/*Chart*/}
                    <div className="flex flex-row w-full justify-between">
                        {
                            [...Array(gameState.maxGuesses + 1)].map((_, i) => {
                                let values = Object.values(previousGames)

                                let count = values.filter((game) => (game.guesses.length === i + 1) && game.won).length
                                if (i + 1 === gameState.maxGuesses + 1) count = values.filter((game) => !game.won).length

                                const result = values.filter((game) => game.won).map((game) => game.guesses.length).reduce((acc: Record<number, number>, curr) => {
                                    if (typeof acc[curr] === 'undefined') {
                                        acc[curr] = 1;
                                    } else {
                                        acc[curr] += 1;
                                    }
                                    return acc;
                                }, {});

                                let maxNumberOfGamesWithXGuess = Math.max(...Object.values(result))
                                let lost = values.filter((game) => !game.won).length
                                if (maxNumberOfGamesWithXGuess < lost) maxNumberOfGamesWithXGuess = lost

                                return (
                                    <div key={i} className="flex flex-col">
                                        <div className="h-60 flex items-end">
                                            <div className="max-h-60 w-10 bg-slate-600 flex justify-center" style={{height: `${count / maxNumberOfGamesWithXGuess * 100}%` }}>
                                                {(count === 0)? "": count}
                                            </div>
                                        </div>
                                        <div className="flex justify-center">
                                            {(i + 1) === (maxGuesses + 1)? "X": i + 1}
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </Dialog.Panel>
            </div>
        </Dialog>
    )
}
