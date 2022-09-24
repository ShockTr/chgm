import {NextPageWithLayout} from "../_app";
import DefaultLayout from "../../components/layouts/DefaultLayout";


const Artists: NextPageWithLayout = () => {
    return (
        <div className="text-white text-2xl p-5">
            THERE WILL BE COOL ARTISTS HERE
        </div>
    )
}
Artists.getLayout = DefaultLayout

export default Artists
