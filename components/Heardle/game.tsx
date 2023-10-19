import {PlaylistObjectTransformed} from "../../lib/util/transformPlaylist";
import {currentGame, previousSotdGamesV2, sotdAPIResponse, sotdGuess} from "../../types/sotd";
import {HeardleGuess} from "./guess";
import {HeardleTypeBox} from "./typeBox";
import {useEffect, useMemo, useState} from "react";
import {Spotify} from "../../types/spotify";
import {useSavedState} from "../../lib/util/useSavedState";
import {HeardlePlayer} from "./player";
import {HeardleResultPane} from "./resultPane";
import {DateTime} from "luxon";
import {CorrectAnswer} from "./correctAnswer";
import {maxGuesses, segments} from "./config";
import TrackObjectFull = Spotify.TrackObjectFull;
import {seasonDateObject} from "../../lib/util/getSeasonDates";
import {transformV1previousGamesToV2} from "../../lib/util/transformV1previousGamesToV2";
import {useSession} from "next-auth/react";

export function HeardleGame({playlist, sotd, seasons}: {playlist: PlaylistObjectTransformed, sotd: sotdAPIResponse, seasons: seasonDateObject[]}){
    const date = useMemo(() => DateTime.now().setZone("Asia/Seoul").toISODate(), [])
    const [selected, setSelected] = useState<TrackObjectFull | null>(null)
    const [modalIsOpen, setModalIsOpen] = useState(false)
    const { data: session, status } = useSession()
    let initalState: currentGame = {
        game: {
            snapshot_id: sotd.snapshot_id,
            season: sotd.currentSeason,
            day: sotd.day,
        },
        track: sotd.track,
        guesses: [],
        finished: false,
        won: false,
        synced: false,
        maxGuesses
    }
    const [gameState, setGameState] = useSavedState<currentGame>("gameState", initalState)
    const [previousGames, setPreviousGames] = useSavedState<previousSotdGamesV2>(
        "previousGamesV2",
        transformV1previousGamesToV2(seasons, JSON.parse(localStorage.getItem("previousGames") ?? "{}") )
    )
    if (JSON.stringify(gameState.game) !== JSON.stringify(initalState.game)) setGameState(initalState)

    useEffect(() => {
        if (status === "authenticated" && !gameState.finished) {
            fetch("/api/leaderboard/user/sync", {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then((res) => {
                res.json().then(r => {
                    if (!r.error)  {
                        const serverGames: previousSotdGamesV2 = r.games
                        if (
                            serverGames &&
                            serverGames[sotd.currentSeason] &&
                            serverGames[sotd.currentSeason][date] &&
                            serverGames[sotd.currentSeason][date].finished
                        ) {
                            const state =  serverGames[sotd.currentSeason][date]
                            const modifiedInitial: currentGame = {
                                ...initalState,
                                finished: state.finished,
                                won: state.won,
                                synced: true,
                                guesses: [...Array(state.guesses)].map((value, index): sotdGuess => {
                                    if (index === state.guesses - 1 ) return {
                                        track: state.won? sotd.track: null,
                                        skipped:false,
                                        correct: state.won
                                    }
                                    else return {
                                        track: null,
                                        skipped: false,
                                        correct: false
                                    }
                                })
                            }
                            setGameState(modifiedInitial)
                        }
                    }
                    else console.error(r.error)
                })
            })
        }
    }, [status]);

    function submitGuess(){
        if (selected === null) return
        let correct = selected.id === gameState.track.id
        let newGuesses = [...gameState.guesses, {correct, track: selected, skipped:false}]
        setGameState({
            ...gameState,
            guesses: newGuesses,
            finished: correct || newGuesses.length === maxGuesses,
            won: correct,
        })
        setSelected(null)
    }
    function skipGuess(){
        let newGuesses = [...gameState.guesses, {correct: false, track: null, skipped:true}]
        setGameState({
            ...gameState,
            guesses: newGuesses,
            finished: newGuesses.length === maxGuesses,
            won: false,
        })
        setSelected(null)
    }
    useEffect(() => {
        if (gameState.finished) {
            let temporaryState: previousSotdGamesV2 = previousGames
            if (!gameState.synced) {
                temporaryState = {
                    ...previousGames,
                    [sotd.currentSeason]: {
                        ...previousGames[sotd.currentSeason],
                        [date]: {
                            guesses: gameState.guesses.length,
                            won: gameState.won,
                            finished: gameState.finished,
                            maxGuesses: gameState.maxGuesses
                        }
                    }
                }
                setPreviousGames(temporaryState)
            }
            if (session) {
                fetch("/api/leaderboard/user/sync", {
                    method: "POST",
                    body: JSON.stringify(temporaryState),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).then((res) => {
                    res.json().then(r => {
                        if (!r.error) setPreviousGames(r.games)
                    })
                })
            }
            setModalIsOpen(true)
        }
    },[gameState.finished])

    return (
        <div className="flex flex-col max-w-screen-sm w-full items-center p-3 rounded space-y-3">
            <HeardleResultPane open={modalIsOpen} setOpen={setModalIsOpen} gameState={gameState} previousGames={previousGames}/>
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
            <div className={`space-y-2 flex flex-col w-full${!gameState.finished || gameState.won? " hidden": ""}`}>
                <div>
                    Correct Answer:
                </div>
                <div>
                    <CorrectAnswer track={gameState.track}/>
                </div>
            </div>
            <HeardlePlayer gameState={gameState} segments={segments}/>
        </div>
    )
}

