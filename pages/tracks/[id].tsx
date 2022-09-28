import {NextPageWithLayout} from "../_app";
import DefaultLayout from "../../components/layouts/DefaultLayout";
import {useRouter} from "next/router";


const Tracks: NextPageWithLayout = () => {
    const router = useRouter()
    const { id } = router.query

    return (
        <div className="text-white text-2xl p-5">
            Track page of: {id}
        </div>
    )
}
Tracks.getLayout = DefaultLayout

export default Tracks
