import Link from "next/link";
import Image from 'next/image'

export default function Navbar(){
    return(
        <nav className="bg-slate-800/70 z-40 top-0 sticky shadow backdrop-blur flex-none w-full">
            <div className="flex mx-auto justify-between">
                <Link href="/" className="">
                    <div className="flex items-center mx-4 select-none hover:cursor-pointer hover:brightness-[.80] py-4 px-4 transition-[filter] duration-300">
                        <Image draggable="false" alt="Praying Hands" width="32" height="32" src="/images/el.png"/>
                        <Image draggable="false" alt="Horse" width="32" height="32" src="/images/at.png"/>
                        <Image draggable="false" alt="Girl" width="32" height="32" src="/images/kız.png"/>
                        <Image draggable="false" alt="Music" width="32" height="32" src="/images/muzik.png"/>
                    </div>
                </Link>
                <div className="hidden md:flex space-x-2 mx-5">
                    { Object.entries(NAVBAR_ITEMS).map(([key,data]) => {
                        return (
                            <div key={key}>
                                <NavItem href={data.href} text={data.text}/>
                            </div>
                        )
                    }) }
                </div>
            </div>
        </nav>
    )
}

export function NavItem(data: {href:string, text:string}) {
    return(
        <Link href={data.href}>
            <div className="my-3 rounded py-2 text-white px-4 hover:shadow hover:bg-gray-700 hover:cursor-pointer transition-colors duration-200">
                {data.text}
            </div>
        </Link>
    )
}

const NAVBAR_ITEMS = {
    HOME: {href: "/", text: "Home"}, //decide whether to keep or not
    TRACKS: {href: "/tracks", text: "Tracks"},
    ALBUMS: {href: "/albums", text: "Albums"},
    ARTISTS: {href: "/artists", text: "Artists"},
    SOTD: {href:"/sotd", text: "Song of the day"},
    ABOUT: {href: "/about", text: "About"}
}
