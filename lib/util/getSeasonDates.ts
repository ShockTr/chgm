import clientPromise from "../mongodb";
import {SeasonData} from "../../types/database";

export async function getSeasonDates() {
    const client = await clientPromise
    const Seasons = client.db(process.env.DBNAME).collection<SeasonData>("seasons")
    await Seasons.createIndex({currentSeason: 1}, {unique: true})

    const seasonDates = await Seasons.aggregate([
        {
            $group: {
                _id: '$_id',
                season: {
                    $first: '$currentSeason'
                },
                startDate: {
                    $first: '$startDate'
                },
                endDate: {
                    $first: {
                        $dateToString: {
                            date: {
                                $dateAdd: {
                                    startDate: {
                                        $toDate: '$startDate'
                                    },
                                    unit: 'day',
                                    amount: {
                                        $size: {
                                            $last: '$sotds.games'
                                        }
                                    }
                                }
                            },
                            format: '%Y-%m-%d'
                        }
                    }
                },
                gameCount: {
                    $first: {
                        $size: {
                            $last: '$sotds.games'
                        }
                    }
                }
            }
        },
        {
            $unset: "_id"
        }
    ]).toArray() as seasonDateObject[]

    return seasonDates
}
export interface seasonDateObject {
    season: number,
    startDate: string,
    endDate: string,
    gameCount: number
}
