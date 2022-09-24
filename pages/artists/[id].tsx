import {NextPageWithLayout} from "../_app";
import DefaultLayout from "../../components/layouts/DefaultLayout";
import {useRouter} from "next/router";

const Artists: NextPageWithLayout = () => {
    const router = useRouter()
    const { id } = router.query

    return (
        <div className="text-white text-2xl p-5">
            Artist page of: {id}
        </div>
    )
}

Artists.getLayout = DefaultLayout
export default Artists
