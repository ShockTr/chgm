import {PlaylistObjectTransformed} from "../../lib/util/transformPlaylist";
import {useState} from "react";
import {Combobox} from "@headlessui/react";
import {Spotify} from "../../types/spotify";
import TrackObjectFull = Spotify.TrackObjectFull;
import {generateName} from "../../lib/util/generateName";

export function HeardleTypeBox({playlist}: {playlist:PlaylistObjectTransformed}){
    const [selected, setSelected] = useState()
    const [query, setQuery] = useState('')

    const filteredTracks =
        query === ''
            ? playlist.tracks
            : playlist.tracks.filter((track) => {
                return generateName(track).toLowerCase().includes(query.toLowerCase())
            })

    return (
        <Combobox value={selected} onChange={setSelected}>
            <Combobox.Input
                className="rounded bg-slate-700 w-full h-12 p-3"
                placeholder="Guess Here"
                displayValue={((track: TrackObjectFull) => generateName(track))}
                onChange={(event) => setQuery(event.target.value)}
            />
            <Combobox.Options className="bg-slate-700 max-h-60 w-full rounded py-3 overflow-y-auto overflow-x-hidden">
                {filteredTracks.map((track) => (
                    <Combobox.Option key={track.id} value={track}>
                        <div className="py-2 pl-10 pr-4 hover:bg-slate-600 hover:cursor-pointer">
                            <span className="block truncate min-w-0">{generateName(track)}</span>
                        </div>
                    </Combobox.Option>
                ))}
            </Combobox.Options>
        </Combobox>
    )
}
