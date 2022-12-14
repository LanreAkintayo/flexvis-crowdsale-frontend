import Head from "next/head";
import Image from "next/image";

import { CryptoCards, Button } from "@web3uikit/core";
import {
  useMoralis,
  useChain,
  useWeb3Contract,
  useWeb3ExecuteFunction,
  Moralis,
} from "react-moralis";
import { useEffect, useState } from "react";
import useSWR, { useSWRConfig } from "swr";
import {
  contractAddresses,
  abi,
  DEPLOYER,
  erc20Abi,
  flexvisAddress,
} from "../constants";
import "react-pro-sidebar/dist/css/styles.css";
import Link from "next/link";
import BuyModal from "../components/BuyModal";
import { toWei, fromWei, time, sDuration } from "../utils/helper";
import { RotateLoader, ClipLoader } from "react-spinners";
import { useNotification } from "web3uikit";
import { usePromiseTracker, trackPromise } from "react-promise-tracker";
import { ethers } from "ethers";
import Dashboard from "../components/Dashboard";
import Header from "../components/Header";
import PresaleDetails from "../components/PresaleDetails";

export default function Home() {
  const { isWeb3Enabled, chainId: chainIdHex, enableWeb3 } = useMoralis();
  const { switchNetwork, chain, account } = useChain();
  const { mutate } = useSWRConfig();
  const { withdrawPromiseInProgress } = usePromiseTracker();

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
    fetch: buyToken,
    isFetching: isFetchingBuy,
    isLoading: isLoadingBuy,
  } = useWeb3ExecuteFunction();

  const {
    runContractFunction: withdrawToken,
    isFetching: isFetchingWithdraw,
    isLoading: isLoadingWithdraw,
  } = useWeb3Contract();

  const { data: presaleInfo, error } = useSWR(
    () => (isWeb3Enabled ? "web3/presaleInfo" : null),
    async () => {
      const provider = await enableWeb3();
      const fCrowdsaleContract = new ethers.Contract(
        fCrowdsaleAddress,
        abi,
        provider
      );

      const flexvisContract = new ethers.Contract(
        flexvisAddress,
        erc20Abi,
        provider
      );

      const flexvisAccountBalance = await flexvisContract.balanceOf(account);

      // console.log("Crowdsale contract: ", fCrowdsaleContract)

      // cap, raised, rate, openingTime, closingTime, accountBalance

      const cap = await fCrowdsaleContract.cap();
      const weiRaised = await fCrowdsaleContract.weiRaised();
      const rate = await fCrowdsaleContract.rate();
      const openingTime = await fCrowdsaleContract.openingTime();
      const closingTime = await fCrowdsaleContract.closingTime();
      const accountBalance = await fCrowdsaleContract.balanceOf(account);
      const hasClosed = await fCrowdsaleContract.hasClosed();
      const hasEnded = await fCrowdsaleContract.hasEnded();
      const capReached = await fCrowdsaleContract.capReached();
      const percentRaised = (Number(weiRaised) / Number(cap)) * 100;
      const scaleValue = percentRaised > 100 ? 100 : Math.floor(percentRaised);

      return {
        account,
        cap,
        weiRaised,
        rate,
        openingTime,
        closingTime,
        accountBalance,
        percentRaised,
        scaleValue,
        flexvisAccountBalance,
        hasClosed,
        hasEnded,
        capReached,
      };
    }
  );

  useEffect(() => {
    console.log("Presale Info: ", presaleInfo);

    console.log("Is it valid: ", allValid(presaleInfo));
  }, [presaleInfo]);

  const handlecloseBuyModal = () => {
    setCloseBuyModal(true);
  };

  const handlebuyToken = async () => {
    const amount = toWei(buyInfo.amount);

    console.log(amount.toString());

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

    // const provider = await enableWeb3();
    //   const fCrowdsaleContract = new ethers.Contract(
    //     fCrowdsaleAddress,
    //     abi,
    //     provider
    //   );

    // const buyTx = await fCrowdsaleContract.buyTokens(account, {amount: amount})
    // await buyTx.wait(1)

    buyToken({
      params: {
        abi: abi,
        contractAddress: fCrowdsaleAddress,
        functionName: "buyTokens",
        msgValue: amount,
        params: {
          beneficiary: account,
        },
      },
      onSuccess: handleSuccess,
      onError: (error) => {
        handleFailure(error);
      },
    });
  };

  const handleWithdrawToken = () => {
    if (
      presaleInfo.hasClosed ||
      presaleInfo.hasEnded ||
      presaleInfo.capReached
    ) {
      withdrawToken({
        params: {
          abi: abi,
          contractAddress: fCrowdsaleAddress,
          functionName: "withdrawTokens",
          params: {
            beneficiary: account,
          },
        },
        onSuccess: handleSuccess,
        onError: (error) => {
          handleFailure(error);
        },
      });
    } else {
      window.alert(
        "You can only withdraw if the cap is reached or the presale has ended"
      );
    }
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

    await mutate("web3/presaleInfo");
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

  const allValid = (data) => {
    if ([null, undefined, {}].includes(data)) {
      return false;
    }

    return Object.values(data).every((item) => {
      if ([null, undefined, {}].includes(item)) {
        return false;
      } else {
        return true;
      }
    });
  };

  return (
    <div className="w-screen max-w-max h-screen bg-gradient-to-tl  from-gray-800 via-gray-800 to-gray-900 ">
      <Header />
      <div className="w-full flex justify-end px-5 items-end">
        {allValid(presaleInfo) && <Dashboard presaleInfo={presaleInfo} />}
      </div>
      <section className="m-4 p-2 flex flex-col items-center text-white">
        {allValid(presaleInfo) && (
          <>
            {" "}
            <PresaleDetails presaleInfo={presaleInfo} />
            <div className="flex justify-center mt-4">
              <button
                className="p-2  text-xl rounded-lg"
                onClick={() => setCloseBuyModal(true)}
              >
                <div className="flex w-full bg-purple-700 rounded-md items-center px-3 py-3">
                    <p className="w-full">Buy Token</p>
                  </div>
              </button>
              <button
                className=" ml-8 p-2 text-xl  rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={
                  isFetchingWithdraw ||
                  isLoadingWithdraw ||
                  withdrawPromiseInProgress
                }
                onClick={handleWithdrawToken}
              >
                {(
                  isFetchingWithdraw ||
                  isLoadingWithdraw ||
                  withdrawPromiseInProgress
                ) ? (
                  <div className="flex flex-col w-full justify-between bg-purple-700 rounded-md items-center px-3 py-3">
                    <div className="flex">
                      <ClipLoader color="#004d00" loading="true" size={30} />
                      <p className="ml-2">
                        {" "}
                        {withdrawPromiseInProgress
                          ? "Wait a few Seconds"
                          : "Withdrawing Token"}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="flex w-full bg-purple-700 rounded-md items-center px-3 py-3">
                    <p className="w-full">Withdraw Token</p>
                  </div>
                )}
              </button>
            </div>
          </>
        )}
      </section>

      {closeBuyModal && (
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
        </div>
      )}
    </div>
  );
}
