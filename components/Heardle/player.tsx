import {Duration} from "luxon";
import {useRef, useState, useCallback, useEffect, useMemo} from "react";
import AudioPlayer from 'react-audio-player';
import {currentGame, userSettings} from "../../types/sotd";
import {useSavedState} from "../../lib/util/useSavedState";

export function HeardlePlayer({gameState, segments}: {gameState: currentGame, segments:number[]}) {
    const playerRef = useRef<AudioPlayer>(null)
    const [playing, setPlaying] = useState(false)
    const [currentTime, setCurrentTime] = useState(0)
    const [userSettings] = useSavedState<userSettings>("userSettings", { volume: 20 })
    const currentSegment = useMemo(() => !gameState.finished ? segments[gameState.guesses.length]: Infinity, [segments, gameState])

    function numberToHms(number: number) {
        if (isNaN(number)) return "00:00"
        return Duration.fromObject({seconds: number}).toFormat('mm:ss')
    }

    const onTimeupdate = useCallback(() => {
        if (!playerRef.current || !playerRef.current.audioEl.current) return

        const currentTime = playerRef.current.audioEl.current.currentTime
        setCurrentTime(currentTime)

        if (currentTime >= currentSegment) {
            playerRef.current.audioEl.current.pause()
            setPlaying(false)
        }
    }, [currentSegment])

    const onClick = useCallback(() => {
        if (!playerRef.current || !playerRef.current.audioEl.current) return

        if (playing) {
            playerRef.current.audioEl.current.pause()
            setPlaying(false)
        } else {
            if (playerRef.current.audioEl.current.currentTime >= currentSegment) playerRef.current.audioEl.current.currentTime = 0
            playerRef.current.audioEl.current.play()
            setPlaying(true)
            playerRef.current.audioEl.current.ontimeupdate = onTimeupdate
            playerRef.current.audioEl.current.onended = () => setPlaying(false)
        }
    }, [playing, onTimeupdate, currentSegment])

    useEffect(() => {
        if (!playerRef.current || !playerRef.current.audioEl.current || !playing) return
        playerRef.current.audioEl.current.ontimeupdate = onTimeupdate
    }, [onTimeupdate, playing])

    return (
        <div className="w-full h-20 bg-slate-800 rounded">
            <AudioPlayer preload="auto" volume={userSettings.volume / 100} ref={playerRef} src={gameState.track.preview_url as string}/>
            <div className=" flex items-end p-3 pb-0">
                <div aria-hidden={true} className="relative w-full h-3 bg-slate-700 rounded">
                    <div className="h-full bg-green-500 rounded max-w-full" style={{width: `${( Math.round(currentTime - 0.4) / Math.round((playerRef.current?.audioEl.current?.duration?? 29) - 0.4)) * 100}%`}}>
                        {
                            segments.map((segment, index) => {
                                return (
                                    <div
                                        key={index}
                                        className={`absolute h-3 border-r-2 border-slate-800 max-w-full${gameState.finished? " hidden": ""}`}
                                        style={{width: `${(segment / Math.round((playerRef.current?.audioEl.current?.duration?? 29) - 0.4)) * 100}%`}}
                                    />
                                )
                            })
                        }
                    </div>
                </div>
            </div>
            <div className="h-16 p-3 flex items-center justify-between">
                <div>
                    {numberToHms(Math.round(currentTime - 0.4))}
                </div>
                <button aria-label="Play" className="hover:text-gray-300" onClick={onClick}>
                    {playing?
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M8 7h3v10H8zm5 0h3v10h-3z"/>
                            </svg>
                        </div>
                        :
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M7 6v12l10-6z"/>
                            </svg>
                        </div>
                    }
                </button>
                <div>
                    {numberToHms(Math.round((playerRef.current?.audioEl.current?.duration?? 29) - 0.4))}
                </div>
            </div>
        </div>
    )
}
