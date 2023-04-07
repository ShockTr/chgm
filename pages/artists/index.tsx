import DefaultLayout from "../../components/layouts/DefaultLayout";
import Image from 'next/legacy/image'
import {GetStaticProps} from "next";
import Link from "next/link";
import shimmer from "../../lib/util/shimmer";
import {Spotify} from "../../types/spotify";
import ArtistObjectFull = Spotify.ArtistObjectFull;
import fetchAllArtists from "../../lib/spotify/fetchAllArtists";
import Head from "next/head";

const Artists = ({ artists }: {artists: ArtistObjectFull[]}) => {
    return (
        <div className="p-3 flex-grow flex">
            <Head>
                <title>Artists - CHGM</title>
            </Head>
            <div className="shadow rounded flex-grow">
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
    let artists = await fetchAllArtists()
    return {
        props: {
            artists
        },
        revalidate: 24 * 60 * 60
    }
}


export default Artists

export function ArtistsGridItem({artist}: {artist: Spotify.ArtistObjectFull}) {
    return (
        <div title={artist.name} className="bg-slate-800 hover:bg-slate-700 rounded min-w-44 h-60 transition-colors duration-300 group">
            <Link href={`/artists/${artist.id}`} className="flex flex-col p-3">
                <div className="space-y-3">
                    <div className="shrink-0 w-40 h-40 flex relative mx-auto">
                        {
                            !!(artist.images[0]?.url)?
                                <Image src={artist.images[0]?.url} className="object-cover overflow-hidden rounded transition-[filter] duration-300" layout="fill" placeholder="blur" blurDataURL={`data:image/svg+xml;base64,${Buffer.from(shimmer(80, 80)).toString('base64')}`} alt={artist.name + " Photo"} />
                                :
                                <div className="flex bg-slate-700 group-hover:bg-slate-600 w-full h-full rounded shadow-inner justify-center items-center transition-colors duration-300">
                                    🙏🐎👧🎵
                                </div>
                        }
                    </div>
                    <div className="font-semibold text-lg truncate">
                        {artist.name}
                    </div>
                </div>
            </Link>
        </div>
    )
}
