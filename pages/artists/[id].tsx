import DefaultLayout from "../../components/layouts/DefaultLayout";
import {GetStaticPaths, GetStaticProps} from "next";
import {cacheManager} from "../../lib/cache/fileCache";
import getAllArtists from "../../lib/spotify/getAllArtists";
import {Spotify} from "../../types/spotify";
import ArtistObjectFull = Spotify.ArtistObjectFull;
import AlbumObjectSimplified = Spotify.AlbumObjectSimplified;
import fetchArtistAlbums from "../../lib/spotify/fetchArtistAlbums";

const Artists = ({artist, albums}: {artist: ArtistObjectFull, albums: AlbumObjectSimplified[]}) => {
    return (
        <div className="text-white p-5">
            <div className="text-2xl ">
                Artist page of: {artist.name}
            </div>
        </div>
    )
}
export const getStaticProps: GetStaticProps = async ({params}) => {
    let artists = cacheManager.getByID("artists")
    if (!artists) {
        artists = await getAllArtists()
        cacheManager.setByID("artists", artists)
    }
    let artist = artists.find((artist) => artist.id === params?.id)
    let albums = artist ? await fetchArtistAlbums(artist.id, ["album", "single", "compilation"]) : null
    return {
        props: {
            artist,
            albums
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
