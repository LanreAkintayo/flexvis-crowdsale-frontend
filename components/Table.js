import { useMoralis, useWeb3Contract, useChain } from "react-moralis";
import { useEffect, useState } from "react";
import ProjectCard from "../components/ProjectCard";
import useSWR, { useSWRConfig } from "swr";
import { contractAddresses, abi, DEPLOYER } from "../constants";
import { ethers } from "ethers";
import { useRouter } from "next/router";
import {
  RotateLoader,
  ClipLoader,
  PacmanLoader,
  ScaleLoader,
} from "react-spinners";
import { toWei, fromWei, time } from "../utils/helper";

export default function Table() {
  const { isWeb3Enabled, chainId: chainIdHex, enableWeb3 } = useMoralis();
  const { switchNetwork, chain, account } = useChain();

  const chainId = parseInt(chainIdHex);

  const length = contractAddresses[chainId]?.length;
  const sfInvestmentAddress =
    chainId in contractAddresses
      ? contractAddresses[chainId][length - 1]
      : null;

  const {
    runContractFunction: getAllInvestments,
    isFetching,
    isLoading,
  } = useWeb3Contract({
    abi: abi,
    contractAddress: sfInvestmentAddress,
    functionName: "getAllInvestments",
    params: {
      investor: account,
    },
  });

  const {
    data: userInvestments,
    error,
    mutate,
  } = useSWR(
    () => (isWeb3Enabled ? "web3/userInvestments" : null),
    async () => {
      const userInvestments = await getAllInvestments({
        onError: (error) => console.log(error),
      });
      const provider = await enableWeb3();
      const sfInvestmentContract = new ethers.Contract(
        sfInvestmentAddress,
        abi,
        provider
      );

      const filteredUserInvestments = userInvestments.filter((investment) => {
        const investmentID = investment[0];
        // console.log("investmentID", investmentID);
        if (investmentID != "0x00000000000000000000000000000000") {
          return true;
        } else {
          return false;
        }
      });

      // console.log("filteredUserInvestments: ", filteredUserInvestments);

      return filteredUserInvestments.reverse();
    }
  );


  return (
    <div className="overflow-x-auto relative">
      <div className="border border-gray-700">
        <p className="py-5 px-2 text-xl text-center">Regular Flex Investment</p>
      </div>
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-gray-700 uppercase bg-gray-50 border-t-0 border-b-0 border-l border-r border-gray-700  dark:bg-gray-700 dark:text-gray-400">
          <tr className="text-gray-800 text-lg border-t-0 border-b-0 border-gray-700 bg-gray-200">
            <th scope="col" className="py-3 pl-3">
              Stake Created
            </th>
            <th scope="col" className="py-3 pl-3">
              Lock Up
            </th>
            <th scope="col" className="py-3 pl-3">
              TIME LEFT
            </th>

            <th scope="col" className="py-3 pl-3">
              Amount Staked
            </th>
            <th scope="col" className="py-3 pl-3">
              Interest/APY
            </th>
            <th scope="col" className="py-3 pl-3">
              Action
            </th>
          </tr>
        </thead>

        <tbody className="border border-t-0 border-gray-700">
          {userInvestments?.map((investment) => {
            // console.log(fromWei(investment.investedAmount));
            const investingTime = time(Number(investment.investingDays) * 1000);
            const day = investingTime.day
            const hour = investingTime.hour
            const minute = investingTime.minute

            return (
              <tr className="bg-white  dark:bg-gray-800 dark:border-gray-700">
                <td className="py-4 pl-3">{investment.investmentID}</td>
                <td className="py-4 pl-3">
                  {time(Number(investment.investingDays) * 1000).day} days
                </td>
                <td className="py-4 pl-3 ">{`${day} Days ${day == 0 ? `, ${hour} Hours ${hour == 0 ? `, ${minute} minutes`: ""}`: ""} `}</td>
                <td className="py-4 pl-3">
                  {fromWei(investment.investedAmount)} Flexvis
                </td>
                <td className="py-4 pl-3">
                  {fromWei(investment.reward)} Flexvis
                </td>
                <td className="py-4 pl-3 ">
                  <button className="bg-yellow-200 text-yellow-800 my-2 p-2 rounded-md" onClick={() => console.log("End this investment")}>
                    End Investment
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

/*

STAKE CREATED	STAKE PROGRESS	LOCK UP	AMOUNT STAKED	INTEREST/APY	
*/
