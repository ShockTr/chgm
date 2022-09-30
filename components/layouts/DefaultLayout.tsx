import {ReactElement} from "react";
import Navbar from "../navbar";

export default function DefaultLayout(page: ReactElement) {
    return (
        <div className="min-h-screen">
            <Navbar/>
            {page}
        </div>
    )
}
