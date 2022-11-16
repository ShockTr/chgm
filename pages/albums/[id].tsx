import DefaultLayout from "../../components/layouts/DefaultLayout";
import {GetStaticPaths, GetStaticProps} from "next";
import getAccessToken from "../../lib/spotify/getAccessToken";
import {cacheManager} from "../../lib/cache/fileCache";
import fetchAllAlbums from "../../lib/spotify/fetchAllAlbums";
import fetchPlaylist from "../../lib/spotify/fetchPlaylist";
import {Spotify} from "../../types/spotify";
import AlbumObjectFull = Spotify.AlbumObjectFull;
import TrackObjectFull = Spotify.TrackObjectFull;

const Albums = ({album, chgmTracks} : {album: AlbumObjectFull, chgmTracks: TrackObjectFull[]}) => {
    return (
        <div className="text-white text-2xl p-5">
            Album page of: {album.name}
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
        }
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
