import {NextPageWithLayout} from "../_app";
import DefaultLayout from "../../components/layouts/DefaultLayout";


const Tracks: NextPageWithLayout = () => {
    return (
        <div className="text-white text-2xl p-5">
            THERE WILL BE COOL TRACKS HERE
        </div>
    )
}
Tracks.getLayout = DefaultLayout

export default Tracks
