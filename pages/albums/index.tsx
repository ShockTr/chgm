import {NextPageWithLayout} from "../_app";
import DefaultLayout from "../../components/layouts/DefaultLayout";


const Albums: NextPageWithLayout = () => {
    return (
        <div className="text-white text-2xl p-5">
            THERE WILL BE COOL ALBUMS HERE
        </div>
    )
}
Albums.getLayout = DefaultLayout

export default Albums
