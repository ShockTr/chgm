import {Duration} from "luxon";
import {useRef, useState} from "react";
import AudioPlayer from 'react-audio-player';
import {currentGame} from "../../types/sotd";

export function HeardlePlayer({gameState}: {gameState: currentGame}) {
    let segments = [2, 6, 15, 20] // Which second to stop at for each guess

    const playerRef = useRef<AudioPlayer>(null)
    const [playing, setPlaying] = useState(false)
    const [currentTime, setCurrentTime] = useState(0)

    function numberToHms(number: number) {
        return Duration.fromObject({seconds: number}).toFormat('mm:ss')
    }
    function onClick(){
        if (playerRef.current && playerRef.current.audioEl.current) {
            if (playing) {
                playerRef.current.audioEl.current?.pause()
                setPlaying(false)
            }
            else {
                playerRef.current.audioEl.current?.play()
                setPlaying(true)
                playerRef.current.audioEl.current.ontimeupdate = timeupdate
                playerRef.current.audioEl.current.onended = () => setPlaying(false)
            }
        }
    }
    function timeupdate(){
        if (playerRef.current && playerRef.current.audioEl.current) {
            let currentTime = playerRef.current.audioEl.current.currentTime
            setCurrentTime(currentTime)
            let currentSegment = segments[gameState.guesses.length]
            console.log(currentTime, currentSegment)
            if (currentTime >= currentSegment) {
                playerRef.current.audioEl.current.pause()
                playerRef.current.audioEl.current.currentTime = 0
                setPlaying(false)
            }
        }
        return null
    }
    return (
        <div className="w-full h-32 bg-slate-800 rounded">
            <AudioPlayer preload="auto" volume={0.2} ref={playerRef} src={gameState.track.preview_url as string}/>
            <div className="h-16">

            </div>
            <div className="h-16 p-3 flex items-center justify-between">
                <div>
                    {numberToHms(Math.round(currentTime - 0.4))}
                </div>
                <button className="hover:text-gray-300" onClick={onClick}>
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
                    {numberToHms(Math.round((playerRef.current?.audioEl.current?.duration?? 30) - 0.4))}
                </div>
            </div>
        </div>
    )
}
