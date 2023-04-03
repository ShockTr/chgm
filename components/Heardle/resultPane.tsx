import { Dialog } from '@headlessui/react'
import {currentGame, previousSotdGames} from "../../types/sotd";
import {nodeCrypto, shuffle} from "random-js";
import {endingMessage, endingMessages, maxGuesses} from "./game";
import {useCallback, useEffect, useMemo, useState} from "react";
import {DateTime} from "luxon";

export function HeardleResultPane({gameState, open, setOpen, previousGames}: {gameState: currentGame, open:boolean, setOpen: (open:boolean) => void, previousGames:previousSotdGames}) {
    const getRandomEnding = useCallback((type: keyof endingMessage) => {
        const guessCount = gameState.guesses.length
        const won = gameState.won
        let selected: endingMessage
        if (!won) selected = endingMessages["-1"]
        else if (endingMessages[guessCount] === undefined) selected = endingMessages[0]
        else selected = endingMessages[guessCount]

        const shuffled = shuffle(nodeCrypto, selected[type])
        return shuffled[0]
    }, [gameState.guesses.length, gameState.won])

    const [countDown, setCountDown] = useState("00:00:00")
    const date = useMemo(() => DateTime.now().setZone("Asia/Seoul").toISODate(), [])
    const message = useMemo(() => getRandomEnding("messages"), [getRandomEnding])
    const title = useMemo(() => getRandomEnding("titles"), [getRandomEnding])
    const values = useMemo(() => Object.values(previousGames), [previousGames])
    const occurrences = useMemo(() => {
        return values.filter((game) => game.won).map((game) => game.guesses).reduce((acc: Record<number, number>, curr) => {
            if (typeof acc[curr] === 'undefined') {
                acc[curr] = 1;
            } else {
                acc[curr] += 1;
            }
            return acc;
        }, {})
    }, [values])
    const lost = useMemo(() => values.filter((game) => !game.won).length, [values])
    const won = useMemo(() => values.filter((game) => game.won).length, [values])
    const maxNumberOfGamesWithXGuess = useMemo(() => {
        let max = Math.max(...Object.values(occurrences))
        if (lost > max) max = lost
        return max
    }, [lost, occurrences])
    useEffect(() => {
        const interval = setInterval(() => {
            let tomorrow = DateTime.fromISO(date, {zone: "Asia/Seoul"}).plus({days: 1})
            let now = DateTime.now().setZone("Asia/Seoul")
            if (tomorrow > now) {
                let human = tomorrow.diff(now, ["hours", "minutes", "seconds"]).toFormat("hh:mm:ss")
                setCountDown(human)
            }
            else {
                setCountDown("NOW!")
                clearInterval(interval)
            }
        }, 1000)
        return () => {
            clearInterval(interval)
        }
    }, [date])

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
                <Dialog.Panel className=" text-white max-w-screen-sm w-full h-fit rounded bg-slate-800 border border-slate-600 p-3 drop-shadow-md space-y-7">
                    <div className="space-y-3">
                        <Dialog.Title className="font-medium text-lg">{title}</Dialog.Title>
                        <Dialog.Description>
                            {message}
                        </Dialog.Description>
                    </div>
                    {/*Stats*/}
                    <div className="space-y-6 p-3">
                        {/*Chart*/}
                        <div className="flex flex-row w-full justify-between">
                            {
                                [...Array(gameState.maxGuesses + 1)].map((_, i) => {
                                    let count = values.filter((game) => (game.guesses === i + 1) && game.won).length
                                    if (i + 1 === gameState.maxGuesses + 1) count = values.filter((game) => !game.won).length

                                    return (
                                        <div key={i} className="flex flex-col">
                                            <div className="h-60 flex items-end">
                                                <div className="max-h-60 w-7 sm:w-10 bg-slate-600 flex justify-center" style={{height: `${count / maxNumberOfGamesWithXGuess * 100}%` }}>
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
                        {/*Numerical Stats*/}
                        <div className="flex flex-row justify-between px-10">
                            <div className="flex flex-col items-center flex-1">
                                <div className="text-xl font-semibold">
                                    {won}
                                </div>
                                <div className="text-gray-400 text-sm">
                                    Won
                                </div>
                            </div>
                            <div className="flex flex-col items-center flex-1">
                                <div className="text-xl font-semibold">
                                    {lost}
                                </div>
                                <div className="text-gray-400 text-sm">
                                    Lost
                                </div>
                            </div>
                            <div className="flex flex-col items-center flex-1">
                                <div className="text-xl font-semibold">
                                    %{won / (won + lost) * 100}
                                </div>
                                <div className="text-gray-400 text-sm">
                                    Win Rate
                                </div>
                            </div>
                        </div>
                    </div>
                    {/*Next game countdown*/}
                    <div className="flex flex-col items-center justify-center text-lg">
                        <div className="font-semibold">
                            Next game in:
                        </div>
                        <div>
                            {countDown}
                        </div>
                    </div>
                </Dialog.Panel>
            </div>
        </Dialog>
    )
}
