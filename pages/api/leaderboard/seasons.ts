import {NextApiRequest, NextApiResponse} from "next";
import {getSeasonDates} from "../../../lib/util/getSeasonDates";


export default async function seasons(req: NextApiRequest, res: NextApiResponse){
    if (req.method !== "GET") return res.setHeader("Allow", "GET").status(405).send({error: "Method Not Allowed"})
    let dates = await getSeasonDates()
    return res.status(200).send(dates)
}
