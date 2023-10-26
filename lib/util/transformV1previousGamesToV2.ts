import {previousSotdGames, previousSotdGamesV2} from "../../types/sotd";
import {seasonDateObject} from "./getSeasonDates";
import {DateTime, Interval} from "luxon";

export function transformV1previousGamesToV2(seasons: seasonDateObject[] , previous: previousSotdGames) : previousSotdGamesV2 {
    let intervals = seasons.map((season) => {
        return Interval.fromDateTimes(DateTime.fromISO(season.startDate), DateTime.fromISO(season.endDate))
    })

    let final: previousSotdGamesV2 = {0: {}}
    seasons.forEach((season) => {
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
