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
                return track.name.toLowerCase().includes(query.toLowerCase())
            })

    return (
        <Combobox value={selected} onChange={setSelected}>
            <Combobox.Input
                className="rounded bg-slate-700 w-full h-12 p-3"
                placeholder="Guess Here"
                displayValue={((track: TrackObjectFull) => generateName(track))}
                onChange={(event) => setQuery(event.target.value)}
            />
            <Combobox.Options>
                {filteredTracks.map((track) => (
                    <Combobox.Option key={track.id} value={track}>
                        {track.artists[0].name}: {track.name}
                    </Combobox.Option>
                ))}
            </Combobox.Options>
        </Combobox>
    )
}
