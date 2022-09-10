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
    <div className="w-screen max-w-max">
      <section>
        <Header />

        
      </section>
  
    </div>
  );
}
