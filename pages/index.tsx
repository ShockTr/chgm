import {NextPageWithLayout} from "./_app";
import DefaultLayout from "../components/layouts/DefaultLayout";


const Home: NextPageWithLayout = () => {
  return (
      <div className="text-white text-2xl p-5">
              Hello world
      </div>
  )
}
Home.getLayout = DefaultLayout

export default Home
