import {Dialog} from '@headlessui/react'
import {currentGame, endingMessage, previousSotdGames} from "../../types/sotd";
import {nodeCrypto, shuffle} from "random-js";
import {useCallback, useEffect, useMemo, useState} from "react";
import {DateTime} from "luxon";
import {endingMessages, maxGuesses} from "./config";
//import {HeardleGuess} from "./guess";

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
    const [buttonText, setButtonText] = useState("Share")
    const shareText = useMemo(() => {
        let emojis: string[] = [];
        [...Array(gameState.maxGuesses)].forEach((_, i) => {
            let guess = gameState.guesses[i]
            if (guess?.correct) emojis.push("🟩")
            else if (!guess?.correct && guess?.track) emojis.push("🟥")
            else emojis.push("⬛")
        })
        return `CHGM SOTD - ${DateTime.fromISO(date, {zone: "Asia/Seoul"}).toFormat("dd.MM.yyyy")}\n\n${emojis.join("")}\n\n${window.location.href}`

    }, [gameState.guesses, gameState.maxGuesses, date])

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
                <Dialog.Panel id="resultPane" className="text-white max-w-screen-sm w-full h-fit max-h-[95%] overflow-y-auto rounded bg-slate-800 border border-slate-600 p-3 drop-shadow-md space-y-7">
                    <div className="space-y-1">
                        <div className="flex justify-between">
                            <Dialog.Title className="font-medium text-lg">{title}</Dialog.Title>
                            <button className="p-2 bg-slate-700 rounded w-10 h-10 font-semibold text-center hover:bg-slate-600" onClick={() => setOpen(false)}>
                                X
                            </button>
                        </div>
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
                                    {Math.round(won / (won + lost) * 100)}%
                                </div>
                                <div className="text-gray-400 text-sm">
                                    Win Rate
                                </div>
                            </div>
                        </div>
                    </div>
                    {
                        /*
                        Correct answer
                        Decide if i wanna show it here or in the game

                        */
                    }
                    {/*<div className={`space-y-2 flex flex-col w-full${gameState.won? " hidden": ""}`}>
                        <div>
                            Correct Answer:
                        </div>
                        <div>
                            <HeardleGuess guess={{track: gameState.track, correct: true}}/>
                        </div>
                    </div>*/}
                    {/*Share button*/}
                    <div className="flex items-center justify-center">
                        <button className="flex p-4 w-36 bg-slate-700 hover:bg-slate-600 rounded text-lg justify-center items-center" onClick={() => {
                            navigator.clipboard.writeText(shareText)
                            setButtonText("Copied!")
                            setTimeout(() => setButtonText("Share"), 2000)
                        }}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                <path fillRule="evenodd" d="M15.75 4.5a3 3 0 11.825 2.066l-8.421 4.679a3.002 3.002 0 010 1.51l8.421 4.679a3 3 0 11-.729 1.31l-8.421-4.678a3 3 0 110-4.132l8.421-4.679a3 3 0 01-.096-.755z" clipRule="evenodd" />
                            </svg>
                            <span className="ml-2">{buttonText}</span>
                        </button>
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
