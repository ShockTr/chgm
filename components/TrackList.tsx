import {Spotify} from "../types/spotify";
import TrackObjectFull = Spotify.TrackObjectFull;
import TrackObjectSimplified = Spotify.TrackObjectSimplified;
import shimmer from "../lib/util/shimmer";
import Image from "next/legacy/image";
import {useState} from "react";
import {SpotifyIcon} from "../lib/util/spotifyIcon"
import Link from "next/link";

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
    return (
        <div className={`flex max-h-12 text-white p-3 rounded justify-between ${chgm? "bg-gradient-to-r from-cyan-800 to-blue-800": "hover:bg-slate-800 "}`} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} >
            <div className="flex items-center space-x-2">
                <div className={`md:w-[18px] text-right ${hovering? "text-white": "text-gray-400"}`}>
                    {/*TODO: ADD PREVIEW PLAYER*/}
                    {
                        hovering?
                            <div>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M7 6v12l10-6z"/>
                                </svg>
                            </div>
                            :
                            (index + 1)

                    }
                </div>
                {
                    ("album" in track && track.album)?
                        <div className="h-10 shrink-0">
                            <Image className="overflow-hidden" title={track.album.name} src={track.album.images[0].url} width="40" height="40" placeholder="blur" blurDataURL={`data:image/svg+xml;base64,${Buffer.from(shimmer(40, 40)).toString('base64')}`} alt={track.album.name + " Album Cover"} />
                        </div>
                        :<></>
                }
                <div className="truncate font-medium">
                    {track.name}
                </div>
            </div>
            <div className="hidden sm:flex items-center space-x-2">
                {
                    chgm?
                        <div className="text-pink-500">
                            CHGM ✨
                        </div>
                        : <></>
                }
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
