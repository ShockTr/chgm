import Link from "next/link";
import Image from 'next/image'

export default function Navbar(){
    return(
        <nav className="bg-gray-800">
            <div className="flex mx-auto justify-between">
                <Link href="/">
                    <div className="flex items-center mx-8 select-none hover:cursor-pointer">
                        <Image draggable="false" alt="Praying Hands" width="32" height="32" src="/el.png"/>
                        <Image draggable="false" alt="Horse" width="32" height="32" src="/at.png"/>
                        <Image draggable="false" alt="Music" width="32" height="32" src="/muzik.png"/>
                    </div>
                </Link>
                <div className="flex space-x-2 mx-5">
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
            <div className="my-3 rounded py-2 text-white px-4 hover:shadow hover:bg-gray-700 hover:cursor-pointer transition-colors ">
                {data.text}
            </div>
        </Link>
    )
}

const NAVBAR_ITEMS = {
    HOME: {href: "/", text: "Home"},
    ARTISTS: {href: "#", text: "Artists"},
    TRACKS: {href: "#", text: "Tracks"},
    SOTDY: {href:"#", text: "Song of the day"},
    ABOUT: {href: "#", text: "About"}
}
