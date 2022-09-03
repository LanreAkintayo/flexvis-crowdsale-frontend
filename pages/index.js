import Head from "next/head";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <section className="h-20">
        {/* Navbar */}
        <nav className="flex items-center px-4 py-4 h-full text-white bg-black ">
          <p className="w-5/12 font-logo text-3xl">
            <span className="text-orange-700">L</span>arry
            <span className="text-orange-700">C</span>odes
          </p>
          <div className="flex w-7/12 items-center justify-end">
            <div className="flex justify-between text-xl ">
              {" "}
              <a
                className="text-white font-semibold"
                href="#pablo"
                onClick={(e) => e.preventDefault()}
              >
                Home
              </a>
              <a
                className="ml-8 text-white font-semibold"
                href="#pablo"
                onClick={(e) => e.preventDefault()}
              >
                Projects
              </a>
              <a
                className="mx-8 text-white font-semibold"
                href="#pablo"
                onClick={(e) => e.preventDefault()}
              >
                Get Funded
              </a>
            </div>
          </div>
        </nav>
      </section>
      <section className="relative w-full h-screen">
        <div className="absolute w-full h-full bg-gradient-to-r dark:from-black from-black to-gray-600 dark:to-gray-700">
          <div className="absolute w-full">
            <img
              alt="..."
              src="/bg1.jpg"
              className="object-cover w-full h-screen rounded-md opacity-1 mix-blend-overlay"
            />
          </div>
        </div>
        <div className="mx-7 absolute w-full h-4/6 flex flex-col justify-center text-white">
          <div className="text-white text-6xl w-8/12 ">
            Best Crowdfund Platform for Personal Projects
          </div>
          <p className="my-4">Fund with varieties of tokens</p>
          <div className="flex text-xl mt-6">
            <button className="bg-green-700 p-2 rounded-md">Get Funded</button>
            <button className="border border-green-500 p-2 rounded-md ml-4 text-green-500">
              Browse Project
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
