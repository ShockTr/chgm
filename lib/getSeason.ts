import clientPromise from "./mongodb";
import {SeasonData} from "../types/database";

export default async function getSeason(season: number) {
    const client = await clientPromise
    const Seasons = client.db(process.env.DBNAME).collection<SeasonData>("seasons")
    await Seasons.createIndex({currentSeason: 1}, {unique: true})
    if (season < 1) return new Error("Season number should be above 1")
    const result = await Seasons.findOne({currentSeason: season})
    if (result) return result
    else return new Error("Season not found")
}
