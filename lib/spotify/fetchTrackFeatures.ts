import getAccessToken from "./getAccessToken";
import {Spotify} from "../../types/spotify";

export async function fetchTrackFeatures(ids: string[], token?: string) {
    let realToken = token ?? await getAccessToken().then(r => r.access_token)
    const url = new URL('https://api.spotify.com/v1/audio-features')
    url.searchParams.set('ids', ids.join(','))
    url.searchParams.set('market', 'US')
    let response = await fetch(url, { headers: { Authorization: `Bearer ${realToken}` } }).then(r => r.json()) as Spotify.MultipleAudioFeaturesResponse
    return response.audio_features
}
