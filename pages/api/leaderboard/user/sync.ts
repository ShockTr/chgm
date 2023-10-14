import {NextApiRequest, NextApiResponse} from "next";
import {previousSotdGamesV2} from "../../../../types/sotd";
import {getServerSession, Session} from "next-auth";
import {authOptions} from "../../auth/[...nextauth]";
import clientPromise from "../../../../lib/mongodb";
import {userData} from "../../../../types/database";
import {Collection} from "mongodb";
import {getSeasonDates} from "../../../../lib/util/getSeasonDates";
import {DateTime, Interval} from "luxon";

export default async function sync(req: NextApiRequest, res: NextApiResponse){
    if (!((req.method === "GET") || (req.method === "POST"))) return res.setHeader("Allow", "GET, POST").status(405).send({error: "Method Not Allowed"})
    const session = await getServerSession(req, res, authOptions)
    if (!session) return res.status(401).send("Unauthenticated")
    const client = await clientPromise
    const Users = client.db(process.env.DBNAME).collection<userData>("users")
    await Users.createIndex({user: 1}, {unique: true})


    if (req.method === "POST") {
        const data = previousSotdGamesV2.safeParse(req.body)
        if (!data.success) return res.status(400).send(data)
        const dates = await getSeasonDates()
        const seasonNumbers = [0, ...dates.map((date) => date.season)]
        const oldPrevious = await getPreviousGames(Users, session).then((prev) => prev?.games ?? {})

        let newPrevious : previousSotdGamesV2 = Object.assign({}, oldPrevious)
        // Populates newPrevious
        for (let season of Object.keys(data.data)) {
            const seasonNumber = Number(season);
            if (!seasonNumbers.includes(seasonNumber)) break
            const seasonDates = dates.find((date) => date.season === seasonNumber)
            const duration: Interval = Interval.fromDateTimes(
                DateTime.fromISO(seasonDates?.startDate ?? "", {zone: "Asia/Seoul"}),
                DateTime.fromISO(seasonDates?.endDate ?? "", {zone: "Asia/Seoul"})
            )

            for (let day of Object.keys(data.data[seasonNumber])) {
                if (Object.keys(oldPrevious[seasonNumber] ?? {}).includes(day)) break
                const date = DateTime.fromISO(day, {zone: "Asia/Seoul"})
                const now = DateTime.now()

                if (( (seasonNumber !== 0  && duration.contains(date)) || seasonNumber === 0) && date < now) newPrevious[seasonNumber] = {
                    ...newPrevious[seasonNumber],
                    [day]: data.data[seasonNumber][day]
                }
            }
        }
        let updateRes = await Users.findOneAndUpdate({
            userID: {
                $eq: session.user?.id
            }
        }, {
            $set: {
                games: newPrevious
            }
        }, {
            upsert: true,
            returnDocument: "after",
            projection: {
                _id: 0
            }
        })
        if (updateRes.ok) res.status(201).send(updateRes.value)
        else res.status(500).send(500)
    }
    else if (req.method === "GET") {
        const oldPrevious = await getPreviousGames(Users, session) ?? {}
        res.status(200).send(oldPrevious)
    }
}

async function getPreviousGames(collection: Collection<userData>, session: Session) {
    return await collection.findOne({
            userID: {
                $eq: session.user?.id
            }
        },
        {
            projection: {
                _id: 0
            }
        }
    )
}
