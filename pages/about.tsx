import {NextPageWithLayout} from "./_app";
import DefaultLayout from "../components/layouts/DefaultLayout";
import Link from "next/link";
import Head from "next/head";


const About: NextPageWithLayout = () => {
    return (
        <div className="p-5 space-y-3">
            <Head>
                <title>About - CHGM</title>
            </Head>
            <div className="text-white text-lg whitespace-pre-wrap">
                <h1 className="text-3xl font-bold">About</h1>
                <p>
                    This is a project built to tribute the now dead &quot;CHGM&quot; genre in K-Pop.
                    Also, this is my first project using React and Next.
                    This project includes a heardle game for CHGM songs, and a list page for CHGM songs, artists, and albums.
                    You can check out the project <a className="text-blue-600" href="https://chgm.vercel.app/">here</a>.
                </p>
                <br/>
                <h3 className="font-semibold text-xl">What is chgm?</h3>
                It&apos;s a reference to a hilarious YouTube video claiming <a className="text-blue-600" href="https://open.spotify.com/playlist/2FONa0A7EaSDvAgck02s5s?si=58599d12695c4706">these kinds of songs</a> as &quot;CHGM songs&quot; because genre didn&apos;t have any specific name before, I stuck with CHGM for this project&apos;s name.<br/>
                <br/>
                <h2 className="font-semibold text-2xl">Bugs / Feature requests</h2>
                Please make an issue on github.<br/>
                <br/>
                <h2 className="font-semibold text-2xl">Technologies Used</h2>
                <ul>
                    <li>Next.js</li>
                    <li>React.js</li>
                    <li>TypeScript</li>
                    <li>Tailwind</li>
                    <li>MongoDb</li>
                    <li>Luxon</li>
                    <li>Spotify API</li>
                </ul>
            </div>
            <div>
                <Link className="text-white flex items-center bg-slate-700 w-fit rounded p-3 hover:bg-slate-600 space-x-2" href="https://github.com/ShockTr/chgm">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                    >
                        <path fillRule="evenodd" d="M12.026 2c-5.509 0-9.974 4.465-9.974 9.974 0 4.406 2.857 8.145 6.821 9.465.499.09.679-.217.679-.481 0-.237-.008-.865-.011-1.696-2.775.602-3.361-1.338-3.361-1.338-.452-1.152-1.107-1.459-1.107-1.459-.905-.619.069-.605.069-.605 1.002.07 1.527 1.028 1.527 1.028.89 1.524 2.336 1.084 2.902.829.091-.645.351-1.085.635-1.334-2.214-.251-4.542-1.107-4.542-4.93 0-1.087.389-1.979 1.024-2.675-.101-.253-.446-1.268.099-2.64 0 0 .837-.269 2.742 1.021a9.582 9.582 0 012.496-.336 9.554 9.554 0 012.496.336c1.906-1.291 2.742-1.021 2.742-1.021.545 1.372.203 2.387.099 2.64.64.696 1.024 1.587 1.024 2.675 0 3.833-2.33 4.675-4.552 4.922.355.308.675.916.675 1.846 0 1.334-.012 2.41-.012 2.737 0 .267.178.577.687.479C19.146 20.115 22 16.379 22 11.974 22 6.465 17.535 2 12.026 2z" clipRule="evenodd"/>
                    </svg>
                    <span>Check out the source code on Github</span>
                </Link>
            </div>
        </div>
    )
}
About.getLayout = DefaultLayout

export default About
