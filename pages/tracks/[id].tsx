import DefaultLayout from "../../components/layouts/DefaultLayout";
import {GetStaticPaths, GetStaticProps} from "next";
import fetchPlaylist from "../../lib/util/fetchPlaylist";
import {Spotify} from "../../types/spotify";
import SpotifyPlaylist = Spotify.SpotifyPlaylist;
import {cacheManager} from "../../lib/cache/fileCache";

const Tracks = ({track}: {track: Spotify.Track}) => {
    return (
        <div className="text-white text-2xl p-5">
            Track page of: {track.name}
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
    let track = playlist.tracks.items.find(({track}) => track.id === params?.id)?.track
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
                id: track.id
            }
        }
    })
    return {
        paths,
        fallback: false
    }
}

export default Tracks
