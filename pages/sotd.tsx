import DefaultLayout from "../components/layouts/DefaultLayout";
import {GetServerSideProps, InferGetServerSidePropsType} from "next";
import {PlaylistData} from "../types/database";
import {revalidatePlaylist} from "../lib/util/revalidatePlaylist";
import {PlaylistObjectTransformed} from "../lib/util/transformPlaylist";
import useSWR from "swr";
import clientPromise from "../lib/mongodb";
import {sotdAPIResponse} from "../types/sotd";
import {DateTime} from "luxon";

const fetcher = (url: RequestInfo | URL) => fetch(url).then((res) => res.json());

const SongOfTheDay = ({ playlist }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    const { data, error } = useSWR<sotdAPIResponse>(
        "/api/sotd",
        fetcher
    );

    return (
        <div className="flex-grow flex flex-col m-5 space-y-3 text-white">







            <div className="fixed bottom-0 left-0 text-gray-400 text-[0.5rem]">
                {`Snapshot id: ${(data?.snapshot_id === playlist.snapshot_id)? playlist.snapshot_id: "❌ Snapshot id mismatch"} | Date: ${DateTime.now().setZone("Asia/Seoul").setLocale("en-GB").toLocaleString({dateStyle: "long"})} ${(data)? `Day: ${data?.day}`: ""}`}
            </div>
        </div>
    )
}

export const getServerSideProps: GetServerSideProps<{playlist: PlaylistObjectTransformed}> = async ({req, res}) => {
    let client = await clientPromise
    let Playlists = client.db("CHGM").collection<PlaylistData>("playlists")
    await Playlists.createIndex({snapshot_id: 1}, {unique: true})
    let {playlist} = await revalidatePlaylist(Playlists)


    res.setHeader(
        'Cache-Control',
        'public, s-maxage=300, stale-while-revalidate=59'
    )
    return {
        props: {
            playlist
        },
    }
}
SongOfTheDay.getLayout = DefaultLayout
export default SongOfTheDay
