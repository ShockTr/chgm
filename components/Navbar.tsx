import Link from "next/link";
import Image from 'next/image'
import {useEffect, useState} from "react";

export default function Navbar(){
    const [open, setOpen] = useState(false)
    const [scrollPosition, setScrollPosition] = useState(0);
    const handleScroll = () => {
        setScrollPosition(window.scrollY)
    }

    useEffect(() => {
        setScrollPosition(window.scrollY)
        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);
    return(
        <nav className={`z-40 bg-slate-900 md:bg-transparent top-0 sticky flex-none w-full transition-all border-b duration-200 border-slate-800 md:border-slate-800/0 ${(scrollPosition > 0) ? "md:bg-slate-900 shadow md:border-slate-800" : ""}`}>
            <div className="flex mx-auto justify-between">
                <Link href="/about" className="md:ml-4">
                    <div className="flex items-center select-none hover:cursor-pointer hover:brightness-[.80] py-4 px-4 transition-[filter] duration-300" onClick={() => setOpen(false)}>
                        <Image priority={true} draggable="false" alt="Praying Hands" width="32" height="32" src="/images/el.png"/>
                        <Image priority={true} draggable="false" alt="Horse" width="32" height="32" src="/images/at.png"/>
                        <Image priority={true} draggable="false" alt="Girl" width="32" height="32" src="/images/kız.png"/>
                        <Image priority={true} draggable="false" alt="Music" width="32" height="32" src="/images/muzik.png"/>
                    </div>
                </Link>
                <div className="hidden md:flex space-x-2 mr-5 whitespace-nowrap items-center">
                    { Object.entries(NAVBAR_ITEMS).map(([key,data]) => {
                        return (
                            <div key={key} className="my-3">
                                <NavItem href={data.href} text={data.text}/>
                            </div>
                        )
                    }) }
                </div>
                <div className="md:hidden mx-3 my-3 py-2 px-2 text-white bg-slate-800 rounded active:bg-slate-600 transition-colors" onClick={()=> setOpen(!open)}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                    </svg>
                </div>
            </div>
            <div className={`${open? "": "hidden"} ${"md:hidden border-t border-slate-800 h-max flex flex-col"}`}>
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
            <div className="rounded py-2 text-white px-4 hover:shadow hover:bg-gray-800 active:shadow active:bg-gray-800 transition-colors duration-200">
                {data.text}
            </div>
        </Link>
    )
}

const NAVBAR_ITEMS = {
    SOTD: {href:"/sotd", text: "Song of the day"},
    TRACKS: {href: "/tracks", text: "Tracks"},
    ALBUMS: {href: "/albums", text: "Albums"},
    ARTISTS: {href: "/artists", text: "Artists"},
    ABOUT: {href: "/about", text: "About"}
}
