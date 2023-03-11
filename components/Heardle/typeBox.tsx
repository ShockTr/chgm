import {PlaylistObjectTransformed} from "../../lib/util/transformPlaylist";
import {useState} from "react";
import {Combobox} from "@headlessui/react";
import {Spotify} from "../../types/spotify";
import TrackObjectFull = Spotify.TrackObjectFull;
import {generateName} from "../../lib/util/generateName";
import Image from "next/legacy/image";
import shimmer from "../../lib/util/shimmer";

export function HeardleTypeBox({playlist}: {playlist:PlaylistObjectTransformed}){
    const [selected, setSelected] = useState()
    const [query, setQuery] = useState('')

    const filteredTracks =
        query === ''
            ? playlist.tracks
            : playlist.tracks.filter((track) => {
                return generateName(track,true).toLowerCase().includes(query.toLowerCase())
            })

    return (
        <Combobox value={selected} onChange={setSelected}>
            <div className="relative rounded bg-slate-700 w-full h-12">
                <Combobox.Input
                    className="rounded bg-slate-700 w-full h-full p-3 pr-10"
                    placeholder="Guess Here"
                    displayValue={((track: TrackObjectFull) => track.name)}
                    onChange={(event) => setQuery(event.target.value)}
                />
                <Combobox.Button className="absolute inset-y-0 right-0 flex items-center px-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9" />
                    </svg>
                </Combobox.Button>
            </div>
            <Combobox.Options className="bg-slate-700 max-h-60 w-full rounded py-3 overflow-y-auto overflow-x-hidden">
                { filteredTracks.length !== 0?
                    filteredTracks.map((track) => (
                    <Combobox.Option key={track.id} value={track}>
                            <div className={`py-2 pr-4 hover:bg-slate-600 hover:cursor-pointer ${track === selected? "pl-2 font-semibold": "pl-11"}`}>
                            <div className="flex items-center w-full h-full space-x-3">
                                {
                                    track === selected?
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-green-500">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                        </svg>
                                        : null
                                }
                                <div className="flex align-middle">
                                    <Image title={track.album.name} placeholder="blur" blurDataURL={`data:image/svg+xml;base64,${Buffer.from(shimmer(40, 40)).toString('base64')}`} alt={track.album.name + " Album Cover"} src={track.album.images[0].url} width="40" height="40" className="overflow-hidden rounded transition-[filter] duration-300"/>
                                </div>
                                <div>
                                    <div>
                                        {track.name}
                                    </div>
                                    <div className="font-italic text-xs">
                                        {track.artists.map((artist,index,array) => {
                                            return (
                                                <span title={artist.name} key={artist.id}>
                                                    {artist.name}
                                                    {((array.length - index - 1) !== 0)? ', ': ''}
                                                </span>
                                            )
                                        })}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Combobox.Option>
                )):
                    <div className="p-3 select-none">
                        No results found.
                    </div>
                }
            </Combobox.Options>
        </Combobox>
    )
}
