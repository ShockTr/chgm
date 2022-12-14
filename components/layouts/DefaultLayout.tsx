import {ReactElement} from "react";
import Navbar from "../Navbar";

export default function DefaultLayout(page: ReactElement) {
    return (
        <div className="min-h-screen flex flex-col">
            <Navbar/>
            {page}
        </div>
    )
}
