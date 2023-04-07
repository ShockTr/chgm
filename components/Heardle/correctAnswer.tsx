import Link from "next/link";
import Image from "next/legacy/image";
import shimmer from "../../lib/util/shimmer";
import {Spotify} from "../../types/spotify";
import TrackObjectFull = Spotify.TrackObjectFull;
import {SpotifyIcon} from "../../lib/util/spotifyIcon";

export function CorrectAnswer({track}: {track: TrackObjectFull}){
    return (
        <div className="h-16 sm:h-24 rounded">
            <div className="h-full bg-slate-800 hover:bg-slate-700 rounded p-2 transition-colors duration-300">
                <div className="flex justify-between">
                    <div className="flex">
                        <Link href={`/albums/${track.album.id}`} className="shrink flex h-12 w-12 sm:h-fit sm:w-fit my-auto">
                            <Image
                                title={track.album.name}
                                placeholder="blur"
                                blurDataURL={`data:image/svg+xml;base64,${Buffer.from(shimmer(80, 80)).toString('base64')}`}
                                alt={track.album.name + " Album Cover"} src={track.album.images[0].url}
                                width="80"
                                height="80"
                                className="overflow-hidden rounded hover:brightness-90 transition-[filter] duration-300"
                            />
                        </Link>
                        <div className="flex flex-col min-w-0 ml-3">
                            <div className="font-semibold text-lg truncate">
                                <Link href={`/albums/${track.album.id}`} title={track.name}>{track.name}</Link>
                            </div>
                            <div className="font-italic text-xs">
                                {track.artists.map((artist,index,array) => {
                                    return (
                                        <span title={artist.name} key={artist.id}>
                                    <Link href={`/artists/${artist.id}`}><span className="hover:cursor-pointer hover:underline">{artist.name}</span></Link>{((array.length - index - 1) !== 0)? ', ': ''}
                            </span>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center">
                        <Link className="rounded-full text-gray-400 hover:text-white" href={track.external_urls.spotify}>
                            <SpotifyIcon/>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
