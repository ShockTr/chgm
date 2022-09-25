import {NextPageWithLayout} from "../_app";
import DefaultLayout from "../../components/layouts/DefaultLayout";
import {useRouter} from "next/router";

const Albums: NextPageWithLayout = () => {
    const router = useRouter()
    const { id } = router.query

    return (
        <div className="text-white text-2xl p-5">
            Album page of: {id}
        </div>
    )
}

Albums.getLayout = DefaultLayout
export default Albums
