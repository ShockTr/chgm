import DefaultLayout from "../../components/layouts/DefaultLayout";
import Image from 'next/legacy/image'
import {GetStaticProps} from "next";
import Link from "next/link";
import fetchPlaylist from "../../lib/spotify/fetchPlaylist";
import shimmer from "../../lib/util/shimmer";
import {Spotify} from "../../types/spotify";
import AlbumObjectSimplified = Spotify.AlbumObjectSimplified;

const Albums = ({ albums }: {albums: AlbumObjectSimplified[]}) => {
    return (
        <div className="p-3 flex-grow flex">
            <div className="bg-slate-800 shadow rounded flex-grow">
                <div className="text-white p-3 grid gap-5 sm:grid-cols-[repeat(auto-fit,_minmax(16rem,_1fr))]">
                    {albums.map((album) => {
                        return (
                            album ?
                                <div className="min-w-0" key={album.id}>
                                    <AlbumsGridItem album={album} />
                                </div> :
                                null
                        )
                    })}
                </div>
            </div>
        </div>
    )
}
Albums.getLayout = DefaultLayout

export const getStaticProps: GetStaticProps = async () => {
    const playlist = await fetchPlaylist()
    let albums_array = playlist.tracks.items.map((item) => item.track?.album).filter((e) => e !== undefined) as AlbumObjectSimplified[]
    let uniqueIds = new Set<string>(albums_array.map(item => item.id))

    return {
        props: {
            albums: [...uniqueIds].map(id => albums_array.find((item) => item.id === id))
        }
    }
}


export default Albums

export function AlbumsGridItem({album}: {album: Spotify.AlbumObjectSimplified}) {
    return (
        <div className="bg-slate-700 hover:bg-slate-600 rounded p-2 transition-colors duration-300">
            <div className="flex space-x-3">
                <Link href={`/albums/${album.id}`} className="shrink-0 flex h-fit w-fit my-auto">
                    <Image title={album.name} placeholder="blur" blurDataURL={`data:image/svg+xml;base64,${Buffer.from(shimmer(80, 80)).toString('base64')}`} alt={ album.name + " Album Cover"} src={album.images[0].url} width="80" height="80" className="overflow-hidden rounded hover:brightness-90 transition-[filter] duration-300"/>
                </Link>
                <div className="flex flex-col min-w-0">
                    <Link href={`/albums/${album.id}`} className="font-semibold text-lg truncate hover:underline">
                        <span title={album.name}>{album.name}</span>
                    </Link>
                    <div className="font-italic text-xs">
                        by {album.artists.map((artist,index,array) => {
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
