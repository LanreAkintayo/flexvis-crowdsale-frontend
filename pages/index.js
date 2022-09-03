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
      <section className="pl-5">
        <h1 className="text-3xl mt-10">Explore Projects</h1>
        <div className="flex justify-between mb-80">
          <div className="mx-3 bg-white-200 shadow-lg">
            <div className="w-full h-56 ">
              <img
                alt="..."
                src="/bg1.jpg"
                className="object-cover w-full h-full"
              />
            </div>
            <div class="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
              <div
                class="bg-blue-600 h-2.5 rounded-full"
                style="width: 45%"
              ></div>
            </div>
            <div className="shadow-md px-2">
              <h1 className="text-xl py-3">Flying to Mars</h1>
              <p className="text-sm">
                Since I've been a kid, I've always dreamt of flying to mars but
                I do not have transport fare. So, I need you guys to donate.
                Thank you.
              </p>
              <p className="py-4 text-orange-800">11% of $15,000 Raised</p>
            </div>
          </div>

          <div className="">
            <div className="w-80 h-56 ">
              <img
                alt="..."
                src="/bg1.jpg"
                className="object-cover w-full h-full rounded-md "
              />
            </div>
            <div>Scale</div>
            <div>
              <h1 className="text-xl py-3">Flying to Mars</h1>
              <p className="text-sm">
                Since I've been a kid, I've always dreamt of flying to mars but
                I do not have transport fare. So, I need you guys to donate.
                Thank you.
              </p>
              <p className="mt-3">11% of $15,000 Raised</p>
            </div>
          </div>

          <div className="">
            <div className="w-80 h-56 ">
              <img
                alt="..."
                src="/bg1.jpg"
                className="object-cover w-full h-full rounded-md "
              />
            </div>
            <div>Scale</div>
            <div>
              <h1 className="text-xl py-3">Flying to Mars</h1>
              <p className="text-sm">
                Since I've been a kid, I've always dreamt of flying to mars but
                I do not have transport fare. So, I need you guys to donate.
                Thank you.
              </p>
              <p className="mt-3">11% of $15,000 Raised</p>
            </div>
          </div>

          <div className="">
            <div className="w-80 h-56 ">
              <img
                alt="..."
                src="/bg1.jpg"
                className="object-cover w-full h-full rounded-md "
              />
            </div>
            <div>Scale</div>
            <div>
              <h1 className="text-xl py-3">Flying to Mars</h1>
              <p className="text-sm">
                Since I've been a kid, I've always dreamt of flying to mars but
                I do not have transport fare. So, I need you guys to donate.
                Thank you.
              </p>
              <p className="mt-3">11% of $15,000 Raised</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
