import DefaultLayout from "../../components/layouts/DefaultLayout";
import Image from 'next/image'
import {GetStaticProps} from "next";
import Link from "next/link";
import fetchPlaylist from "../../lib/util/spotify/fetchPlaylist";
import shimmer from "../../lib/util/shimmer";
import {Spotify} from "../../types/spotify";
import ArtistObjectSimplified = Spotify.ArtistObjectSimplified;
import ArtistObjectFull = Spotify.ArtistObjectFull;
import fetchArtists from "../../lib/util/spotify/fetchArtists";
import getAccessToken from "../../lib/util/spotify/getAccessToken";

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
                    }) }
                </div>
            </div>
        </div>
    )
}
Artists.getLayout = DefaultLayout

export const getStaticProps: GetStaticProps = async () => {
    const playlist = await fetchPlaylist()
    let token = await getAccessToken().then(r=>r.access_token)
    let artists_array = playlist.tracks.items.map(item => item.track?.artists).filter((e) => e !== undefined).flat(1) as ArtistObjectSimplified[]
    let uniqueIds = new Set<string>(artists_array.map(item => item.id))
    let remainingIds = [...uniqueIds]
    let finalObject: ArtistObjectFull[] = []
    for (let i = remainingIds.length; i > 0; i >= 50 ? i = i-50: i=0) {
        let idsToRequest:string[]
        idsToRequest = remainingIds.slice(0, i>=50?49:i-1)
        remainingIds = remainingIds.slice(i>=50?49:i-1)
        let result = await fetchArtists(idsToRequest, token)
        finalObject.push(...result)
    }
    return {
        props: {
            artists: finalObject
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
