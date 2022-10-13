import DefaultLayout from "../../components/layouts/DefaultLayout";
import Image from 'next/image'
import {GetStaticProps} from "next";
import Link from "next/link";
import {Spotify} from "../../types/spotify";
import SpotifyPlaylist = Spotify.SpotifyPlaylist;
import fetchPlaylist from "../../lib/util/fetchPlaylist";

const Tracks = ({ playlist }: {playlist: SpotifyPlaylist}) => {
    return (
        <div className="p-3">
            <div className="text-white bg-slate-700/60 shadow p-3 rounded grid gap-5 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 ">
                {(playlist).tracks.items.map(({track}) => { //IDK WHY THE HELL THAT MY IDE YELLS AT ME SO I FORCEFULLY CASTED TYPES
                    return (
                        <div key={track.id}>
                            <TracksGridItem track={track} />
                        </div>
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

export function TracksGridItem({track}: {track: Spotify.Track}) {
    return (
        <Link href={`/tracks/${track.id}`}>
            <div className="bg-slate-600/75 hover:bg-slate-500/75 rounded flex p-2 space-x-3 transition-colors duration-300 hover:cursor-pointer">
                <div className="shrink-0 flex h-fit w-fit my-auto">
                    <Link href={`albums/${track.album.id}`}>
                        <Image alt={track.album.name + " Album Cover"} src={track.album.images[0].url} width="80" height="80" className="overflow-hidden rounded hover:brightness-90 transition-[filter] duration-300"/>
                    </Link>
                </div>
                <div className="flex flex-col min-w-0 hover:min-w-fit hover:z-40">
                    <div className="font-semibold text-lg md:truncate hover:text-clip">
                        {track.name}
                    </div>
                    <div className="font-italic text-xs">
                        by {track.artists.map((artist,index,array) => {
                            return (
                                <span key={artist.id}>
                                    <Link href={`/artists/${artist.id}`}><span className="hover:cursor-pointer hover:underline">{artist.name}</span></Link>{((array.length - index - 1) !== 0)? ', ': ''}
                                </span>
                            )
                        })}
                    </div>
                </div>
            </div>
        </Link>
    )
}
