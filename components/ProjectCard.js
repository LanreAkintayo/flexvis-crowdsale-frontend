import { ethers } from "ethers";
import { useMoralis, useWeb3Contract } from "react-moralis";
import { useEffect, useState } from "react";
import useSWR, { useSWRConfig } from "swr";
import { contractAddresses, abi } from "../constants";

export default function ProjectCard({ projectInfo }) {
  const goal = ethers.utils.formatEther(projectInfo.goal.toString());
  const amountRaisedInDollars = projectInfo.amountRaisedInDollars;

  const percent = (Number(amountRaisedInDollars) / Number(goal)) * 100;
  // const percent = 71;
  let color;

  console.log(projectInfo.projectImageUrl)

  if (percent > 70) {
    color = "bg-green-700";
  } else if (percent > 50) {
    color = "bg-yellow-600";
  } else {
    color = "bg-red-600";
  }

  let dollarUSLocale = Intl.NumberFormat("en-US");

  const formattedGoal = dollarUSLocale.format(goal).toString();

  return (
    <div className="mx-3 w-72 h-auto  mb-5 lg:mb-0 bg-white-200 shadow-lg">
      <div className="w-full h-56 ">
        <img
          alt="..."
          src={projectInfo.projectImageUrl}
          className="object-cover w-full h-full"
        />
      </div>
      <div className="w-full bg-neutral-300 h-2.5 dark:bg-gray-700">
        <div
          className={`${color} h-2.5 `}
          style={{ width: `${percent}%` }}
        ></div>
      </div>
      <div className=" px-2">
        <h1 className="text-xl text-green-900 py-3">
          {projectInfo.projectTitle}
        </h1>
        <p className="text-sm text-gray-800">{projectInfo.projectNote}</p>
        <p className="py-4 text-green-900">{percent}% of ${formattedGoal} Raised </p>
      </div>
    </div>
  );
}
