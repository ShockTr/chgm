import DefaultLayout from "../../components/layouts/DefaultLayout";
import {GetServerSideProps, InferGetServerSidePropsType} from "next";
import {DateTime} from "luxon";
import {getSotd, getSotdResponse} from "../../lib/getSotd";
import dynamic from 'next/dynamic'
import Head from "next/head";
import {getSeasonDates, seasonDateObject} from "../../lib/util/getSeasonDates";

const DynamicHeardleGame = dynamic(() => import('../../components/Heardle/game').then((mod) => mod.HeardleGame), {
    ssr: false,
})

const SongOfTheDay = ({ sotdData, seasons }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    return (
        <div className="flex-grow flex flex-col m-3 space-y-3 text-white">
            <Head>
                <title>Song of the day - CHGM</title>
            </Head>
            <div className="flex flex-grow justify-center self-center w-full h-full">
                <DynamicHeardleGame playlist={sotdData.playlist} sotd={sotdData} seasons={seasons} />
            </div>
            <div className="hidden sm:block fixed bottom-0 left-0 text-gray-500 text-[0.5rem]">
                {`Season: ${sotdData.currentSeason} | Snapshot id: ${sotdData.snapshot_id} | Date: ${DateTime.now().setZone("Asia/Seoul").setLocale("en-GB").toLocaleString({dateStyle: "long"})} Day: ${sotdData?.day}`}
            </div>
        </div>
    )
}

export const getServerSideProps: GetServerSideProps<{sotdData:getSotdResponse, seasons: seasonDateObject[]}> = async ({res}) => {
    const sotdData = await getSotd()
    const seasons = await getSeasonDates()
    res.setHeader(
        'Cache-Control',
        'public, s-maxage=600, stale-while-revalidate=59'
    )
    return {
        props: {
            sotdData,
            seasons
        }
    }
}
SongOfTheDay.getLayout = DefaultLayout
export default SongOfTheDay
