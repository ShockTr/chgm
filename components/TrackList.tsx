import {Spotify} from "../types/spotify";
import TrackObjectFull = Spotify.TrackObjectFull;
import TrackObjectSimplified = Spotify.TrackObjectSimplified;
import shimmer from "../lib/util/shimmer";
import Image from "next/legacy/image";
import {useRef, useState} from "react";
import {SpotifyIcon} from "../lib/util/spotifyIcon"
import Link from "next/link";
import AudioPlayer from 'react-audio-player';

export function TrackList({tracks, chgmTracks}: { tracks: TrackObjectFull[] | TrackObjectSimplified[], chgmTracks: TrackObjectFull[] }) : JSX.Element {
    return (
        <div className="flex flex-col space-y-1">
            {tracks.map((track, index) => {
                return (
                    <TrackListItem
                        key={track.id}
                        track={track}
                        index={index}
                        chgm={!!chgmTracks.find(trck => (trck.id === track.id) || ("external_ids" in track ? JSON.stringify(trck.external_ids) === JSON.stringify(track.external_ids) : false))}
                    />
                )
            })}
        </div>
    )
}

export function TrackListItem({track, index, chgm}: { track: TrackObjectFull | TrackObjectSimplified, index: number, chgm: boolean}) {
    const [hovering, setHover] = useState(false)
    const [playing, setPlaying] = useState(false)
    const playerRef = useRef<AudioPlayer>(null)
    function onClick(){
        if (playerRef.current) {
            if (playing) {
                playerRef.current.audioEl.current?.pause()
                setPlaying(false)
            }
            else {
                playerRef.current.audioEl.current?.play()
                setPlaying(true)
            }
        }
    }
    return (
        <div className={`flex h-14 text-white px-3 p-1 rounded justify-between group ${chgm? "bg-gradient-to-r from-sky-900 hover:from-sky-800": "hover:bg-slate-800 "}`} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} >
            <AudioPlayer volume={0.3} src={track.preview_url as string} ref={playerRef} loop/>
            <div className="flex min-w-0 items-center space-x-2">
                <div className="w-[18px] shrink-0 text-right group-hover:text-white text-gray-400">
                    {
                        hovering?
                            <button className="flex" onClick={onClick}>
                                {playing?
                                    <div>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M8 7h3v10H8zm5 0h3v10h-3z"/>
                                        </svg>
                                    </div>
                                    :
                                    <div>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M7 6v12l10-6z"/>
                                        </svg>
                                    </div>
                                }
                            </button>
                            :
                            (index + 1)

                    }
                </div>
                {
                    ("album" in track && track.album)?
                        <div className="h-10 shrink-0">
                            <Image
                                className="overflow-hidden"
                                title={track.album.name}
                                src={track.album.images[0].url}
                                width="40"
                                height="40"
                                placeholder="blur"
                                blurDataURL={`data:image/svg+xml;base64,${Buffer.from(shimmer(40, 40)).toString('base64')}`}
                                alt={track.album.name + " Album Cover"} />
                        </div>
                        :<></>
                }
                <div className="sm:pl-2 min-w-0">
                    <div className="flex font-medium flex-col">
                        <div className="min-w-0 truncate">
                            {track.name}
                        </div>
                        <div className="flex space-x-1 items-center">
                            {
                                chgm?
                                    <div className="p-1 text-[9px] bg-slate-600 rounded">
                                        CHGM
                                    </div>:
                                    <></>
                            }
                            {
                                !("album" in track && track.album) ?
                                    <div className="font-italic text-sm text-gray-400">
                                        {track.artists.map((artist,index,array) => {
                                            return (
                                                <span className={(index !== 0   )? "hidden sm:inline" : ""} title={artist.name} key={artist.id}>
                                                    <Link href={`/artists/${artist.id}`}>
                                                        <span className="hover:cursor-pointer hover:underline">
                                                            {artist.name}
                                                        </span>
                                                    </Link>
                                                    <span className="hidden sm:inline">
                                                        {((array.length - index - 1) !== 0)? ', ': ''}
                                                    </span>
                                                </span>
                                            )
                                        })}
                                    </div>
                                    :
                                    <></>
                        }
                        </div>
                    </div>
                </div>
            </div>
            <div className="hidden sm:flex items-center space-x-2">
                <Link className="rounded-full text-gray-400 hover:text-white" href={track.external_urls.spotify}>
                    <SpotifyIcon/>
                </Link>
                <div className="text-gray-400">
                    {new Intl.DateTimeFormat('en-gb', {minute:"numeric", second: "numeric"}).format(track.duration_ms)}
                </div>
            </div>
        </div>
    )
}
