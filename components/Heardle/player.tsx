import {useRef, useState} from "react";
import AudioPlayer from 'react-audio-player';
import {currentGame} from "../../types/sotd";

export function HeardlePlayer({gameState}: {gameState: currentGame}) {
    let segments = [2, 6, 15, 20] // Which second to stop at for each guess

    const playerRef = useRef<AudioPlayer>(null)
    const [playing, setPlaying] = useState(false)
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
        <div className="w-full h-20 bg-slate-800 rounded">
            <AudioPlayer volume={0.1} ref={playerRef} src={gameState.track.preview_url as string}/>
            <button onClick={onClick}>
                <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M7 6v12l10-6z"/>
                </svg>
            </button>
        </div>
    )
}
