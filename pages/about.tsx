import {NextPageWithLayout} from "./_app";
import DefaultLayout from "../components/layouts/DefaultLayout";


const About: NextPageWithLayout = () => {
    return (
        <div className="text-white text-2xl p-5">
            About page: 🙏🐎👧🎵
        </div>
    )
}
About.getLayout = DefaultLayout

export default About
