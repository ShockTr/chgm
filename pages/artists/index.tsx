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
        <div className="p-3">
            <div className="text-white bg-slate-800 shadow p-3 rounded grid gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
                {artists.map((artist) => {
                    return (
                        artist ?
                            <div className="min-w-0" key={artist.id}>
                                <ArtistsGridItem artist={artist} />
                            </div> :
                            null
                    )
                }) }
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
        if (i >= 50) {
            idsToRequest = remainingIds.slice(0,49)
            remainingIds = remainingIds.slice(49)
        }
        else {
            idsToRequest = remainingIds.slice(0,i-1)
            remainingIds = remainingIds.slice(i-1)
        }
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
    //TODO: MAKE STYLES SIMILAR TO SPOTIFY LATEST SEARCH ARTIST CARDS
    return (
        <div className="bg-slate-700 hover:bg-slate-600 rounded p-2 transition-colors duration-300">
            <div className="flex space-x-3">
                <Link href={`albums/${artist.id}`} className="shrink-0 h-20 w-20 flex my-auto relative">
                    <Image title={artist.name} placeholder="blur" blurDataURL={`data:image/svg+xml;base64,${Buffer.from(shimmer(80, 80)).toString('base64')}`} alt={artist.name + " Photo"} src={artist.images[0]?.url} className="object-cover overflow-hidden rounded hover:brightness-90 transition-[filter] duration-300" fill={true}/>
                </Link>
                <div className="flex flex-col min-w-0">
                    <Link href={`albums/${artist.id}`} className="font-semibold text-lg truncate hover:underline">
                        <span title={artist.name}>{artist.name}</span>
                    </Link>
                </div>
            </div>
        </div>
    )
}
