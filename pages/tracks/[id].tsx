import DefaultLayout from "../../components/layouts/DefaultLayout";
import {GetStaticPaths, GetStaticProps} from "next";
import fetchPlaylist from "../../lib/spotify/fetchPlaylist";
import {Spotify} from "../../types/spotify";
import SpotifyPlaylist = Spotify.PlaylistObjectFull
import {cacheManager} from "../../lib/cache/fileCache";
import Image from 'next/legacy/image'
import shimmer from "../../lib/util/shimmer";
import Link from 'next/link'

const Tracks = ({track}: {track: Spotify.TrackObjectFull}) => {
    return (
        <div className="sm:p-3 flex flex-grow">
            <div className="text-white bg-slate-800 shadow p-3 sm:items-center rounded flex flex-grow flex-col sm:flex-row">
                <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-5">
                    <Link className="relative max-w-md sm:max-w-lg md:max-w-xl lg:max-w-none mx-auto sm:mx-0" href={`/albums/${track.album.id}`}>
                        <Image title={track.album.name} placeholder="blur" className="overflow-hidden rounded hover:brightness-90 transition-[filter] duration-300" blurDataURL={`data:image/svg+xml;base64,${Buffer.from(shimmer(480, 480)).toString('base64')}`} alt={track.album.name + " Album Cover"} src={track.album.images[0].url} width={track.album.images[0].width} height={track.album.images[0].height}/>
                    </Link>
                    <div className="sm:self-end sm:flex sm:flex-col sm:space-y-5">
                        <div>
                            <Link href={`/albums/${track.album.id}`} title={track.name}>
                                {/*TODO:Marquee element before merging*/}
                                <div className="text-3xl sm:text-5xl xl:text-7xl font-bold sm:leading-snug hover:underline">
                                    {track.name}
                                </div>
                            </Link>
                        </div>
                        <div className="text-gray-400 font-bold xl:text-3xl">
                            {track.artists.map((artist,index,array) => {
                                return (
                                    <span title={artist.name} key={artist.id}>
                                    <Link href={`/artists/${artist.id}`}><span className="hover:underline">{artist.name}</span></Link>{((array.length - index - 1) !== 0)? ', ': ''}
                                </span>
                                )
                            })}
                        </div>
                    </div>
                </div>
                {/*TODO: ADD AUDIO PLAYER FOR THE PREVIEW AFTER FINISHING THE AUDIO COMPONENT FOR SOTDY PAGE*/}
            </div>
        </div>
    )
}
Tracks.getLayout = DefaultLayout
export const getStaticProps: GetStaticProps = async ({params}) => {
    //TODO: add support for non-chgm tracks of chgm artists.
    let playlist = cacheManager.getByID("playlist")
    if (!playlist) {
        playlist = await fetchPlaylist()
        cacheManager.setByID("playlist", playlist)
    }
    let track = playlist.tracks.items.find(({track}) => track?.id === params?.id)?.track
    return {
        props: {
           track
        }
    }
}

export const getStaticPaths: GetStaticPaths = async function () {
    const playlist: SpotifyPlaylist = await fetchPlaylist()
    cacheManager.setByID("playlist", playlist)
    let paths = playlist.tracks.items.map(({track}) => {
        return {
            params: {
                id: track?.id
            }
        }
    })
    return {
        paths,
        fallback: false
    }
}

export default Tracks
