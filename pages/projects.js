import Footer from "../components/Footer";
import Header from "../components/Header";
import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { create } from "ipfs-http-client";
import { contractAddresses, abi } from "../constants";
import { useMoralis, useWeb3Contract } from "react-moralis";
import { ethers } from "ethers";
import { RotateLoader, ClipLoader } from "react-spinners";
import { useNotification } from "web3uikit";
import { usePromiseTracker, trackPromise } from "react-promise-tracker";
import ProjectCardSection from "../components/ProjectCardSection";

export default function Projects() {
  return (
    <div className="flex flex-col w-full justify-between h-screen">
      <div>
        <Header />
        <h1 className="text-center w-full py-3 text-3xl">All Projects</h1>
        <ProjectCardSection />
      </div>
      <Footer />
    </div>
  );
}
