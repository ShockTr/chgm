import {previousSotdGames, previousSotdGamesV2} from "../../types/sotd";
import {getSeasonDates} from "./getSeasonDates";
import {DateTime, Interval} from "luxon";

export async function transformV1previousGamesToV2(previous: previousSotdGames) : Promise<previousSotdGamesV2> {
    let seasonDates = await  getSeasonDates()
    let intervals = seasonDates.map((season) => {
        return Interval.fromDateTimes(DateTime.fromISO(season.startDate), DateTime.fromISO(season.endDate))
    })

    let final: previousSotdGamesV2 = {0: {}}
    seasonDates.forEach((season) => {
        final[season.season] = {}
    })

    for (let day of Object.keys(previous)) {
        let season = intervals.findIndex((interval) => {
            return interval.contains(DateTime.fromISO(day))
        }) + 1
        final[season][day] = previous[day]
    }
    return final
}
