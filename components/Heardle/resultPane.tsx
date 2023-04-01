import {useState} from "react";
import { Dialog } from '@headlessui/react'
import {currentGame} from "../../types/sotd";

export function HeardleResultPane({gameState}: {gameState: currentGame}){
    let [isOpen, setIsOpen] = useState(true)

    return (
        <Dialog
            open={isOpen}
            onClose={() => setIsOpen(false)}
            className="relative z-50"
        >
            {/* The backdrop, rendered as a fixed sibling to the panel container */}
            <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

            {/* Full-screen container to center the panel */}
            <div className="fixed inset-0 flex items-center justify-center p-4">
                {/* The actual dialog panel  */}
                <Dialog.Panel className=" text-white max-w-screen-sm w-full h-3/5 rounded bg-slate-800 p-3">
                    <Dialog.Title className="font-medium">You Did it!</Dialog.Title>
                    <Dialog.Description>
                        You Won GJ!
                    </Dialog.Description>
                </Dialog.Panel>
            </div>
        </Dialog>
    )
}
