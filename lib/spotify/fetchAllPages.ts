import {Spotify} from "../../types/spotify";
import PagingObject = Spotify.PagingObject;
import getAccessToken from "./getAccessToken";

/**
 * @param firstPage First page of the paginated request.
 * @param token Provide a token to skip built-in token requester.
 */
export default async function fetchAllPages<T> (firstPage: PagingObject<T>, token?:string) : Promise<T[]> {
    let realToken = token ?? await getAccessToken().then(r => r.access_token)
    let current = firstPage
    let final = current.items
    while (current.next) {
        let next = await fetch(current.next, {headers: {Authorization: `Bearer ${realToken}`}}).then(r => r.json()) as PagingObject<T>
        final.push(...next.items)
        current = next
    }
    return final
}
