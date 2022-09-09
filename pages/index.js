import Head from "next/head";
import Image from "next/image";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { CryptoCards, Button } from "@web3uikit/core";
import { useMoralis } from "react-moralis";
import { useEffect, useState } from "react";
import ProjectCard from "../components/ProjectCard";
import useSWR, { useSWRConfig } from "swr";
import ProjectCardSection from "../components/ProjectCardSection";
import { ProSidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";
import Link from "next/link";

export default function Home() {
  const { isWeb3Enabled, chainId } = useMoralis();

  const [enabled, setEnabled] = useState(false);

  const { mutate } = useSWRConfig();
  // const [collapsed, setCollapsed] = useState(true);

  // useEffect(() => {
  //   console.log(collapsed);
  // }, [collapsed]);
  // const handleSidebar = () => {
  //   setCollapsed((prevCollapsed) => !prevCollapsed);
  // };

  return (
    <>
      <section>
        {/* {!collapsed && (
          <div className={`z-50 h-screen ${!collapsed && "fixed inset-0"}`}>
            <ProSidebar
              breakPoint="xs"
              open={false}
              collapsedWidth="0px"
              collapsed={collapsed}
            >
              <Menu iconShape="square">
                <MenuItem><Link href="/"> Home</Link></MenuItem>
                <MenuItem><Link href="/">Projects</Link></MenuItem>
                <MenuItem><Link href="/launch">Get Funded</Link></MenuItem>
              </Menu>
            </ProSidebar>
          </div>
        )} */}
        <Header />

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
              <button
                className="bg-green-800 p-2 rounded-md"
                onClick={() => {
                  if (isWeb3Enabled) {
                    window.open("/launch", "_self");
                  } else {
                    window.alert("Connect your wallet");
                  }
                }}
              >
                Get Funded
              </button>

              <button
                className="border border-green-500 p-2 rounded-md ml-4 text-green-500"
                onClick={() => {
                  if (isWeb3Enabled) {
                    window.open("/projects", "_self");
                  } else {
                    window.alert("Connect your wallet");
                  }
                }}
              >
                Browse Project
              </button>
            </div>
          </div>
        </div>
      </section>
      <ProjectCardSection />
      <Footer />
    </>
  );
}
