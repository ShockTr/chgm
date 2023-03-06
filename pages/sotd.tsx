import DefaultLayout from "../components/layouts/DefaultLayout";
import {GetServerSideProps, InferGetServerSidePropsType} from "next";
import {PlaylistData} from "../types/database";
import {revalidatePlaylist} from "../lib/util/revalidatePlaylist";
import {PlaylistObjectTransformed} from "../lib/util/transformPlaylist";
import useSWR from "swr";
import clientPromise from "../lib/mongodb";
import {sotdAPIResponse, sotdGuess} from "../types/sotd";
import {DateTime} from "luxon";
import {TracksGridItem} from "./tracks";

const fetcher = (url: RequestInfo | URL) => fetch(url).then((res) => res.json());

const SongOfTheDay = ({ playlist }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    const { data, error } = useSWR<sotdAPIResponse>(
        "/api/sotd",
        fetcher
    );

    return (
        <div className="flex-grow flex flex-col m-3 space-y-3 text-white">
            <div className="flex flex-grow justify-center self-center w-full h-full">
                <HeardleGame playlist={playlist} sotd={data}/>
            </div>
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

export function HeardleGame({playlist, sotd}: {playlist: PlaylistObjectTransformed, sotd?: sotdAPIResponse}){
    const maxGuesses = 5

    return (
        <div className="flex flex-col items-center p-3 rounded space-y-3">
            <div className="flex flex-col space-y-3">
                <HeardleGuess guess={
                    sotd? {correct: true, track: sotd.track} : undefined
                }/>
                <HeardleGuess/>
                <HeardleGuess/>
                <HeardleGuess/>
                <HeardleGuess/>
            </div>
            <HeardleTypeBox playlist={playlist}/>
        </div>
    )
}

export function HeardleGuess({guess}: {guess?: sotdGuess}){
    if (!guess) return (
        <div className="w-96 h-24 border border-slate-700 rounded">

        </div>
    )
    else return (
        <div className={`h-24 rounded ring ${guess.correct? "ring-green-500": "ring-red-600"} `}>
            <TracksGridItem track={guess.track}/>
        </div>
    )
}
export function HeardleTypeBox({playlist}: {playlist:PlaylistObjectTransformed}){
    return (
        <input className="rounded bg-slate-700 w-full h-12 p-3" placeholder="Guess Here" type="text"/>
    )
}

export function HeardlePlayer() {

}

export function HeardleResultPane(){

}
