import DefaultLayout from "../components/layouts/DefaultLayout";
import {GetServerSideProps, InferGetServerSidePropsType} from "next";
import {PlaylistData} from "../types/database";
import clientPromise from "../lib/mongodb";
import {DateTime} from "luxon";
import {getSotd, getSotdResponse} from "../lib/getSotd";
import dynamic from 'next/dynamic'

const DynamicHeardleGame = dynamic(() => import('../components/Heardle/game').then((mod) => mod.HeardleGame), {
    ssr: false,
})

const SongOfTheDay = ({ sotdData }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    return (
        <div className="flex-grow flex flex-col m-3 space-y-3 text-white">
            <div className="flex flex-grow justify-center self-center w-full h-full">
                <DynamicHeardleGame playlist={sotdData.playlist} sotd={sotdData}/>
            </div>
            <div className="hidden sm:block fixed bottom-0 left-0 text-gray-500 text-[0.5rem]">
                {`Snapshot id: ${sotdData.snapshot_id} | Date: ${DateTime.now().setZone("Asia/Seoul").setLocale("en-GB").toLocaleString({dateStyle: "long"})} Day: ${sotdData?.day}`}
            </div>
        </div>
    )
}

export const getServerSideProps: GetServerSideProps<{sotdData:getSotdResponse}> = async ({res}) => {
    let client = await clientPromise
    let Playlists = client.db("CHGM").collection<PlaylistData>("playlists")
    await Playlists.createIndex({snapshot_id: 1}, {unique: true})
    const sotdData = await getSotd()
    res.setHeader(
        'Cache-Control',
        'public, s-maxage=300, stale-while-revalidate=59'
    )
    return {
        props: {
            sotdData
        },
    }
}
SongOfTheDay.getLayout = DefaultLayout
export default SongOfTheDay
