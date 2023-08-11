import path from 'path'
import { readFileSync, writeFileSync } from 'fs'
import {Spotify} from "../../types/spotify";

export type TrackCache = {
    track: Spotify.TrackObjectFull
    features?: Spotify.AudioFeaturesObject
}

export interface Caches {
    playlist?: Spotify.PlaylistObjectFull
    artists?: Spotify.ArtistObjectFull[]
    albums?: Spotify.AlbumObjectFull[]
    tracks?: TrackCache[]
}

export class cacheManager {
    static getByID<T extends keyof Caches>(id: T): Caches[T] {
        let data = this.getAll()
        return data[id]
    }
    static getAll(): Caches {
        try {
            const json = readFileSync(path.join(process.cwd(), 'cache.json'))
            const data: Caches = JSON.parse(json as unknown as string)
            if (data) return data
            return {}
        }
        catch (err) {
            return {}
        }
    }
    static setByID<T extends keyof Caches>(id: T, data?:Caches[T]) {
        let current = this.getAll() ?? {}
        current[id] = data
        return this.setAll(current);
    }
    static setAll(data:Caches){
        try {
            writeFileSync(path.join(process.cwd(), 'cache.json'), JSON.stringify(data))
            return true
        }
        catch (err) {
            return false
        }
    }
}
