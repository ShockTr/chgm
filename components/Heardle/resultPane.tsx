import { Dialog } from '@headlessui/react'
import {currentGame} from "../../types/sotd";
import {nodeCrypto, shuffle} from "random-js";
import {endingMessage, endingMessages} from "./game";

export function HeardleResultPane({gameState, open, setOpen}: {gameState: currentGame, open:boolean, setOpen: (open:boolean) => void}) {
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
                <Dialog.Panel className=" text-white max-w-screen-sm w-full h-3/5 rounded bg-slate-800 p-3 drop-shadow-md">
                    <Dialog.Title className="font-medium">{getRandomEnding("titles")}</Dialog.Title>
                    <Dialog.Description>
                        {getRandomEnding("messages")}
                    </Dialog.Description>
                </Dialog.Panel>
            </div>
        </Dialog>
    )
}
