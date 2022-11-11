import DefaultLayout from "../../components/layouts/DefaultLayout";
import {GetStaticPaths, GetStaticProps} from "next";
import {cacheManager} from "../../lib/cache/fileCache";
import fetchAllArtists from "../../lib/spotify/fetchAllArtists";
import {Spotify} from "../../types/spotify";
import ArtistObjectFull = Spotify.ArtistObjectFull;
import AlbumObjectSimplified = Spotify.AlbumObjectSimplified;
import fetchArtistAlbums from "../../lib/spotify/fetchArtistAlbums";
import TrackObjectFull = Spotify.TrackObjectFull;
import fetchArtistTopTracks from "../../lib/spotify/fetchArtistTopTracks";
import getAccessToken from "../../lib/spotify/getAccessToken";
import Image from 'next/legacy/image'
import shimmer from "../../lib/util/shimmer";

const Artists = ({artist, albums, topTracks}: {artist: ArtistObjectFull, albums: AlbumObjectSimplified[], topTracks:TrackObjectFull[]}) => {
    return (
        <div className="flex-grow flex">
            <div className="flex p-3 m-5 h-72 space-x-10 items-center border-b border-slate-800 w-full">
                <div className="relative h-64 w-64">
                    <Image placeholder="blur" blurDataURL={`data:image/svg+xml;base64,${Buffer.from(shimmer(80, 80)).toString('base64')}`} alt={artist.name + " Photo"} src={artist.images[0]?.url} className="object-cover overflow-hidden rounded" layout="fill"/>
                </div>
                <div className="flex flex-col relative">
                    <div className="text-white text-8xl font-bold my-auto">
                        {artist.name}
                    </div>
                    <div className="text-white mt-5 font-semibold">
                        <div>
                            Followers: {new Intl.NumberFormat('en-gb', {notation: "compact"}).format(artist.followers.total)}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export const getStaticProps: GetStaticProps = async ({params}) => {
    let {access_token:token} = await getAccessToken()
    let artists = cacheManager.getByID("artists")
    if (!artists) {
        artists = await fetchAllArtists(token)
        cacheManager.setByID("artists", artists)
    }
    let artist = artists.find((artist) => artist.id === params?.id)
    let albums = artist ? await fetchArtistAlbums(artist.id, ["album", "single", "compilation"], token) : null
    let topTracks = artist ? await fetchArtistTopTracks(artist.id, token) : null
    return {
        props: {
            artist,
            albums,
            topTracks
        }
    }
}

export const getStaticPaths: GetStaticPaths = async function () {
    const artists = await fetchAllArtists()
    cacheManager.setByID("artists", artists)
    let paths = artists.map((artist) => {
        return {
            params: {
                id: artist.id
            }
        }
    })
    return {
        paths,
        fallback: false
    }
}

Artists.getLayout = DefaultLayout
export default Artists
