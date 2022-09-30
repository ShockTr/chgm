import {NextPageWithLayout} from "../_app";
import DefaultLayout from "../../components/layouts/DefaultLayout";
import Image from 'next/image'
import {InferGetStaticPropsType, GetStaticProps} from "next";
import Link from "next/link";

const Tracks: NextPageWithLayout = ({ playlist }: InferGetStaticPropsType<typeof getStaticProps>) => {
    return (
        <div className="p-3">
            <div className="text-white bg-slate-700/60 backdrop-blur shadow p-3 rounded grid gap-5 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 ">
                {(playlist as SpotifyPlaylist).tracks.items.map(({track}) => { //IDK WHY THE HELL THAT MY IDE YELLS AT ME SO I FORCEFULLY CASTED TYPES
                    return (
                        <div key={track.id}>
                            <TracksGridItem track={track} />
                        </div>
                    )
                }) }
            </div>
        </div>
    )
}
Tracks.getLayout = DefaultLayout

export const getStaticProps: GetStaticProps = async () => {
    const playlist = data as unknown as SpotifyPlaylist

    return {
        props: {
            playlist,
        },
    }
}


export default Tracks

export function TracksGridItem({track}: {track: Track}) {
    return (
        <Link href={`/tracks/${track.id}`}>
            <div className="bg-slate-600/75 hover:bg-slate-500/75 rounded flex p-2 space-x-3 transition-colors duration-300 hover:cursor-pointer">
                <div className="shrink-0 flex h-fit w-fit my-auto">
                    <Link href={`albums/${track.album.id}`}>
                        <Image alt={track.album.name + " Album Cover"} src={track.album.images[0].url} width="80" height="80" className="overflow-hidden rounded hover:brightness-90 transition-[filter] duration-300"/>
                    </Link>
                </div>
                <div className="flex flex-col min-w-0 hover:min-w-fit hover:z-40">
                    <div className="font-semibold text-lg md:truncate hover:text-clip">
                        {track.name}
                    </div>
                    <div className="font-italic text-xs">
                        by {track.artists.map((artist,index,array) => {
                            return (
                                <span key={artist.id}>
                                    <Link href={`/artists/${artist.id}`}><span className="hover:cursor-pointer hover:underline">{artist.name}</span></Link>{((array.length - index - 1) !== 0)? ', ': ''}
                                </span>
                            )
                        })}
                    </div>
                </div>
            </div>
        </Link>
    )
}

 interface SpotifyPlaylist {
    collaborative: boolean;
    description:   string;
    external_urls: ExternalUrls;
    followers:     Followers;
    href:          string;
    id:            string;
    images:        Image[];
    name:          string;
    owner:         Owner;
    primary_color: null;
    public:        boolean;
    snapshot_id:   string;
    tracks:        Tracks;
    type:          string;
    uri:           string;
}

 interface ExternalUrls {
    spotify: string;
}

 interface Followers {
    href:  null;
    total: number;
}

 interface Image {
    height: number;
    url:    string;
    width:  number;
}

 interface Owner {
    display_name?: string;
    external_urls: ExternalUrls;
    href:          string;
    id:            string;
    type:          OwnerType;
    uri:           string;
    name?:         string;
}

 enum OwnerType {
    Artist = "artist",
    User = "user",
}

 interface Tracks {
    href:     string;
    items:    Item[];
    limit:    number;
    next:     null;
    offset:   number;
    previous: null;
    total:    number;
}

 interface Item {
    added_at:        Date;
    added_by:        Owner;
    is_local:        boolean;
    primary_color:   null;
    track:           Track;
    video_thumbnail: VideoThumbnail;
}

 interface Track {
    album:         Album;
    artists:       Owner[];
    disc_number:   number;
    duration_ms:   number;
    episode:       boolean;
    explicit:      boolean;
    external_ids:  ExternalIds;
    external_urls: ExternalUrls;
    href:          string;
    id:            string;
    is_local:      boolean;
    is_playable:   boolean;
    name:          string;
    popularity:    number;
    preview_url:   string;
    track:         boolean;
    track_number:  number;
    type:          TrackType;
    uri:           string;
}

 interface Album {
    album_type:             AlbumTypeEnum;
    artists:                Owner[];
    external_urls:          ExternalUrls;
    href:                   string;
    id:                     string;
    images:                 Image[];
    name:                   string;
    release_date:           string;
    release_date_precision: ReleaseDatePrecision;
    total_tracks:           number;
    type:                   AlbumTypeEnum;
    uri:                    string;
}

 enum AlbumTypeEnum {
    Album = "album",
    Single = "single",
}

 enum ReleaseDatePrecision {
    Day = "day",
    Year = "year",
}

 interface ExternalIds {
    isrc: string;
}

 enum TrackType {
    Track = "track",
}

 interface VideoThumbnail {
    url: null;
}

