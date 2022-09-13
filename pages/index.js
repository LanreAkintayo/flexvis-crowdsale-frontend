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
import BuyModal from "../components/BuyModal";
import { toWei, fromWei, time, sDuration } from "../utils/helper";
import { useNotification } from "web3uikit";
import { usePromiseTracker, trackPromise } from "react-promise-tracker";
import { ethers } from "ethers";
import Dashboard from "../components/Dashboard";
import Header from "../components/Header";

export default function Home() {
  const { isWeb3Enabled, chainId: chainIdHex, enableWeb3 } = useMoralis();
  const { switchNetwork, chain, account } = useChain();

  const dispatch = useNotification();

  const chainId = parseInt(chainIdHex);

  const length = contractAddresses[chainId]?.length;
  const fCrowdsaleAddress =
    chainId in contractAddresses
      ? contractAddresses[chainId][length - 1]
      : null;
  const flexvisAddress = "0xAd3f740f9445cc477c7Cb7f80011f35De910B19E";

  const [buyInfo, setbuyInfo] = useState({
    amount: "",
  });
  const [closeBuyModal, setCloseBuyModal] = useState(false);

  const {
    runContractFunction: buyToken,
    isFetching: isFetchingBuy,
    isLoading: isLoadingBuy,
  } = useWeb3Contract();

  const {
    runContractFunction: withdrawToken,
    isFetching: isFetchingWithdraw,
    isLoading: isLoadingWithdraw,
  } = useWeb3Contract();

  const {
    data: presaleInfo,
    error,
    mutate,
  } = useSWR(
    () => (isWeb3Enabled ? "web3/presaleInfo" : null),
    async () => {
      const provider = await enableWeb3();
      const fCrowdsaleContract = new ethers.Contract(
        fCrowdsaleAddress,
        abi,
        provider
      );

      // console.log("Crowdsale contract: ", fCrowdsaleContract)

        // cap, raised, rate, openingTime, closingTime, accountBalance

        const cap = await fCrowdsaleContract.cap()
        const weiRaised = await fCrowdsaleContract.weiRaised()
        const rate = await fCrowdsaleContract.rate()
        const openingTime = await fCrowdsaleContract.openingTime()
        const closingTime = await fCrowdsaleContract.closingTime()
        const accountBalance = await fCrowdsaleContract.balanceOf(account)


        return {
          cap,
          weiRaised,
          rate,
          openingTime,
          closingTime,
          accountBalance
        }
    }
  );



  // useEffect(() => {
  //   console.log("Presale Info: ", presaleInfo);
  // }, [presaleInfo]);

  const handlecloseBuyModal = () => {
    setCloseBuyModal(true);
  };

  const handlebuyToken = async () => {
    const amount = toWei(buyInfo.amount);
  

    // const provider = await enableWeb3();
    // const flexvisContract = new ethers.Contract(
    //   flexvisAddress,
    //   erc20Abi,
    //   provider
    // );

    // const signer = provider.getSigner(account);
    // const approveTx = await trackPromise(
    //   flexvisContract.connect(signer).approve(fCrowdsaleAddress, amount)
    // );
    // await trackPromise(approveTx.wait(1));
// 
    buyToken({
      params: {
        abi: abi,
        contractAddress: fCrowdsaleAddress,
        amount,
        functionName: "buyTokens",
        params: {
          beneficiary: account
        },
      },
      onSuccess: handleSuccess,
      onError: (error) => {
        handleFailure(error);
      },
    });
  };

  const handlewithdrawToken = (investmentID) => {
    console.log(investmentID);
    withdrawToken({
      params: {
        abi: abi,
        contractAddress: fCrowdsaleAddress,
        functionName: "withdrawToken",
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
    const fCrowdsaleContract = new ethers.Contract(
      fCrowdsaleAddress,
      abi,
      provider
    );

    // const updatedInvestments = await fCrowdsaleContract.getAllInvestments(account)

    await mutate("web3/userInvestments");
    await mutate("web3/flexvisBalance");
    setCloseBuyModal(false);

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
    <div className="w-screen max-w-max h-screen bg-gradient-to-r  from-gray-800 via-gray-800 to-gray-900 ">
      <Header />
      <div className="w-full flex justify-end px-5 items-end">
        <Dashboard />
      </div>
      <section className="m-4 p-2 flex flex-col items-center text-white">
        <h1 className="text-4xl text-center">
          Participate in Flexvis Presale and get yours at a cheaper rate.
        </h1>
        <p className="text-3xl py-8 text-center">1 BNB Target cap, 0.005 BNB Raised</p>
        <div className="w-96 bg-neutral-200 h-7 rounded-md dark:bg-gray-700">
          <div
            className={`h-7 rounded-md bg-gradient-to-r rounded-md from-purple-600 to-purple-400`}
            style={{ width: `${80}%` }}
          ></div>
        </div>
        <div className="w-96 flex py-2 justify-between">
          <p className="text-base">80% raised</p>
          <p className="text-base">1 FLEXVIS = 0.005 BNB</p>
        </div>
        <div className="w-full flex items-center justify-center my-2">
          <div className="flex">
            <div className="flex flex-col items-center justify-between">
              <p>
                <small>Days</small>
              </p>
              <p className="flex flex-col w-16 h-16 bg-white text-black rounded-md text-center justify-center text-4xl items-center">
                11
              </p>
            </div>
            <p className="text-3xl text-white ml-4">:</p>
            <div className="ml-4 flex flex-col items-center justify-between">
              <p>
                <small>Hours</small>
              </p>
              <p className="flex flex-col w-16 h-16 bg-white text-black rounded-md text-center justify-center text-4xl items-center">
                11
              </p>
            </div>
            <p className="text-3xl text-white ml-4">:</p>
            <div className="ml-4 flex flex-col items-center justify-between">
              <p>
                <small>Minutes</small>
              </p>
              <p className="flex flex-col w-16 h-16 bg-white text-black rounded-md text-center justify-center text-4xl items-center">
                30
              </p>
            </div>
            <p className="text-3xl text-white ml-4">:</p>
            <div className="ml-4 flex flex-col items-center justify-between">
              <p>
                <small>Seconds</small>
              </p>
              <div className="flex flex-col w-16 h-16 bg-white text-black rounded-md text-center justify-center text-4xl items-center">
                <p>30</p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center mt-4">
          <button className="p-2 bg-purple-700 text-xl rounded-lg" onClick={() => setCloseBuyModal(true)}>Buy Token</button>
          <button className=" ml-8 p-2 text-xl bg-purple-700 rounded-lg">Withdraw Token</button>
        </div>
      </section>

    {closeBuyModal && 
        <div className="flex justify-center text-center sm:block sm:p-0 mt-2 scrollbar-hide">
          <BuyModal
            buyInfo={buyInfo}
            setbuyInfo={setbuyInfo}
            handlebuyToken={handlebuyToken}
            handlecloseBuyModal={handlecloseBuyModal}
            isFetchingBuy={isFetchingBuy}
            isLoadingBuy={isLoadingBuy}
            setCloseBuyModal={setCloseBuyModal}
          />
        </div>}
      
      
    </div>
  );
}
