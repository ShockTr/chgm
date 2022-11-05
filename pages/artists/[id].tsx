import DefaultLayout from "../../components/layouts/DefaultLayout";
import {GetStaticPaths, GetStaticProps} from "next";
import {cacheManager} from "../../lib/cache/fileCache";
import getAllArtists from "../../lib/spotify/getAllArtists";
import {Spotify} from "../../types/spotify";
import ArtistObjectFull = Spotify.ArtistObjectFull;
import AlbumObjectSimplified = Spotify.AlbumObjectSimplified;
import fetchArtistAlbums from "../../lib/spotify/fetchArtistAlbums";
import TrackObjectFull = Spotify.TrackObjectFull;
import fetchArtistTopTracks from "../../lib/spotify/fetchArtistTopTracks";
import getAccessToken from "../../lib/spotify/getAccessToken";

const Artists = ({artist, albums, topTracks}: {artist: ArtistObjectFull, albums: AlbumObjectSimplified[], topTracks:TrackObjectFull[]}) => {
    return (
        <div className="text-white p-5">
            <div className="text-2xl ">
                Artist page of: {artist.name}
            </div>
        </div>
    )
}
export const getStaticProps: GetStaticProps = async ({params}) => {
    let {access_token:token} = await getAccessToken()
    let artists = cacheManager.getByID("artists")
    if (!artists) {
        artists = await getAllArtists(token)
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
    const artists = await getAllArtists()
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
