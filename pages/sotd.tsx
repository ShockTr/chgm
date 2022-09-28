import {NextPageWithLayout} from "./_app";
import DefaultLayout from "../components/layouts/DefaultLayout";


const SongOfTheDay: NextPageWithLayout = () => {
    return (
        <div className="text-white text-2xl p-5">
            try to guess cool tracks
        </div>
    )
}
SongOfTheDay.getLayout = DefaultLayout

export default SongOfTheDay
