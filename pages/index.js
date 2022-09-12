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
import Table from "../components/Table";

export default function Home() {

 

  return (
    <div className="w-screen max-w-max">
      <Header />
      <section className="px-11">
        <h1 className="text-3xl my-4 text-center">Flexvis Investment</h1>
        <button className="bg-gray-300 p-2 my-5 rounded-md text-gray-700">Create a Flex Investment </button>
        <div>
          <Table />
        </div>
      </section>
    </div>
  );
}
