import Link from "next/link";
import { CryptoCards, Button } from "@web3uikit/core";
import { ConnectButton } from "web3uikit";
import { ProSidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";
import NavigationDropdown from "./NavigationDropdown";
import { useEffect, useState, useCallback } from "react";

const useMediaQuery = (width) => {
  const [targetReached, setTargetReached] = useState(false);

  const updateTarget = useCallback((e) => {
    if (e.matches) {
      setTargetReached(true);
    } else {
      setTargetReached(false);
    }
  }, []);

  useEffect(() => {
    const media = window.matchMedia(`(max-width: ${width}px)`);
    media.addListener(updateTarget);

    // Check on mount (callback is not called until a change occurs)
    if (media.matches) {
      setTargetReached(true);
    }

    return () => media.removeListener(updateTarget);
  }, []);

  return targetReached;
};



export default function Header() {
  const [collapsed, setCollapsed] = useState(true);
  const isBreakpoint = useMediaQuery(768)

  useEffect(() => {
    console.log(collapsed);
  }, [collapsed]);
  const handleSidebar = () => {
    setCollapsed((prevCollapsed) => !prevCollapsed);
  };



  return (
    <div className="h-20">
      {/* Navbar */}

      {!collapsed && (
        <div className={`z-50 h-screen ${!collapsed && "fixed inset-0"}`}>
          <ProSidebar
            breakPoint="xs"
            open={false}
            collapsedWidth="0px"
            collapsed={collapsed}
          >
            <div
              className="px-4 pt-4 w-full text-end cursor-pointer text-xl"
              onClick={handleSidebar}
            >
              X
            </div>
            <Menu iconShape="square">
              <div className="text-xl text-white hover:text-green-700">
                <MenuItem>
                  <Link href="/"> Home </Link>
                </MenuItem>
              </div>
              <MenuItem>
                <Link href="/">Projects</Link>
              </MenuItem>
              <MenuItem>
                <Link href="/launch">Get Funded</Link>
              </MenuItem>
            </Menu>
          </ProSidebar>
        </div>
      )}

      <nav className="flex items-center px-4 py-4 h-full text-white bg-zinc-800 ">
        <p className="w-5/12 font-logo text-3xl">
          <span className="text-orange-700">{"<"}L</span>arry
          <span className="text-orange-700">C</span>odes
          <span className="text-orange-700">{"/>"}</span>
        </p>
        <div className="flex w-7/12 items-center justify-end">
          <div className="flex justify-between items-center text-lg ">
            <Link href="/">
              <a className="text-white font-semibold hover:text-green-500">
                Home
              </a>
            </Link>
            <Link href="/projects">
              <a className="ml-8 text-white font-semibold hover:text-green-500">
                Projects
              </a>
            </Link>

            <Link href="/launch">
              <a className="mx-8 text-white font-semibold hover:text-green-500">
                Get Funded
              </a>
            </Link>
            <div className="text-white">
              {/* <Button type="button" text="Connect Wallet" /> */}
              <div className="">
                {" "}
                <ConnectButton text="This is a button" />
              </div>
            </div>
            <div
              className="w-8 h-8 text-white hover:text-green-500 cursor-pointer"
              onClick={handleSidebar}
            >
              <img
                alt="..."
                src="./menubar.svg"
                className="object-cover w-full h-full cursor-pointer hover:text-green-500"
              />
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
