import type { NextApiRequest, NextApiResponse } from 'next'
import {PartialBy, sotdAPIResponse} from "../../types/sotd";
import {getSotd, getSotdResponse} from "../../lib/getSotd";

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse<sotdAPIResponse | string>) => {
    if (req.method !== "GET") return res.setHeader("Allow", "GET").status(405).send("Method Not Allowed")
    let data = await getSotd() as PartialBy<getSotdResponse, "playlist">
    res.setHeader("Cache-Control", "s-maxage=300")
    delete data.playlist
    res.send(data)
}
