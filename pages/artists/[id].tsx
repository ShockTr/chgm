import DefaultLayout from "../../components/layouts/DefaultLayout";
import {GetStaticPaths, GetStaticProps} from "next";
import {cacheManager} from "../../lib/cache/fileCache";
import fetchAllArtists from "../../lib/spotify/fetchAllArtists";
import {Spotify} from "../../types/spotify";
import ArtistObjectFull = Spotify.ArtistObjectFull;
import AlbumObjectSimplified = Spotify.AlbumObjectSimplified;
import TrackObjectFull = Spotify.TrackObjectFull;
import fetchArtistTopTracks from "../../lib/spotify/fetchArtistTopTracks";
import getAccessToken from "../../lib/spotify/getAccessToken";
import Image from 'next/legacy/image'
import shimmer from "../../lib/util/shimmer";
import fetchAllAlbums from "../../lib/spotify/fetchAllAlbums";
import {TrackList} from "../../components/TrackList"
import fetchPlaylist from "../../lib/spotify/fetchPlaylist";

const Artists = ({artist, albums, topTracks, chgmTracks}: {artist: ArtistObjectFull, albums: AlbumObjectSimplified[], topTracks:TrackObjectFull[], chgmTracks:TrackObjectFull[]}) => {
    return (
        <div className="flex-grow flex flex-col m-5 space-y-2">
            <ArtistHeader artist={artist}/>
            <TrackList tracks={topTracks} chgmTracks={chgmTracks}/>
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
    let allAlbums = cacheManager.getByID("albums")
    if(!allAlbums) {
        allAlbums = await fetchAllAlbums(token)
        cacheManager.setByID("albums", allAlbums)
    }
    let albums = allAlbums.filter(album => album.artists.find(art => art.id === artist?.id))
    let {tracks : topTracks} = artist ? await fetchArtistTopTracks(artist.id, token) : {tracks: null}
    let playlist = cacheManager.getByID("playlist")
    if (!playlist) {
        playlist = await fetchPlaylist()
        cacheManager.setByID("playlist", playlist)
    }
    let chgmTracks = playlist.tracks.items.map(item => item.track).filter(track => track?.artists.find(art => art.id === artist?.id))
    return {
        props: {
            artist,
            albums,
            topTracks,
            chgmTracks
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

export function ArtistHeader({artist}: {artist: ArtistObjectFull}) {
    return (
        <div className="flex p-3 h-72 space-x-10 items-center border-b border-slate-800 w-full">
            <div className="relative h-64 w-64">
                <Image alt={artist.name + " Photo"} src={artist.images[0]?.url} className="object-cover overflow-hidden rounded" layout="fill" placeholder="blur" blurDataURL={`data:image/svg+xml;base64,${Buffer.from(shimmer(80, 80)).toString('base64')}`} />
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
    )
}
