import Link from "next/link";
import Image from 'next/image'
import {useState} from "react";

export default function Navbar(){
    const [open, setOpen] = useState(false)
    return(
        <nav className="bg-slate-800/70 z-40 top-0 sticky shadow backdrop-blur flex-none w-full">
            <div className="flex mx-auto justify-between">
                <Link href="/" className="">
                    <div className="flex items-center md:ml-4 select-none hover:cursor-pointer hover:brightness-[.80] py-4 px-4 transition-[filter] duration-300" onClick={() => setOpen(false)}>
                        <Image draggable="false" alt="Praying Hands" width="32" height="32" src="/images/el.png"/>
                        <Image draggable="false" alt="Horse" width="32" height="32" src="/images/at.png"/>
                        <Image draggable="false" alt="Girl" width="32" height="32" src="/images/kız.png"/>
                        <Image draggable="false" alt="Music" width="32" height="32" src="/images/muzik.png"/>
                    </div>
                </Link>
                <div className="hidden md:flex space-x-2 mr-5 whitespace-nowrap">
                    { Object.entries(NAVBAR_ITEMS).map(([key,data]) => {
                        return (
                            <div key={key} className="my-3">
                                <NavItem href={data.href} text={data.text}/>
                            </div>
                        )
                    }) }
                </div>
                <div className="md:hidden mx-3 my-3 py-2 px-2 text-white bg-slate-700 rounded active:bg-slate-500 transition-colors" onClick={()=> setOpen(!open)}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                    </svg>
                </div>
            </div>
            <div className={`${open? "": "hidden"} ${"md:hidden border-t border-slate-700 h-max flex flex-col"}`}>
                { Object.entries(NAVBAR_ITEMS).map(([key,data]) => {
                    return (
                        <div key={key} onClick={()=>setOpen(false)} className="my-2">
                            <NavItem href={data.href} text={data.text}/>
                        </div>
                    )
                }) }
            </div>
        </nav>
    )
}

export function NavItem(data: {href:string, text:string}) {
    return(
        <Link href={data.href}>
            <div className="rounded py-2 text-white px-4 hover:shadow hover:bg-gray-700 hover:cursor-pointer active:shadow active:bg-gray-700 transition-colors duration-200">
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
