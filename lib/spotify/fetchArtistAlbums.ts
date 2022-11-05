import getAccessToken from "./getAccessToken";
import {Spotify} from "../../types/spotify";
import ArtistsAlbumsResponse = Spotify.ArtistsAlbumsResponse;
import AlbumObjectSimplified = Spotify.AlbumObjectSimplified
import fetchAllPages from "./fetchAllPages";

type groups = "album" | "single" | "appears_on" | "compilation"
/**
 *
 * @param artistId ID of the artist to fetch.
 * @param include_groups type of albums to be included in the response.
 * @param token Provide a token to skip built-in token requester.
 */
export default async function fetchArtistAlbums(artistId:string, include_groups: groups[], token?:string) : Promise<AlbumObjectSimplified[]>{
    let realToken = token ?? await getAccessToken().then(r => r.access_token)
    return await fetchAllPages(await fetch(`https://api.spotify.com/v1/artists/${artistId}/albums?limit=50&market=US&include_groups=${include_groups.join(",")}`, {headers: {Authorization: `Bearer ${realToken}`}}).then(r => r.json()) as ArtistsAlbumsResponse, realToken)
}
