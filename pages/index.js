import Head from "next/head";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <section>
        <div className="h-20">
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
        </div>
        <div className="relative w-full h-screen">
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
              <button className="bg-green-700 p-2 rounded-md">
                Get Funded
              </button>
              <button className="border border-green-500 p-2 rounded-md ml-4 text-green-500">
                Browse Project
              </button>
            </div>
          </div>
        </div>
      </section>
      <section className="pl-5 w-full">
        <h1 className="text-3xl mt-10">Explore Projects</h1>
        <div className="flex flex-col w-full items-center my-10 mb-14">
          <div className="flex justify-between">
            <div className="mx-3 bg-white-200 shadow-lg">
              <div className="w-full h-56 ">
                <img
                  alt="..."
                  src="/bg1.jpg"
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="w-full bg-neutral-400 h-2.5 dark:bg-gray-700">
                <div
                  className="bg-yellow-600 h-2.5 "
                  style={{ width: `${40}%` }}
                ></div>
              </div>
              <div className="shadow-md px-2">
                <h1 className="text-xl text-green-900 py-3">Flying to Mars</h1>
                <p className="text-sm text-gray-800">
                  Since I've been a kid, I've always dreamt of flying to mars
                  but I do not have transport fare. So, I need you guys to
                  donate. Thank you.
                </p>
                <p className="py-4 text-green-900">11% of $15,000 Raised</p>
              </div>
            </div>

            <div className="mx-3 bg-white-200 shadow-lg">
              <div className="w-full h-56 ">
                <img
                  alt="..."
                  src="/bg2.jpg"
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="w-full bg-neutral-400 h-2.5 dark:bg-gray-700">
                <div
                  className="bg-yellow-600 h-2.5 "
                  style={{ width: `${40}%` }}
                ></div>
              </div>
              <div className="shadow-md px-2">
                <h1 className="text-xl text-green-900 py-3">Flying to Mars</h1>
                <p className="text-sm text-gray-800">
                  Since I've been a kid, I've always dreamt of flying to mars
                  but I do not have transport fare. So, I need you guys to
                  donate. Thank you.
                </p>
                <p className="py-4 text-green-900">11% of $15,000 Raised</p>
              </div>
            </div>

            <div className="mx-3 bg-white-200 shadow-lg">
              <div className="w-full h-56 ">
                <img
                  alt="..."
                  src="/bg3.jpg"
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="w-full bg-neutral-400 h-2.5 dark:bg-gray-700">
                <div
                  className="bg-yellow-600 h-2.5 "
                  style={{ width: `${80}%` }}
                ></div>
              </div>
              <div className="shadow-md px-2">
                <h1 className="text-xl text-green-900 py-3">Flying to Mars</h1>
                <p className="text-sm text-gray-800">
                  Since I've been a kid, I've always dreamt of flying to mars
                  but I do not have transport fare. So, I need you guys to
                  donate. Thank you.
                </p>
                <p className="py-4 text-green-900">11% of $15,000 Raised</p>
              </div>
            </div>

            <div className="mx-3 bg-white-200 shadow-lg">
              <div className="w-full h-56 ">
                <img
                  alt="..."
                  src="/bg1.jpg"
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="w-full bg-neutral-400 h-2.5 dark:bg-gray-700">
                <div
                  className="bg-yellow-600 h-2.5 "
                  style={{ width: `${40}%` }}
                ></div>
              </div>
              <div className="shadow-md px-2">
                <h1 className="text-xl text-green-900 py-3">Flying to Mars</h1>
                <p className="text-sm text-gray-800">
                  Since I've been a kid, I've always dreamt of flying to mars
                  but I do not have transport fare. So, I need you guys to
                  donate. Thank you.
                </p>
                <p className="py-4 text-green-900">11% of $15,000 Raised</p>
              </div>
            </div>
          </div>
          <button className="text-green-800 p-2 text-xl mt-5 border rounded-md border-green-800">
            See more
          </button>
        </div>
      </section>
      <footer className="bg-zinc-800 text-gray-400 flex justify-between items-center flex-col">
        <h1 className="text-xl pb-2 pt-1 "><u>Get in Touch</u></h1>
        <div className="flex">
          <div>
            <img
              alt="..."
              src="/github.svg"
              className="object-cover rounded-md "
            />
          </div>
          <div>
            <img
              alt="..."
              src="/linkedin.svg"
              className="object-cover ml-3 rounded-md "
            />
          </div>
          <div>
            <img
              alt="..."
              src="/twitter.svg"
              className="object-cover ml-3 rounded-md "
            />
          </div>
          <div>
            <img
              alt="..."
              src="/youtube.svg"
              className="object-cover ml-3 rounded-md "
            />
          </div>
          <div>
            <img
              alt="..."
              src="/email.png"
              className="object-cover w-8 h-8 ml-3 rounded-md "
            />
          </div>
        </div>
        <p className="mt-4 text-sm">© 2022 Made by LarryCodes</p>
      </footer>
    </>
  );
}
