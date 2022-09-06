import Head from "next/head";
import Image from "next/image";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { CryptoCards, Button } from '@web3uikit/core';
import { useMoralis } from "react-moralis";
import {useState} from "react"


export default function Home() {
  const { isWeb3Enabled, chainId } = useMoralis();

  const [enabled, setEnabled] = useState(false)

  console.log(chainId)
  console.log(isWeb3Enabled)

  
  return (
    <>
      <section>
       <Header/>
      
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
            <div className="text-white text-3xl font-medium lg:text-6xl w-8/12 ">
              Best Crowdfund Platform for Personal Projects
            </div>
            <p className="my-4 text-xl">Fund with varieties of tokens</p>
            <div className="flex text-xl mt-6">
              <button className="bg-green-800 p-2 rounded-md" onClick={() => {
                if(isWeb3Enabled){
                  window.open("/launch", "_self");
                } else{
                  setEnabled(false);
                }
              }}>
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
          <div className="flex lg:flex-row flex-col justify-between">
            <div className="mx-3 mb-5 lg:mb-0 bg-white-200 shadow-lg">
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

            <div className="mx-3 mb-5 lg:mb-0  bg-white-200 shadow-lg">
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

            <div className="mx-3 mb-5 lg:mb-0 bg-white-200 shadow-lg">
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

            <div className="mx-3 mb-5 lg:mb-0  bg-white-200 shadow-lg">
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
      <Footer />
    </>
  );
}
