import path from 'path'
import { readFileSync, writeFileSync } from 'fs'
import {Spotify} from "../../types/spotify";
import SpotifyPlaylist = Spotify.SpotifyPlaylist;

export interface caches {
    playlist?: SpotifyPlaylist
}

export class cacheManager {
    static getByID<T extends keyof caches>(id: T): caches[T] {
        let data = this.getAll()
        return data[id]
    }
    static getAll(): caches {
        try {
            const json = readFileSync(path.join(process.cwd(), 'cache.json'))
            const data: caches = JSON.parse(json as unknown as string)
            if (data) return data
            return {}
        }
        catch (err) {
            return {}
        }
    }
    static setByID<T extends keyof caches>(id: T, data?:caches[T]) {
        let current = this.getAll() ?? {}
        current[id] = data
        return this.setAll(current);
    }
    static setAll(data:caches){
        try {
            writeFileSync(path.join(process.cwd(), 'cache.json'), JSON.stringify(data))
            return true
        }
        catch (err) {
            return false
        }
    }
}
