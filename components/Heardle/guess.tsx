import {sotdGuess} from "../../types/sotd";
import Link from "next/link";
import Image from "next/legacy/image";
import shimmer from "../../lib/util/shimmer";

export function HeardleGuess({guess}: {guess?: sotdGuess}){
    if (!guess) return (
        <div className="w-full h-16 sm:h-24 border border-slate-700 rounded">

        </div>
    )
    else if (guess.track === null) return (
        <div className="flex w-full h-16 sm:h-24 border bg-slate-800 border-slate-700 rounded items-center p-3 space-x-3">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8.688c0-.864.933-1.405 1.683-.977l7.108 4.062a1.125 1.125 0 010 1.953l-7.108 4.062A1.125 1.125 0 013 16.81V8.688zM12.75 8.688c0-.864.933-1.405 1.683-.977l7.108 4.062a1.125 1.125 0 010 1.953l-7.108 4.062a1.125 1.125 0 01-1.683-.977V8.688z" />
            </svg>
            <div className="font-medium text-xl">
                {guess.skipped? "Skipped": "Synced from another device"}
            </div>
        </div>
    )
    else return (
        <div className={`h-16 sm:h-24 rounded ring ${guess.correct? "ring-green-500": "ring-red-600"} `}>
            <div className="h-full bg-slate-800 rounded p-2 transition-colors duration-300">
                <div className="flex space-x-3">
                    <Link href={`/albums/${guess.track.album.id}`} className="shrink flex h-12 w-12 sm:h-fit sm:w-fit my-auto">
                        <Image
                            title={guess.track.album.name}
                            placeholder="blur"
                            blurDataURL={`data:image/svg+xml;base64,${Buffer.from(shimmer(80, 80)).toString('base64')}`}
                            alt={guess.track.album.name + " Album Cover"} src={guess.track.album.images[0].url}
                            width="80"
                            height="80"
                            className="overflow-hidden rounded hover:brightness-90 transition-[filter] duration-300"
                        />
                    </Link>
                    <div className="flex flex-col min-w-0">
                        <div className="font-semibold text-lg truncate">
                            <Link href={`/albums/${guess.track.album.id}`} title={guess.track.name}>{guess.track.name}</Link>
                        </div>
                        <div className="font-italic text-xs">
                            {guess.track.artists.map((artist,index,array) => {
                                return (
                                    <span title={artist.name} key={artist.id}>
                                    <Link href={`/artists/${artist.id}`}><span className="hover:cursor-pointer hover:underline">{artist.name}</span></Link>{((array.length - index - 1) !== 0)? ', ': ''}
                            </span>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