const data = {
    "collaborative" : false,
    "description" : "List of all CHGM songs for a personal project.",
    "external_urls" : {
        "spotify" : "https://open.spotify.com/playlist/2FONa0A7EaSDvAgck02s5s"
    },
    "followers" : {
        "href" : null,
        "total" : 0
    },
    "href" : "https://api.spotify.com/v1/playlists/2FONa0A7EaSDvAgck02s5s",
    "id" : "2FONa0A7EaSDvAgck02s5s",
    "images" : [ {
        "height" : 640,
        "url" : "https://mosaic.scdn.co/640/ab67616d0000b2730d09ac19b3c556774e186e53ab67616d0000b2732e87fd059334acd2c035aafeab67616d0000b27370f5ba5ac3e2ee6adc5ed00aab67616d0000b273e605c926b681c3983d4e9c6b",
        "width" : 640
    }, {
        "height" : 300,
        "url" : "https://mosaic.scdn.co/300/ab67616d0000b2730d09ac19b3c556774e186e53ab67616d0000b2732e87fd059334acd2c035aafeab67616d0000b27370f5ba5ac3e2ee6adc5ed00aab67616d0000b273e605c926b681c3983d4e9c6b",
        "width" : 300
    }, {
        "height" : 60,
        "url" : "https://mosaic.scdn.co/60/ab67616d0000b2730d09ac19b3c556774e186e53ab67616d0000b2732e87fd059334acd2c035aafeab67616d0000b27370f5ba5ac3e2ee6adc5ed00aab67616d0000b273e605c926b681c3983d4e9c6b",
        "width" : 60
    } ],
    "name" : "CHGM List",
    "owner" : {
        "display_name" : "Bora",
        "external_urls" : {
            "spotify" : "https://open.spotify.com/user/c5pe2m34y0fwcgtj83q8mfjuf"
        },
        "href" : "https://api.spotify.com/v1/users/c5pe2m34y0fwcgtj83q8mfjuf",
        "id" : "c5pe2m34y0fwcgtj83q8mfjuf",
        "type" : "user",
        "uri" : "spotify:user:c5pe2m34y0fwcgtj83q8mfjuf"
    },
    "primary_color" : null,
    "public" : true,
    "snapshot_id" : "Nyw3NzEyZTg3Yzk0MmMwYzhkMDI0Y2YxZmE2MmE4ZTZiMjkwZTJlNmRk",
    "tracks" : {
        "href" : "https://api.spotify.com/v1/playlists/2FONa0A7EaSDvAgck02s5s/tracks?offset=0&limit=100&market=US&locale=tr,en-US;q=0.9,en;q=0.8,tr-TR;q=0.7",
        "items" : [ {
            "added_at" : "2022-09-24T18:59:23Z",
            "added_by" : {
                "external_urls" : {
                    "spotify" : "https://open.spotify.com/user/c5pe2m34y0fwcgtj83q8mfjuf"
                },
                "href" : "https://api.spotify.com/v1/users/c5pe2m34y0fwcgtj83q8mfjuf",
                "id" : "c5pe2m34y0fwcgtj83q8mfjuf",
                "type" : "user",
                "uri" : "spotify:user:c5pe2m34y0fwcgtj83q8mfjuf"
            },
            "is_local" : false,
            "primary_color" : null,
            "track" : {
                "album" : {
                    "album_type" : "single",
                    "artists" : [ {
                        "external_urls" : {
                            "spotify" : "https://open.spotify.com/artist/24nUVBIlCGi4twz4nYxJum"
                        },
                        "href" : "https://api.spotify.com/v1/artists/24nUVBIlCGi4twz4nYxJum",
                        "id" : "24nUVBIlCGi4twz4nYxJum",
                        "name" : "fromis_9",
                        "type" : "artist",
                        "uri" : "spotify:artist:24nUVBIlCGi4twz4nYxJum"
                    } ],
                    "external_urls" : {
                        "spotify" : "https://open.spotify.com/album/6M4WrayhANSknC8e4cOFue"
                    },
                    "href" : "https://api.spotify.com/v1/albums/6M4WrayhANSknC8e4cOFue",
                    "id" : "6M4WrayhANSknC8e4cOFue",
                    "images" : [ {
                        "height" : 640,
                        "url" : "https://i.scdn.co/image/ab67616d0000b27370f5ba5ac3e2ee6adc5ed00a",
                        "width" : 640
                    }, {
                        "height" : 300,
                        "url" : "https://i.scdn.co/image/ab67616d00001e0270f5ba5ac3e2ee6adc5ed00a",
                        "width" : 300
                    }, {
                        "height" : 64,
                        "url" : "https://i.scdn.co/image/ab67616d0000485170f5ba5ac3e2ee6adc5ed00a",
                        "width" : 64
                    } ],
                    "name" : "From.9",
                    "release_date" : "2018-10-10",
                    "release_date_precision" : "day",
                    "total_tracks" : 3,
                    "type" : "album",
                    "uri" : "spotify:album:6M4WrayhANSknC8e4cOFue"
                },
                "artists" : [ {
                    "external_urls" : {
                        "spotify" : "https://open.spotify.com/artist/24nUVBIlCGi4twz4nYxJum"
                    },
                    "href" : "https://api.spotify.com/v1/artists/24nUVBIlCGi4twz4nYxJum",
                    "id" : "24nUVBIlCGi4twz4nYxJum",
                    "name" : "fromis_9",
                    "type" : "artist",
                    "uri" : "spotify:artist:24nUVBIlCGi4twz4nYxJum"
                } ],
                "disc_number" : 1,
                "duration_ms" : 199965,
                "episode" : false,
                "explicit" : false,
                "external_ids" : {
                    "isrc" : "KRA491800921"
                },
                "external_urls" : {
                    "spotify" : "https://open.spotify.com/track/3RtapbUtHJgnVlZWahStUS"
                },
                "href" : "https://api.spotify.com/v1/tracks/3RtapbUtHJgnVlZWahStUS",
                "id" : "3RtapbUtHJgnVlZWahStUS",
                "is_local" : false,
                "is_playable" : true,
                "name" : "LOVE BOMB",
                "popularity" : 58,
                "preview_url" : "https://p.scdn.co/mp3-preview/c039d7e29e1b06127b38508cd19ab742caaa18b5?cid=774b29d4f13844c495f206cafdad9c86",
                "track" : true,
                "track_number" : 1,
                "type" : "track",
                "uri" : "spotify:track:3RtapbUtHJgnVlZWahStUS"
            },
            "video_thumbnail" : {
                "url" : null
            }
        }, {
            "added_at" : "2022-09-24T18:59:23Z",
            "added_by" : {
                "external_urls" : {
                    "spotify" : "https://open.spotify.com/user/c5pe2m34y0fwcgtj83q8mfjuf"
                },
                "href" : "https://api.spotify.com/v1/users/c5pe2m34y0fwcgtj83q8mfjuf",
                "id" : "c5pe2m34y0fwcgtj83q8mfjuf",
                "type" : "user",
                "uri" : "spotify:user:c5pe2m34y0fwcgtj83q8mfjuf"
            },
            "is_local" : false,
            "primary_color" : null,
            "track" : {
                "album" : {
                    "album_type" : "single",
                    "artists" : [ {
                        "external_urls" : {
                            "spotify" : "https://open.spotify.com/artist/24nUVBIlCGi4twz4nYxJum"
                        },
                        "href" : "https://api.spotify.com/v1/artists/24nUVBIlCGi4twz4nYxJum",
                        "id" : "24nUVBIlCGi4twz4nYxJum",
                        "name" : "fromis_9",
                        "type" : "artist",
                        "uri" : "spotify:artist:24nUVBIlCGi4twz4nYxJum"
                    } ],
                    "external_urls" : {
                        "spotify" : "https://open.spotify.com/album/6CqQ6nEVcrFkQ0gJRy5nWR"
                    },
                    "href" : "https://api.spotify.com/v1/albums/6CqQ6nEVcrFkQ0gJRy5nWR",
                    "id" : "6CqQ6nEVcrFkQ0gJRy5nWR",
                    "images" : [ {
                        "height" : 640,
                        "url" : "https://i.scdn.co/image/ab67616d0000b2732e87fd059334acd2c035aafe",
                        "width" : 640
                    }, {
                        "height" : 300,
                        "url" : "https://i.scdn.co/image/ab67616d00001e022e87fd059334acd2c035aafe",
                        "width" : 300
                    }, {
                        "height" : 64,
                        "url" : "https://i.scdn.co/image/ab67616d000048512e87fd059334acd2c035aafe",
                        "width" : 64
                    } ],
                    "name" : "To. Day",
                    "release_date" : "2018-06-05",
                    "release_date_precision" : "day",
                    "total_tracks" : 6,
                    "type" : "album",
                    "uri" : "spotify:album:6CqQ6nEVcrFkQ0gJRy5nWR"
                },
                "artists" : [ {
                    "external_urls" : {
                        "spotify" : "https://open.spotify.com/artist/24nUVBIlCGi4twz4nYxJum"
                    },
                    "href" : "https://api.spotify.com/v1/artists/24nUVBIlCGi4twz4nYxJum",
                    "id" : "24nUVBIlCGi4twz4nYxJum",
                    "name" : "fromis_9",
                    "type" : "artist",
                    "uri" : "spotify:artist:24nUVBIlCGi4twz4nYxJum"
                } ],
                "disc_number" : 1,
                "duration_ms" : 183375,
                "episode" : false,
                "explicit" : false,
                "external_ids" : {
                    "isrc" : "KRA491800489"
                },
                "external_urls" : {
                    "spotify" : "https://open.spotify.com/track/3CtpSwA8Z96ePP9nfTPz3Z"
                },
                "href" : "https://api.spotify.com/v1/tracks/3CtpSwA8Z96ePP9nfTPz3Z",
                "id" : "3CtpSwA8Z96ePP9nfTPz3Z",
                "is_local" : false,
                "is_playable" : true,
                "name" : "PITAPAT (DKDK)",
                "popularity" : 50,
                "preview_url" : "https://p.scdn.co/mp3-preview/b8a24b66084d0a453d5722d0cd6ca5ce0c27a4d5?cid=774b29d4f13844c495f206cafdad9c86",
                "track" : true,
                "track_number" : 3,
                "type" : "track",
                "uri" : "spotify:track:3CtpSwA8Z96ePP9nfTPz3Z"
            },
            "video_thumbnail" : {
                "url" : null
            }
        }, {
            "added_at" : "2022-09-24T18:59:23Z",
            "added_by" : {
                "external_urls" : {
                    "spotify" : "https://open.spotify.com/user/c5pe2m34y0fwcgtj83q8mfjuf"
                },
                "href" : "https://api.spotify.com/v1/users/c5pe2m34y0fwcgtj83q8mfjuf",
                "id" : "c5pe2m34y0fwcgtj83q8mfjuf",
                "type" : "user",
                "uri" : "spotify:user:c5pe2m34y0fwcgtj83q8mfjuf"
            },
            "is_local" : false,
            "primary_color" : null,
            "track" : {
                "album" : {
                    "album_type" : "album",
                    "artists" : [ {
                        "external_urls" : {
                            "spotify" : "https://open.spotify.com/artist/4u9YxYzCjpMjnMcwNu9fzy"
                        },
                        "href" : "https://api.spotify.com/v1/artists/4u9YxYzCjpMjnMcwNu9fzy",
                        "id" : "4u9YxYzCjpMjnMcwNu9fzy",
                        "name" : "LOOΠΔ 1/3",
                        "type" : "artist",
                        "uri" : "spotify:artist:4u9YxYzCjpMjnMcwNu9fzy"
                    } ],
                    "external_urls" : {
                        "spotify" : "https://open.spotify.com/album/2o19HGYWURILfZ9BSNw4ue"
                    },
                    "href" : "https://api.spotify.com/v1/albums/2o19HGYWURILfZ9BSNw4ue",
                    "id" : "2o19HGYWURILfZ9BSNw4ue",
                    "images" : [ {
                        "height" : 640,
                        "url" : "https://i.scdn.co/image/ab67616d0000b2730d09ac19b3c556774e186e53",
                        "width" : 640
                    }, {
                        "height" : 300,
                        "url" : "https://i.scdn.co/image/ab67616d00001e020d09ac19b3c556774e186e53",
                        "width" : 300
                    }, {
                        "height" : 64,
                        "url" : "https://i.scdn.co/image/ab67616d000048510d09ac19b3c556774e186e53",
                        "width" : 64
                    } ],
                    "name" : "Love & Evil",
                    "release_date" : "2017-04-27",
                    "release_date_precision" : "day",
                    "total_tracks" : 7,
                    "type" : "album",
                    "uri" : "spotify:album:2o19HGYWURILfZ9BSNw4ue"
                },
                "artists" : [ {
                    "external_urls" : {
                        "spotify" : "https://open.spotify.com/artist/4u9YxYzCjpMjnMcwNu9fzy"
                    },
                    "href" : "https://api.spotify.com/v1/artists/4u9YxYzCjpMjnMcwNu9fzy",
                    "id" : "4u9YxYzCjpMjnMcwNu9fzy",
                    "name" : "LOOΠΔ 1/3",
                    "type" : "artist",
                    "uri" : "spotify:artist:4u9YxYzCjpMjnMcwNu9fzy"
                } ],
                "disc_number" : 1,
                "duration_ms" : 206868,
                "episode" : false,
                "explicit" : false,
                "external_ids" : {
                    "isrc" : "KRE081700005"
                },
                "external_urls" : {
                    "spotify" : "https://open.spotify.com/track/3isW89jO5h49OoCHpqediW"
                },
                "href" : "https://api.spotify.com/v1/tracks/3isW89jO5h49OoCHpqediW",
                "id" : "3isW89jO5h49OoCHpqediW",
                "is_local" : false,
                "is_playable" : true,
                "name" : "Love & Live",
                "popularity" : 49,
                "preview_url" : "https://p.scdn.co/mp3-preview/0bc82f11bfefa0d020cade75e40cdc9bc157be3f?cid=774b29d4f13844c495f206cafdad9c86",
                "track" : true,
                "track_number" : 4,
                "type" : "track",
                "uri" : "spotify:track:3isW89jO5h49OoCHpqediW"
            },
            "video_thumbnail" : {
                "url" : null
            }
        }, {
            "added_at" : "2022-09-24T18:59:23Z",
            "added_by" : {
                "external_urls" : {
                    "spotify" : "https://open.spotify.com/user/c5pe2m34y0fwcgtj83q8mfjuf"
                },
                "href" : "https://api.spotify.com/v1/users/c5pe2m34y0fwcgtj83q8mfjuf",
                "id" : "c5pe2m34y0fwcgtj83q8mfjuf",
                "type" : "user",
                "uri" : "spotify:user:c5pe2m34y0fwcgtj83q8mfjuf"
            },
            "is_local" : false,
            "primary_color" : null,
            "track" : {
                "album" : {
                    "album_type" : "single",
                    "artists" : [ {
                        "external_urls" : {
                            "spotify" : "https://open.spotify.com/artist/0qlWcS66ohOIi0M8JZwPft"
                        },
                        "href" : "https://api.spotify.com/v1/artists/0qlWcS66ohOIi0M8JZwPft",
                        "id" : "0qlWcS66ohOIi0M8JZwPft",
                        "name" : "GFRIEND",
                        "type" : "artist",
                        "uri" : "spotify:artist:0qlWcS66ohOIi0M8JZwPft"
                    } ],
                    "external_urls" : {
                        "spotify" : "https://open.spotify.com/album/2mou6C67yLJkKWjV0FuXg7"
                    },
                    "href" : "https://api.spotify.com/v1/albums/2mou6C67yLJkKWjV0FuXg7",
                    "id" : "2mou6C67yLJkKWjV0FuXg7",
                    "images" : [ {
                        "height" : 640,
                        "url" : "https://i.scdn.co/image/ab67616d0000b273e605c926b681c3983d4e9c6b",
                        "width" : 640
                    }, {
                        "height" : 300,
                        "url" : "https://i.scdn.co/image/ab67616d00001e02e605c926b681c3983d4e9c6b",
                        "width" : 300
                    }, {
                        "height" : 64,
                        "url" : "https://i.scdn.co/image/ab67616d00004851e605c926b681c3983d4e9c6b",
                        "width" : 64
                    } ],
                    "name" : "GFRIEND 2nd Mini Album 'Flower Bud'",
                    "release_date" : "2015-07-23",
                    "release_date_precision" : "day",
                    "total_tracks" : 6,
                    "type" : "album",
                    "uri" : "spotify:album:2mou6C67yLJkKWjV0FuXg7"
                },
                "artists" : [ {
                    "external_urls" : {
                        "spotify" : "https://open.spotify.com/artist/0qlWcS66ohOIi0M8JZwPft"
                    },
                    "href" : "https://api.spotify.com/v1/artists/0qlWcS66ohOIi0M8JZwPft",
                    "id" : "0qlWcS66ohOIi0M8JZwPft",
                    "name" : "GFRIEND",
                    "type" : "artist",
                    "uri" : "spotify:artist:0qlWcS66ohOIi0M8JZwPft"
                } ],
                "disc_number" : 1,
                "duration_ms" : 220745,
                "episode" : false,
                "explicit" : false,
                "external_ids" : {
                    "isrc" : "KRB471501326"
                },
                "external_urls" : {
                    "spotify" : "https://open.spotify.com/track/6x7fux7bZEfnChKx3nhSZn"
                },
                "href" : "https://api.spotify.com/v1/tracks/6x7fux7bZEfnChKx3nhSZn",
                "id" : "6x7fux7bZEfnChKx3nhSZn",
                "is_local" : false,
                "is_playable" : true,
                "name" : "Me Gustas Tu",
                "popularity" : 63,
                "preview_url" : "https://p.scdn.co/mp3-preview/47604024d798096bffc9c4ec11e9bf18d26fe690?cid=774b29d4f13844c495f206cafdad9c86",
                "track" : true,
                "track_number" : 2,
                "type" : "track",
                "uri" : "spotify:track:6x7fux7bZEfnChKx3nhSZn"
            },
            "video_thumbnail" : {
                "url" : null
            }
        }, {
            "added_at" : "2022-09-24T18:59:23Z",
            "added_by" : {
                "external_urls" : {
                    "spotify" : "https://open.spotify.com/user/c5pe2m34y0fwcgtj83q8mfjuf"
                },
                "href" : "https://api.spotify.com/v1/users/c5pe2m34y0fwcgtj83q8mfjuf",
                "id" : "c5pe2m34y0fwcgtj83q8mfjuf",
                "type" : "user",
                "uri" : "spotify:user:c5pe2m34y0fwcgtj83q8mfjuf"
            },
            "is_local" : false,
            "primary_color" : null,
            "track" : {
                "album" : {
                    "album_type" : "single",
                    "artists" : [ {
                        "external_urls" : {
                            "spotify" : "https://open.spotify.com/artist/2019zR22qK2RBvCqtudBaI"
                        },
                        "href" : "https://api.spotify.com/v1/artists/2019zR22qK2RBvCqtudBaI",
                        "id" : "2019zR22qK2RBvCqtudBaI",
                        "name" : "OH MY GIRL",
                        "type" : "artist",
                        "uri" : "spotify:artist:2019zR22qK2RBvCqtudBaI"
                    } ],
                    "external_urls" : {
                        "spotify" : "https://open.spotify.com/album/5tnlYW7pyufAkD9DT8mXxz"
                    },
                    "href" : "https://api.spotify.com/v1/albums/5tnlYW7pyufAkD9DT8mXxz",
                    "id" : "5tnlYW7pyufAkD9DT8mXxz",
                    "images" : [ {
                        "height" : 640,
                        "url" : "https://i.scdn.co/image/ab67616d0000b273c778829d0d9073d5a3e094d1",
                        "width" : 640
                    }, {
                        "height" : 300,
                        "url" : "https://i.scdn.co/image/ab67616d00001e02c778829d0d9073d5a3e094d1",
                        "width" : 300
                    }, {
                        "height" : 64,
                        "url" : "https://i.scdn.co/image/ab67616d00004851c778829d0d9073d5a3e094d1",
                        "width" : 64
                    } ],
                    "name" : "SECRET GARDEN",
                    "release_date" : "2018-01-09",
                    "release_date_precision" : "day",
                    "total_tracks" : 5,
                    "type" : "album",
                    "uri" : "spotify:album:5tnlYW7pyufAkD9DT8mXxz"
                },
                "artists" : [ {
                    "external_urls" : {
                        "spotify" : "https://open.spotify.com/artist/2019zR22qK2RBvCqtudBaI"
                    },
                    "href" : "https://api.spotify.com/v1/artists/2019zR22qK2RBvCqtudBaI",
                    "id" : "2019zR22qK2RBvCqtudBaI",
                    "name" : "OH MY GIRL",
                    "type" : "artist",
                    "uri" : "spotify:artist:2019zR22qK2RBvCqtudBaI"
                } ],
                "disc_number" : 1,
                "duration_ms" : 244022,
                "episode" : false,
                "explicit" : false,
                "external_ids" : {
                    "isrc" : "KRA381703003"
                },
                "external_urls" : {
                    "spotify" : "https://open.spotify.com/track/2ZVQY4mXF3eHTu1RBnBZl0"
                },
                "href" : "https://api.spotify.com/v1/tracks/2ZVQY4mXF3eHTu1RBnBZl0",
                "id" : "2ZVQY4mXF3eHTu1RBnBZl0",
                "is_local" : false,
                "is_playable" : true,
                "name" : "Secret Garden",
                "popularity" : 53,
                "preview_url" : "https://p.scdn.co/mp3-preview/56051e0b7adde220c6e3b8e29fe38333a1c0c22f?cid=774b29d4f13844c495f206cafdad9c86",
                "track" : true,
                "track_number" : 1,
                "type" : "track",
                "uri" : "spotify:track:2ZVQY4mXF3eHTu1RBnBZl0"
            },
            "video_thumbnail" : {
                "url" : null
            }
        }, {
            "added_at" : "2022-09-24T18:59:23Z",
            "added_by" : {
                "external_urls" : {
                    "spotify" : "https://open.spotify.com/user/c5pe2m34y0fwcgtj83q8mfjuf"
                },
                "href" : "https://api.spotify.com/v1/users/c5pe2m34y0fwcgtj83q8mfjuf",
                "id" : "c5pe2m34y0fwcgtj83q8mfjuf",
                "type" : "user",
                "uri" : "spotify:user:c5pe2m34y0fwcgtj83q8mfjuf"
            },
            "is_local" : false,
            "primary_color" : null,
            "track" : {
                "album" : {
                    "album_type" : "single",
                    "artists" : [ {
                        "external_urls" : {
                            "spotify" : "https://open.spotify.com/artist/24nUVBIlCGi4twz4nYxJum"
                        },
                        "href" : "https://api.spotify.com/v1/artists/24nUVBIlCGi4twz4nYxJum",
                        "id" : "24nUVBIlCGi4twz4nYxJum",
                        "name" : "fromis_9",
                        "type" : "artist",
                        "uri" : "spotify:artist:24nUVBIlCGi4twz4nYxJum"
                    } ],
                    "external_urls" : {
                        "spotify" : "https://open.spotify.com/album/0b1tsnRd7eu0q4qaeCLsQa"
                    },
                    "href" : "https://api.spotify.com/v1/albums/0b1tsnRd7eu0q4qaeCLsQa",
                    "id" : "0b1tsnRd7eu0q4qaeCLsQa",
                    "images" : [ {
                        "height" : 640,
                        "url" : "https://i.scdn.co/image/ab67616d0000b2731523de594372ea184015afd2",
                        "width" : 640
                    }, {
                        "height" : 300,
                        "url" : "https://i.scdn.co/image/ab67616d00001e021523de594372ea184015afd2",
                        "width" : 300
                    }, {
                        "height" : 64,
                        "url" : "https://i.scdn.co/image/ab67616d000048511523de594372ea184015afd2",
                        "width" : 64
                    } ],
                    "name" : "To. Heart",
                    "release_date" : "2018-01-25",
                    "release_date_precision" : "day",
                    "total_tracks" : 6,
                    "type" : "album",
                    "uri" : "spotify:album:0b1tsnRd7eu0q4qaeCLsQa"
                },
                "artists" : [ {
                    "external_urls" : {
                        "spotify" : "https://open.spotify.com/artist/24nUVBIlCGi4twz4nYxJum"
                    },
                    "href" : "https://api.spotify.com/v1/artists/24nUVBIlCGi4twz4nYxJum",
                    "id" : "24nUVBIlCGi4twz4nYxJum",
                    "name" : "fromis_9",
                    "type" : "artist",
                    "uri" : "spotify:artist:24nUVBIlCGi4twz4nYxJum"
                } ],
                "disc_number" : 1,
                "duration_ms" : 188527,
                "episode" : false,
                "explicit" : false,
                "external_ids" : {
                    "isrc" : "KRA491800074"
                },
                "external_urls" : {
                    "spotify" : "https://open.spotify.com/track/3PIzI4Bl2b7oZloFWTPAna"
                },
                "href" : "https://api.spotify.com/v1/tracks/3PIzI4Bl2b7oZloFWTPAna",
                "id" : "3PIzI4Bl2b7oZloFWTPAna",
                "is_local" : false,
                "is_playable" : true,
                "name" : "To Heart",
                "popularity" : 45,
                "preview_url" : "https://p.scdn.co/mp3-preview/383b87e5734aa3460bcf1e4da237d7ab2ebe2ca4?cid=774b29d4f13844c495f206cafdad9c86",
                "track" : true,
                "track_number" : 2,
                "type" : "track",
                "uri" : "spotify:track:3PIzI4Bl2b7oZloFWTPAna"
            },
            "video_thumbnail" : {
                "url" : null
            }
        }, {
            "added_at" : "2022-09-24T18:59:23Z",
            "added_by" : {
                "external_urls" : {
                    "spotify" : "https://open.spotify.com/user/c5pe2m34y0fwcgtj83q8mfjuf"
                },
                "href" : "https://api.spotify.com/v1/users/c5pe2m34y0fwcgtj83q8mfjuf",
                "id" : "c5pe2m34y0fwcgtj83q8mfjuf",
                "type" : "user",
                "uri" : "spotify:user:c5pe2m34y0fwcgtj83q8mfjuf"
            },
            "is_local" : false,
            "primary_color" : null,
            "track" : {
                "album" : {
                    "album_type" : "single",
                    "artists" : [ {
                        "external_urls" : {
                            "spotify" : "https://open.spotify.com/artist/3g34PW5oNmDBxMVUTzx2XK"
                        },
                        "href" : "https://api.spotify.com/v1/artists/3g34PW5oNmDBxMVUTzx2XK",
                        "id" : "3g34PW5oNmDBxMVUTzx2XK",
                        "name" : "Lovelyz",
                        "type" : "artist",
                        "uri" : "spotify:artist:3g34PW5oNmDBxMVUTzx2XK"
                    } ],
                    "external_urls" : {
                        "spotify" : "https://open.spotify.com/album/2bEKOTFTxk07CU3O2sk9BX"
                    },
                    "href" : "https://api.spotify.com/v1/albums/2bEKOTFTxk07CU3O2sk9BX",
                    "id" : "2bEKOTFTxk07CU3O2sk9BX",
                    "images" : [ {
                        "height" : 640,
                        "url" : "https://i.scdn.co/image/ab67616d0000b273d59fbf87945402a8ce55932b",
                        "width" : 640
                    }, {
                        "height" : 300,
                        "url" : "https://i.scdn.co/image/ab67616d00001e02d59fbf87945402a8ce55932b",
                        "width" : 300
                    }, {
                        "height" : 64,
                        "url" : "https://i.scdn.co/image/ab67616d00004851d59fbf87945402a8ce55932b",
                        "width" : 64
                    } ],
                    "name" : "Lovelyz 4th Mini Album Heal",
                    "release_date" : "2018-04-23",
                    "release_date_precision" : "day",
                    "total_tracks" : 6,
                    "type" : "album",
                    "uri" : "spotify:album:2bEKOTFTxk07CU3O2sk9BX"
                },
                "artists" : [ {
                    "external_urls" : {
                        "spotify" : "https://open.spotify.com/artist/3g34PW5oNmDBxMVUTzx2XK"
                    },
                    "href" : "https://api.spotify.com/v1/artists/3g34PW5oNmDBxMVUTzx2XK",
                    "id" : "3g34PW5oNmDBxMVUTzx2XK",
                    "name" : "Lovelyz",
                    "type" : "artist",
                    "uri" : "spotify:artist:3g34PW5oNmDBxMVUTzx2XK"
                } ],
                "disc_number" : 1,
                "duration_ms" : 194576,
                "episode" : false,
                "explicit" : false,
                "external_ids" : {
                    "isrc" : "KRA381705116"
                },
                "external_urls" : {
                    "spotify" : "https://open.spotify.com/track/7FO1P6TNaex2MfGFf5fRT0"
                },
                "href" : "https://api.spotify.com/v1/tracks/7FO1P6TNaex2MfGFf5fRT0",
                "id" : "7FO1P6TNaex2MfGFf5fRT0",
                "is_local" : false,
                "is_playable" : true,
                "name" : "That day",
                "popularity" : 38,
                "preview_url" : "https://p.scdn.co/mp3-preview/8eebae3a3a9f6bac8df2d4b2d28da4a59812c02d?cid=774b29d4f13844c495f206cafdad9c86",
                "track" : true,
                "track_number" : 2,
                "type" : "track",
                "uri" : "spotify:track:7FO1P6TNaex2MfGFf5fRT0"
            },
            "video_thumbnail" : {
                "url" : null
            }
        }, {
            "added_at" : "2022-09-24T18:59:23Z",
            "added_by" : {
                "external_urls" : {
                    "spotify" : "https://open.spotify.com/user/c5pe2m34y0fwcgtj83q8mfjuf"
                },
                "href" : "https://api.spotify.com/v1/users/c5pe2m34y0fwcgtj83q8mfjuf",
                "id" : "c5pe2m34y0fwcgtj83q8mfjuf",
                "type" : "user",
                "uri" : "spotify:user:c5pe2m34y0fwcgtj83q8mfjuf"
            },
            "is_local" : false,
            "primary_color" : null,
            "track" : {
                "album" : {
                    "album_type" : "single",
                    "artists" : [ {
                        "external_urls" : {
                            "spotify" : "https://open.spotify.com/artist/2uWcrwgWmZcQc3IPBs3tfU"
                        },
                        "href" : "https://api.spotify.com/v1/artists/2uWcrwgWmZcQc3IPBs3tfU",
                        "id" : "2uWcrwgWmZcQc3IPBs3tfU",
                        "name" : "Apink",
                        "type" : "artist",
                        "uri" : "spotify:artist:2uWcrwgWmZcQc3IPBs3tfU"
                    } ],
                    "external_urls" : {
                        "spotify" : "https://open.spotify.com/album/03GKVqpdr6Fi24DeAbgDRs"
                    },
                    "href" : "https://api.spotify.com/v1/albums/03GKVqpdr6Fi24DeAbgDRs",
                    "id" : "03GKVqpdr6Fi24DeAbgDRs",
                    "images" : [ {
                        "height" : 640,
                        "url" : "https://i.scdn.co/image/ab67616d0000b273da7fe0b01f25c675433399d9",
                        "width" : 640
                    }, {
                        "height" : 300,
                        "url" : "https://i.scdn.co/image/ab67616d00001e02da7fe0b01f25c675433399d9",
                        "width" : 300
                    }, {
                        "height" : 64,
                        "url" : "https://i.scdn.co/image/ab67616d00004851da7fe0b01f25c675433399d9",
                        "width" : 64
                    } ],
                    "name" : "Secret Garden",
                    "release_date" : "2013-07-05",
                    "release_date_precision" : "day",
                    "total_tracks" : 6,
                    "type" : "album",
                    "uri" : "spotify:album:03GKVqpdr6Fi24DeAbgDRs"
                },
                "artists" : [ {
                    "external_urls" : {
                        "spotify" : "https://open.spotify.com/artist/2uWcrwgWmZcQc3IPBs3tfU"
                    },
                    "href" : "https://api.spotify.com/v1/artists/2uWcrwgWmZcQc3IPBs3tfU",
                    "id" : "2uWcrwgWmZcQc3IPBs3tfU",
                    "name" : "Apink",
                    "type" : "artist",
                    "uri" : "spotify:artist:2uWcrwgWmZcQc3IPBs3tfU"
                } ],
                "disc_number" : 1,
                "duration_ms" : 220099,
                "episode" : false,
                "explicit" : false,
                "external_ids" : {
                    "isrc" : "KRA491300709"
                },
                "external_urls" : {
                    "spotify" : "https://open.spotify.com/track/5SusX17QvBBkH7WfMbTU0j"
                },
                "href" : "https://api.spotify.com/v1/tracks/5SusX17QvBBkH7WfMbTU0j",
                "id" : "5SusX17QvBBkH7WfMbTU0j",
                "is_local" : false,
                "is_playable" : true,
                "name" : "NoNoNo",
                "popularity" : 53,
                "preview_url" : "https://p.scdn.co/mp3-preview/01ecb6bf7218b2fd77fd1db52b0feb146bf7c084?cid=774b29d4f13844c495f206cafdad9c86",
                "track" : true,
                "track_number" : 2,
                "type" : "track",
                "uri" : "spotify:track:5SusX17QvBBkH7WfMbTU0j"
            },
            "video_thumbnail" : {
                "url" : null
            }
        }, {
            "added_at" : "2022-09-24T18:59:23Z",
            "added_by" : {
                "external_urls" : {
                    "spotify" : "https://open.spotify.com/user/c5pe2m34y0fwcgtj83q8mfjuf"
                },
                "href" : "https://api.spotify.com/v1/users/c5pe2m34y0fwcgtj83q8mfjuf",
                "id" : "c5pe2m34y0fwcgtj83q8mfjuf",
                "type" : "user",
                "uri" : "spotify:user:c5pe2m34y0fwcgtj83q8mfjuf"
            },
            "is_local" : false,
            "primary_color" : null,
            "track" : {
                "album" : {
                    "album_type" : "single",
                    "artists" : [ {
                        "external_urls" : {
                            "spotify" : "https://open.spotify.com/artist/0LyfQWJT6nXafLPZqxe9Of"
                        },
                        "href" : "https://api.spotify.com/v1/artists/0LyfQWJT6nXafLPZqxe9Of",
                        "id" : "0LyfQWJT6nXafLPZqxe9Of",
                        "name" : "Çeşitli Sanatçılar",
                        "type" : "artist",
                        "uri" : "spotify:artist:0LyfQWJT6nXafLPZqxe9Of"
                    } ],
                    "external_urls" : {
                        "spotify" : "https://open.spotify.com/album/4s5vClNrHbNQ4ePFKM8Zru"
                    },
                    "href" : "https://api.spotify.com/v1/albums/4s5vClNrHbNQ4ePFKM8Zru",
                    "id" : "4s5vClNrHbNQ4ePFKM8Zru",
                    "images" : [ {
                        "height" : 640,
                        "url" : "https://i.scdn.co/image/ab67616d0000b273619150a04e1ed1741268c505",
                        "width" : 640
                    }, {
                        "height" : 300,
                        "url" : "https://i.scdn.co/image/ab67616d00001e02619150a04e1ed1741268c505",
                        "width" : 300
                    }, {
                        "height" : 64,
                        "url" : "https://i.scdn.co/image/ab67616d00004851619150a04e1ed1741268c505",
                        "width" : 64
                    } ],
                    "name" : "Queendom < FINAL Comeback >",
                    "release_date" : "2019-10-25",
                    "release_date_precision" : "day",
                    "total_tracks" : 6,
                    "type" : "album",
                    "uri" : "spotify:album:4s5vClNrHbNQ4ePFKM8Zru"
                },
                "artists" : [ {
                    "external_urls" : {
                        "spotify" : "https://open.spotify.com/artist/3g34PW5oNmDBxMVUTzx2XK"
                    },
                    "href" : "https://api.spotify.com/v1/artists/3g34PW5oNmDBxMVUTzx2XK",
                    "id" : "3g34PW5oNmDBxMVUTzx2XK",
                    "name" : "Lovelyz",
                    "type" : "artist",
                    "uri" : "spotify:artist:3g34PW5oNmDBxMVUTzx2XK"
                } ],
                "disc_number" : 1,
                "duration_ms" : 206652,
                "episode" : false,
                "explicit" : false,
                "external_ids" : {
                    "isrc" : "KRA491900997"
                },
                "external_urls" : {
                    "spotify" : "https://open.spotify.com/track/5ZaBax14ueHWHisM1qRVGs"
                },
                "href" : "https://api.spotify.com/v1/tracks/5ZaBax14ueHWHisM1qRVGs",
                "id" : "5ZaBax14ueHWHisM1qRVGs",
                "is_local" : false,
                "is_playable" : true,
                "name" : "Moonlight",
                "popularity" : 33,
                "preview_url" : "https://p.scdn.co/mp3-preview/cac3e7343dc09f6b0fa8730993de60fef79f2a00?cid=774b29d4f13844c495f206cafdad9c86",
                "track" : true,
                "track_number" : 2,
                "type" : "track",
                "uri" : "spotify:track:5ZaBax14ueHWHisM1qRVGs"
            },
            "video_thumbnail" : {
                "url" : null
            }
        }, {
            "added_at" : "2022-09-24T18:59:23Z",
            "added_by" : {
                "external_urls" : {
                    "spotify" : "https://open.spotify.com/user/c5pe2m34y0fwcgtj83q8mfjuf"
                },
                "href" : "https://api.spotify.com/v1/users/c5pe2m34y0fwcgtj83q8mfjuf",
                "id" : "c5pe2m34y0fwcgtj83q8mfjuf",
                "type" : "user",
                "uri" : "spotify:user:c5pe2m34y0fwcgtj83q8mfjuf"
            },
            "is_local" : false,
            "primary_color" : null,
            "track" : {
                "album" : {
                    "album_type" : "album",
                    "artists" : [ {
                        "external_urls" : {
                            "spotify" : "https://open.spotify.com/artist/0qlWcS66ohOIi0M8JZwPft"
                        },
                        "href" : "https://api.spotify.com/v1/artists/0qlWcS66ohOIi0M8JZwPft",
                        "id" : "0qlWcS66ohOIi0M8JZwPft",
                        "name" : "GFRIEND",
                        "type" : "artist",
                        "uri" : "spotify:artist:0qlWcS66ohOIi0M8JZwPft"
                    } ],
                    "external_urls" : {
                        "spotify" : "https://open.spotify.com/album/0PlSM2Hml1cFANnzYu6RCg"
                    },
                    "href" : "https://api.spotify.com/v1/albums/0PlSM2Hml1cFANnzYu6RCg",
                    "id" : "0PlSM2Hml1cFANnzYu6RCg",
                    "images" : [ {
                        "height" : 640,
                        "url" : "https://i.scdn.co/image/ab67616d0000b27393f063bd7b14993d5ffb9287",
                        "width" : 640
                    }, {
                        "height" : 300,
                        "url" : "https://i.scdn.co/image/ab67616d00001e0293f063bd7b14993d5ffb9287",
                        "width" : 300
                    }, {
                        "height" : 64,
                        "url" : "https://i.scdn.co/image/ab67616d0000485193f063bd7b14993d5ffb9287",
                        "width" : 64
                    } ],
                    "name" : "GFRIEND The 1st Album 'LOL'",
                    "release_date" : "2016-07-11",
                    "release_date_precision" : "day",
                    "total_tracks" : 12,
                    "type" : "album",
                    "uri" : "spotify:album:0PlSM2Hml1cFANnzYu6RCg"
                },
                "artists" : [ {
                    "external_urls" : {
                        "spotify" : "https://open.spotify.com/artist/0qlWcS66ohOIi0M8JZwPft"
                    },
                    "href" : "https://api.spotify.com/v1/artists/0qlWcS66ohOIi0M8JZwPft",
                    "id" : "0qlWcS66ohOIi0M8JZwPft",
                    "name" : "GFRIEND",
                    "type" : "artist",
                    "uri" : "spotify:artist:0qlWcS66ohOIi0M8JZwPft"
                } ],
                "disc_number" : 1,
                "duration_ms" : 229962,
                "episode" : false,
                "explicit" : false,
                "external_ids" : {
                    "isrc" : "KRA381601309"
                },
                "external_urls" : {
                    "spotify" : "https://open.spotify.com/track/44UIW3CCKgESBf9RxiknyX"
                },
                "href" : "https://api.spotify.com/v1/tracks/44UIW3CCKgESBf9RxiknyX",
                "id" : "44UIW3CCKgESBf9RxiknyX",
                "is_local" : false,
                "is_playable" : true,
                "name" : "Gone with the wind",
                "popularity" : 39,
                "preview_url" : "https://p.scdn.co/mp3-preview/c190dc55f65dcdbc7cda35c8225c7bba0d9dfd26?cid=774b29d4f13844c495f206cafdad9c86",
                "track" : true,
                "track_number" : 11,
                "type" : "track",
                "uri" : "spotify:track:44UIW3CCKgESBf9RxiknyX"
            },
            "video_thumbnail" : {
                "url" : null
            }
        }, {
            "added_at" : "2022-09-24T18:59:23Z",
            "added_by" : {
                "external_urls" : {
                    "spotify" : "https://open.spotify.com/user/c5pe2m34y0fwcgtj83q8mfjuf"
                },
                "href" : "https://api.spotify.com/v1/users/c5pe2m34y0fwcgtj83q8mfjuf",
                "id" : "c5pe2m34y0fwcgtj83q8mfjuf",
                "type" : "user",
                "uri" : "spotify:user:c5pe2m34y0fwcgtj83q8mfjuf"
            },
            "is_local" : false,
            "primary_color" : null,
            "track" : {
                "album" : {
                    "album_type" : "single",
                    "artists" : [ {
                        "external_urls" : {
                            "spotify" : "https://open.spotify.com/artist/0LyfQWJT6nXafLPZqxe9Of"
                        },
                        "href" : "https://api.spotify.com/v1/artists/0LyfQWJT6nXafLPZqxe9Of",
                        "id" : "0LyfQWJT6nXafLPZqxe9Of",
                        "name" : "Çeşitli Sanatçılar",
                        "type" : "artist",
                        "uri" : "spotify:artist:0LyfQWJT6nXafLPZqxe9Of"
                    } ],
                    "external_urls" : {
                        "spotify" : "https://open.spotify.com/album/29VuFjH8b0MmLmRPeKb1cK"
                    },
                    "href" : "https://api.spotify.com/v1/albums/29VuFjH8b0MmLmRPeKb1cK",
                    "id" : "29VuFjH8b0MmLmRPeKb1cK",
                    "images" : [ {
                        "height" : 640,
                        "url" : "https://i.scdn.co/image/ab67616d0000b273e91346b8b5b48672d3b04027",
                        "width" : 640
                    }, {
                        "height" : 300,
                        "url" : "https://i.scdn.co/image/ab67616d00001e02e91346b8b5b48672d3b04027",
                        "width" : 300
                    }, {
                        "height" : 64,
                        "url" : "https://i.scdn.co/image/ab67616d00004851e91346b8b5b48672d3b04027",
                        "width" : 64
                    } ],
                    "name" : "<Queendom2> Part.1-1",
                    "release_date" : "2022-04-01",
                    "release_date_precision" : "day",
                    "total_tracks" : 5,
                    "type" : "album",
                    "uri" : "spotify:album:29VuFjH8b0MmLmRPeKb1cK"
                },
                "artists" : [ {
                    "external_urls" : {
                        "spotify" : "https://open.spotify.com/artist/7Lq3yAtwi0Z7zpxEwbQQNZ"
                    },
                    "href" : "https://api.spotify.com/v1/artists/7Lq3yAtwi0Z7zpxEwbQQNZ",
                    "id" : "7Lq3yAtwi0Z7zpxEwbQQNZ",
                    "name" : "VIVIZ",
                    "type" : "artist",
                    "uri" : "spotify:artist:7Lq3yAtwi0Z7zpxEwbQQNZ"
                } ],
                "disc_number" : 1,
                "duration_ms" : 261586,
                "episode" : false,
                "explicit" : false,
                "external_ids" : {
                    "isrc" : "KRA492200267"
                },
                "external_urls" : {
                    "spotify" : "https://open.spotify.com/track/0VCWeQuUFTz2MkivIbJVXo"
                },
                "href" : "https://api.spotify.com/v1/tracks/0VCWeQuUFTz2MkivIbJVXo",
                "id" : "0VCWeQuUFTz2MkivIbJVXo",
                "is_local" : false,
                "is_playable" : true,
                "name" : "Time for the glory",
                "popularity" : 46,
                "preview_url" : "https://p.scdn.co/mp3-preview/b7b8dccf7ede9886aead39c2ed257f7c96948534?cid=774b29d4f13844c495f206cafdad9c86",
                "track" : true,
                "track_number" : 2,
                "type" : "track",
                "uri" : "spotify:track:0VCWeQuUFTz2MkivIbJVXo"
            },
            "video_thumbnail" : {
                "url" : null
            }
        }, {
            "added_at" : "2022-09-24T18:59:23Z",
            "added_by" : {
                "external_urls" : {
                    "spotify" : "https://open.spotify.com/user/c5pe2m34y0fwcgtj83q8mfjuf"
                },
                "href" : "https://api.spotify.com/v1/users/c5pe2m34y0fwcgtj83q8mfjuf",
                "id" : "c5pe2m34y0fwcgtj83q8mfjuf",
                "type" : "user",
                "uri" : "spotify:user:c5pe2m34y0fwcgtj83q8mfjuf"
            },
            "is_local" : false,
            "primary_color" : null,
            "track" : {
                "album" : {
                    "album_type" : "single",
                    "artists" : [ {
                        "external_urls" : {
                            "spotify" : "https://open.spotify.com/artist/4cJ99wTjC60pXcfyISL9fa"
                        },
                        "href" : "https://api.spotify.com/v1/artists/4cJ99wTjC60pXcfyISL9fa",
                        "id" : "4cJ99wTjC60pXcfyISL9fa",
                        "name" : "APRIL",
                        "type" : "artist",
                        "uri" : "spotify:artist:4cJ99wTjC60pXcfyISL9fa"
                    } ],
                    "external_urls" : {
                        "spotify" : "https://open.spotify.com/album/6UOBloGQtXOHiAMjJm2LD5"
                    },
                    "href" : "https://api.spotify.com/v1/albums/6UOBloGQtXOHiAMjJm2LD5",
                    "id" : "6UOBloGQtXOHiAMjJm2LD5",
                    "images" : [ {
                        "height" : 640,
                        "url" : "https://i.scdn.co/image/ab67616d0000b27334502019848694081933092d",
                        "width" : 640
                    }, {
                        "height" : 300,
                        "url" : "https://i.scdn.co/image/ab67616d00001e0234502019848694081933092d",
                        "width" : 300
                    }, {
                        "height" : 64,
                        "url" : "https://i.scdn.co/image/ab67616d0000485134502019848694081933092d",
                        "width" : 64
                    } ],
                    "name" : "APRIL 6th Mini Album 'the Ruby'",
                    "release_date" : "2018-10-16",
                    "release_date_precision" : "day",
                    "total_tracks" : 5,
                    "type" : "album",
                    "uri" : "spotify:album:6UOBloGQtXOHiAMjJm2LD5"
                },
                "artists" : [ {
                    "external_urls" : {
                        "spotify" : "https://open.spotify.com/artist/4cJ99wTjC60pXcfyISL9fa"
                    },
                    "href" : "https://api.spotify.com/v1/artists/4cJ99wTjC60pXcfyISL9fa",
                    "id" : "4cJ99wTjC60pXcfyISL9fa",
                    "name" : "APRIL",
                    "type" : "artist",
                    "uri" : "spotify:artist:4cJ99wTjC60pXcfyISL9fa"
                } ],
                "disc_number" : 1,
                "duration_ms" : 205332,
                "episode" : false,
                "explicit" : false,
                "external_ids" : {
                    "isrc" : "KRA381801575"
                },
                "external_urls" : {
                    "spotify" : "https://open.spotify.com/track/396Dkg9z5Q1hXxKryeP9T8"
                },
                "href" : "https://api.spotify.com/v1/tracks/396Dkg9z5Q1hXxKryeP9T8",
                "id" : "396Dkg9z5Q1hXxKryeP9T8",
                "is_local" : false,
                "is_playable" : true,
                "name" : "Oh! my mistake",
                "popularity" : 56,
                "preview_url" : "https://p.scdn.co/mp3-preview/0466490bd422c44dd4578a7829af6aa0979a8ab8?cid=774b29d4f13844c495f206cafdad9c86",
                "track" : true,
                "track_number" : 2,
                "type" : "track",
                "uri" : "spotify:track:396Dkg9z5Q1hXxKryeP9T8"
            },
            "video_thumbnail" : {
                "url" : null
            }
        }, {
            "added_at" : "2022-09-24T18:59:23Z",
            "added_by" : {
                "external_urls" : {
                    "spotify" : "https://open.spotify.com/user/c5pe2m34y0fwcgtj83q8mfjuf"
                },
                "href" : "https://api.spotify.com/v1/users/c5pe2m34y0fwcgtj83q8mfjuf",
                "id" : "c5pe2m34y0fwcgtj83q8mfjuf",
                "type" : "user",
                "uri" : "spotify:user:c5pe2m34y0fwcgtj83q8mfjuf"
            },
            "is_local" : false,
            "primary_color" : null,
            "track" : {
                "album" : {
                    "album_type" : "single",
                    "artists" : [ {
                        "external_urls" : {
                            "spotify" : "https://open.spotify.com/artist/0qlWcS66ohOIi0M8JZwPft"
                        },
                        "href" : "https://api.spotify.com/v1/artists/0qlWcS66ohOIi0M8JZwPft",
                        "id" : "0qlWcS66ohOIi0M8JZwPft",
                        "name" : "GFRIEND",
                        "type" : "artist",
                        "uri" : "spotify:artist:0qlWcS66ohOIi0M8JZwPft"
                    } ],
                    "external_urls" : {
                        "spotify" : "https://open.spotify.com/album/0COnSwFb5qOhABUyWNw6Kp"
                    },
                    "href" : "https://api.spotify.com/v1/albums/0COnSwFb5qOhABUyWNw6Kp",
                    "id" : "0COnSwFb5qOhABUyWNw6Kp",
                    "images" : [ {
                        "height" : 640,
                        "url" : "https://i.scdn.co/image/ab67616d0000b273fc5b3a4f6c07140daa455a61",
                        "width" : 640
                    }, {
                        "height" : 300,
                        "url" : "https://i.scdn.co/image/ab67616d00001e02fc5b3a4f6c07140daa455a61",
                        "width" : 300
                    }, {
                        "height" : 64,
                        "url" : "https://i.scdn.co/image/ab67616d00004851fc5b3a4f6c07140daa455a61",
                        "width" : 64
                    } ],
                    "name" : "GFRIEND 3rd Mini Album 'SNOWFLAKE'",
                    "release_date" : "2016-01-25",
                    "release_date_precision" : "day",
                    "total_tracks" : 7,
                    "type" : "album",
                    "uri" : "spotify:album:0COnSwFb5qOhABUyWNw6Kp"
                },
                "artists" : [ {
                    "external_urls" : {
                        "spotify" : "https://open.spotify.com/artist/0qlWcS66ohOIi0M8JZwPft"
                    },
                    "href" : "https://api.spotify.com/v1/artists/0qlWcS66ohOIi0M8JZwPft",
                    "id" : "0qlWcS66ohOIi0M8JZwPft",
                    "name" : "GFRIEND",
                    "type" : "artist",
                    "uri" : "spotify:artist:0qlWcS66ohOIi0M8JZwPft"
                } ],
                "disc_number" : 1,
                "duration_ms" : 209104,
                "episode" : false,
                "explicit" : false,
                "external_ids" : {
                    "isrc" : "KRA381600122"
                },
                "external_urls" : {
                    "spotify" : "https://open.spotify.com/track/3CVeGXpoPKJQ9JuhPp3mpL"
                },
                "href" : "https://api.spotify.com/v1/tracks/3CVeGXpoPKJQ9JuhPp3mpL",
                "id" : "3CVeGXpoPKJQ9JuhPp3mpL",
                "is_local" : false,
                "is_playable" : true,
                "name" : "Rough",
                "popularity" : 60,
                "preview_url" : "https://p.scdn.co/mp3-preview/46b14d44cbd801cc7a7189ec365399d0a0f374f2?cid=774b29d4f13844c495f206cafdad9c86",
                "track" : true,
                "track_number" : 2,
                "type" : "track",
                "uri" : "spotify:track:3CVeGXpoPKJQ9JuhPp3mpL"
            },
            "video_thumbnail" : {
                "url" : null
            }
        }, {
            "added_at" : "2022-09-24T18:59:23Z",
            "added_by" : {
                "external_urls" : {
                    "spotify" : "https://open.spotify.com/user/c5pe2m34y0fwcgtj83q8mfjuf"
                },
                "href" : "https://api.spotify.com/v1/users/c5pe2m34y0fwcgtj83q8mfjuf",
                "id" : "c5pe2m34y0fwcgtj83q8mfjuf",
                "type" : "user",
                "uri" : "spotify:user:c5pe2m34y0fwcgtj83q8mfjuf"
            },
            "is_local" : false,
            "primary_color" : null,
            "track" : {
                "album" : {
                    "album_type" : "album",
                    "artists" : [ {
                        "external_urls" : {
                            "spotify" : "https://open.spotify.com/artist/0qlWcS66ohOIi0M8JZwPft"
                        },
                        "href" : "https://api.spotify.com/v1/artists/0qlWcS66ohOIi0M8JZwPft",
                        "id" : "0qlWcS66ohOIi0M8JZwPft",
                        "name" : "GFRIEND",
                        "type" : "artist",
                        "uri" : "spotify:artist:0qlWcS66ohOIi0M8JZwPft"
                    } ],
                    "external_urls" : {
                        "spotify" : "https://open.spotify.com/album/7jxp9UaF0Hmtmr6zuacjoO"
                    },
                    "href" : "https://api.spotify.com/v1/albums/7jxp9UaF0Hmtmr6zuacjoO",
                    "id" : "7jxp9UaF0Hmtmr6zuacjoO",
                    "images" : [ {
                        "height" : 640,
                        "url" : "https://i.scdn.co/image/ab67616d0000b2738e5856030440168b6d7e7f6b",
                        "width" : 640
                    }, {
                        "height" : 300,
                        "url" : "https://i.scdn.co/image/ab67616d00001e028e5856030440168b6d7e7f6b",
                        "width" : 300
                    }, {
                        "height" : 64,
                        "url" : "https://i.scdn.co/image/ab67616d000048518e5856030440168b6d7e7f6b",
                        "width" : 64
                    } ],
                    "name" : "GFRIEND The 2nd Album 'Time for us'",
                    "release_date" : "2019-01-14",
                    "release_date_precision" : "day",
                    "total_tracks" : 13,
                    "type" : "album",
                    "uri" : "spotify:album:7jxp9UaF0Hmtmr6zuacjoO"
                },
                "artists" : [ {
                    "external_urls" : {
                        "spotify" : "https://open.spotify.com/artist/0qlWcS66ohOIi0M8JZwPft"
                    },
                    "href" : "https://api.spotify.com/v1/artists/0qlWcS66ohOIi0M8JZwPft",
                    "id" : "0qlWcS66ohOIi0M8JZwPft",
                    "name" : "GFRIEND",
                    "type" : "artist",
                    "uri" : "spotify:artist:0qlWcS66ohOIi0M8JZwPft"
                } ],
                "disc_number" : 1,
                "duration_ms" : 216488,
                "episode" : false,
                "explicit" : false,
                "external_ids" : {
                    "isrc" : "KRA381900168"
                },
                "external_urls" : {
                    "spotify" : "https://open.spotify.com/track/1e7eOq89QU6vGYCJp9yW2L"
                },
                "href" : "https://api.spotify.com/v1/tracks/1e7eOq89QU6vGYCJp9yW2L",
                "id" : "1e7eOq89QU6vGYCJp9yW2L",
                "is_local" : false,
                "is_playable" : true,
                "name" : "Sunrise",
                "popularity" : 55,
                "preview_url" : "https://p.scdn.co/mp3-preview/e69ba47a2cd62947ef7406d61c8b78400a7bd031?cid=774b29d4f13844c495f206cafdad9c86",
                "track" : true,
                "track_number" : 1,
                "type" : "track",
                "uri" : "spotify:track:1e7eOq89QU6vGYCJp9yW2L"
            },
            "video_thumbnail" : {
                "url" : null
            }
        }, {
            "added_at" : "2022-09-24T18:59:23Z",
            "added_by" : {
                "external_urls" : {
                    "spotify" : "https://open.spotify.com/user/c5pe2m34y0fwcgtj83q8mfjuf"
                },
                "href" : "https://api.spotify.com/v1/users/c5pe2m34y0fwcgtj83q8mfjuf",
                "id" : "c5pe2m34y0fwcgtj83q8mfjuf",
                "type" : "user",
                "uri" : "spotify:user:c5pe2m34y0fwcgtj83q8mfjuf"
            },
            "is_local" : false,
            "primary_color" : null,
            "track" : {
                "album" : {
                    "album_type" : "single",
                    "artists" : [ {
                        "external_urls" : {
                            "spotify" : "https://open.spotify.com/artist/0qlWcS66ohOIi0M8JZwPft"
                        },
                        "href" : "https://api.spotify.com/v1/artists/0qlWcS66ohOIi0M8JZwPft",
                        "id" : "0qlWcS66ohOIi0M8JZwPft",
                        "name" : "GFRIEND",
                        "type" : "artist",
                        "uri" : "spotify:artist:0qlWcS66ohOIi0M8JZwPft"
                    } ],
                    "external_urls" : {
                        "spotify" : "https://open.spotify.com/album/0HLscHOZ3jQoBDwAYx1ozG"
                    },
                    "href" : "https://api.spotify.com/v1/albums/0HLscHOZ3jQoBDwAYx1ozG",
                    "id" : "0HLscHOZ3jQoBDwAYx1ozG",
                    "images" : [ {
                        "height" : 640,
                        "url" : "https://i.scdn.co/image/ab67616d0000b273d6fb8caf0f2c4468ea702a9b",
                        "width" : 640
                    }, {
                        "height" : 300,
                        "url" : "https://i.scdn.co/image/ab67616d00001e02d6fb8caf0f2c4468ea702a9b",
                        "width" : 300
                    }, {
                        "height" : 64,
                        "url" : "https://i.scdn.co/image/ab67616d00004851d6fb8caf0f2c4468ea702a9b",
                        "width" : 64
                    } ],
                    "name" : "GFRIEND The 5th Mini Album Repackage <RAINBOW>",
                    "release_date" : "2017-09-13",
                    "release_date_precision" : "day",
                    "total_tracks" : 10,
                    "type" : "album",
                    "uri" : "spotify:album:0HLscHOZ3jQoBDwAYx1ozG"
                },
                "artists" : [ {
                    "external_urls" : {
                        "spotify" : "https://open.spotify.com/artist/0qlWcS66ohOIi0M8JZwPft"
                    },
                    "href" : "https://api.spotify.com/v1/artists/0qlWcS66ohOIi0M8JZwPft",
                    "id" : "0qlWcS66ohOIi0M8JZwPft",
                    "name" : "GFRIEND",
                    "type" : "artist",
                    "uri" : "spotify:artist:0qlWcS66ohOIi0M8JZwPft"
                } ],
                "disc_number" : 1,
                "duration_ms" : 200236,
                "episode" : false,
                "explicit" : false,
                "external_ids" : {
                    "isrc" : "KRA381702207"
                },
                "external_urls" : {
                    "spotify" : "https://open.spotify.com/track/5lKCWT7RgnodM91X8g7Fa6"
                },
                "href" : "https://api.spotify.com/v1/tracks/5lKCWT7RgnodM91X8g7Fa6",
                "id" : "5lKCWT7RgnodM91X8g7Fa6",
                "is_local" : false,
                "is_playable" : true,
                "name" : "Summer Rain",
                "popularity" : 50,
                "preview_url" : "https://p.scdn.co/mp3-preview/2ce94d38e681c972eb67f62b7e956e7f8ae46a73?cid=774b29d4f13844c495f206cafdad9c86",
                "track" : true,
                "track_number" : 3,
                "type" : "track",
                "uri" : "spotify:track:5lKCWT7RgnodM91X8g7Fa6"
            },
            "video_thumbnail" : {
                "url" : null
            }
        }, {
            "added_at" : "2022-09-24T18:59:23Z",
            "added_by" : {
                "external_urls" : {
                    "spotify" : "https://open.spotify.com/user/c5pe2m34y0fwcgtj83q8mfjuf"
                },
                "href" : "https://api.spotify.com/v1/users/c5pe2m34y0fwcgtj83q8mfjuf",
                "id" : "c5pe2m34y0fwcgtj83q8mfjuf",
                "type" : "user",
                "uri" : "spotify:user:c5pe2m34y0fwcgtj83q8mfjuf"
            },
            "is_local" : false,
            "primary_color" : null,
            "track" : {
                "album" : {
                    "album_type" : "single",
                    "artists" : [ {
                        "external_urls" : {
                            "spotify" : "https://open.spotify.com/artist/0qlWcS66ohOIi0M8JZwPft"
                        },
                        "href" : "https://api.spotify.com/v1/artists/0qlWcS66ohOIi0M8JZwPft",
                        "id" : "0qlWcS66ohOIi0M8JZwPft",
                        "name" : "GFRIEND",
                        "type" : "artist",
                        "uri" : "spotify:artist:0qlWcS66ohOIi0M8JZwPft"
                    } ],
                    "external_urls" : {
                        "spotify" : "https://open.spotify.com/album/0HLscHOZ3jQoBDwAYx1ozG"
                    },
                    "href" : "https://api.spotify.com/v1/albums/0HLscHOZ3jQoBDwAYx1ozG",
                    "id" : "0HLscHOZ3jQoBDwAYx1ozG",
                    "images" : [ {
                        "height" : 640,
                        "url" : "https://i.scdn.co/image/ab67616d0000b273d6fb8caf0f2c4468ea702a9b",
                        "width" : 640
                    }, {
                        "height" : 300,
                        "url" : "https://i.scdn.co/image/ab67616d00001e02d6fb8caf0f2c4468ea702a9b",
                        "width" : 300
                    }, {
                        "height" : 64,
                        "url" : "https://i.scdn.co/image/ab67616d00004851d6fb8caf0f2c4468ea702a9b",
                        "width" : 64
                    } ],
                    "name" : "GFRIEND The 5th Mini Album Repackage <RAINBOW>",
                    "release_date" : "2017-09-13",
                    "release_date_precision" : "day",
                    "total_tracks" : 10,
                    "type" : "album",
                    "uri" : "spotify:album:0HLscHOZ3jQoBDwAYx1ozG"
                },
                "artists" : [ {
                    "external_urls" : {
                        "spotify" : "https://open.spotify.com/artist/0qlWcS66ohOIi0M8JZwPft"
                    },
                    "href" : "https://api.spotify.com/v1/artists/0qlWcS66ohOIi0M8JZwPft",
                    "id" : "0qlWcS66ohOIi0M8JZwPft",
                    "name" : "GFRIEND",
                    "type" : "artist",
                    "uri" : "spotify:artist:0qlWcS66ohOIi0M8JZwPft"
                } ],
                "disc_number" : 1,
                "duration_ms" : 232444,
                "episode" : false,
                "explicit" : false,
                "external_ids" : {
                    "isrc" : "KRA381702208"
                },
                "external_urls" : {
                    "spotify" : "https://open.spotify.com/track/7nUaEmU2Cc0MiwFQEWR4Ht"
                },
                "href" : "https://api.spotify.com/v1/tracks/7nUaEmU2Cc0MiwFQEWR4Ht",
                "id" : "7nUaEmU2Cc0MiwFQEWR4Ht",
                "is_local" : false,
                "is_playable" : true,
                "name" : "Rainbow",
                "popularity" : 42,
                "preview_url" : "https://p.scdn.co/mp3-preview/55d3454aaafb20079927b3387e210f03a4989a7a?cid=774b29d4f13844c495f206cafdad9c86",
                "track" : true,
                "track_number" : 4,
                "type" : "track",
                "uri" : "spotify:track:7nUaEmU2Cc0MiwFQEWR4Ht"
            },
            "video_thumbnail" : {
                "url" : null
            }
        }, {
            "added_at" : "2022-09-24T18:59:23Z",
            "added_by" : {
                "external_urls" : {
                    "spotify" : "https://open.spotify.com/user/c5pe2m34y0fwcgtj83q8mfjuf"
                },
                "href" : "https://api.spotify.com/v1/users/c5pe2m34y0fwcgtj83q8mfjuf",
                "id" : "c5pe2m34y0fwcgtj83q8mfjuf",
                "type" : "user",
                "uri" : "spotify:user:c5pe2m34y0fwcgtj83q8mfjuf"
            },
            "is_local" : false,
            "primary_color" : null,
            "track" : {
                "album" : {
                    "album_type" : "single",
                    "artists" : [ {
                        "external_urls" : {
                            "spotify" : "https://open.spotify.com/artist/0LyfQWJT6nXafLPZqxe9Of"
                        },
                        "href" : "https://api.spotify.com/v1/artists/0LyfQWJT6nXafLPZqxe9Of",
                        "id" : "0LyfQWJT6nXafLPZqxe9Of",
                        "name" : "Çeşitli Sanatçılar",
                        "type" : "artist",
                        "uri" : "spotify:artist:0LyfQWJT6nXafLPZqxe9Of"
                    } ],
                    "external_urls" : {
                        "spotify" : "https://open.spotify.com/album/5ZorEUDqewnEygf4FAOjhm"
                    },
                    "href" : "https://api.spotify.com/v1/albums/5ZorEUDqewnEygf4FAOjhm",
                    "id" : "5ZorEUDqewnEygf4FAOjhm",
                    "images" : [ {
                        "height" : 640,
                        "url" : "https://i.scdn.co/image/ab67616d0000b273a61cd4953f0b2314bff431e2",
                        "width" : 640
                    }, {
                        "height" : 300,
                        "url" : "https://i.scdn.co/image/ab67616d00001e02a61cd4953f0b2314bff431e2",
                        "width" : 300
                    }, {
                        "height" : 64,
                        "url" : "https://i.scdn.co/image/ab67616d00004851a61cd4953f0b2314bff431e2",
                        "width" : 64
                    } ],
                    "name" : "<Queendom2> FINAL",
                    "release_date" : "2022-05-27",
                    "release_date_precision" : "day",
                    "total_tracks" : 6,
                    "type" : "album",
                    "uri" : "spotify:album:5ZorEUDqewnEygf4FAOjhm"
                },
                "artists" : [ {
                    "external_urls" : {
                        "spotify" : "https://open.spotify.com/artist/7Lq3yAtwi0Z7zpxEwbQQNZ"
                    },
                    "href" : "https://api.spotify.com/v1/artists/7Lq3yAtwi0Z7zpxEwbQQNZ",
                    "id" : "7Lq3yAtwi0Z7zpxEwbQQNZ",
                    "name" : "VIVIZ",
                    "type" : "artist",
                    "uri" : "spotify:artist:7Lq3yAtwi0Z7zpxEwbQQNZ"
                } ],
                "disc_number" : 1,
                "duration_ms" : 253413,
                "episode" : false,
                "explicit" : false,
                "external_ids" : {
                    "isrc" : "KRA492200503"
                },
                "external_urls" : {
                    "spotify" : "https://open.spotify.com/track/5mxK8CuKCqxW7HlBjBtmRS"
                },
                "href" : "https://api.spotify.com/v1/tracks/5mxK8CuKCqxW7HlBjBtmRS",
                "id" : "5mxK8CuKCqxW7HlBjBtmRS",
                "is_local" : false,
                "is_playable" : true,
                "name" : "Red Sun!",
                "popularity" : 53,
                "preview_url" : "https://p.scdn.co/mp3-preview/e26a896a100624a63dd6a5643baa35ddf5045f0b?cid=774b29d4f13844c495f206cafdad9c86",
                "track" : true,
                "track_number" : 4,
                "type" : "track",
                "uri" : "spotify:track:5mxK8CuKCqxW7HlBjBtmRS"
            },
            "video_thumbnail" : {
                "url" : null
            }
        }, {
            "added_at" : "2022-09-24T18:59:23Z",
            "added_by" : {
                "external_urls" : {
                    "spotify" : "https://open.spotify.com/user/c5pe2m34y0fwcgtj83q8mfjuf"
                },
                "href" : "https://api.spotify.com/v1/users/c5pe2m34y0fwcgtj83q8mfjuf",
                "id" : "c5pe2m34y0fwcgtj83q8mfjuf",
                "type" : "user",
                "uri" : "spotify:user:c5pe2m34y0fwcgtj83q8mfjuf"
            },
            "is_local" : false,
            "primary_color" : null,
            "track" : {
                "album" : {
                    "album_type" : "single",
                    "artists" : [ {
                        "external_urls" : {
                            "spotify" : "https://open.spotify.com/artist/06MX3Ecb8PHyNFmq8irTWC"
                        },
                        "href" : "https://api.spotify.com/v1/artists/06MX3Ecb8PHyNFmq8irTWC",
                        "id" : "06MX3Ecb8PHyNFmq8irTWC",
                        "name" : "CSR",
                        "type" : "artist",
                        "uri" : "spotify:artist:06MX3Ecb8PHyNFmq8irTWC"
                    } ],
                    "external_urls" : {
                        "spotify" : "https://open.spotify.com/album/7gUINtQDM7WsXmrmRB8GGo"
                    },
                    "href" : "https://api.spotify.com/v1/albums/7gUINtQDM7WsXmrmRB8GGo",
                    "id" : "7gUINtQDM7WsXmrmRB8GGo",
                    "images" : [ {
                        "height" : 640,
                        "url" : "https://i.scdn.co/image/ab67616d0000b27357d68f1d97677170878fab3e",
                        "width" : 640
                    }, {
                        "height" : 300,
                        "url" : "https://i.scdn.co/image/ab67616d00001e0257d68f1d97677170878fab3e",
                        "width" : 300
                    }, {
                        "height" : 64,
                        "url" : "https://i.scdn.co/image/ab67616d0000485157d68f1d97677170878fab3e",
                        "width" : 64
                    } ],
                    "name" : "Sequence : 7272",
                    "release_date" : "2022-07-28",
                    "release_date_precision" : "day",
                    "total_tracks" : 5,
                    "type" : "album",
                    "uri" : "spotify:album:7gUINtQDM7WsXmrmRB8GGo"
                },
                "artists" : [ {
                    "external_urls" : {
                        "spotify" : "https://open.spotify.com/artist/06MX3Ecb8PHyNFmq8irTWC"
                    },
                    "href" : "https://api.spotify.com/v1/artists/06MX3Ecb8PHyNFmq8irTWC",
                    "id" : "06MX3Ecb8PHyNFmq8irTWC",
                    "name" : "CSR",
                    "type" : "artist",
                    "uri" : "spotify:artist:06MX3Ecb8PHyNFmq8irTWC"
                } ],
                "disc_number" : 1,
                "duration_ms" : 215346,
                "episode" : false,
                "explicit" : false,
                "external_ids" : {
                    "isrc" : "KRA382206389"
                },
                "external_urls" : {
                    "spotify" : "https://open.spotify.com/track/3YN1BTbPyHC4h05Bw3u2g9"
                },
                "href" : "https://api.spotify.com/v1/tracks/3YN1BTbPyHC4h05Bw3u2g9",
                "id" : "3YN1BTbPyHC4h05Bw3u2g9",
                "is_local" : false,
                "is_playable" : true,
                "name" : "Pop? Pop!",
                "popularity" : 55,
                "preview_url" : "https://p.scdn.co/mp3-preview/6302762f7ac82c1ff2c9c7634afe520624e7702a?cid=774b29d4f13844c495f206cafdad9c86",
                "track" : true,
                "track_number" : 2,
                "type" : "track",
                "uri" : "spotify:track:3YN1BTbPyHC4h05Bw3u2g9"
            },
            "video_thumbnail" : {
                "url" : null
            }
        }, {
            "added_at" : "2022-09-24T18:59:23Z",
            "added_by" : {
                "external_urls" : {
                    "spotify" : "https://open.spotify.com/user/c5pe2m34y0fwcgtj83q8mfjuf"
                },
                "href" : "https://api.spotify.com/v1/users/c5pe2m34y0fwcgtj83q8mfjuf",
                "id" : "c5pe2m34y0fwcgtj83q8mfjuf",
                "type" : "user",
                "uri" : "spotify:user:c5pe2m34y0fwcgtj83q8mfjuf"
            },
            "is_local" : false,
            "primary_color" : null,
            "track" : {
                "album" : {
                    "album_type" : "album",
                    "artists" : [ {
                        "external_urls" : {
                            "spotify" : "https://open.spotify.com/artist/2019zR22qK2RBvCqtudBaI"
                        },
                        "href" : "https://api.spotify.com/v1/artists/2019zR22qK2RBvCqtudBaI",
                        "id" : "2019zR22qK2RBvCqtudBaI",
                        "name" : "OH MY GIRL",
                        "type" : "artist",
                        "uri" : "spotify:artist:2019zR22qK2RBvCqtudBaI"
                    } ],
                    "external_urls" : {
                        "spotify" : "https://open.spotify.com/album/7nRRZFQgQKQsXG7mQIuQPA"
                    },
                    "href" : "https://api.spotify.com/v1/albums/7nRRZFQgQKQsXG7mQIuQPA",
                    "id" : "7nRRZFQgQKQsXG7mQIuQPA",
                    "images" : [ {
                        "height" : 640,
                        "url" : "https://i.scdn.co/image/ab67616d0000b273a60df50e5e461afae4ef105d",
                        "width" : 640
                    }, {
                        "height" : 300,
                        "url" : "https://i.scdn.co/image/ab67616d00001e02a60df50e5e461afae4ef105d",
                        "width" : 300
                    }, {
                        "height" : 64,
                        "url" : "https://i.scdn.co/image/ab67616d00004851a60df50e5e461afae4ef105d",
                        "width" : 64
                    } ],
                    "name" : "THE FIFTH SEASON",
                    "release_date" : "2019-05-08",
                    "release_date_precision" : "day",
                    "total_tracks" : 10,
                    "type" : "album",
                    "uri" : "spotify:album:7nRRZFQgQKQsXG7mQIuQPA"
                },
                "artists" : [ {
                    "external_urls" : {
                        "spotify" : "https://open.spotify.com/artist/2019zR22qK2RBvCqtudBaI"
                    },
                    "href" : "https://api.spotify.com/v1/artists/2019zR22qK2RBvCqtudBaI",
                    "id" : "2019zR22qK2RBvCqtudBaI",
                    "name" : "OH MY GIRL",
                    "type" : "artist",
                    "uri" : "spotify:artist:2019zR22qK2RBvCqtudBaI"
                } ],
                "disc_number" : 1,
                "duration_ms" : 240386,
                "episode" : false,
                "explicit" : false,
                "external_ids" : {
                    "isrc" : "KRA381901696"
                },
                "external_urls" : {
                    "spotify" : "https://open.spotify.com/track/2o0H0o6gWgnegtqkuOhtZk"
                },
                "href" : "https://api.spotify.com/v1/tracks/2o0H0o6gWgnegtqkuOhtZk",
                "id" : "2o0H0o6gWgnegtqkuOhtZk",
                "is_local" : false,
                "is_playable" : true,
                "name" : "5th Season (SSFWL)",
                "popularity" : 54,
                "preview_url" : "https://p.scdn.co/mp3-preview/f4a586382c50df502d3e14e50485f524900823b4?cid=774b29d4f13844c495f206cafdad9c86",
                "track" : true,
                "track_number" : 1,
                "type" : "track",
                "uri" : "spotify:track:2o0H0o6gWgnegtqkuOhtZk"
            },
            "video_thumbnail" : {
                "url" : null
            }
        }, {
            "added_at" : "2022-09-24T18:59:23Z",
            "added_by" : {
                "external_urls" : {
                    "spotify" : "https://open.spotify.com/user/c5pe2m34y0fwcgtj83q8mfjuf"
                },
                "href" : "https://api.spotify.com/v1/users/c5pe2m34y0fwcgtj83q8mfjuf",
                "id" : "c5pe2m34y0fwcgtj83q8mfjuf",
                "type" : "user",
                "uri" : "spotify:user:c5pe2m34y0fwcgtj83q8mfjuf"
            },
            "is_local" : false,
            "primary_color" : null,
            "track" : {
                "album" : {
                    "album_type" : "single",
                    "artists" : [ {
                        "external_urls" : {
                            "spotify" : "https://open.spotify.com/artist/0qlWcS66ohOIi0M8JZwPft"
                        },
                        "href" : "https://api.spotify.com/v1/artists/0qlWcS66ohOIi0M8JZwPft",
                        "id" : "0qlWcS66ohOIi0M8JZwPft",
                        "name" : "GFRIEND",
                        "type" : "artist",
                        "uri" : "spotify:artist:0qlWcS66ohOIi0M8JZwPft"
                    } ],
                    "external_urls" : {
                        "spotify" : "https://open.spotify.com/album/4YkF0cmnD2nmzdpLk1ZUUP"
                    },
                    "href" : "https://api.spotify.com/v1/albums/4YkF0cmnD2nmzdpLk1ZUUP",
                    "id" : "4YkF0cmnD2nmzdpLk1ZUUP",
                    "images" : [ {
                        "height" : 640,
                        "url" : "https://i.scdn.co/image/ab67616d0000b273674f692fd1a34630b818b39b",
                        "width" : 640
                    }, {
                        "height" : 300,
                        "url" : "https://i.scdn.co/image/ab67616d00001e02674f692fd1a34630b818b39b",
                        "width" : 300
                    }, {
                        "height" : 64,
                        "url" : "https://i.scdn.co/image/ab67616d00004851674f692fd1a34630b818b39b",
                        "width" : 64
                    } ],
                    "name" : "GFRIEND The 6th Mini Album <Time for the moon night>",
                    "release_date" : "2018-04-30",
                    "release_date_precision" : "day",
                    "total_tracks" : 8,
                    "type" : "album",
                    "uri" : "spotify:album:4YkF0cmnD2nmzdpLk1ZUUP"
                },
                "artists" : [ {
                    "external_urls" : {
                        "spotify" : "https://open.spotify.com/artist/0qlWcS66ohOIi0M8JZwPft"
                    },
                    "href" : "https://api.spotify.com/v1/artists/0qlWcS66ohOIi0M8JZwPft",
                    "id" : "0qlWcS66ohOIi0M8JZwPft",
                    "name" : "GFRIEND",
                    "type" : "artist",
                    "uri" : "spotify:artist:0qlWcS66ohOIi0M8JZwPft"
                } ],
                "disc_number" : 1,
                "duration_ms" : 222451,
                "episode" : false,
                "explicit" : false,
                "external_ids" : {
                    "isrc" : "KRA381705152"
                },
                "external_urls" : {
                    "spotify" : "https://open.spotify.com/track/5KnXbmxjbmXiuSmMclGOIi"
                },
                "href" : "https://api.spotify.com/v1/tracks/5KnXbmxjbmXiuSmMclGOIi",
                "id" : "5KnXbmxjbmXiuSmMclGOIi",
                "is_local" : false,
                "is_playable" : true,
                "name" : "Love Bug",
                "popularity" : 41,
                "preview_url" : "https://p.scdn.co/mp3-preview/7710a479a5c53e8e918078c864cebdcff15dc70d?cid=774b29d4f13844c495f206cafdad9c86",
                "track" : true,
                "track_number" : 3,
                "type" : "track",
                "uri" : "spotify:track:5KnXbmxjbmXiuSmMclGOIi"
            },
            "video_thumbnail" : {
                "url" : null
            }
        }, {
            "added_at" : "2022-09-24T18:59:23Z",
            "added_by" : {
                "external_urls" : {
                    "spotify" : "https://open.spotify.com/user/c5pe2m34y0fwcgtj83q8mfjuf"
                },
                "href" : "https://api.spotify.com/v1/users/c5pe2m34y0fwcgtj83q8mfjuf",
                "id" : "c5pe2m34y0fwcgtj83q8mfjuf",
                "type" : "user",
                "uri" : "spotify:user:c5pe2m34y0fwcgtj83q8mfjuf"
            },
            "is_local" : false,
            "primary_color" : null,
            "track" : {
                "album" : {
                    "album_type" : "single",
                    "artists" : [ {
                        "external_urls" : {
                            "spotify" : "https://open.spotify.com/artist/3g34PW5oNmDBxMVUTzx2XK"
                        },
                        "href" : "https://api.spotify.com/v1/artists/3g34PW5oNmDBxMVUTzx2XK",
                        "id" : "3g34PW5oNmDBxMVUTzx2XK",
                        "name" : "Lovelyz",
                        "type" : "artist",
                        "uri" : "spotify:artist:3g34PW5oNmDBxMVUTzx2XK"
                    } ],
                    "external_urls" : {
                        "spotify" : "https://open.spotify.com/album/4WkapgTIqmLu5HUF75X6Y8"
                    },
                    "href" : "https://api.spotify.com/v1/albums/4WkapgTIqmLu5HUF75X6Y8",
                    "id" : "4WkapgTIqmLu5HUF75X6Y8",
                    "images" : [ {
                        "height" : 640,
                        "url" : "https://i.scdn.co/image/ab67616d0000b273eb39bfee8fcdda6a9b62e56f",
                        "width" : 640
                    }, {
                        "height" : 300,
                        "url" : "https://i.scdn.co/image/ab67616d00001e02eb39bfee8fcdda6a9b62e56f",
                        "width" : 300
                    }, {
                        "height" : 64,
                        "url" : "https://i.scdn.co/image/ab67616d00004851eb39bfee8fcdda6a9b62e56f",
                        "width" : 64
                    } ],
                    "name" : "Lovelyz8",
                    "release_date" : "2015-10-01",
                    "release_date_precision" : "day",
                    "total_tracks" : 7,
                    "type" : "album",
                    "uri" : "spotify:album:4WkapgTIqmLu5HUF75X6Y8"
                },
                "artists" : [ {
                    "external_urls" : {
                        "spotify" : "https://open.spotify.com/artist/3g34PW5oNmDBxMVUTzx2XK"
                    },
                    "href" : "https://api.spotify.com/v1/artists/3g34PW5oNmDBxMVUTzx2XK",
                    "id" : "3g34PW5oNmDBxMVUTzx2XK",
                    "name" : "Lovelyz",
                    "type" : "artist",
                    "uri" : "spotify:artist:3g34PW5oNmDBxMVUTzx2XK"
                } ],
                "disc_number" : 1,
                "duration_ms" : 218474,
                "episode" : false,
                "explicit" : false,
                "external_ids" : {
                    "isrc" : "KRA381500259"
                },
                "external_urls" : {
                    "spotify" : "https://open.spotify.com/track/4Kl017IgdJxdlvgnvrpYlE"
                },
                "href" : "https://api.spotify.com/v1/tracks/4Kl017IgdJxdlvgnvrpYlE",
                "id" : "4Kl017IgdJxdlvgnvrpYlE",
                "is_local" : false,
                "is_playable" : true,
                "name" : "Ah-Choo",
                "popularity" : 49,
                "preview_url" : "https://p.scdn.co/mp3-preview/8c159cdf4e2dc3e8587d4f42093649ae66fd26c8?cid=774b29d4f13844c495f206cafdad9c86",
                "track" : true,
                "track_number" : 2,
                "type" : "track",
                "uri" : "spotify:track:4Kl017IgdJxdlvgnvrpYlE"
            },
            "video_thumbnail" : {
                "url" : null
            }
        }, {
            "added_at" : "2022-09-24T18:59:23Z",
            "added_by" : {
                "external_urls" : {
                    "spotify" : "https://open.spotify.com/user/c5pe2m34y0fwcgtj83q8mfjuf"
                },
                "href" : "https://api.spotify.com/v1/users/c5pe2m34y0fwcgtj83q8mfjuf",
                "id" : "c5pe2m34y0fwcgtj83q8mfjuf",
                "type" : "user",
                "uri" : "spotify:user:c5pe2m34y0fwcgtj83q8mfjuf"
            },
            "is_local" : false,
            "primary_color" : null,
            "track" : {
                "album" : {
                    "album_type" : "single",
                    "artists" : [ {
                        "external_urls" : {
                            "spotify" : "https://open.spotify.com/artist/3g34PW5oNmDBxMVUTzx2XK"
                        },
                        "href" : "https://api.spotify.com/v1/artists/3g34PW5oNmDBxMVUTzx2XK",
                        "id" : "3g34PW5oNmDBxMVUTzx2XK",
                        "name" : "Lovelyz",
                        "type" : "artist",
                        "uri" : "spotify:artist:3g34PW5oNmDBxMVUTzx2XK"
                    } ],
                    "external_urls" : {
                        "spotify" : "https://open.spotify.com/album/5FH6bvjJY0GCZwMgNvarAR"
                    },
                    "href" : "https://api.spotify.com/v1/albums/5FH6bvjJY0GCZwMgNvarAR",
                    "id" : "5FH6bvjJY0GCZwMgNvarAR",
                    "images" : [ {
                        "height" : 640,
                        "url" : "https://i.scdn.co/image/ab67616d0000b2735da4a65b80ff5cc46d56b93f",
                        "width" : 640
                    }, {
                        "height" : 300,
                        "url" : "https://i.scdn.co/image/ab67616d00001e025da4a65b80ff5cc46d56b93f",
                        "width" : 300
                    }, {
                        "height" : 64,
                        "url" : "https://i.scdn.co/image/ab67616d000048515da4a65b80ff5cc46d56b93f",
                        "width" : 64
                    } ],
                    "name" : "Lovelyz 6th Mini Album [Once upon a time]",
                    "release_date" : "2019-05-20",
                    "release_date_precision" : "day",
                    "total_tracks" : 6,
                    "type" : "album",
                    "uri" : "spotify:album:5FH6bvjJY0GCZwMgNvarAR"
                },
                "artists" : [ {
                    "external_urls" : {
                        "spotify" : "https://open.spotify.com/artist/3g34PW5oNmDBxMVUTzx2XK"
                    },
                    "href" : "https://api.spotify.com/v1/artists/3g34PW5oNmDBxMVUTzx2XK",
                    "id" : "3g34PW5oNmDBxMVUTzx2XK",
                    "name" : "Lovelyz",
                    "type" : "artist",
                    "uri" : "spotify:artist:3g34PW5oNmDBxMVUTzx2XK"
                } ],
                "disc_number" : 1,
                "duration_ms" : 233185,
                "episode" : false,
                "explicit" : false,
                "external_ids" : {
                    "isrc" : "KRA381901986"
                },
                "external_urls" : {
                    "spotify" : "https://open.spotify.com/track/5MehjK6vlW3nE268Ys0dxv"
                },
                "href" : "https://api.spotify.com/v1/tracks/5MehjK6vlW3nE268Ys0dxv",
                "id" : "5MehjK6vlW3nE268Ys0dxv",
                "is_local" : false,
                "is_playable" : true,
                "name" : "When We Were Us (Beautiful Days)",
                "popularity" : 34,
                "preview_url" : "https://p.scdn.co/mp3-preview/ca67afa043931f870fc304451df73a10cdd68b83?cid=774b29d4f13844c495f206cafdad9c86",
                "track" : true,
                "track_number" : 2,
                "type" : "track",
                "uri" : "spotify:track:5MehjK6vlW3nE268Ys0dxv"
            },
            "video_thumbnail" : {
                "url" : null
            }
        }, {
            "added_at" : "2022-09-24T18:59:23Z",
            "added_by" : {
                "external_urls" : {
                    "spotify" : "https://open.spotify.com/user/c5pe2m34y0fwcgtj83q8mfjuf"
                },
                "href" : "https://api.spotify.com/v1/users/c5pe2m34y0fwcgtj83q8mfjuf",
                "id" : "c5pe2m34y0fwcgtj83q8mfjuf",
                "type" : "user",
                "uri" : "spotify:user:c5pe2m34y0fwcgtj83q8mfjuf"
            },
            "is_local" : false,
            "primary_color" : null,
            "track" : {
                "album" : {
                    "album_type" : "single",
                    "artists" : [ {
                        "external_urls" : {
                            "spotify" : "https://open.spotify.com/artist/0qlWcS66ohOIi0M8JZwPft"
                        },
                        "href" : "https://api.spotify.com/v1/artists/0qlWcS66ohOIi0M8JZwPft",
                        "id" : "0qlWcS66ohOIi0M8JZwPft",
                        "name" : "GFRIEND",
                        "type" : "artist",
                        "uri" : "spotify:artist:0qlWcS66ohOIi0M8JZwPft"
                    } ],
                    "external_urls" : {
                        "spotify" : "https://open.spotify.com/album/0HLscHOZ3jQoBDwAYx1ozG"
                    },
                    "href" : "https://api.spotify.com/v1/albums/0HLscHOZ3jQoBDwAYx1ozG",
                    "id" : "0HLscHOZ3jQoBDwAYx1ozG",
                    "images" : [ {
                        "height" : 640,
                        "url" : "https://i.scdn.co/image/ab67616d0000b273d6fb8caf0f2c4468ea702a9b",
                        "width" : 640
                    }, {
                        "height" : 300,
                        "url" : "https://i.scdn.co/image/ab67616d00001e02d6fb8caf0f2c4468ea702a9b",
                        "width" : 300
                    }, {
                        "height" : 64,
                        "url" : "https://i.scdn.co/image/ab67616d00004851d6fb8caf0f2c4468ea702a9b",
                        "width" : 64
                    } ],
                    "name" : "GFRIEND The 5th Mini Album Repackage <RAINBOW>",
                    "release_date" : "2017-09-13",
                    "release_date_precision" : "day",
                    "total_tracks" : 10,
                    "type" : "album",
                    "uri" : "spotify:album:0HLscHOZ3jQoBDwAYx1ozG"
                },
                "artists" : [ {
                    "external_urls" : {
                        "spotify" : "https://open.spotify.com/artist/0qlWcS66ohOIi0M8JZwPft"
                    },
                    "href" : "https://api.spotify.com/v1/artists/0qlWcS66ohOIi0M8JZwPft",
                    "id" : "0qlWcS66ohOIi0M8JZwPft",
                    "name" : "GFRIEND",
                    "type" : "artist",
                    "uri" : "spotify:artist:0qlWcS66ohOIi0M8JZwPft"
                } ],
                "disc_number" : 1,
                "duration_ms" : 211972,
                "episode" : false,
                "explicit" : false,
                "external_ids" : {
                    "isrc" : "KRA381701700"
                },
                "external_urls" : {
                    "spotify" : "https://open.spotify.com/track/5ZO6NQ6a9Ass5Ym0McTOwl"
                },
                "href" : "https://api.spotify.com/v1/tracks/5ZO6NQ6a9Ass5Ym0McTOwl",
                "id" : "5ZO6NQ6a9Ass5Ym0McTOwl",
                "is_local" : false,
                "is_playable" : true,
                "name" : "Love Whisper",
                "popularity" : 35,
                "preview_url" : "https://p.scdn.co/mp3-preview/dc7d101397121511a68c805962ed8337bd719f1e?cid=774b29d4f13844c495f206cafdad9c86",
                "track" : true,
                "track_number" : 2,
                "type" : "track",
                "uri" : "spotify:track:5ZO6NQ6a9Ass5Ym0McTOwl"
            },
            "video_thumbnail" : {
                "url" : null
            }
        }, {
            "added_at" : "2022-09-24T18:59:23Z",
            "added_by" : {
                "external_urls" : {
                    "spotify" : "https://open.spotify.com/user/c5pe2m34y0fwcgtj83q8mfjuf"
                },
                "href" : "https://api.spotify.com/v1/users/c5pe2m34y0fwcgtj83q8mfjuf",
                "id" : "c5pe2m34y0fwcgtj83q8mfjuf",
                "type" : "user",
                "uri" : "spotify:user:c5pe2m34y0fwcgtj83q8mfjuf"
            },
            "is_local" : false,
            "primary_color" : null,
            "track" : {
                "album" : {
                    "album_type" : "album",
                    "artists" : [ {
                        "external_urls" : {
                            "spotify" : "https://open.spotify.com/artist/0qlWcS66ohOIi0M8JZwPft"
                        },
                        "href" : "https://api.spotify.com/v1/artists/0qlWcS66ohOIi0M8JZwPft",
                        "id" : "0qlWcS66ohOIi0M8JZwPft",
                        "name" : "GFRIEND",
                        "type" : "artist",
                        "uri" : "spotify:artist:0qlWcS66ohOIi0M8JZwPft"
                    } ],
                    "external_urls" : {
                        "spotify" : "https://open.spotify.com/album/0PlSM2Hml1cFANnzYu6RCg"
                    },
                    "href" : "https://api.spotify.com/v1/albums/0PlSM2Hml1cFANnzYu6RCg",
                    "id" : "0PlSM2Hml1cFANnzYu6RCg",
                    "images" : [ {
                        "height" : 640,
                        "url" : "https://i.scdn.co/image/ab67616d0000b27393f063bd7b14993d5ffb9287",
                        "width" : 640
                    }, {
                        "height" : 300,
                        "url" : "https://i.scdn.co/image/ab67616d00001e0293f063bd7b14993d5ffb9287",
                        "width" : 300
                    }, {
                        "height" : 64,
                        "url" : "https://i.scdn.co/image/ab67616d0000485193f063bd7b14993d5ffb9287",
                        "width" : 64
                    } ],
                    "name" : "GFRIEND The 1st Album 'LOL'",
                    "release_date" : "2016-07-11",
                    "release_date_precision" : "day",
                    "total_tracks" : 12,
                    "type" : "album",
                    "uri" : "spotify:album:0PlSM2Hml1cFANnzYu6RCg"
                },
                "artists" : [ {
                    "external_urls" : {
                        "spotify" : "https://open.spotify.com/artist/0qlWcS66ohOIi0M8JZwPft"
                    },
                    "href" : "https://api.spotify.com/v1/artists/0qlWcS66ohOIi0M8JZwPft",
                    "id" : "0qlWcS66ohOIi0M8JZwPft",
                    "name" : "GFRIEND",
                    "type" : "artist",
                    "uri" : "spotify:artist:0qlWcS66ohOIi0M8JZwPft"
                } ],
                "disc_number" : 1,
                "duration_ms" : 193579,
                "episode" : false,
                "explicit" : false,
                "external_ids" : {
                    "isrc" : "KRA381601301"
                },
                "external_urls" : {
                    "spotify" : "https://open.spotify.com/track/2Oi0IO8K4BEbhPUdWcjNmv"
                },
                "href" : "https://api.spotify.com/v1/tracks/2Oi0IO8K4BEbhPUdWcjNmv",
                "id" : "2Oi0IO8K4BEbhPUdWcjNmv",
                "is_local" : false,
                "is_playable" : true,
                "name" : "NAVILLERA",
                "popularity" : 57,
                "preview_url" : "https://p.scdn.co/mp3-preview/c9664c67ae42c8e8d4355e2007a79c03a227cb26?cid=774b29d4f13844c495f206cafdad9c86",
                "track" : true,
                "track_number" : 3,
                "type" : "track",
                "uri" : "spotify:track:2Oi0IO8K4BEbhPUdWcjNmv"
            },
            "video_thumbnail" : {
                "url" : null
            }
        }, {
            "added_at" : "2022-09-24T18:59:23Z",
            "added_by" : {
                "external_urls" : {
                    "spotify" : "https://open.spotify.com/user/c5pe2m34y0fwcgtj83q8mfjuf"
                },
                "href" : "https://api.spotify.com/v1/users/c5pe2m34y0fwcgtj83q8mfjuf",
                "id" : "c5pe2m34y0fwcgtj83q8mfjuf",
                "type" : "user",
                "uri" : "spotify:user:c5pe2m34y0fwcgtj83q8mfjuf"
            },
            "is_local" : false,
            "primary_color" : null,
            "track" : {
                "album" : {
                    "album_type" : "single",
                    "artists" : [ {
                        "external_urls" : {
                            "spotify" : "https://open.spotify.com/artist/7mgY992t7YTx6UELsoIMRa"
                        },
                        "href" : "https://api.spotify.com/v1/artists/7mgY992t7YTx6UELsoIMRa",
                        "id" : "7mgY992t7YTx6UELsoIMRa",
                        "name" : "woo!ah!",
                        "type" : "artist",
                        "uri" : "spotify:artist:7mgY992t7YTx6UELsoIMRa"
                    } ],
                    "external_urls" : {
                        "spotify" : "https://open.spotify.com/album/1hwykI4yYe3FTcAhl1gadk"
                    },
                    "href" : "https://api.spotify.com/v1/albums/1hwykI4yYe3FTcAhl1gadk",
                    "id" : "1hwykI4yYe3FTcAhl1gadk",
                    "images" : [ {
                        "height" : 640,
                        "url" : "https://i.scdn.co/image/ab67616d0000b273dd17db8d3e7c325762a0ad3d",
                        "width" : 640
                    }, {
                        "height" : 300,
                        "url" : "https://i.scdn.co/image/ab67616d00001e02dd17db8d3e7c325762a0ad3d",
                        "width" : 300
                    }, {
                        "height" : 64,
                        "url" : "https://i.scdn.co/image/ab67616d00004851dd17db8d3e7c325762a0ad3d",
                        "width" : 64
                    } ],
                    "name" : "Catch the Stars",
                    "release_date" : "2022-01-04",
                    "release_date_precision" : "day",
                    "total_tracks" : 1,
                    "type" : "album",
                    "uri" : "spotify:album:1hwykI4yYe3FTcAhl1gadk"
                },
                "artists" : [ {
                    "external_urls" : {
                        "spotify" : "https://open.spotify.com/artist/7mgY992t7YTx6UELsoIMRa"
                    },
                    "href" : "https://api.spotify.com/v1/artists/7mgY992t7YTx6UELsoIMRa",
                    "id" : "7mgY992t7YTx6UELsoIMRa",
                    "name" : "woo!ah!",
                    "type" : "artist",
                    "uri" : "spotify:artist:7mgY992t7YTx6UELsoIMRa"
                } ],
                "disc_number" : 1,
                "duration_ms" : 200106,
                "episode" : false,
                "explicit" : false,
                "external_ids" : {
                    "isrc" : "KRA382164531"
                },
                "external_urls" : {
                    "spotify" : "https://open.spotify.com/track/2yMIYu0O3TanoqmqpTcoEs"
                },
                "href" : "https://api.spotify.com/v1/tracks/2yMIYu0O3TanoqmqpTcoEs",
                "id" : "2yMIYu0O3TanoqmqpTcoEs",
                "is_local" : false,
                "is_playable" : true,
                "name" : "Catch the Stars",
                "popularity" : 47,
                "preview_url" : "https://p.scdn.co/mp3-preview/73a409e7c898fdd4ce598f9be3b719f96825924c?cid=774b29d4f13844c495f206cafdad9c86",
                "track" : true,
                "track_number" : 1,
                "type" : "track",
                "uri" : "spotify:track:2yMIYu0O3TanoqmqpTcoEs"
            },
            "video_thumbnail" : {
                "url" : null
            }
        }, {
            "added_at" : "2022-09-24T18:59:23Z",
            "added_by" : {
                "external_urls" : {
                    "spotify" : "https://open.spotify.com/user/c5pe2m34y0fwcgtj83q8mfjuf"
                },
                "href" : "https://api.spotify.com/v1/users/c5pe2m34y0fwcgtj83q8mfjuf",
                "id" : "c5pe2m34y0fwcgtj83q8mfjuf",
                "type" : "user",
                "uri" : "spotify:user:c5pe2m34y0fwcgtj83q8mfjuf"
            },
            "is_local" : false,
            "primary_color" : null,
            "track" : {
                "album" : {
                    "album_type" : "single",
                    "artists" : [ {
                        "external_urls" : {
                            "spotify" : "https://open.spotify.com/artist/24nUVBIlCGi4twz4nYxJum"
                        },
                        "href" : "https://api.spotify.com/v1/artists/24nUVBIlCGi4twz4nYxJum",
                        "id" : "24nUVBIlCGi4twz4nYxJum",
                        "name" : "fromis_9",
                        "type" : "artist",
                        "uri" : "spotify:artist:24nUVBIlCGi4twz4nYxJum"
                    } ],
                    "external_urls" : {
                        "spotify" : "https://open.spotify.com/album/3tm1tbyC1FgCrtMraqJXBr"
                    },
                    "href" : "https://api.spotify.com/v1/albums/3tm1tbyC1FgCrtMraqJXBr",
                    "id" : "3tm1tbyC1FgCrtMraqJXBr",
                    "images" : [ {
                        "height" : 640,
                        "url" : "https://i.scdn.co/image/ab67616d0000b2730abfd0bb227e6c5a96d624a0",
                        "width" : 640
                    }, {
                        "height" : 300,
                        "url" : "https://i.scdn.co/image/ab67616d00001e020abfd0bb227e6c5a96d624a0",
                        "width" : 300
                    }, {
                        "height" : 64,
                        "url" : "https://i.scdn.co/image/ab67616d000048510abfd0bb227e6c5a96d624a0",
                        "width" : 64
                    } ],
                    "name" : "Fromis_9 PRE-DEBUT Single",
                    "release_date" : "2017-11-30",
                    "release_date_precision" : "day",
                    "total_tracks" : 1,
                    "type" : "album",
                    "uri" : "spotify:album:3tm1tbyC1FgCrtMraqJXBr"
                },
                "artists" : [ {
                    "external_urls" : {
                        "spotify" : "https://open.spotify.com/artist/24nUVBIlCGi4twz4nYxJum"
                    },
                    "href" : "https://api.spotify.com/v1/artists/24nUVBIlCGi4twz4nYxJum",
                    "id" : "24nUVBIlCGi4twz4nYxJum",
                    "name" : "fromis_9",
                    "type" : "artist",
                    "uri" : "spotify:artist:24nUVBIlCGi4twz4nYxJum"
                } ],
                "disc_number" : 1,
                "duration_ms" : 191378,
                "episode" : false,
                "explicit" : false,
                "external_ids" : {
                    "isrc" : "KRA491700396"
                },
                "external_urls" : {
                    "spotify" : "https://open.spotify.com/track/1VNuUzsWTp1WGf3mMeItvp"
                },
                "href" : "https://api.spotify.com/v1/tracks/1VNuUzsWTp1WGf3mMeItvp",
                "id" : "1VNuUzsWTp1WGf3mMeItvp",
                "is_local" : false,
                "is_playable" : true,
                "name" : "Glass Shoes",
                "popularity" : 47,
                "preview_url" : "https://p.scdn.co/mp3-preview/7171c99692ebee199b1393571f0ef8bc978e4275?cid=774b29d4f13844c495f206cafdad9c86",
                "track" : true,
                "track_number" : 1,
                "type" : "track",
                "uri" : "spotify:track:1VNuUzsWTp1WGf3mMeItvp"
            },
            "video_thumbnail" : {
                "url" : null
            }
        }, {
            "added_at" : "2022-09-24T18:59:23Z",
            "added_by" : {
                "external_urls" : {
                    "spotify" : "https://open.spotify.com/user/c5pe2m34y0fwcgtj83q8mfjuf"
                },
                "href" : "https://api.spotify.com/v1/users/c5pe2m34y0fwcgtj83q8mfjuf",
                "id" : "c5pe2m34y0fwcgtj83q8mfjuf",
                "type" : "user",
                "uri" : "spotify:user:c5pe2m34y0fwcgtj83q8mfjuf"
            },
            "is_local" : false,
            "primary_color" : null,
            "track" : {
                "album" : {
                    "album_type" : "single",
                    "artists" : [ {
                        "external_urls" : {
                            "spotify" : "https://open.spotify.com/artist/6hhqsQZhtp9hfaZhSd0VSD"
                        },
                        "href" : "https://api.spotify.com/v1/artists/6hhqsQZhtp9hfaZhSd0VSD",
                        "id" : "6hhqsQZhtp9hfaZhSd0VSD",
                        "name" : "WJSN",
                        "type" : "artist",
                        "uri" : "spotify:artist:6hhqsQZhtp9hfaZhSd0VSD"
                    } ],
                    "external_urls" : {
                        "spotify" : "https://open.spotify.com/album/4r7YKwLYxQDH61GddP5l3j"
                    },
                    "href" : "https://api.spotify.com/v1/albums/4r7YKwLYxQDH61GddP5l3j",
                    "id" : "4r7YKwLYxQDH61GddP5l3j",
                    "images" : [ {
                        "height" : 640,
                        "url" : "https://i.scdn.co/image/ab67616d0000b273bc7d648d16a092cfe6f0c6ea",
                        "width" : 640
                    }, {
                        "height" : 300,
                        "url" : "https://i.scdn.co/image/ab67616d00001e02bc7d648d16a092cfe6f0c6ea",
                        "width" : 300
                    }, {
                        "height" : 64,
                        "url" : "https://i.scdn.co/image/ab67616d00004851bc7d648d16a092cfe6f0c6ea",
                        "width" : 64
                    } ],
                    "name" : "WJ PLEASE?",
                    "release_date" : "2018-09-19",
                    "release_date_precision" : "day",
                    "total_tracks" : 6,
                    "type" : "album",
                    "uri" : "spotify:album:4r7YKwLYxQDH61GddP5l3j"
                },
                "artists" : [ {
                    "external_urls" : {
                        "spotify" : "https://open.spotify.com/artist/6hhqsQZhtp9hfaZhSd0VSD"
                    },
                    "href" : "https://api.spotify.com/v1/artists/6hhqsQZhtp9hfaZhSd0VSD",
                    "id" : "6hhqsQZhtp9hfaZhSd0VSD",
                    "name" : "WJSN",
                    "type" : "artist",
                    "uri" : "spotify:artist:6hhqsQZhtp9hfaZhSd0VSD"
                } ],
                "disc_number" : 1,
                "duration_ms" : 224930,
                "episode" : false,
                "explicit" : false,
                "external_ids" : {
                    "isrc" : "KRA381801230"
                },
                "external_urls" : {
                    "spotify" : "https://open.spotify.com/track/20yOiJHRQGirFYehRSIb6i"
                },
                "href" : "https://api.spotify.com/v1/tracks/20yOiJHRQGirFYehRSIb6i",
                "id" : "20yOiJHRQGirFYehRSIb6i",
                "is_local" : false,
                "is_playable" : true,
                "name" : "Save Me, Save You",
                "popularity" : 55,
                "preview_url" : "https://p.scdn.co/mp3-preview/4065ad0f528863805ca65f029b0dcd749e09bd43?cid=774b29d4f13844c495f206cafdad9c86",
                "track" : true,
                "track_number" : 1,
                "type" : "track",
                "uri" : "spotify:track:20yOiJHRQGirFYehRSIb6i"
            },
            "video_thumbnail" : {
                "url" : null
            }
        }, {
            "added_at" : "2022-09-24T18:59:23Z",
            "added_by" : {
                "external_urls" : {
                    "spotify" : "https://open.spotify.com/user/c5pe2m34y0fwcgtj83q8mfjuf"
                },
                "href" : "https://api.spotify.com/v1/users/c5pe2m34y0fwcgtj83q8mfjuf",
                "id" : "c5pe2m34y0fwcgtj83q8mfjuf",
                "type" : "user",
                "uri" : "spotify:user:c5pe2m34y0fwcgtj83q8mfjuf"
            },
            "is_local" : false,
            "primary_color" : null,
            "track" : {
                "album" : {
                    "album_type" : "single",
                    "artists" : [ {
                        "external_urls" : {
                            "spotify" : "https://open.spotify.com/artist/0qlWcS66ohOIi0M8JZwPft"
                        },
                        "href" : "https://api.spotify.com/v1/artists/0qlWcS66ohOIi0M8JZwPft",
                        "id" : "0qlWcS66ohOIi0M8JZwPft",
                        "name" : "GFRIEND",
                        "type" : "artist",
                        "uri" : "spotify:artist:0qlWcS66ohOIi0M8JZwPft"
                    } ],
                    "external_urls" : {
                        "spotify" : "https://open.spotify.com/album/3yOVupLmLpD7Qosl08ow0u"
                    },
                    "href" : "https://api.spotify.com/v1/albums/3yOVupLmLpD7Qosl08ow0u",
                    "id" : "3yOVupLmLpD7Qosl08ow0u",
                    "images" : [ {
                        "height" : 640,
                        "url" : "https://i.scdn.co/image/ab67616d0000b27303d5d3c9a2d4360379c2c78b",
                        "width" : 640
                    }, {
                        "height" : 300,
                        "url" : "https://i.scdn.co/image/ab67616d00001e0203d5d3c9a2d4360379c2c78b",
                        "width" : 300
                    }, {
                        "height" : 64,
                        "url" : "https://i.scdn.co/image/ab67616d0000485103d5d3c9a2d4360379c2c78b",
                        "width" : 64
                    } ],
                    "name" : "GFRIEND 1st Mini Album 'Season Of Glass'",
                    "release_date" : "2015-01-15",
                    "release_date_precision" : "day",
                    "total_tracks" : 5,
                    "type" : "album",
                    "uri" : "spotify:album:3yOVupLmLpD7Qosl08ow0u"
                },
                "artists" : [ {
                    "external_urls" : {
                        "spotify" : "https://open.spotify.com/artist/0qlWcS66ohOIi0M8JZwPft"
                    },
                    "href" : "https://api.spotify.com/v1/artists/0qlWcS66ohOIi0M8JZwPft",
                    "id" : "0qlWcS66ohOIi0M8JZwPft",
                    "name" : "GFRIEND",
                    "type" : "artist",
                    "uri" : "spotify:artist:0qlWcS66ohOIi0M8JZwPft"
                } ],
                "disc_number" : 1,
                "duration_ms" : 203482,
                "episode" : false,
                "explicit" : false,
                "external_ids" : {
                    "isrc" : "KRB471500069"
                },
                "external_urls" : {
                    "spotify" : "https://open.spotify.com/track/2rFRa1eJ8RqlINbJCZwdtt"
                },
                "href" : "https://api.spotify.com/v1/tracks/2rFRa1eJ8RqlINbJCZwdtt",
                "id" : "2rFRa1eJ8RqlINbJCZwdtt",
                "is_local" : false,
                "is_playable" : true,
                "name" : "Glass Bead",
                "popularity" : 53,
                "preview_url" : "https://p.scdn.co/mp3-preview/a2e3ba9ebdb43ae0974e806f8c689da36b50ec2b?cid=774b29d4f13844c495f206cafdad9c86",
                "track" : true,
                "track_number" : 2,
                "type" : "track",
                "uri" : "spotify:track:2rFRa1eJ8RqlINbJCZwdtt"
            },
            "video_thumbnail" : {
                "url" : null
            }
        }, {
            "added_at" : "2022-09-24T18:59:23Z",
            "added_by" : {
                "external_urls" : {
                    "spotify" : "https://open.spotify.com/user/c5pe2m34y0fwcgtj83q8mfjuf"
                },
                "href" : "https://api.spotify.com/v1/users/c5pe2m34y0fwcgtj83q8mfjuf",
                "id" : "c5pe2m34y0fwcgtj83q8mfjuf",
                "type" : "user",
                "uri" : "spotify:user:c5pe2m34y0fwcgtj83q8mfjuf"
            },
            "is_local" : false,
            "primary_color" : null,
            "track" : {
                "album" : {
                    "album_type" : "single",
                    "artists" : [ {
                        "external_urls" : {
                            "spotify" : "https://open.spotify.com/artist/0qlWcS66ohOIi0M8JZwPft"
                        },
                        "href" : "https://api.spotify.com/v1/artists/0qlWcS66ohOIi0M8JZwPft",
                        "id" : "0qlWcS66ohOIi0M8JZwPft",
                        "name" : "GFRIEND",
                        "type" : "artist",
                        "uri" : "spotify:artist:0qlWcS66ohOIi0M8JZwPft"
                    } ],
                    "external_urls" : {
                        "spotify" : "https://open.spotify.com/album/0COnSwFb5qOhABUyWNw6Kp"
                    },
                    "href" : "https://api.spotify.com/v1/albums/0COnSwFb5qOhABUyWNw6Kp",
                    "id" : "0COnSwFb5qOhABUyWNw6Kp",
                    "images" : [ {
                        "height" : 640,
                        "url" : "https://i.scdn.co/image/ab67616d0000b273fc5b3a4f6c07140daa455a61",
                        "width" : 640
                    }, {
                        "height" : 300,
                        "url" : "https://i.scdn.co/image/ab67616d00001e02fc5b3a4f6c07140daa455a61",
                        "width" : 300
                    }, {
                        "height" : 64,
                        "url" : "https://i.scdn.co/image/ab67616d00004851fc5b3a4f6c07140daa455a61",
                        "width" : 64
                    } ],
                    "name" : "GFRIEND 3rd Mini Album 'SNOWFLAKE'",
                    "release_date" : "2016-01-25",
                    "release_date_precision" : "day",
                    "total_tracks" : 7,
                    "type" : "album",
                    "uri" : "spotify:album:0COnSwFb5qOhABUyWNw6Kp"
                },
                "artists" : [ {
                    "external_urls" : {
                        "spotify" : "https://open.spotify.com/artist/0qlWcS66ohOIi0M8JZwPft"
                    },
                    "href" : "https://api.spotify.com/v1/artists/0qlWcS66ohOIi0M8JZwPft",
                    "id" : "0qlWcS66ohOIi0M8JZwPft",
                    "name" : "GFRIEND",
                    "type" : "artist",
                    "uri" : "spotify:artist:0qlWcS66ohOIi0M8JZwPft"
                } ],
                "disc_number" : 1,
                "duration_ms" : 188743,
                "episode" : false,
                "explicit" : false,
                "external_ids" : {
                    "isrc" : "KRA381600124"
                },
                "external_urls" : {
                    "spotify" : "https://open.spotify.com/track/7DtzD0e13U040fJjyDeTnE"
                },
                "href" : "https://api.spotify.com/v1/tracks/7DtzD0e13U040fJjyDeTnE",
                "id" : "7DtzD0e13U040fJjyDeTnE",
                "is_local" : false,
                "is_playable" : true,
                "name" : "Luv Star",
                "popularity" : 36,
                "preview_url" : "https://p.scdn.co/mp3-preview/e4642d2b24734ff54436e165ad7ff365aca00303?cid=774b29d4f13844c495f206cafdad9c86",
                "track" : true,
                "track_number" : 4,
                "type" : "track",
                "uri" : "spotify:track:7DtzD0e13U040fJjyDeTnE"
            },
            "video_thumbnail" : {
                "url" : null
            }
        }, {
            "added_at" : "2022-09-24T18:59:23Z",
            "added_by" : {
                "external_urls" : {
                    "spotify" : "https://open.spotify.com/user/c5pe2m34y0fwcgtj83q8mfjuf"
                },
                "href" : "https://api.spotify.com/v1/users/c5pe2m34y0fwcgtj83q8mfjuf",
                "id" : "c5pe2m34y0fwcgtj83q8mfjuf",
                "type" : "user",
                "uri" : "spotify:user:c5pe2m34y0fwcgtj83q8mfjuf"
            },
            "is_local" : false,
            "primary_color" : null,
            "track" : {
                "album" : {
                    "album_type" : "album",
                    "artists" : [ {
                        "external_urls" : {
                            "spotify" : "https://open.spotify.com/artist/1trxIdSWT17BoKETp2q5oP"
                        },
                        "href" : "https://api.spotify.com/v1/artists/1trxIdSWT17BoKETp2q5oP",
                        "id" : "1trxIdSWT17BoKETp2q5oP",
                        "name" : "Kim Yon Ja",
                        "type" : "artist",
                        "uri" : "spotify:artist:1trxIdSWT17BoKETp2q5oP"
                    }, {
                        "external_urls" : {
                            "spotify" : "https://open.spotify.com/artist/5Pcx98OUnL52aGZRRQx5v8"
                        },
                        "href" : "https://api.spotify.com/v1/artists/5Pcx98OUnL52aGZRRQx5v8",
                        "id" : "5Pcx98OUnL52aGZRRQx5v8",
                        "name" : "DIA",
                        "type" : "artist",
                        "uri" : "spotify:artist:5Pcx98OUnL52aGZRRQx5v8"
                    }, {
                        "external_urls" : {
                            "spotify" : "https://open.spotify.com/artist/5LwiBgLTllBUiqQGNiQ7jY"
                        },
                        "href" : "https://api.spotify.com/v1/artists/5LwiBgLTllBUiqQGNiQ7jY",
                        "id" : "5LwiBgLTllBUiqQGNiQ7jY",
                        "name" : "Hong Jin Young",
                        "type" : "artist",
                        "uri" : "spotify:artist:5LwiBgLTllBUiqQGNiQ7jY"
                    } ],
                    "external_urls" : {
                        "spotify" : "https://open.spotify.com/album/6iJzdFBjkKgszQ4GMNzZer"
                    },
                    "href" : "https://api.spotify.com/v1/albums/6iJzdFBjkKgszQ4GMNzZer",
                    "id" : "6iJzdFBjkKgszQ4GMNzZer",
                    "images" : [ {
                        "height" : 640,
                        "url" : "https://i.scdn.co/image/ab67616d0000b273f179b7cfae858ced4e46b296",
                        "width" : 640
                    }, {
                        "height" : 300,
                        "url" : "https://i.scdn.co/image/ab67616d00001e02f179b7cfae858ced4e46b296",
                        "width" : 300
                    }, {
                        "height" : 64,
                        "url" : "https://i.scdn.co/image/ab67616d00004851f179b7cfae858ced4e46b296",
                        "width" : 64
                    } ],
                    "name" : "YOLO",
                    "release_date" : "2017-04-19",
                    "release_date_precision" : "day",
                    "total_tracks" : 14,
                    "type" : "album",
                    "uri" : "spotify:album:6iJzdFBjkKgszQ4GMNzZer"
                },
                "artists" : [ {
                    "external_urls" : {
                        "spotify" : "https://open.spotify.com/artist/5Pcx98OUnL52aGZRRQx5v8"
                    },
                    "href" : "https://api.spotify.com/v1/artists/5Pcx98OUnL52aGZRRQx5v8",
                    "id" : "5Pcx98OUnL52aGZRRQx5v8",
                    "name" : "DIA",
                    "type" : "artist",
                    "uri" : "spotify:artist:5Pcx98OUnL52aGZRRQx5v8"
                } ],
                "disc_number" : 1,
                "duration_ms" : 193813,
                "episode" : false,
                "explicit" : false,
                "external_ids" : {
                    "isrc" : "KRA381700829"
                },
                "external_urls" : {
                    "spotify" : "https://open.spotify.com/track/6JaBTAsn2xx1zk54jcNpvq"
                },
                "href" : "https://api.spotify.com/v1/tracks/6JaBTAsn2xx1zk54jcNpvq",
                "id" : "6JaBTAsn2xx1zk54jcNpvq",
                "is_local" : false,
                "is_playable" : true,
                "name" : "Will you go out with me",
                "popularity" : 46,
                "preview_url" : "https://p.scdn.co/mp3-preview/8004f66022d36f5b3d06e01a57e36aa8a5bd7c92?cid=774b29d4f13844c495f206cafdad9c86",
                "track" : true,
                "track_number" : 1,
                "type" : "track",
                "uri" : "spotify:track:6JaBTAsn2xx1zk54jcNpvq"
            },
            "video_thumbnail" : {
                "url" : null
            }
        }, {
            "added_at" : "2022-09-24T18:59:23Z",
            "added_by" : {
                "external_urls" : {
                    "spotify" : "https://open.spotify.com/user/c5pe2m34y0fwcgtj83q8mfjuf"
                },
                "href" : "https://api.spotify.com/v1/users/c5pe2m34y0fwcgtj83q8mfjuf",
                "id" : "c5pe2m34y0fwcgtj83q8mfjuf",
                "type" : "user",
                "uri" : "spotify:user:c5pe2m34y0fwcgtj83q8mfjuf"
            },
            "is_local" : false,
            "primary_color" : null,
            "track" : {
                "album" : {
                    "album_type" : "single",
                    "artists" : [ {
                        "external_urls" : {
                            "spotify" : "https://open.spotify.com/artist/0qlWcS66ohOIi0M8JZwPft"
                        },
                        "href" : "https://api.spotify.com/v1/artists/0qlWcS66ohOIi0M8JZwPft",
                        "id" : "0qlWcS66ohOIi0M8JZwPft",
                        "name" : "GFRIEND",
                        "type" : "artist",
                        "uri" : "spotify:artist:0qlWcS66ohOIi0M8JZwPft"
                    } ],
                    "external_urls" : {
                        "spotify" : "https://open.spotify.com/album/4YkF0cmnD2nmzdpLk1ZUUP"
                    },
                    "href" : "https://api.spotify.com/v1/albums/4YkF0cmnD2nmzdpLk1ZUUP",
                    "id" : "4YkF0cmnD2nmzdpLk1ZUUP",
                    "images" : [ {
                        "height" : 640,
                        "url" : "https://i.scdn.co/image/ab67616d0000b273674f692fd1a34630b818b39b",
                        "width" : 640
                    }, {
                        "height" : 300,
                        "url" : "https://i.scdn.co/image/ab67616d00001e02674f692fd1a34630b818b39b",
                        "width" : 300
                    }, {
                        "height" : 64,
                        "url" : "https://i.scdn.co/image/ab67616d00004851674f692fd1a34630b818b39b",
                        "width" : 64
                    } ],
                    "name" : "GFRIEND The 6th Mini Album <Time for the moon night>",
                    "release_date" : "2018-04-30",
                    "release_date_precision" : "day",
                    "total_tracks" : 8,
                    "type" : "album",
                    "uri" : "spotify:album:4YkF0cmnD2nmzdpLk1ZUUP"
                },
                "artists" : [ {
                    "external_urls" : {
                        "spotify" : "https://open.spotify.com/artist/0qlWcS66ohOIi0M8JZwPft"
                    },
                    "href" : "https://api.spotify.com/v1/artists/0qlWcS66ohOIi0M8JZwPft",
                    "id" : "0qlWcS66ohOIi0M8JZwPft",
                    "name" : "GFRIEND",
                    "type" : "artist",
                    "uri" : "spotify:artist:0qlWcS66ohOIi0M8JZwPft"
                } ],
                "disc_number" : 1,
                "duration_ms" : 226698,
                "episode" : false,
                "explicit" : false,
                "external_ids" : {
                    "isrc" : "KRA381705151"
                },
                "external_urls" : {
                    "spotify" : "https://open.spotify.com/track/2jL9sjFc2LZsQBGbQnrjXR"
                },
                "href" : "https://api.spotify.com/v1/tracks/2jL9sjFc2LZsQBGbQnrjXR",
                "id" : "2jL9sjFc2LZsQBGbQnrjXR",
                "is_local" : false,
                "is_playable" : true,
                "name" : "Time for the moon night",
                "popularity" : 58,
                "preview_url" : "https://p.scdn.co/mp3-preview/48eb6c0c264bdef376d50bf596a6be62f04ea18b?cid=774b29d4f13844c495f206cafdad9c86",
                "track" : true,
                "track_number" : 2,
                "type" : "track",
                "uri" : "spotify:track:2jL9sjFc2LZsQBGbQnrjXR"
            },
            "video_thumbnail" : {
                "url" : null
            }
        }, {
            "added_at" : "2022-09-24T18:59:23Z",
            "added_by" : {
                "external_urls" : {
                    "spotify" : "https://open.spotify.com/user/c5pe2m34y0fwcgtj83q8mfjuf"
                },
                "href" : "https://api.spotify.com/v1/users/c5pe2m34y0fwcgtj83q8mfjuf",
                "id" : "c5pe2m34y0fwcgtj83q8mfjuf",
                "type" : "user",
                "uri" : "spotify:user:c5pe2m34y0fwcgtj83q8mfjuf"
            },
            "is_local" : false,
            "primary_color" : null,
            "track" : {
                "album" : {
                    "album_type" : "single",
                    "artists" : [ {
                        "external_urls" : {
                            "spotify" : "https://open.spotify.com/artist/0qlWcS66ohOIi0M8JZwPft"
                        },
                        "href" : "https://api.spotify.com/v1/artists/0qlWcS66ohOIi0M8JZwPft",
                        "id" : "0qlWcS66ohOIi0M8JZwPft",
                        "name" : "GFRIEND",
                        "type" : "artist",
                        "uri" : "spotify:artist:0qlWcS66ohOIi0M8JZwPft"
                    } ],
                    "external_urls" : {
                        "spotify" : "https://open.spotify.com/album/4YkF0cmnD2nmzdpLk1ZUUP"
                    },
                    "href" : "https://api.spotify.com/v1/albums/4YkF0cmnD2nmzdpLk1ZUUP",
                    "id" : "4YkF0cmnD2nmzdpLk1ZUUP",
                    "images" : [ {
                        "height" : 640,
                        "url" : "https://i.scdn.co/image/ab67616d0000b273674f692fd1a34630b818b39b",
                        "width" : 640
                    }, {
                        "height" : 300,
                        "url" : "https://i.scdn.co/image/ab67616d00001e02674f692fd1a34630b818b39b",
                        "width" : 300
                    }, {
                        "height" : 64,
                        "url" : "https://i.scdn.co/image/ab67616d00004851674f692fd1a34630b818b39b",
                        "width" : 64
                    } ],
                    "name" : "GFRIEND The 6th Mini Album <Time for the moon night>",
                    "release_date" : "2018-04-30",
                    "release_date_precision" : "day",
                    "total_tracks" : 8,
                    "type" : "album",
                    "uri" : "spotify:album:4YkF0cmnD2nmzdpLk1ZUUP"
                },
                "artists" : [ {
                    "external_urls" : {
                        "spotify" : "https://open.spotify.com/artist/0qlWcS66ohOIi0M8JZwPft"
                    },
                    "href" : "https://api.spotify.com/v1/artists/0qlWcS66ohOIi0M8JZwPft",
                    "id" : "0qlWcS66ohOIi0M8JZwPft",
                    "name" : "GFRIEND",
                    "type" : "artist",
                    "uri" : "spotify:artist:0qlWcS66ohOIi0M8JZwPft"
                } ],
                "disc_number" : 1,
                "duration_ms" : 195742,
                "episode" : false,
                "explicit" : false,
                "external_ids" : {
                    "isrc" : "KRA381705153"
                },
                "external_urls" : {
                    "spotify" : "https://open.spotify.com/track/6ecibjX0dIfdSVYpg7Q95o"
                },
                "href" : "https://api.spotify.com/v1/tracks/6ecibjX0dIfdSVYpg7Q95o",
                "id" : "6ecibjX0dIfdSVYpg7Q95o",
                "is_local" : false,
                "is_playable" : true,
                "name" : "Flower Garden",
                "popularity" : 39,
                "preview_url" : "https://p.scdn.co/mp3-preview/3887158f31cb46a8b2ba5d5c45aa8aa191ec181d?cid=774b29d4f13844c495f206cafdad9c86",
                "track" : true,
                "track_number" : 4,
                "type" : "track",
                "uri" : "spotify:track:6ecibjX0dIfdSVYpg7Q95o"
            },
            "video_thumbnail" : {
                "url" : null
            }
        }, {
            "added_at" : "2022-09-24T18:59:23Z",
            "added_by" : {
                "external_urls" : {
                    "spotify" : "https://open.spotify.com/user/c5pe2m34y0fwcgtj83q8mfjuf"
                },
                "href" : "https://api.spotify.com/v1/users/c5pe2m34y0fwcgtj83q8mfjuf",
                "id" : "c5pe2m34y0fwcgtj83q8mfjuf",
                "type" : "user",
                "uri" : "spotify:user:c5pe2m34y0fwcgtj83q8mfjuf"
            },
            "is_local" : false,
            "primary_color" : null,
            "track" : {
                "album" : {
                    "album_type" : "album",
                    "artists" : [ {
                        "external_urls" : {
                            "spotify" : "https://open.spotify.com/artist/0qlWcS66ohOIi0M8JZwPft"
                        },
                        "href" : "https://api.spotify.com/v1/artists/0qlWcS66ohOIi0M8JZwPft",
                        "id" : "0qlWcS66ohOIi0M8JZwPft",
                        "name" : "GFRIEND",
                        "type" : "artist",
                        "uri" : "spotify:artist:0qlWcS66ohOIi0M8JZwPft"
                    } ],
                    "external_urls" : {
                        "spotify" : "https://open.spotify.com/album/7jxp9UaF0Hmtmr6zuacjoO"
                    },
                    "href" : "https://api.spotify.com/v1/albums/7jxp9UaF0Hmtmr6zuacjoO",
                    "id" : "7jxp9UaF0Hmtmr6zuacjoO",
                    "images" : [ {
                        "height" : 640,
                        "url" : "https://i.scdn.co/image/ab67616d0000b2738e5856030440168b6d7e7f6b",
                        "width" : 640
                    }, {
                        "height" : 300,
                        "url" : "https://i.scdn.co/image/ab67616d00001e028e5856030440168b6d7e7f6b",
                        "width" : 300
                    }, {
                        "height" : 64,
                        "url" : "https://i.scdn.co/image/ab67616d000048518e5856030440168b6d7e7f6b",
                        "width" : 64
                    } ],
                    "name" : "GFRIEND The 2nd Album 'Time for us'",
                    "release_date" : "2019-01-14",
                    "release_date_precision" : "day",
                    "total_tracks" : 13,
                    "type" : "album",
                    "uri" : "spotify:album:7jxp9UaF0Hmtmr6zuacjoO"
                },
                "artists" : [ {
                    "external_urls" : {
                        "spotify" : "https://open.spotify.com/artist/0qlWcS66ohOIi0M8JZwPft"
                    },
                    "href" : "https://api.spotify.com/v1/artists/0qlWcS66ohOIi0M8JZwPft",
                    "id" : "0qlWcS66ohOIi0M8JZwPft",
                    "name" : "GFRIEND",
                    "type" : "artist",
                    "uri" : "spotify:artist:0qlWcS66ohOIi0M8JZwPft"
                } ],
                "disc_number" : 1,
                "duration_ms" : 213460,
                "episode" : false,
                "explicit" : false,
                "external_ids" : {
                    "isrc" : "KRA381900169"
                },
                "external_urls" : {
                    "spotify" : "https://open.spotify.com/track/1CSLSt0dP5CJqADXsJbVcx"
                },
                "href" : "https://api.spotify.com/v1/tracks/1CSLSt0dP5CJqADXsJbVcx",
                "id" : "1CSLSt0dP5CJqADXsJbVcx",
                "is_local" : false,
                "is_playable" : true,
                "name" : "You are not alone",
                "popularity" : 42,
                "preview_url" : "https://p.scdn.co/mp3-preview/7a43f2d0d6e4dcfa36da69b7cc9c06d05e3701e2?cid=774b29d4f13844c495f206cafdad9c86",
                "track" : true,
                "track_number" : 2,
                "type" : "track",
                "uri" : "spotify:track:1CSLSt0dP5CJqADXsJbVcx"
            },
            "video_thumbnail" : {
                "url" : null
            }
        }, {
            "added_at" : "2022-09-24T18:59:23Z",
            "added_by" : {
                "external_urls" : {
                    "spotify" : "https://open.spotify.com/user/c5pe2m34y0fwcgtj83q8mfjuf"
                },
                "href" : "https://api.spotify.com/v1/users/c5pe2m34y0fwcgtj83q8mfjuf",
                "id" : "c5pe2m34y0fwcgtj83q8mfjuf",
                "type" : "user",
                "uri" : "spotify:user:c5pe2m34y0fwcgtj83q8mfjuf"
            },
            "is_local" : false,
            "primary_color" : null,
            "track" : {
                "album" : {
                    "album_type" : "single",
                    "artists" : [ {
                        "external_urls" : {
                            "spotify" : "https://open.spotify.com/artist/2uWcrwgWmZcQc3IPBs3tfU"
                        },
                        "href" : "https://api.spotify.com/v1/artists/2uWcrwgWmZcQc3IPBs3tfU",
                        "id" : "2uWcrwgWmZcQc3IPBs3tfU",
                        "name" : "Apink",
                        "type" : "artist",
                        "uri" : "spotify:artist:2uWcrwgWmZcQc3IPBs3tfU"
                    } ],
                    "external_urls" : {
                        "spotify" : "https://open.spotify.com/album/5BrUPvAXYFeCqLKoTjSw3o"
                    },
                    "href" : "https://api.spotify.com/v1/albums/5BrUPvAXYFeCqLKoTjSw3o",
                    "id" : "5BrUPvAXYFeCqLKoTjSw3o",
                    "images" : [ {
                        "height" : 640,
                        "url" : "https://i.scdn.co/image/ab67616d0000b27359ce911310b702e7302b028b",
                        "width" : 640
                    }, {
                        "height" : 300,
                        "url" : "https://i.scdn.co/image/ab67616d00001e0259ce911310b702e7302b028b",
                        "width" : 300
                    }, {
                        "height" : 64,
                        "url" : "https://i.scdn.co/image/ab67616d0000485159ce911310b702e7302b028b",
                        "width" : 64
                    } ],
                    "name" : "Pink Blossom",
                    "release_date" : "2014-03-31",
                    "release_date_precision" : "day",
                    "total_tracks" : 7,
                    "type" : "album",
                    "uri" : "spotify:album:5BrUPvAXYFeCqLKoTjSw3o"
                },
                "artists" : [ {
                    "external_urls" : {
                        "spotify" : "https://open.spotify.com/artist/2uWcrwgWmZcQc3IPBs3tfU"
                    },
                    "href" : "https://api.spotify.com/v1/artists/2uWcrwgWmZcQc3IPBs3tfU",
                    "id" : "2uWcrwgWmZcQc3IPBs3tfU",
                    "name" : "Apink",
                    "type" : "artist",
                    "uri" : "spotify:artist:2uWcrwgWmZcQc3IPBs3tfU"
                } ],
                "disc_number" : 1,
                "duration_ms" : 214750,
                "episode" : false,
                "explicit" : false,
                "external_ids" : {
                    "isrc" : "KRA381206681"
                },
                "external_urls" : {
                    "spotify" : "https://open.spotify.com/track/6fT9eZYgSvhu9v8wzrZkdG"
                },
                "href" : "https://api.spotify.com/v1/tracks/6fT9eZYgSvhu9v8wzrZkdG",
                "id" : "6fT9eZYgSvhu9v8wzrZkdG",
                "is_local" : false,
                "is_playable" : true,
                "name" : "Mr. Chu",
                "popularity" : 58,
                "preview_url" : "https://p.scdn.co/mp3-preview/799100e79b643fc133c5f8e52069db97cf293b90?cid=774b29d4f13844c495f206cafdad9c86",
                "track" : true,
                "track_number" : 6,
                "type" : "track",
                "uri" : "spotify:track:6fT9eZYgSvhu9v8wzrZkdG"
            },
            "video_thumbnail" : {
                "url" : null
            }
        }, {
            "added_at" : "2022-09-24T18:59:23Z",
            "added_by" : {
                "external_urls" : {
                    "spotify" : "https://open.spotify.com/user/c5pe2m34y0fwcgtj83q8mfjuf"
                },
                "href" : "https://api.spotify.com/v1/users/c5pe2m34y0fwcgtj83q8mfjuf",
                "id" : "c5pe2m34y0fwcgtj83q8mfjuf",
                "type" : "user",
                "uri" : "spotify:user:c5pe2m34y0fwcgtj83q8mfjuf"
            },
            "is_local" : false,
            "primary_color" : null,
            "track" : {
                "album" : {
                    "album_type" : "album",
                    "artists" : [ {
                        "external_urls" : {
                            "spotify" : "https://open.spotify.com/artist/0Sadg1vgvaPqGTOjxu0N6c"
                        },
                        "href" : "https://api.spotify.com/v1/artists/0Sadg1vgvaPqGTOjxu0N6c",
                        "id" : "0Sadg1vgvaPqGTOjxu0N6c",
                        "name" : "Girls' Generation",
                        "type" : "artist",
                        "uri" : "spotify:artist:0Sadg1vgvaPqGTOjxu0N6c"
                    } ],
                    "external_urls" : {
                        "spotify" : "https://open.spotify.com/album/2U1BPwhkzHt05OFugiSB3g"
                    },
                    "href" : "https://api.spotify.com/v1/albums/2U1BPwhkzHt05OFugiSB3g",
                    "id" : "2U1BPwhkzHt05OFugiSB3g",
                    "images" : [ {
                        "height" : 640,
                        "url" : "https://i.scdn.co/image/ab67616d0000b2731111b7562b4b46870d27f98b",
                        "width" : 640
                    }, {
                        "height" : 300,
                        "url" : "https://i.scdn.co/image/ab67616d00001e021111b7562b4b46870d27f98b",
                        "width" : 300
                    }, {
                        "height" : 64,
                        "url" : "https://i.scdn.co/image/ab67616d000048511111b7562b4b46870d27f98b",
                        "width" : 64
                    } ],
                    "name" : "Girls' Generation",
                    "release_date" : "2007-11-01",
                    "release_date_precision" : "day",
                    "total_tracks" : 11,
                    "type" : "album",
                    "uri" : "spotify:album:2U1BPwhkzHt05OFugiSB3g"
                },
                "artists" : [ {
                    "external_urls" : {
                        "spotify" : "https://open.spotify.com/artist/0Sadg1vgvaPqGTOjxu0N6c"
                    },
                    "href" : "https://api.spotify.com/v1/artists/0Sadg1vgvaPqGTOjxu0N6c",
                    "id" : "0Sadg1vgvaPqGTOjxu0N6c",
                    "name" : "Girls' Generation",
                    "type" : "artist",
                    "uri" : "spotify:artist:0Sadg1vgvaPqGTOjxu0N6c"
                } ],
                "disc_number" : 1,
                "duration_ms" : 265760,
                "episode" : false,
                "explicit" : false,
                "external_ids" : {
                    "isrc" : "KRA300802941"
                },
                "external_urls" : {
                    "spotify" : "https://open.spotify.com/track/1RTW9UthqmZwr8Od6CH4i8"
                },
                "href" : "https://api.spotify.com/v1/tracks/1RTW9UthqmZwr8Od6CH4i8",
                "id" : "1RTW9UthqmZwr8Od6CH4i8",
                "is_local" : false,
                "is_playable" : true,
                "name" : "Into the New World",
                "popularity" : 65,
                "preview_url" : "https://p.scdn.co/mp3-preview/7959581305f57fe62a8ff30af29743470456fedb?cid=774b29d4f13844c495f206cafdad9c86",
                "track" : true,
                "track_number" : 11,
                "type" : "track",
                "uri" : "spotify:track:1RTW9UthqmZwr8Od6CH4i8"
            },
            "video_thumbnail" : {
                "url" : null
            }
        }, {
            "added_at" : "2022-09-24T18:59:23Z",
            "added_by" : {
                "external_urls" : {
                    "spotify" : "https://open.spotify.com/user/c5pe2m34y0fwcgtj83q8mfjuf"
                },
                "href" : "https://api.spotify.com/v1/users/c5pe2m34y0fwcgtj83q8mfjuf",
                "id" : "c5pe2m34y0fwcgtj83q8mfjuf",
                "type" : "user",
                "uri" : "spotify:user:c5pe2m34y0fwcgtj83q8mfjuf"
            },
            "is_local" : false,
            "primary_color" : null,
            "track" : {
                "album" : {
                    "album_type" : "single",
                    "artists" : [ {
                        "external_urls" : {
                            "spotify" : "https://open.spotify.com/artist/6hhqsQZhtp9hfaZhSd0VSD"
                        },
                        "href" : "https://api.spotify.com/v1/artists/6hhqsQZhtp9hfaZhSd0VSD",
                        "id" : "6hhqsQZhtp9hfaZhSd0VSD",
                        "name" : "WJSN",
                        "type" : "artist",
                        "uri" : "spotify:artist:6hhqsQZhtp9hfaZhSd0VSD"
                    } ],
                    "external_urls" : {
                        "spotify" : "https://open.spotify.com/album/4r7YKwLYxQDH61GddP5l3j"
                    },
                    "href" : "https://api.spotify.com/v1/albums/4r7YKwLYxQDH61GddP5l3j",
                    "id" : "4r7YKwLYxQDH61GddP5l3j",
                    "images" : [ {
                        "height" : 640,
                        "url" : "https://i.scdn.co/image/ab67616d0000b273bc7d648d16a092cfe6f0c6ea",
                        "width" : 640
                    }, {
                        "height" : 300,
                        "url" : "https://i.scdn.co/image/ab67616d00001e02bc7d648d16a092cfe6f0c6ea",
                        "width" : 300
                    }, {
                        "height" : 64,
                        "url" : "https://i.scdn.co/image/ab67616d00004851bc7d648d16a092cfe6f0c6ea",
                        "width" : 64
                    } ],
                    "name" : "WJ PLEASE?",
                    "release_date" : "2018-09-19",
                    "release_date_precision" : "day",
                    "total_tracks" : 6,
                    "type" : "album",
                    "uri" : "spotify:album:4r7YKwLYxQDH61GddP5l3j"
                },
                "artists" : [ {
                    "external_urls" : {
                        "spotify" : "https://open.spotify.com/artist/6hhqsQZhtp9hfaZhSd0VSD"
                    },
                    "href" : "https://api.spotify.com/v1/artists/6hhqsQZhtp9hfaZhSd0VSD",
                    "id" : "6hhqsQZhtp9hfaZhSd0VSD",
                    "name" : "WJSN",
                    "type" : "artist",
                    "uri" : "spotify:artist:6hhqsQZhtp9hfaZhSd0VSD"
                } ],
                "disc_number" : 1,
                "duration_ms" : 227840,
                "episode" : false,
                "explicit" : false,
                "external_ids" : {
                    "isrc" : "KRA381801232"
                },
                "external_urls" : {
                    "spotify" : "https://open.spotify.com/track/3ZY3X2iHuoAEJTB4mKTggj"
                },
                "href" : "https://api.spotify.com/v1/tracks/3ZY3X2iHuoAEJTB4mKTggj",
                "id" : "3ZY3X2iHuoAEJTB4mKTggj",
                "is_local" : false,
                "is_playable" : true,
                "name" : "I-Yah",
                "popularity" : 38,
                "preview_url" : "https://p.scdn.co/mp3-preview/ec9fa94c844bc353bb4c729e731ac87343d87d34?cid=774b29d4f13844c495f206cafdad9c86",
                "track" : true,
                "track_number" : 3,
                "type" : "track",
                "uri" : "spotify:track:3ZY3X2iHuoAEJTB4mKTggj"
            },
            "video_thumbnail" : {
                "url" : null
            }
        }, {
            "added_at" : "2022-09-24T18:59:23Z",
            "added_by" : {
                "external_urls" : {
                    "spotify" : "https://open.spotify.com/user/c5pe2m34y0fwcgtj83q8mfjuf"
                },
                "href" : "https://api.spotify.com/v1/users/c5pe2m34y0fwcgtj83q8mfjuf",
                "id" : "c5pe2m34y0fwcgtj83q8mfjuf",
                "type" : "user",
                "uri" : "spotify:user:c5pe2m34y0fwcgtj83q8mfjuf"
            },
            "is_local" : false,
            "primary_color" : null,
            "track" : {
                "album" : {
                    "album_type" : "single",
                    "artists" : [ {
                        "external_urls" : {
                            "spotify" : "https://open.spotify.com/artist/3g34PW5oNmDBxMVUTzx2XK"
                        },
                        "href" : "https://api.spotify.com/v1/artists/3g34PW5oNmDBxMVUTzx2XK",
                        "id" : "3g34PW5oNmDBxMVUTzx2XK",
                        "name" : "Lovelyz",
                        "type" : "artist",
                        "uri" : "spotify:artist:3g34PW5oNmDBxMVUTzx2XK"
                    } ],
                    "external_urls" : {
                        "spotify" : "https://open.spotify.com/album/14RDHnWprxc97Yuzxtm60I"
                    },
                    "href" : "https://api.spotify.com/v1/albums/14RDHnWprxc97Yuzxtm60I",
                    "id" : "14RDHnWprxc97Yuzxtm60I",
                    "images" : [ {
                        "height" : 640,
                        "url" : "https://i.scdn.co/image/ab67616d0000b2730e28c3d50d8a4a7b32b489ac",
                        "width" : 640
                    }, {
                        "height" : 300,
                        "url" : "https://i.scdn.co/image/ab67616d00001e020e28c3d50d8a4a7b32b489ac",
                        "width" : 300
                    }, {
                        "height" : 64,
                        "url" : "https://i.scdn.co/image/ab67616d000048510e28c3d50d8a4a7b32b489ac",
                        "width" : 64
                    } ],
                    "name" : "Lovelyz 5th Mini Album [SANCTUARY]",
                    "release_date" : "2018-11-26",
                    "release_date_precision" : "day",
                    "total_tracks" : 7,
                    "type" : "album",
                    "uri" : "spotify:album:14RDHnWprxc97Yuzxtm60I"
                },
                "artists" : [ {
                    "external_urls" : {
                        "spotify" : "https://open.spotify.com/artist/3g34PW5oNmDBxMVUTzx2XK"
                    },
                    "href" : "https://api.spotify.com/v1/artists/3g34PW5oNmDBxMVUTzx2XK",
                    "id" : "3g34PW5oNmDBxMVUTzx2XK",
                    "name" : "Lovelyz",
                    "type" : "artist",
                    "uri" : "spotify:artist:3g34PW5oNmDBxMVUTzx2XK"
                } ],
                "disc_number" : 1,
                "duration_ms" : 181079,
                "episode" : false,
                "explicit" : false,
                "external_ids" : {
                    "isrc" : "KRA381802024"
                },
                "external_urls" : {
                    "spotify" : "https://open.spotify.com/track/675wYf9lAHj6M3rgZDzLvk"
                },
                "href" : "https://api.spotify.com/v1/tracks/675wYf9lAHj6M3rgZDzLvk",
                "id" : "675wYf9lAHj6M3rgZDzLvk",
                "is_local" : false,
                "is_playable" : true,
                "name" : "Lost N Found",
                "popularity" : 36,
                "preview_url" : "https://p.scdn.co/mp3-preview/975a4c878eb5f69592cba8fdc0940aceafe85604?cid=774b29d4f13844c495f206cafdad9c86",
                "track" : true,
                "track_number" : 2,
                "type" : "track",
                "uri" : "spotify:track:675wYf9lAHj6M3rgZDzLvk"
            },
            "video_thumbnail" : {
                "url" : null
            }
        }, {
            "added_at" : "2022-09-24T18:59:23Z",
            "added_by" : {
                "external_urls" : {
                    "spotify" : "https://open.spotify.com/user/c5pe2m34y0fwcgtj83q8mfjuf"
                },
                "href" : "https://api.spotify.com/v1/users/c5pe2m34y0fwcgtj83q8mfjuf",
                "id" : "c5pe2m34y0fwcgtj83q8mfjuf",
                "type" : "user",
                "uri" : "spotify:user:c5pe2m34y0fwcgtj83q8mfjuf"
            },
            "is_local" : false,
            "primary_color" : null,
            "track" : {
                "album" : {
                    "album_type" : "album",
                    "artists" : [ {
                        "external_urls" : {
                            "spotify" : "https://open.spotify.com/artist/3g34PW5oNmDBxMVUTzx2XK"
                        },
                        "href" : "https://api.spotify.com/v1/artists/3g34PW5oNmDBxMVUTzx2XK",
                        "id" : "3g34PW5oNmDBxMVUTzx2XK",
                        "name" : "Lovelyz",
                        "type" : "artist",
                        "uri" : "spotify:artist:3g34PW5oNmDBxMVUTzx2XK"
                    } ],
                    "external_urls" : {
                        "spotify" : "https://open.spotify.com/album/4PufOTc2kPEnF2uF4iDoJb"
                    },
                    "href" : "https://api.spotify.com/v1/albums/4PufOTc2kPEnF2uF4iDoJb",
                    "id" : "4PufOTc2kPEnF2uF4iDoJb",
                    "images" : [ {
                        "height" : 640,
                        "url" : "https://i.scdn.co/image/ab67616d0000b27306cedc90af103ebdf95f4141",
                        "width" : 640
                    }, {
                        "height" : 300,
                        "url" : "https://i.scdn.co/image/ab67616d00001e0206cedc90af103ebdf95f4141",
                        "width" : 300
                    }, {
                        "height" : 64,
                        "url" : "https://i.scdn.co/image/ab67616d0000485106cedc90af103ebdf95f4141",
                        "width" : 64
                    } ],
                    "name" : "Girls’ Invasion",
                    "release_date" : "2014-11-17",
                    "release_date_precision" : "day",
                    "total_tracks" : 9,
                    "type" : "album",
                    "uri" : "spotify:album:4PufOTc2kPEnF2uF4iDoJb"
                },
                "artists" : [ {
                    "external_urls" : {
                        "spotify" : "https://open.spotify.com/artist/3g34PW5oNmDBxMVUTzx2XK"
                    },
                    "href" : "https://api.spotify.com/v1/artists/3g34PW5oNmDBxMVUTzx2XK",
                    "id" : "3g34PW5oNmDBxMVUTzx2XK",
                    "name" : "Lovelyz",
                    "type" : "artist",
                    "uri" : "spotify:artist:3g34PW5oNmDBxMVUTzx2XK"
                } ],
                "disc_number" : 1,
                "duration_ms" : 221266,
                "episode" : false,
                "explicit" : false,
                "external_ids" : {
                    "isrc" : "KRA381209205"
                },
                "external_urls" : {
                    "spotify" : "https://open.spotify.com/track/1uaYyZVXhGU5PgyFl54fS0"
                },
                "href" : "https://api.spotify.com/v1/tracks/1uaYyZVXhGU5PgyFl54fS0",
                "id" : "1uaYyZVXhGU5PgyFl54fS0",
                "is_local" : false,
                "is_playable" : true,
                "name" : "Good Night Like Yesterday",
                "popularity" : 36,
                "preview_url" : "https://p.scdn.co/mp3-preview/c8074ba62048e257dc07a660c5d5d1163eb67b86?cid=774b29d4f13844c495f206cafdad9c86",
                "track" : true,
                "track_number" : 3,
                "type" : "track",
                "uri" : "spotify:track:1uaYyZVXhGU5PgyFl54fS0"
            },
            "video_thumbnail" : {
                "url" : null
            }
        }, {
            "added_at" : "2022-09-24T18:59:23Z",
            "added_by" : {
                "external_urls" : {
                    "spotify" : "https://open.spotify.com/user/c5pe2m34y0fwcgtj83q8mfjuf"
                },
                "href" : "https://api.spotify.com/v1/users/c5pe2m34y0fwcgtj83q8mfjuf",
                "id" : "c5pe2m34y0fwcgtj83q8mfjuf",
                "type" : "user",
                "uri" : "spotify:user:c5pe2m34y0fwcgtj83q8mfjuf"
            },
            "is_local" : false,
            "primary_color" : null,
            "track" : {
                "album" : {
                    "album_type" : "single",
                    "artists" : [ {
                        "external_urls" : {
                            "spotify" : "https://open.spotify.com/artist/3g34PW5oNmDBxMVUTzx2XK"
                        },
                        "href" : "https://api.spotify.com/v1/artists/3g34PW5oNmDBxMVUTzx2XK",
                        "id" : "3g34PW5oNmDBxMVUTzx2XK",
                        "name" : "Lovelyz",
                        "type" : "artist",
                        "uri" : "spotify:artist:3g34PW5oNmDBxMVUTzx2XK"
                    } ],
                    "external_urls" : {
                        "spotify" : "https://open.spotify.com/album/1sgM8hFTIWtCjO7ap5O3US"
                    },
                    "href" : "https://api.spotify.com/v1/albums/1sgM8hFTIWtCjO7ap5O3US",
                    "id" : "1sgM8hFTIWtCjO7ap5O3US",
                    "images" : [ {
                        "height" : 640,
                        "url" : "https://i.scdn.co/image/ab67616d0000b27308c4f6237a6ab519af5082be",
                        "width" : 640
                    }, {
                        "height" : 300,
                        "url" : "https://i.scdn.co/image/ab67616d00001e0208c4f6237a6ab519af5082be",
                        "width" : 300
                    }, {
                        "height" : 64,
                        "url" : "https://i.scdn.co/image/ab67616d0000485108c4f6237a6ab519af5082be",
                        "width" : 64
                    } ],
                    "name" : "A New Trilogy",
                    "release_date" : "2016-04-25",
                    "release_date_precision" : "day",
                    "total_tracks" : 7,
                    "type" : "album",
                    "uri" : "spotify:album:1sgM8hFTIWtCjO7ap5O3US"
                },
                "artists" : [ {
                    "external_urls" : {
                        "spotify" : "https://open.spotify.com/artist/3g34PW5oNmDBxMVUTzx2XK"
                    },
                    "href" : "https://api.spotify.com/v1/artists/3g34PW5oNmDBxMVUTzx2XK",
                    "id" : "3g34PW5oNmDBxMVUTzx2XK",
                    "name" : "Lovelyz",
                    "type" : "artist",
                    "uri" : "spotify:artist:3g34PW5oNmDBxMVUTzx2XK"
                } ],
                "disc_number" : 1,
                "duration_ms" : 213325,
                "episode" : false,
                "explicit" : false,
                "external_ids" : {
                    "isrc" : "KRA381600773"
                },
                "external_urls" : {
                    "spotify" : "https://open.spotify.com/track/4SCRUC5lDUwbdZHQuGp2Z2"
                },
                "href" : "https://api.spotify.com/v1/tracks/4SCRUC5lDUwbdZHQuGp2Z2",
                "id" : "4SCRUC5lDUwbdZHQuGp2Z2",
                "is_local" : false,
                "is_playable" : true,
                "name" : "Destiny",
                "popularity" : 42,
                "preview_url" : "https://p.scdn.co/mp3-preview/160e85cd4afe447029f68e11c0558b14e0051176?cid=774b29d4f13844c495f206cafdad9c86",
                "track" : true,
                "track_number" : 2,
                "type" : "track",
                "uri" : "spotify:track:4SCRUC5lDUwbdZHQuGp2Z2"
            },
            "video_thumbnail" : {
                "url" : null
            }
        }, {
            "added_at" : "2022-09-24T18:59:23Z",
            "added_by" : {
                "external_urls" : {
                    "spotify" : "https://open.spotify.com/user/c5pe2m34y0fwcgtj83q8mfjuf"
                },
                "href" : "https://api.spotify.com/v1/users/c5pe2m34y0fwcgtj83q8mfjuf",
                "id" : "c5pe2m34y0fwcgtj83q8mfjuf",
                "type" : "user",
                "uri" : "spotify:user:c5pe2m34y0fwcgtj83q8mfjuf"
            },
            "is_local" : false,
            "primary_color" : null,
            "track" : {
                "album" : {
                    "album_type" : "album",
                    "artists" : [ {
                        "external_urls" : {
                            "spotify" : "https://open.spotify.com/artist/3g34PW5oNmDBxMVUTzx2XK"
                        },
                        "href" : "https://api.spotify.com/v1/artists/3g34PW5oNmDBxMVUTzx2XK",
                        "id" : "3g34PW5oNmDBxMVUTzx2XK",
                        "name" : "Lovelyz",
                        "type" : "artist",
                        "uri" : "spotify:artist:3g34PW5oNmDBxMVUTzx2XK"
                    } ],
                    "external_urls" : {
                        "spotify" : "https://open.spotify.com/album/0dv5u7GyNLvQHd6elSeAxV"
                    },
                    "href" : "https://api.spotify.com/v1/albums/0dv5u7GyNLvQHd6elSeAxV",
                    "id" : "0dv5u7GyNLvQHd6elSeAxV",
                    "images" : [ {
                        "height" : 640,
                        "url" : "https://i.scdn.co/image/ab67616d0000b27384e9e589dc9309dcc0024087",
                        "width" : 640
                    }, {
                        "height" : 300,
                        "url" : "https://i.scdn.co/image/ab67616d00001e0284e9e589dc9309dcc0024087",
                        "width" : 300
                    }, {
                        "height" : 64,
                        "url" : "https://i.scdn.co/image/ab67616d0000485184e9e589dc9309dcc0024087",
                        "width" : 64
                    } ],
                    "name" : "2nd Album Repackage [Now, We]",
                    "release_date" : "2017-05-02",
                    "release_date_precision" : "day",
                    "total_tracks" : 13,
                    "type" : "album",
                    "uri" : "spotify:album:0dv5u7GyNLvQHd6elSeAxV"
                },
                "artists" : [ {
                    "external_urls" : {
                        "spotify" : "https://open.spotify.com/artist/3g34PW5oNmDBxMVUTzx2XK"
                    },
                    "href" : "https://api.spotify.com/v1/artists/3g34PW5oNmDBxMVUTzx2XK",
                    "id" : "3g34PW5oNmDBxMVUTzx2XK",
                    "name" : "Lovelyz",
                    "type" : "artist",
                    "uri" : "spotify:artist:3g34PW5oNmDBxMVUTzx2XK"
                } ],
                "disc_number" : 1,
                "duration_ms" : 196372,
                "episode" : false,
                "explicit" : false,
                "external_ids" : {
                    "isrc" : "KRE641700021"
                },
                "external_urls" : {
                    "spotify" : "https://open.spotify.com/track/5eUM8HoQAvFUNhUID920YB"
                },
                "href" : "https://api.spotify.com/v1/tracks/5eUM8HoQAvFUNhUID920YB",
                "id" : "5eUM8HoQAvFUNhUID920YB",
                "is_local" : false,
                "is_playable" : true,
                "name" : "Now, We",
                "popularity" : 38,
                "preview_url" : "https://p.scdn.co/mp3-preview/abbb864ab0253b668d50464e1b152080b4a18829?cid=774b29d4f13844c495f206cafdad9c86",
                "track" : true,
                "track_number" : 3,
                "type" : "track",
                "uri" : "spotify:track:5eUM8HoQAvFUNhUID920YB"
            },
            "video_thumbnail" : {
                "url" : null
            }
        }, {
            "added_at" : "2022-09-24T18:59:23Z",
            "added_by" : {
                "external_urls" : {
                    "spotify" : "https://open.spotify.com/user/c5pe2m34y0fwcgtj83q8mfjuf"
                },
                "href" : "https://api.spotify.com/v1/users/c5pe2m34y0fwcgtj83q8mfjuf",
                "id" : "c5pe2m34y0fwcgtj83q8mfjuf",
                "type" : "user",
                "uri" : "spotify:user:c5pe2m34y0fwcgtj83q8mfjuf"
            },
            "is_local" : false,
            "primary_color" : null,
            "track" : {
                "album" : {
                    "album_type" : "album",
                    "artists" : [ {
                        "external_urls" : {
                            "spotify" : "https://open.spotify.com/artist/0qlWcS66ohOIi0M8JZwPft"
                        },
                        "href" : "https://api.spotify.com/v1/artists/0qlWcS66ohOIi0M8JZwPft",
                        "id" : "0qlWcS66ohOIi0M8JZwPft",
                        "name" : "GFRIEND",
                        "type" : "artist",
                        "uri" : "spotify:artist:0qlWcS66ohOIi0M8JZwPft"
                    } ],
                    "external_urls" : {
                        "spotify" : "https://open.spotify.com/album/7jxp9UaF0Hmtmr6zuacjoO"
                    },
                    "href" : "https://api.spotify.com/v1/albums/7jxp9UaF0Hmtmr6zuacjoO",
                    "id" : "7jxp9UaF0Hmtmr6zuacjoO",
                    "images" : [ {
                        "height" : 640,
                        "url" : "https://i.scdn.co/image/ab67616d0000b2738e5856030440168b6d7e7f6b",
                        "width" : 640
                    }, {
                        "height" : 300,
                        "url" : "https://i.scdn.co/image/ab67616d00001e028e5856030440168b6d7e7f6b",
                        "width" : 300
                    }, {
                        "height" : 64,
                        "url" : "https://i.scdn.co/image/ab67616d000048518e5856030440168b6d7e7f6b",
                        "width" : 64
                    } ],
                    "name" : "GFRIEND The 2nd Album 'Time for us'",
                    "release_date" : "2019-01-14",
                    "release_date_precision" : "day",
                    "total_tracks" : 13,
                    "type" : "album",
                    "uri" : "spotify:album:7jxp9UaF0Hmtmr6zuacjoO"
                },
                "artists" : [ {
                    "external_urls" : {
                        "spotify" : "https://open.spotify.com/artist/0qlWcS66ohOIi0M8JZwPft"
                    },
                    "href" : "https://api.spotify.com/v1/artists/0qlWcS66ohOIi0M8JZwPft",
                    "id" : "0qlWcS66ohOIi0M8JZwPft",
                    "name" : "GFRIEND",
                    "type" : "artist",
                    "uri" : "spotify:artist:0qlWcS66ohOIi0M8JZwPft"
                } ],
                "disc_number" : 1,
                "duration_ms" : 249177,
                "episode" : false,
                "explicit" : false,
                "external_ids" : {
                    "isrc" : "KRA381900179"
                },
                "external_urls" : {
                    "spotify" : "https://open.spotify.com/track/4PznbgDjd758n6d8EzJWJ0"
                },
                "href" : "https://api.spotify.com/v1/tracks/4PznbgDjd758n6d8EzJWJ0",
                "id" : "4PznbgDjd758n6d8EzJWJ0",
                "is_local" : false,
                "is_playable" : true,
                "name" : "Memoria (Korean Ver.)",
                "popularity" : 41,
                "preview_url" : "https://p.scdn.co/mp3-preview/f8cac246ea5be2ebeb1a19c252efbe8cf1c5a04b?cid=774b29d4f13844c495f206cafdad9c86",
                "track" : true,
                "track_number" : 12,
                "type" : "track",
                "uri" : "spotify:track:4PznbgDjd758n6d8EzJWJ0"
            },
            "video_thumbnail" : {
                "url" : null
            }
        }, {
            "added_at" : "2022-09-24T18:59:23Z",
            "added_by" : {
                "external_urls" : {
                    "spotify" : "https://open.spotify.com/user/c5pe2m34y0fwcgtj83q8mfjuf"
                },
                "href" : "https://api.spotify.com/v1/users/c5pe2m34y0fwcgtj83q8mfjuf",
                "id" : "c5pe2m34y0fwcgtj83q8mfjuf",
                "type" : "user",
                "uri" : "spotify:user:c5pe2m34y0fwcgtj83q8mfjuf"
            },
            "is_local" : false,
            "primary_color" : null,
            "track" : {
                "album" : {
                    "album_type" : "single",
                    "artists" : [ {
                        "external_urls" : {
                            "spotify" : "https://open.spotify.com/artist/6QyO41KctzGc70mVaVnXQO"
                        },
                        "href" : "https://api.spotify.com/v1/artists/6QyO41KctzGc70mVaVnXQO",
                        "id" : "6QyO41KctzGc70mVaVnXQO",
                        "name" : "CLC",
                        "type" : "artist",
                        "uri" : "spotify:artist:6QyO41KctzGc70mVaVnXQO"
                    } ],
                    "external_urls" : {
                        "spotify" : "https://open.spotify.com/album/0yiGt1K8gQZEtbgEU0Aeut"
                    },
                    "href" : "https://api.spotify.com/v1/albums/0yiGt1K8gQZEtbgEU0Aeut",
                    "id" : "0yiGt1K8gQZEtbgEU0Aeut",
                    "images" : [ {
                        "height" : 640,
                        "url" : "https://i.scdn.co/image/ab67616d0000b273693b3aded39f448419e226db",
                        "width" : 640
                    }, {
                        "height" : 300,
                        "url" : "https://i.scdn.co/image/ab67616d00001e02693b3aded39f448419e226db",
                        "width" : 300
                    }, {
                        "height" : 64,
                        "url" : "https://i.scdn.co/image/ab67616d00004851693b3aded39f448419e226db",
                        "width" : 64
                    } ],
                    "name" : "FREE`SM",
                    "release_date" : "2017-08-03",
                    "release_date_precision" : "day",
                    "total_tracks" : 6,
                    "type" : "album",
                    "uri" : "spotify:album:0yiGt1K8gQZEtbgEU0Aeut"
                },
                "artists" : [ {
                    "external_urls" : {
                        "spotify" : "https://open.spotify.com/artist/6QyO41KctzGc70mVaVnXQO"
                    },
                    "href" : "https://api.spotify.com/v1/artists/6QyO41KctzGc70mVaVnXQO",
                    "id" : "6QyO41KctzGc70mVaVnXQO",
                    "name" : "CLC",
                    "type" : "artist",
                    "uri" : "spotify:artist:6QyO41KctzGc70mVaVnXQO"
                } ],
                "disc_number" : 1,
                "duration_ms" : 220526,
                "episode" : false,
                "explicit" : false,
                "external_ids" : {
                    "isrc" : "KRA391700031"
                },
                "external_urls" : {
                    "spotify" : "https://open.spotify.com/track/6MSfAJiEQjJvia4dsWhO93"
                },
                "href" : "https://api.spotify.com/v1/tracks/6MSfAJiEQjJvia4dsWhO93",
                "id" : "6MSfAJiEQjJvia4dsWhO93",
                "is_local" : false,
                "is_playable" : true,
                "name" : "Where are you?",
                "popularity" : 41,
                "preview_url" : "https://p.scdn.co/mp3-preview/c6a225046c395646ecff8f73351515eaad032413?cid=774b29d4f13844c495f206cafdad9c86",
                "track" : true,
                "track_number" : 1,
                "type" : "track",
                "uri" : "spotify:track:6MSfAJiEQjJvia4dsWhO93"
            },
            "video_thumbnail" : {
                "url" : null
            }
        }, {
            "added_at" : "2022-09-24T18:59:23Z",
            "added_by" : {
                "external_urls" : {
                    "spotify" : "https://open.spotify.com/user/c5pe2m34y0fwcgtj83q8mfjuf"
                },
                "href" : "https://api.spotify.com/v1/users/c5pe2m34y0fwcgtj83q8mfjuf",
                "id" : "c5pe2m34y0fwcgtj83q8mfjuf",
                "type" : "user",
                "uri" : "spotify:user:c5pe2m34y0fwcgtj83q8mfjuf"
            },
            "is_local" : false,
            "primary_color" : null,
            "track" : {
                "album" : {
                    "album_type" : "album",
                    "artists" : [ {
                        "external_urls" : {
                            "spotify" : "https://open.spotify.com/artist/5Pcx98OUnL52aGZRRQx5v8"
                        },
                        "href" : "https://api.spotify.com/v1/artists/5Pcx98OUnL52aGZRRQx5v8",
                        "id" : "5Pcx98OUnL52aGZRRQx5v8",
                        "name" : "DIA",
                        "type" : "artist",
                        "uri" : "spotify:artist:5Pcx98OUnL52aGZRRQx5v8"
                    } ],
                    "external_urls" : {
                        "spotify" : "https://open.spotify.com/album/23yvzPLwKl47gvPp9dCkco"
                    },
                    "href" : "https://api.spotify.com/v1/albums/23yvzPLwKl47gvPp9dCkco",
                    "id" : "23yvzPLwKl47gvPp9dCkco",
                    "images" : [ {
                        "height" : 640,
                        "url" : "https://i.scdn.co/image/ab67616d0000b2737b6742ad128220031117cce8",
                        "width" : 640
                    }, {
                        "height" : 300,
                        "url" : "https://i.scdn.co/image/ab67616d00001e027b6742ad128220031117cce8",
                        "width" : 300
                    }, {
                        "height" : 64,
                        "url" : "https://i.scdn.co/image/ab67616d000048517b6742ad128220031117cce8",
                        "width" : 64
                    } ],
                    "name" : "HAPPY ENDING",
                    "release_date" : "2016-06-14",
                    "release_date_precision" : "day",
                    "total_tracks" : 7,
                    "type" : "album",
                    "uri" : "spotify:album:23yvzPLwKl47gvPp9dCkco"
                },
                "artists" : [ {
                    "external_urls" : {
                        "spotify" : "https://open.spotify.com/artist/5Pcx98OUnL52aGZRRQx5v8"
                    },
                    "href" : "https://api.spotify.com/v1/artists/5Pcx98OUnL52aGZRRQx5v8",
                    "id" : "5Pcx98OUnL52aGZRRQx5v8",
                    "name" : "DIA",
                    "type" : "artist",
                    "uri" : "spotify:artist:5Pcx98OUnL52aGZRRQx5v8"
                } ],
                "disc_number" : 1,
                "duration_ms" : 202028,
                "episode" : false,
                "explicit" : false,
                "external_ids" : {
                    "isrc" : "KRA341628993"
                },
                "external_urls" : {
                    "spotify" : "https://open.spotify.com/track/7KVYSgCq8lk3bt77IShNGE"
                },
                "href" : "https://api.spotify.com/v1/tracks/7KVYSgCq8lk3bt77IShNGE",
                "id" : "7KVYSgCq8lk3bt77IShNGE",
                "is_local" : false,
                "is_playable" : true,
                "name" : "그 길에서",
                "popularity" : 37,
                "preview_url" : "https://p.scdn.co/mp3-preview/0f55992873beb4517271798f8a1a52d8170b85d1?cid=774b29d4f13844c495f206cafdad9c86",
                "track" : true,
                "track_number" : 2,
                "type" : "track",
                "uri" : "spotify:track:7KVYSgCq8lk3bt77IShNGE"
            },
            "video_thumbnail" : {
                "url" : null
            }
        }, {
            "added_at" : "2022-09-24T18:59:23Z",
            "added_by" : {
                "external_urls" : {
                    "spotify" : "https://open.spotify.com/user/c5pe2m34y0fwcgtj83q8mfjuf"
                },
                "href" : "https://api.spotify.com/v1/users/c5pe2m34y0fwcgtj83q8mfjuf",
                "id" : "c5pe2m34y0fwcgtj83q8mfjuf",
                "type" : "user",
                "uri" : "spotify:user:c5pe2m34y0fwcgtj83q8mfjuf"
            },
            "is_local" : false,
            "primary_color" : null,
            "track" : {
                "album" : {
                    "album_type" : "single",
                    "artists" : [ {
                        "external_urls" : {
                            "spotify" : "https://open.spotify.com/artist/4cJ99wTjC60pXcfyISL9fa"
                        },
                        "href" : "https://api.spotify.com/v1/artists/4cJ99wTjC60pXcfyISL9fa",
                        "id" : "4cJ99wTjC60pXcfyISL9fa",
                        "name" : "APRIL",
                        "type" : "artist",
                        "uri" : "spotify:artist:4cJ99wTjC60pXcfyISL9fa"
                    } ],
                    "external_urls" : {
                        "spotify" : "https://open.spotify.com/album/5NROq4sawLKjGwuiZydaqh"
                    },
                    "href" : "https://api.spotify.com/v1/albums/5NROq4sawLKjGwuiZydaqh",
                    "id" : "5NROq4sawLKjGwuiZydaqh",
                    "images" : [ {
                        "height" : 640,
                        "url" : "https://i.scdn.co/image/ab67616d0000b27382ee309a2d4ed80d6f111bf4",
                        "width" : 640
                    }, {
                        "height" : 300,
                        "url" : "https://i.scdn.co/image/ab67616d00001e0282ee309a2d4ed80d6f111bf4",
                        "width" : 300
                    }, {
                        "height" : 64,
                        "url" : "https://i.scdn.co/image/ab67616d0000485182ee309a2d4ed80d6f111bf4",
                        "width" : 64
                    } ],
                    "name" : "APRIL 3rd Mini Album 'Prelude'",
                    "release_date" : "2017-01-04",
                    "release_date_precision" : "day",
                    "total_tracks" : 9,
                    "type" : "album",
                    "uri" : "spotify:album:5NROq4sawLKjGwuiZydaqh"
                },
                "artists" : [ {
                    "external_urls" : {
                        "spotify" : "https://open.spotify.com/artist/4cJ99wTjC60pXcfyISL9fa"
                    },
                    "href" : "https://api.spotify.com/v1/artists/4cJ99wTjC60pXcfyISL9fa",
                    "id" : "4cJ99wTjC60pXcfyISL9fa",
                    "name" : "APRIL",
                    "type" : "artist",
                    "uri" : "spotify:artist:4cJ99wTjC60pXcfyISL9fa"
                } ],
                "disc_number" : 1,
                "duration_ms" : 203373,
                "episode" : false,
                "explicit" : false,
                "external_ids" : {
                    "isrc" : "KRA381700017"
                },
                "external_urls" : {
                    "spotify" : "https://open.spotify.com/track/744wv6QfQEtOJA6LjzCr74"
                },
                "href" : "https://api.spotify.com/v1/tracks/744wv6QfQEtOJA6LjzCr74",
                "id" : "744wv6QfQEtOJA6LjzCr74",
                "is_local" : false,
                "is_playable" : true,
                "name" : "April Story",
                "popularity" : 42,
                "preview_url" : "https://p.scdn.co/mp3-preview/4a7b915869afc5c0ae14f98e9d7dd8a72b242ac4?cid=774b29d4f13844c495f206cafdad9c86",
                "track" : true,
                "track_number" : 1,
                "type" : "track",
                "uri" : "spotify:track:744wv6QfQEtOJA6LjzCr74"
            },
            "video_thumbnail" : {
                "url" : null
            }
        }, {
            "added_at" : "2022-09-24T18:59:23Z",
            "added_by" : {
                "external_urls" : {
                    "spotify" : "https://open.spotify.com/user/c5pe2m34y0fwcgtj83q8mfjuf"
                },
                "href" : "https://api.spotify.com/v1/users/c5pe2m34y0fwcgtj83q8mfjuf",
                "id" : "c5pe2m34y0fwcgtj83q8mfjuf",
                "type" : "user",
                "uri" : "spotify:user:c5pe2m34y0fwcgtj83q8mfjuf"
            },
            "is_local" : false,
            "primary_color" : null,
            "track" : {
                "album" : {
                    "album_type" : "single",
                    "artists" : [ {
                        "external_urls" : {
                            "spotify" : "https://open.spotify.com/artist/4cJ99wTjC60pXcfyISL9fa"
                        },
                        "href" : "https://api.spotify.com/v1/artists/4cJ99wTjC60pXcfyISL9fa",
                        "id" : "4cJ99wTjC60pXcfyISL9fa",
                        "name" : "APRIL",
                        "type" : "artist",
                        "uri" : "spotify:artist:4cJ99wTjC60pXcfyISL9fa"
                    } ],
                    "external_urls" : {
                        "spotify" : "https://open.spotify.com/album/6peri17gXJDs3LQeeD66ju"
                    },
                    "href" : "https://api.spotify.com/v1/albums/6peri17gXJDs3LQeeD66ju",
                    "id" : "6peri17gXJDs3LQeeD66ju",
                    "images" : [ {
                        "height" : 640,
                        "url" : "https://i.scdn.co/image/ab67616d0000b2730ed2a3e100bd98416f7e84b2",
                        "width" : 640
                    }, {
                        "height" : 300,
                        "url" : "https://i.scdn.co/image/ab67616d00001e020ed2a3e100bd98416f7e84b2",
                        "width" : 300
                    }, {
                        "height" : 64,
                        "url" : "https://i.scdn.co/image/ab67616d000048510ed2a3e100bd98416f7e84b2",
                        "width" : 64
                    } ],
                    "name" : "APRIL 5th Mini Album 'The Blue'",
                    "release_date" : "2018-03-12",
                    "release_date_precision" : "day",
                    "total_tracks" : 6,
                    "type" : "album",
                    "uri" : "spotify:album:6peri17gXJDs3LQeeD66ju"
                },
                "artists" : [ {
                    "external_urls" : {
                        "spotify" : "https://open.spotify.com/artist/4cJ99wTjC60pXcfyISL9fa"
                    },
                    "href" : "https://api.spotify.com/v1/artists/4cJ99wTjC60pXcfyISL9fa",
                    "id" : "4cJ99wTjC60pXcfyISL9fa",
                    "name" : "APRIL",
                    "type" : "artist",
                    "uri" : "spotify:artist:4cJ99wTjC60pXcfyISL9fa"
                } ],
                "disc_number" : 1,
                "duration_ms" : 195257,
                "episode" : false,
                "explicit" : false,
                "external_ids" : {
                    "isrc" : "KRA381704295"
                },
                "external_urls" : {
                    "spotify" : "https://open.spotify.com/track/6emq7eKDjBS9PbxAPXwdDi"
                },
                "href" : "https://api.spotify.com/v1/tracks/6emq7eKDjBS9PbxAPXwdDi",
                "id" : "6emq7eKDjBS9PbxAPXwdDi",
                "is_local" : false,
                "is_playable" : true,
                "name" : "The Blue Bird",
                "popularity" : 37,
                "preview_url" : "https://p.scdn.co/mp3-preview/9ab40fc8b5ef03ef387afa1153694bd0e4680a76?cid=774b29d4f13844c495f206cafdad9c86",
                "track" : true,
                "track_number" : 1,
                "type" : "track",
                "uri" : "spotify:track:6emq7eKDjBS9PbxAPXwdDi"
            },
            "video_thumbnail" : {
                "url" : null
            }
        }, {
            "added_at" : "2022-09-24T18:59:23Z",
            "added_by" : {
                "external_urls" : {
                    "spotify" : "https://open.spotify.com/user/c5pe2m34y0fwcgtj83q8mfjuf"
                },
                "href" : "https://api.spotify.com/v1/users/c5pe2m34y0fwcgtj83q8mfjuf",
                "id" : "c5pe2m34y0fwcgtj83q8mfjuf",
                "type" : "user",
                "uri" : "spotify:user:c5pe2m34y0fwcgtj83q8mfjuf"
            },
            "is_local" : false,
            "primary_color" : null,
            "track" : {
                "album" : {
                    "album_type" : "single",
                    "artists" : [ {
                        "external_urls" : {
                            "spotify" : "https://open.spotify.com/artist/3g34PW5oNmDBxMVUTzx2XK"
                        },
                        "href" : "https://api.spotify.com/v1/artists/3g34PW5oNmDBxMVUTzx2XK",
                        "id" : "3g34PW5oNmDBxMVUTzx2XK",
                        "name" : "Lovelyz",
                        "type" : "artist",
                        "uri" : "spotify:artist:3g34PW5oNmDBxMVUTzx2XK"
                    } ],
                    "external_urls" : {
                        "spotify" : "https://open.spotify.com/album/2ct7aZoy4T7gec27Y3avFa"
                    },
                    "href" : "https://api.spotify.com/v1/albums/2ct7aZoy4T7gec27Y3avFa",
                    "id" : "2ct7aZoy4T7gec27Y3avFa",
                    "images" : [ {
                        "height" : 640,
                        "url" : "https://i.scdn.co/image/ab67616d0000b273a9d93ab6ab9ec7ec1b6d761c",
                        "width" : 640
                    }, {
                        "height" : 300,
                        "url" : "https://i.scdn.co/image/ab67616d00001e02a9d93ab6ab9ec7ec1b6d761c",
                        "width" : 300
                    }, {
                        "height" : 64,
                        "url" : "https://i.scdn.co/image/ab67616d00004851a9d93ab6ab9ec7ec1b6d761c",
                        "width" : 64
                    } ],
                    "name" : "3rd Mini Album [Fall in Lovelyz]",
                    "release_date" : "2017-11-14",
                    "release_date_precision" : "day",
                    "total_tracks" : 7,
                    "type" : "album",
                    "uri" : "spotify:album:2ct7aZoy4T7gec27Y3avFa"
                },
                "artists" : [ {
                    "external_urls" : {
                        "spotify" : "https://open.spotify.com/artist/3g34PW5oNmDBxMVUTzx2XK"
                    },
                    "href" : "https://api.spotify.com/v1/artists/3g34PW5oNmDBxMVUTzx2XK",
                    "id" : "3g34PW5oNmDBxMVUTzx2XK",
                    "name" : "Lovelyz",
                    "type" : "artist",
                    "uri" : "spotify:artist:3g34PW5oNmDBxMVUTzx2XK"
                } ],
                "disc_number" : 1,
                "duration_ms" : 210878,
                "episode" : false,
                "explicit" : false,
                "external_ids" : {
                    "isrc" : "KRE641700063"
                },
                "external_urls" : {
                    "spotify" : "https://open.spotify.com/track/6PhMnJFVQeDPaEF5pDIk2f"
                },
                "href" : "https://api.spotify.com/v1/tracks/6PhMnJFVQeDPaEF5pDIk2f",
                "id" : "6PhMnJFVQeDPaEF5pDIk2f",
                "is_local" : false,
                "is_playable" : true,
                "name" : "Triangle",
                "popularity" : 32,
                "preview_url" : "https://p.scdn.co/mp3-preview/05ea7e3d1a66f5cbc928e2c9aea05f675063842c?cid=774b29d4f13844c495f206cafdad9c86",
                "track" : true,
                "track_number" : 3,
                "type" : "track",
                "uri" : "spotify:track:6PhMnJFVQeDPaEF5pDIk2f"
            },
            "video_thumbnail" : {
                "url" : null
            }
        }, {
            "added_at" : "2022-09-24T18:59:23Z",
            "added_by" : {
                "external_urls" : {
                    "spotify" : "https://open.spotify.com/user/c5pe2m34y0fwcgtj83q8mfjuf"
                },
                "href" : "https://api.spotify.com/v1/users/c5pe2m34y0fwcgtj83q8mfjuf",
                "id" : "c5pe2m34y0fwcgtj83q8mfjuf",
                "type" : "user",
                "uri" : "spotify:user:c5pe2m34y0fwcgtj83q8mfjuf"
            },
            "is_local" : false,
            "primary_color" : null,
            "track" : {
                "album" : {
                    "album_type" : "single",
                    "artists" : [ {
                        "external_urls" : {
                            "spotify" : "https://open.spotify.com/artist/4cJ99wTjC60pXcfyISL9fa"
                        },
                        "href" : "https://api.spotify.com/v1/artists/4cJ99wTjC60pXcfyISL9fa",
                        "id" : "4cJ99wTjC60pXcfyISL9fa",
                        "name" : "APRIL",
                        "type" : "artist",
                        "uri" : "spotify:artist:4cJ99wTjC60pXcfyISL9fa"
                    } ],
                    "external_urls" : {
                        "spotify" : "https://open.spotify.com/album/59WRoj4HFkkDS9775OiE34"
                    },
                    "href" : "https://api.spotify.com/v1/albums/59WRoj4HFkkDS9775OiE34",
                    "id" : "59WRoj4HFkkDS9775OiE34",
                    "images" : [ {
                        "height" : 640,
                        "url" : "https://i.scdn.co/image/ab67616d0000b2736a284b6da688859a4f783e92",
                        "width" : 640
                    }, {
                        "height" : 300,
                        "url" : "https://i.scdn.co/image/ab67616d00001e026a284b6da688859a4f783e92",
                        "width" : 300
                    }, {
                        "height" : 64,
                        "url" : "https://i.scdn.co/image/ab67616d000048516a284b6da688859a4f783e92",
                        "width" : 64
                    } ],
                    "name" : "TinkerBell",
                    "release_date" : "2018-04-25",
                    "release_date_precision" : "day",
                    "total_tracks" : 2,
                    "type" : "album",
                    "uri" : "spotify:album:59WRoj4HFkkDS9775OiE34"
                },
                "artists" : [ {
                    "external_urls" : {
                        "spotify" : "https://open.spotify.com/artist/4cJ99wTjC60pXcfyISL9fa"
                    },
                    "href" : "https://api.spotify.com/v1/artists/4cJ99wTjC60pXcfyISL9fa",
                    "id" : "4cJ99wTjC60pXcfyISL9fa",
                    "name" : "APRIL",
                    "type" : "artist",
                    "uri" : "spotify:artist:4cJ99wTjC60pXcfyISL9fa"
                } ],
                "disc_number" : 1,
                "duration_ms" : 201027,
                "episode" : false,
                "explicit" : false,
                "external_ids" : {
                    "isrc" : "TCJPG1884166"
                },
                "external_urls" : {
                    "spotify" : "https://open.spotify.com/track/6DIiNrnYystmiWLoqjUnkF"
                },
                "href" : "https://api.spotify.com/v1/tracks/6DIiNrnYystmiWLoqjUnkF",
                "id" : "6DIiNrnYystmiWLoqjUnkF",
                "is_local" : false,
                "is_playable" : true,
                "name" : "TinkerBell",
                "popularity" : 18,
                "preview_url" : "https://p.scdn.co/mp3-preview/006423bf3ad255424a7179939ab9f963af8c8586?cid=774b29d4f13844c495f206cafdad9c86",
                "track" : true,
                "track_number" : 1,
                "type" : "track",
                "uri" : "spotify:track:6DIiNrnYystmiWLoqjUnkF"
            },
            "video_thumbnail" : {
                "url" : null
            }
        }, {
            "added_at" : "2022-09-24T18:59:23Z",
            "added_by" : {
                "external_urls" : {
                    "spotify" : "https://open.spotify.com/user/c5pe2m34y0fwcgtj83q8mfjuf"
                },
                "href" : "https://api.spotify.com/v1/users/c5pe2m34y0fwcgtj83q8mfjuf",
                "id" : "c5pe2m34y0fwcgtj83q8mfjuf",
                "type" : "user",
                "uri" : "spotify:user:c5pe2m34y0fwcgtj83q8mfjuf"
            },
            "is_local" : false,
            "primary_color" : null,
            "track" : {
                "album" : {
                    "album_type" : "album",
                    "artists" : [ {
                        "external_urls" : {
                            "spotify" : "https://open.spotify.com/artist/3g34PW5oNmDBxMVUTzx2XK"
                        },
                        "href" : "https://api.spotify.com/v1/artists/3g34PW5oNmDBxMVUTzx2XK",
                        "id" : "3g34PW5oNmDBxMVUTzx2XK",
                        "name" : "Lovelyz",
                        "type" : "artist",
                        "uri" : "spotify:artist:3g34PW5oNmDBxMVUTzx2XK"
                    } ],
                    "external_urls" : {
                        "spotify" : "https://open.spotify.com/album/4oYvS9fninV79hmUvWeUho"
                    },
                    "href" : "https://api.spotify.com/v1/albums/4oYvS9fninV79hmUvWeUho",
                    "id" : "4oYvS9fninV79hmUvWeUho",
                    "images" : [ {
                        "height" : 640,
                        "url" : "https://i.scdn.co/image/ab67616d0000b27317fe32521fd68159878e6681",
                        "width" : 640
                    }, {
                        "height" : 300,
                        "url" : "https://i.scdn.co/image/ab67616d00001e0217fe32521fd68159878e6681",
                        "width" : 300
                    }, {
                        "height" : 64,
                        "url" : "https://i.scdn.co/image/ab67616d0000485117fe32521fd68159878e6681",
                        "width" : 64
                    } ],
                    "name" : "Hi~",
                    "release_date" : "2015-03-03",
                    "release_date_precision" : "day",
                    "total_tracks" : 11,
                    "type" : "album",
                    "uri" : "spotify:album:4oYvS9fninV79hmUvWeUho"
                },
                "artists" : [ {
                    "external_urls" : {
                        "spotify" : "https://open.spotify.com/artist/3g34PW5oNmDBxMVUTzx2XK"
                    },
                    "href" : "https://api.spotify.com/v1/artists/3g34PW5oNmDBxMVUTzx2XK",
                    "id" : "3g34PW5oNmDBxMVUTzx2XK",
                    "name" : "Lovelyz",
                    "type" : "artist",
                    "uri" : "spotify:artist:3g34PW5oNmDBxMVUTzx2XK"
                } ],
                "disc_number" : 1,
                "duration_ms" : 207426,
                "episode" : false,
                "explicit" : false,
                "external_ids" : {
                    "isrc" : "KRA381210152"
                },
                "external_urls" : {
                    "spotify" : "https://open.spotify.com/track/0uK6mPSkTMteghVWeMDMHG"
                },
                "href" : "https://api.spotify.com/v1/tracks/0uK6mPSkTMteghVWeMDMHG",
                "id" : "0uK6mPSkTMteghVWeMDMHG",
                "is_local" : false,
                "is_playable" : true,
                "name" : "Hi~",
                "popularity" : 37,
                "preview_url" : "https://p.scdn.co/mp3-preview/00dbe68f8e9012dc39b7c3f3990d9ed8c2a4a46b?cid=774b29d4f13844c495f206cafdad9c86",
                "track" : true,
                "track_number" : 3,
                "type" : "track",
                "uri" : "spotify:track:0uK6mPSkTMteghVWeMDMHG"
            },
            "video_thumbnail" : {
                "url" : null
            }
        }, {
            "added_at" : "2022-09-27T04:42:44Z",
            "added_by" : {
                "external_urls" : {
                    "spotify" : "https://open.spotify.com/user/c5pe2m34y0fwcgtj83q8mfjuf"
                },
                "href" : "https://api.spotify.com/v1/users/c5pe2m34y0fwcgtj83q8mfjuf",
                "id" : "c5pe2m34y0fwcgtj83q8mfjuf",
                "type" : "user",
                "uri" : "spotify:user:c5pe2m34y0fwcgtj83q8mfjuf"
            },
            "is_local" : false,
            "primary_color" : null,
            "track" : {
                "album" : {
                    "album_type" : "album",
                    "artists" : [ {
                        "external_urls" : {
                            "spotify" : "https://open.spotify.com/artist/2019zR22qK2RBvCqtudBaI"
                        },
                        "href" : "https://api.spotify.com/v1/artists/2019zR22qK2RBvCqtudBaI",
                        "id" : "2019zR22qK2RBvCqtudBaI",
                        "name" : "OH MY GIRL",
                        "type" : "artist",
                        "uri" : "spotify:artist:2019zR22qK2RBvCqtudBaI"
                    } ],
                    "external_urls" : {
                        "spotify" : "https://open.spotify.com/album/7coV2krimvobeWltmNvYeC"
                    },
                    "href" : "https://api.spotify.com/v1/albums/7coV2krimvobeWltmNvYeC",
                    "id" : "7coV2krimvobeWltmNvYeC",
                    "images" : [ {
                        "height" : 640,
                        "url" : "https://i.scdn.co/image/ab67616d0000b273a994eb69242daf25e8730a72",
                        "width" : 640
                    }, {
                        "height" : 300,
                        "url" : "https://i.scdn.co/image/ab67616d00001e02a994eb69242daf25e8730a72",
                        "width" : 300
                    }, {
                        "height" : 64,
                        "url" : "https://i.scdn.co/image/ab67616d00004851a994eb69242daf25e8730a72",
                        "width" : 64
                    } ],
                    "name" : "WINDY DAY",
                    "release_date" : "2016",
                    "release_date_precision" : "year",
                    "total_tracks" : 8,
                    "type" : "album",
                    "uri" : "spotify:album:7coV2krimvobeWltmNvYeC"
                },
                "artists" : [ {
                    "external_urls" : {
                        "spotify" : "https://open.spotify.com/artist/2019zR22qK2RBvCqtudBaI"
                    },
                    "href" : "https://api.spotify.com/v1/artists/2019zR22qK2RBvCqtudBaI",
                    "id" : "2019zR22qK2RBvCqtudBaI",
                    "name" : "OH MY GIRL",
                    "type" : "artist",
                    "uri" : "spotify:artist:2019zR22qK2RBvCqtudBaI"
                } ],
                "disc_number" : 1,
                "duration_ms" : 249682,
                "episode" : false,
                "explicit" : false,
                "external_ids" : {
                    "isrc" : "KRA381600999"
                },
                "external_urls" : {
                    "spotify" : "https://open.spotify.com/track/7prrcyZc48tO9hGzdnU9aD"
                },
                "href" : "https://api.spotify.com/v1/tracks/7prrcyZc48tO9hGzdnU9aD",
                "id" : "7prrcyZc48tO9hGzdnU9aD",
                "is_local" : false,
                "is_playable" : true,
                "name" : "WINDY DAY",
                "popularity" : 41,
                "preview_url" : "https://p.scdn.co/mp3-preview/5f273fd0e65b5909547d2c1f5b47c272d69c7f99?cid=774b29d4f13844c495f206cafdad9c86",
                "track" : true,
                "track_number" : 1,
                "type" : "track",
                "uri" : "spotify:track:7prrcyZc48tO9hGzdnU9aD"
            },
            "video_thumbnail" : {
                "url" : null
            }
        }, {
            "added_at" : "2022-09-27T04:43:08Z",
            "added_by" : {
                "external_urls" : {
                    "spotify" : "https://open.spotify.com/user/c5pe2m34y0fwcgtj83q8mfjuf"
                },
                "href" : "https://api.spotify.com/v1/users/c5pe2m34y0fwcgtj83q8mfjuf",
                "id" : "c5pe2m34y0fwcgtj83q8mfjuf",
                "type" : "user",
                "uri" : "spotify:user:c5pe2m34y0fwcgtj83q8mfjuf"
            },
            "is_local" : false,
            "primary_color" : null,
            "track" : {
                "album" : {
                    "album_type" : "single",
                    "artists" : [ {
                        "external_urls" : {
                            "spotify" : "https://open.spotify.com/artist/2019zR22qK2RBvCqtudBaI"
                        },
                        "href" : "https://api.spotify.com/v1/artists/2019zR22qK2RBvCqtudBaI",
                        "id" : "2019zR22qK2RBvCqtudBaI",
                        "name" : "OH MY GIRL",
                        "type" : "artist",
                        "uri" : "spotify:artist:2019zR22qK2RBvCqtudBaI"
                    } ],
                    "external_urls" : {
                        "spotify" : "https://open.spotify.com/album/08iyrLkLFP2ByBkqVhBls7"
                    },
                    "href" : "https://api.spotify.com/v1/albums/08iyrLkLFP2ByBkqVhBls7",
                    "id" : "08iyrLkLFP2ByBkqVhBls7",
                    "images" : [ {
                        "height" : 640,
                        "url" : "https://i.scdn.co/image/ab67616d0000b2737700db620a3f0030fcfd078c",
                        "width" : 640
                    }, {
                        "height" : 300,
                        "url" : "https://i.scdn.co/image/ab67616d00001e027700db620a3f0030fcfd078c",
                        "width" : 300
                    }, {
                        "height" : 64,
                        "url" : "https://i.scdn.co/image/ab67616d000048517700db620a3f0030fcfd078c",
                        "width" : 64
                    } ],
                    "name" : "CLOSER",
                    "release_date" : "2015-10-08",
                    "release_date_precision" : "day",
                    "total_tracks" : 5,
                    "type" : "album",
                    "uri" : "spotify:album:08iyrLkLFP2ByBkqVhBls7"
                },
                "artists" : [ {
                    "external_urls" : {
                        "spotify" : "https://open.spotify.com/artist/2019zR22qK2RBvCqtudBaI"
                    },
                    "href" : "https://api.spotify.com/v1/artists/2019zR22qK2RBvCqtudBaI",
                    "id" : "2019zR22qK2RBvCqtudBaI",
                    "name" : "OH MY GIRL",
                    "type" : "artist",
                    "uri" : "spotify:artist:2019zR22qK2RBvCqtudBaI"
                } ],
                "disc_number" : 1,
                "duration_ms" : 207413,
                "episode" : false,
                "explicit" : false,
                "external_ids" : {
                    "isrc" : "KRA381500299"
                },
                "external_urls" : {
                    "spotify" : "https://open.spotify.com/track/2xSmwI4qeqtb2iIElCfcZD"
                },
                "href" : "https://api.spotify.com/v1/tracks/2xSmwI4qeqtb2iIElCfcZD",
                "id" : "2xSmwI4qeqtb2iIElCfcZD",
                "is_local" : false,
                "is_playable" : true,
                "name" : "CLOSER",
                "popularity" : 49,
                "preview_url" : "https://p.scdn.co/mp3-preview/fbd399a93c9fd045d98e58cf9460a1c8b71e34a0?cid=774b29d4f13844c495f206cafdad9c86",
                "track" : true,
                "track_number" : 1,
                "type" : "track",
                "uri" : "spotify:track:2xSmwI4qeqtb2iIElCfcZD"
            },
            "video_thumbnail" : {
                "url" : null
            }
        } ],
        "limit" : 100,
        "next" : null,
        "offset" : 0,
        "previous" : null,
        "total" : 50
    },
    "type" : "playlist",
    "uri" : "spotify:playlist:2FONa0A7EaSDvAgck02s5s"
}
