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
import {AlbumsGridItem} from "../albums";
import {FitText} from "../../components/FitText";
import {useEffect, useState} from "react";
import Head from "next/head";

const Artists = ({artist, albums, topTracks, chgmTracks}: {artist: ArtistObjectFull, albums: AlbumObjectSimplified[], topTracks:TrackObjectFull[], chgmTracks:TrackObjectFull[]}) => {
    return (
        <div className="flex-grow flex flex-col m-5 space-y-3">
            <Head>
                <title>{`${artist.name} - CHGM`}</title>
            </Head>
            <ArtistHeader artist={artist}/>
            <Header id="popular">
                Popular Tracks
            </Header>
            <TrackList tracks={topTracks} chgmTracks={chgmTracks}/>
            <div className="pt-10">
                <Header id="discography">
                    CHGM Discography
                </Header>
            </div>
            <div className="flex-grow flex">
                <div className="text-white grid gap-5 sm:grid-cols-[repeat(auto-fit,_minmax(16rem,_1fr))] flex-grow">
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
    let {tracks : topTracks} = artist ? await fetchArtistTopTracks(artist.id, token) : {tracks: null}
    let playlist = cacheManager.getByID("playlist")
    if (!playlist) {
        playlist = await fetchPlaylist()
        cacheManager.setByID("playlist", playlist)
    }
    let chgmTracks = playlist.tracks.items.map(item => item.track).filter(track => track?.artists.find(art => art.id === artist?.id))
    let albums = allAlbums.filter(album => ((album.artists.find(art => art.id === artist?.id)) || album.tracks.items.find(track => chgmTracks.find(trck => trck?.id === track.id))))
    return {
        props: {
            artist,
            albums,
            topTracks,
            chgmTracks
        },
        revalidate: 24 * 60 * 60
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
    const [width, setWidth] = useState(0)
    useEffect(() => {
        setWidth(window.screen.width)
        window.addEventListener('resize', (() => {
            setWidth(window.screen.width)
        }))
    }, [])

    return (
        <div className="flex flex-col sm:flex-row sm:p-3 sm:h-72 sm:space-x-10 space-y-3 md:my-0 items-center border-b border-slate-800 w-full">
            {
                !!(artist.images[0])?
                    <div className="relative shrink-0 h-64 w-64">
                        <Image alt={artist.name + " Photo"} src={artist.images[0]?.url} className="object-cover overflow-hidden rounded" layout="fill" placeholder="blur" blurDataURL={`data:image/svg+xml;base64,${Buffer.from(shimmer(80, 80)).toString('base64')}`} quality="100"/>
                    </div>
                    : null
            }
            <div className="flex min-w-0 w-full flex-col relative">
                <div title={artist.name} className="text-white w-full font-bold my-auto sm:whitespace-nowrap overflow-hidden">
                    {
                        (width >= 640)?
                            <FitText minFontSize="30" maxFontSize="96" multiLine={true}>
                                {artist.name}
                            </FitText>
                            :
                            <div className="text-3xl">
                                {artist.name}
                            </div>
                    }

                </div>
                <div className="text-white mb-2 sm:mb-0 mt-5 font-semibold">
                    <div>
                        Followers: {new Intl.NumberFormat('en-gb', {notation: "compact"}).format(artist.followers.total)}
                    </div>
                </div>
            </div>
        </div>
    )
}
export function Header({children, id} : {children:string, id?:string}) {
    return (
        <div id={id} className="text-white text-2xl font-bold">
            {children}
        </div>
    )
}
