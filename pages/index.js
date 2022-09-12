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
import CreateModal from "../components/CreateModal";
import { toWei, fromWei, time } from "../utils/helper";

export default function Home() {
  const [investmentInfo, setInvestmentInfo] = useState({
    amount: "",
    startDate: new Date(),
    duration: "",
  });

  useEffect(() => {
    console.log(investmentInfo);
  }, [investmentInfo]);

  const handleCreateInvestment = () => {
    const amount = toWei(investmentInfo.amount);
    const startDate = investmentInfo.startDate.getTime() / 1000;
    const duration = investmentInfo.duration;
    console.log(amount, "         ", startDate, "           ", duration);
  };

  return (
    <div className="w-screen max-w-max">
      <Header />
      <section className="px-11">
        <h1 className="text-3xl my-4 text-center">Flexvis Investment</h1>
        <button className="bg-gray-300 p-2 my-5 rounded-md text-gray-700">
          Create a Flex Investment{" "}
        </button>
        <div>
          <Table />
        </div>
      </section>
      <div className="flex justify-center text-center sm:block sm:p-0 mt-2 scrollbar-hide">
        <CreateModal
          investmentInfo={investmentInfo}
          setInvestmentInfo={setInvestmentInfo}
          handleCreateInvestment={handleCreateInvestment}
        />
      </div>
    </div>
  );
}
