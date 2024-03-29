import DefaultLayout from "../../components/layouts/DefaultLayout";
import {GetStaticPaths, GetStaticProps} from "next";
import getAccessToken from "../../lib/spotify/getAccessToken";
import {cacheManager} from "../../lib/cache/fileCache";
import fetchAllAlbums from "../../lib/spotify/fetchAllAlbums";
import fetchPlaylist from "../../lib/spotify/fetchPlaylist";
import {Spotify} from "../../types/spotify";
import AlbumObjectFull = Spotify.AlbumObjectFull;
import TrackObjectFull = Spotify.TrackObjectFull;
import Image from "next/legacy/image";
import shimmer from "../../lib/util/shimmer";
import Link from "next/link";
import {TrackList} from "../../components/TrackList"
import {FitText} from "../../components/FitText";
import {useEffect, useState} from "react";
import Head from "next/head";

const Albums = ({album, chgmTracks} : {album: AlbumObjectFull, chgmTracks: TrackObjectFull[]}) => {
    return (
        <div className="flex-grow flex flex-col m-3 sm:m-5 space-y-3">
            <Head>
                <title>{`${album.name} - CHGM`}</title>
            </Head>
            <AlbumHeader album={album}/>
            <TrackList tracks={album.tracks.items} chgmTracks={chgmTracks}/>

        </div>
    )
}

Albums.getLayout = DefaultLayout
export default Albums

export const getStaticProps: GetStaticProps = async ({params}) => {
    let {access_token:token} = await getAccessToken()
    let allAlbums = cacheManager.getByID("albums")
    if(!allAlbums) {
        allAlbums = await fetchAllAlbums(token)
        cacheManager.setByID("albums", allAlbums)
    }
    let album = allAlbums.find(album => album.id === params?.id)
    let playlist = cacheManager.getByID("playlist")
    if (!playlist) {
        playlist = await fetchPlaylist()
        cacheManager.setByID("playlist", playlist)
    }
    let chgmTracks = playlist.tracks.items.map(item => item.track).filter(track => track?.album.id === album?.id)
    return {
        props: {
            album,
            chgmTracks
        },
        revalidate: 24 * 60 * 60
    }
}

export const getStaticPaths: GetStaticPaths = async function () {
    const albums = await fetchAllAlbums()
    cacheManager.setByID("albums", albums)
    let paths = albums.map((album) => {
        return {
            params: {
                id: album.id
            }
        }
    })
    return {
        paths,
        fallback: false
    }
}

export function AlbumHeader({album}: {album: AlbumObjectFull}) {
    const [width, setWidth] = useState(0)
    useEffect(() => {
        setWidth(window.screen.width)
        window.addEventListener('resize', (() => {
            setWidth(window.screen.width)
        }))
    }, [])

    return (
        <div className="flex flex-col sm:flex-row sm:p-3 sm:h-72 sm:space-x-10 space-y-3 md:my-0 items-center border-b border-slate-800 w-full">
            <div className="relative shrink-0 h-64 w-64">
                <Image alt={album.name + " Photo"} src={album.images[0]?.url} className="object-cover overflow-hidden rounded" layout="fill" placeholder="blur" blurDataURL={`data:image/svg+xml;base64,${Buffer.from(shimmer(80, 80)).toString('base64')}`} quality="100"/>
            </div>
            <div className="flex min-w-0 w-full flex-col relative">
                <div title={album.name} className="text-white w-full font-bold my-auto sm:whitespace-nowrap overflow-hidden">
                    {
                        (width >= 640)?
                            <FitText minFontSize="30" maxFontSize="96" multiLine={true}>
                                {album.name}
                            </FitText>
                        :
                            <div className="text-3xl">
                                {album.name}
                            </div>
                    }

                </div>
                <div className="text-white mb-2 sm:mb-0 mt-5 font-semibold flex space-x-3">
                    <div>
                        {album.artists.map((artist,index,array) => {
                            if (artist.id === "0LyfQWJT6nXafLPZqxe9Of") return (<span title={artist.name} key={artist.id}>{artist.name}</span>)
                            return (
                                <span title={artist.name} key={artist.id}>
                                    <Link href={`/artists/${artist.id}`}><span className="hover:underline">{artist.name}</span></Link>{((array.length - index - 1) !== 0)? ', ': ''}
                                </span>
                            )
                        })}
                    </div>
                    <div className="text-gray-400">
                        {new Intl.DateTimeFormat('en-gb', {year: "numeric", day: "numeric", month: "long"}).format(new Date(album.release_date))}
                    </div>
                </div>
            </div>
        </div>
    )
}
