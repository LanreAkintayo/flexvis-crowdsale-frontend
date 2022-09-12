import Head from "next/head";
import Image from "next/image";

import { CryptoCards, Button } from "@web3uikit/core";
import { useMoralis, useChain, useWeb3Contract } from "react-moralis";
import { useEffect, useState } from "react";
import useSWR, { useSWRConfig } from "swr";
import { contractAddresses, abi, DEPLOYER, erc20Abi } from "../constants";
import "react-pro-sidebar/dist/css/styles.css";
import Link from "next/link";
import Table from "../components/Table";
import CreateModal from "../components/CreateModal";
import { toWei, fromWei, time, sDuration } from "../utils/helper";
import { useNotification } from "web3uikit";
import { usePromiseTracker, trackPromise } from "react-promise-tracker";
import { ethers } from "ethers";
import Dashboard from "../components/Dashboard";
import Header from "../components/Header";

export default function Home() {
  const { isWeb3Enabled, chainId: chainIdHex, enableWeb3 } = useMoralis();
  const { switchNetwork, chain, account } = useChain();

  const { mutate } = useSWRConfig();
  const dispatch = useNotification();

  const chainId = parseInt(chainIdHex);

  const length = contractAddresses[chainId]?.length;
  const sfInvestmentAddress =
    chainId in contractAddresses
      ? contractAddresses[chainId][length - 1]
      : null;
  const flexvisAddress = "0xAd3f740f9445cc477c7Cb7f80011f35De910B19E";

  const [investmentInfo, setInvestmentInfo] = useState({
    amount: "",
    startDate: new Date(),
    duration: "",
  });
  const [closeCreateModal, setCloseCreateModal] = useState(false);

  const {
    runContractFunction: createInvestment,
    isFetching: isFetchingCreate,
    isLoading: isLoadingCreate,
  } = useWeb3Contract();

  const {
    runContractFunction: endInvestment,
    isFetching: isFetchingEnd,
    isLoading: isLoadingEnd,
  } = useWeb3Contract();

  useEffect(() => {
    // console.log(investmentInfo);
  }, [investmentInfo]);

  const handleCloseCreateModal = () => {
    setCloseCreateModal(true);
  };

  const handleCreateInvestment = async () => {
    const amount = toWei(investmentInfo.amount);
    const startDay = Math.floor(investmentInfo.startDate.getTime() / 1000);
    const duration = sDuration.days(investmentInfo.duration);

    console.log(amount, " ", startDay, "", duration);

    const provider = await enableWeb3();
    const flexvisContract = new ethers.Contract(
      flexvisAddress,
      erc20Abi,
      provider
    );

    const signer = provider.getSigner(account);
    const approveTx = await trackPromise(
      flexvisContract.connect(signer).approve(sfInvestmentAddress, amount)
    );
    await trackPromise(approveTx.wait(1));

    createInvestment({
      params: {
        abi: abi,
        contractAddress: sfInvestmentAddress,
        functionName: "createInvestment",
        params: {
          amount,
          startDay,
          duration,
        },
      },
      onSuccess: handleSuccess,
      onError: (error) => {
        handleFailure(error);
      },
    });
  };

  const handleEndInvestment = (investmentID) => {
    console.log(investmentID);
    endInvestment({
      params: {
        abi: abi,
        contractAddress: sfInvestmentAddress,
        functionName: "endInvestment",
        params: {
          investmentID,
        },
      },
      onSuccess: handleSuccess,
      onError: (error) => {
        handleFailure(error);
      },
    });
  };

  const handleSuccess = async (tx) => {
    console.log("Success transaction: ", tx);
    await trackPromise(tx.wait(1));
    // updateUIValues()
    const provider = await enableWeb3();
    const sfInvestmentContract = new ethers.Contract(
      sfInvestmentAddress,
      abi,
      provider
    );

    // const updatedInvestments = await sfInvestmentContract.getAllInvestments(account)

    await mutate("web3/userInvestments");
    await mutate("web3/flexvisBalance");
    setCloseCreateModal(false);

    dispatch({
      type: "success",
      message: "Transaction Completed!",
      title: "Transaction Notification",
      position: "topR",
    });
  };

  const handleFailure = async (error) => {
    console.log("Error: ", error);
    dispatch({
      type: "error",
      message: "Transation Failed",
      title: "Transaction Notification",
      position: "topR",
    });
  };

  return (
    <div className="w-screen max-w-max">
      <Header />
      <div className="w-full flex justify-end px-5 items-end">
        <Dashboard />
      </div>
      
      <section className="px-11">
        <h1 className="text-3xl my-4 text-center">Flexvis Investment</h1>
        <button
          className="bg-gray-300 p-2 my-5 rounded-md text-gray-700"
          onClick={handleCloseCreateModal}
        >
          Create a Flex Investment{" "}
        </button>
        <div className="mb-8">
          <Table
            handleEndInvestment={handleEndInvestment}
            isFetchingEnd={isFetchingEnd}
            isLoadingEnd={isLoadingEnd}
          />
        </div>
      </section>

      {closeCreateModal && (
        <div className="flex justify-center text-center sm:block sm:p-0 mt-2 scrollbar-hide">
          <CreateModal
            investmentInfo={investmentInfo}
            setInvestmentInfo={setInvestmentInfo}
            handleCreateInvestment={handleCreateInvestment}
            handleCloseCreateModal={handleCloseCreateModal}
            isFetchingCreate={isFetchingCreate}
            isLoadingCreate={isLoadingCreate}
            setCloseCreateModal={setCloseCreateModal}
          />
        </div>
      )}
    </div>
  );
}
