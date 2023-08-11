import DefaultLayout from "../../components/layouts/DefaultLayout";
import {GetStaticPaths, GetStaticProps} from "next";
import fetchPlaylist from "../../lib/spotify/fetchPlaylist";
import {Spotify} from "../../types/spotify";
import {cacheManager} from "../../lib/cache/fileCache";
import Image from 'next/legacy/image'
import shimmer from "../../lib/util/shimmer";
import Link from 'next/link'
import {transformPlaylist} from "../../lib/util/transformPlaylist";
import {fetchAllTrackFeatures} from "../../lib/spotify/fetchAllTrackFeatures";
import getAccessToken from "../../lib/spotify/getAccessToken";
import SpotifyPlaylist = Spotify.PlaylistObjectFull;

const Tracks = ({track, features}: {track: Spotify.TrackObjectFull, features: Spotify.AudioFeaturesObject}) => {
    return (
        <div className="flex flex-grow p-3 flex-col items-center space-y-3 md:space-y-0 md:flex-row md:justify-between">
            <div className="flex flex-col space-y-3 md:space-y-0">
                <Link className="relative self-center md:self-auto max-w-md" href={`/albums/${track.album.id}`}>
                    <Image title={track.album.name} placeholder="blur" className="overflow-hidden rounded hover:brightness-90 transition-[filter] duration-300" blurDataURL={`data:image/svg+xml;base64,${Buffer.from(shimmer(480, 480)).toString('base64')}`} alt={track.album.name + " Album Cover"} src={track.album.images[0].url} width={track.album.images[0].width} height={track.album.images[0].height}/>
                </Link>
                <div className="self-center md:self-auto md:flex md:flex-col md:space-y-5">
                    <Link href={`/albums/${track.album.id}`} title={track.name} className="text-white">
                        <div className="text-3xl md:text-5xl font-bold sm:leading-snug hover:underline">
                            {track.name}
                        </div>
                    </Link>
                    <div className="text-gray-400 font-bold md:text-xl">
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
            <div className="flex flex-col p-3 max-w-2xl w-fit bg-slate-800 rounded h-fit max-h-[95%] space-y-3">
                <div className="text-3xl text-white text-center">Statistics</div>
                <div className="grid grid-cols-2 gap-y-3 gap-x-6 text-white">
                    <div>
                        Tempo: <Badge hue={getHueFromBPM(features.tempo)} colour={"red"}>{Math.round(features.tempo)} BPM</Badge>
                    </div>
                    <div>
                        Key: <Badge colour={"blue"}>{keys[features.key].join("/")} {(features.mode === 1)? "Major": "Minor"}</Badge>
                    </div>
                    <div>
                        Danceability: <Badge colour={"green"}>{Math.round(features.danceability * 100)}%</Badge>
                    </div>
                    <div>
                        Energy: <Badge colour={"yellow"}>{Math.round(features.energy * 100)}%</Badge>
                    </div>
                    <div>
                        Valence: <Badge colour={"purple"}>{Math.round(features.valence * 100)}%</Badge>
                    </div>
                    <div>
                        Duration: <Badge colour={"red"}>{Math.round(features.duration_ms / 1000)}s</Badge>
                    </div>
                    <div>
                        Acoustic: <Badge colour={"gray"}>{(features.acousticness >= 0.5)? "Yes": "No"}</Badge>
                    </div>
                    <div>
                        Instrumental: <Badge colour={"pink"}>{(features.instrumentalness >= 0.5)? "Yes": "No"}</Badge>
                    </div>
                </div>
            </div>
        </div>
    )
}
Tracks.getLayout = DefaultLayout

function getHueFromBPM(bpm: number) {
    let red = 160
    let green = 90
    if (bpm > red) return 0
    if (bpm < green) return 100
    return (red - bpm) / (red - green) * 100
}

const keys: Record<number, string[]> = {
    0: ["C"],
    1: ["C♯", "D♭"],
    2: ["D"],
    3: ["D♯", "E♭"],
    4: ["E"],
    5: ["F"],
    6: ["F♯", "G♭"],
    7: ["G"],
    8: ["G♯", "A♭"],
    9: ["A"],
    10: ["A♯", "B♭"],
    11: ["B"],
}

const colourVariants = {
    green: "bg-green-600 hover:bg-green-500",
    red: "bg-red-600 hover:bg-red-500",
    blue: "bg-blue-600 hover:bg-blue-500",
    yellow: "bg-yellow-600 hover:bg-yellow-500",
    gray: "bg-gray-600 hover:bg-gray-500",
    purple: "bg-purple-600 hover:bg-purple-500",
    pink: "bg-pink-600 hover:bg-pink-500",
}

export const Badge = ({children:text, colour, hue}: {children: any, colour: keyof typeof colourVariants, hue?:number}) => {
    return (
        <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium ${!hue? `${colourVariants[colour]} text-white`: "text-black"}`}
            {...( hue && {style: {backgroundColor: `hsl(${hue}, 100%, 50%)`}})}
        >
        {text}
    </span>
    )
}

export const getStaticProps: GetStaticProps = async ({params}) => {
    let tracks = cacheManager.getByID("tracks")
    if (!tracks) {
        const {access_token:token} = await getAccessToken()
        let playlist = cacheManager.getByID("playlist")
        if (!playlist) {
            playlist = await fetchPlaylist(token)
            cacheManager.setByID("playlist", playlist)
        }
        const transformed = transformPlaylist(playlist)
        const features = await fetchAllTrackFeatures(token)
        cacheManager.setByID("tracks", transformed.tracks.map((track) => {
            return {
                track: track,
                features: features.find(({id}) => id === track.id)
            }
        }))
    }
    let trackObject = tracks?.find(({track}) => track.id === params?.id)
    let track = trackObject?.track
    let features = trackObject?.features
    return {
        props: {
            track,
            features
        }
    }
}

export const getStaticPaths: GetStaticPaths = async function () {
    const {access_token:token} = await getAccessToken()
    const playlist: SpotifyPlaylist = await fetchPlaylist(token)
    const transformed = transformPlaylist(playlist)
    const features = await fetchAllTrackFeatures(token)
    cacheManager.setByID("tracks", transformed.tracks.map((track) => {
        return {
            track: track,
            features: features.find(({id}) => id === track.id)
        }
    }))
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
