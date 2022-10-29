import DefaultLayout from "../../components/layouts/DefaultLayout";
import {GetStaticPaths, GetStaticProps} from "next";
import {cacheManager} from "../../lib/cache/fileCache";
import getAllArtists from "../../lib/util/spotify/getAllArtists";
import {Spotify} from "../../types/spotify";
import ArtistObjectFull = Spotify.ArtistObjectFull;

const Artists = ({artist}: {artist: ArtistObjectFull}) => {
    return (
        <div className="text-white text-2xl p-5">
            Artist page of: {artist.name}
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
    return {
        props: {
            artist
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
