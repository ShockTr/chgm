import {NextPageWithLayout} from "./_app";
import DefaultLayout from "../components/layouts/DefaultLayout";


const Home: NextPageWithLayout = () => {
  return (
      <div className="text-white text-2xl p-5">
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Est eveniet excepturi impedit iste rem? Consectetur deleniti distinctio ex magni maxime nihil nobis non numquam, quidem rerum sint tempora voluptas voluptates.
      </div>
  )
}
Home.getLayout = DefaultLayout

export default Home
