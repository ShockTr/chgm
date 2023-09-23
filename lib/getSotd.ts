import {sotdAPIResponse} from "../types/sotd";
import {DateTime} from "luxon";
import {PlaylistObjectTransformed} from "./util/transformPlaylist";
import {getSeason} from "./getSeason";

export interface getSotdResponse extends sotdAPIResponse {
    playlist: PlaylistObjectTransformed
}
export async function getSotd(): Promise<getSotdResponse>{
    const today = DateTime.now().setZone("Asia/Seoul")

    const {seasonData: currentSeason, playlist} = await getSeason(true)
    const sotd = currentSeason.sotds[currentSeason.sotds.length - 1]

    const startDate = DateTime.fromISO(currentSeason.startDate, {zone: "Asia/Seoul"})
    const diff = Math.floor(today.diff(startDate, 'days').toObject().days ?? 0)
    const game = sotd.games[diff]
    if (game === undefined) {
        throw Error("Today's game is undefined")
    }
    return {...game, snapshot_id: currentSeason.latestSnapshot, day: diff, playlist: playlist, currentSeason: currentSeason.currentSeason}
}
