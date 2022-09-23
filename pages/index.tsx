import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from "next/link";
import Navbar from "../components/navbar";

const Home: NextPage = () => {
  return (
      <div className="bg-gray-900 min-h-screen">
          <Navbar/>
          <div className="py-96 text-center text-5xl font-extrabold text-gray-300">
              Hello world
          </div>
      </div>
  )
}

export default Home
