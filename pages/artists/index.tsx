import DefaultLayout from "../../components/layouts/DefaultLayout";
import Image from 'next/image'
import {GetStaticProps} from "next";
import Link from "next/link";
import shimmer from "../../lib/util/shimmer";
import {Spotify} from "../../types/spotify";
import ArtistObjectFull = Spotify.ArtistObjectFull;
import getAllArtists from "../../lib/util/spotify/getAllArtists";

const Artists = ({ artists }: {artists: ArtistObjectFull[]}) => {
    return (
        <div className="p-3 flex-grow flex">
            <div className="bg-slate-800 shadow rounded flex-grow">
                <div className="text-white p-3 grid gap-5 grid-cols-[repeat(auto-fit,_minmax(11rem,_1fr))]">
                    {artists.map((artist) => {
                        return (
                            artist ?
                                <div key={artist.id}>
                                    <ArtistsGridItem artist={artist} />
                                </div> :
                                null
                        )
                    })}
                </div>
            </div>
        </div>
    )
}
Artists.getLayout = DefaultLayout

export const getStaticProps: GetStaticProps = async () => {
    let artists = await getAllArtists()
    return {
        props: {
            artists
        }
    }
}


export default Artists

export function ArtistsGridItem({artist}: {artist: Spotify.ArtistObjectFull}) {
    return (
        <div title={artist.name} className="bg-slate-700 hover:bg-slate-600 rounded min-w-44 transition-colors duration-300">
            <Link href={`/artists/${artist.id}`} className="flex flex-col p-3 items-center">
                <div className="space-y-3">
                    <div className="shrink-0 w-40 h-40 flex relative" >
                        <Image placeholder="blur" blurDataURL={`data:image/svg+xml;base64,${Buffer.from(shimmer(80, 80)).toString('base64')}`} alt={artist.name + " Photo"} src={artist.images[0]?.url} className="object-cover overflow-hidden rounded" fill/>
                    </div>
                    <div className="font-semibold text-lg truncate">
                        {artist.name}
                    </div>
                </div>
            </Link>
        </div>
    )
}
