import type { NextApiRequest, NextApiResponse } from 'next'
import fetchPlaylist from "../../lib/util/fetchPlaylist";

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== "GET") return res.setHeader("Allow", "GET").status(405).send({error: "Method Not Allowed"})
    res.status(200).setHeader("Cache-Control","max-age=0, s-maxage=600").json(await fetchPlaylist())
}
