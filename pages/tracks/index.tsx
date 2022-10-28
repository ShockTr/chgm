import DefaultLayout from "../../components/layouts/DefaultLayout";
import Image from 'next/image'
import {GetStaticProps} from "next";
import Link from "next/link";
import {Spotify} from "../../types/spotify";
import SpotifyPlaylist = Spotify.PlaylistObjectFull;
import fetchPlaylist from "../../lib/util/fetchPlaylist";
import shimmer from "../../lib/util/shimmer";

const Tracks = ({ playlist }: {playlist: SpotifyPlaylist}) => {
    return (
        <div className="p-3">
            <div className="text-white bg-slate-800 shadow p-3 rounded grid gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
                {(playlist).tracks.items.map(({track}) => { //IDK WHY THE HELL THAT MY IDE YELLS AT ME SO I FORCEFULLY CASTED TYPES
                    return (
                        track ?
                        <div className="min-w-0" key={track.id}>
                            <TracksGridItem track={track} />
                        </div> :
                        <></>
                    )
                }) }
            </div>
        </div>
    )
}
Tracks.getLayout = DefaultLayout

export const getStaticProps: GetStaticProps = async () => {
    const playlist: SpotifyPlaylist = await fetchPlaylist()

    return {
        props: {
            playlist,
        }
    }
}


export default Tracks

export function TracksGridItem({track}: {track: Spotify.TrackObjectFull}) {
    return (
        <div className="bg-slate-700 hover:bg-slate-600 rounded p-2 transition-colors duration-300">
            <div className="flex space-x-3">
                <Link href={`albums/${track.album.id}`} className="shrink-0 flex h-fit w-fit my-auto">
                    <Image title={track.album.name} placeholder="blur" blurDataURL={`data:image/svg+xml;base64,${Buffer.from(shimmer(80, 80)).toString('base64')}`} alt={track.album.name + " Album Cover"} src={track.album.images[0].url} width="80" height="80" className="overflow-hidden rounded hover:brightness-90 transition-[filter] duration-300"/>
                </Link>
                <div className="flex flex-col min-w-0">
                    <Link href={`tracks/${track.id}`} className="font-semibold text-lg truncate hover:underline">
                        <span title={track.name}>{track.name}</span>
                    </Link>
                    <div className="font-italic text-xs">
                        by {track.artists.map((artist,index,array) => {
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
    )
}
