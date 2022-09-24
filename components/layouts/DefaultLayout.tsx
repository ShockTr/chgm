import {ReactElement} from "react";
import Navbar from "../navbar";

export default function DefaultLayout(page: ReactElement) {
    return (
        <div className="bg-slate-900 min-h-screen">
            <Navbar/>
            <div>
                {page}
            </div>
        </div>
    )
}
