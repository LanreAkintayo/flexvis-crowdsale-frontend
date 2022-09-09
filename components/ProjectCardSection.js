import { useMoralis, useWeb3Contract, useChain } from "react-moralis";
import { useEffect, useState } from "react";
import ProjectCard from "../components/ProjectCard";
import useSWR, { useSWRConfig } from "swr";
import { contractAddresses, abi, DEPLOYER } from "../constants";
import { ethers } from "ethers";

export default function ProjectCardSection() {
  const { isWeb3Enabled, chainId: chainIdHex, enableWeb3 } = useMoralis();
  const { switchNetwork, chain, account } = useChain();

  const chainId = parseInt(chainIdHex);

  const length = contractAddresses[chainId]?.length;
  const crowdfundAddress =
    chainId in contractAddresses
      ? contractAddresses[chainId][length - 1]
      : null;

  const {
    runContractFunction: getAllProjects,
    isFetching,
    isLoading,
  } = useWeb3Contract({
    abi: abi,
    contractAddress: crowdfundAddress,
    functionName: "getAllProjects",
    params: {},
  });

  //   const {
  //     data: amountRaisedInDollars,
  //     runContractFunction: getTotalAmountRaisedInDollars,
  //   } = useWeb3Contract();

  const {
    data: allProjects,
    error,
    mutate,
  } = useSWR(
    () => (isWeb3Enabled ? "web3/projects" : null),
    async () => {
      // console.log("We are here again");
      const projects = await getAllProjects({
        onSuccess: (tx) => console.log("all Project", tx),
        onError: (error) => console.log(error),
      });
      const provider = await enableWeb3();
      const crowdfundContract = new ethers.Contract(
        crowdfundAddress,
        abi,
        provider
      );
      // const projects = await crowdfundContract.getAllProjects();

      const allProjects = projects.map(async (project) => {
        const amountRaisedInDollars =
          await crowdfundContract.getTotalAmountRaisedInDollars(project.id);
        const backers = await crowdfundContract.getBackers(project.id);

        // console.log("Backers: ", backers);

        let secondsLeft;
        let status;

        if (
          Math.floor(Number(new Date().getTime() / 1000)) >
          Number(project.endDay)
        ) {
          status = "Closed";
          secondsLeft = 0;
        } else if (
          Number(Math.floor(Number(new Date().getTime() / 1000))) >=
          Number(project.startDay)
        ) {
          status = "Active";
          secondsLeft =
            Number(project.endDay) -
            Number(Math.floor(Number(new Date().getTime() / 1000)));
        } else {
          status = "Pending";
          secondsLeft = 0;
        }

        const percentFunded =
          (Number(amountRaisedInDollars) / Number(project.goal)) * 100;

        return {
          ...project,
          amountRaisedInDollars: amountRaisedInDollars.toString(),
          endDay: project.endDay.toString(),
          goal: project.goal.toString(),
          id: project.id.toString(),
          startDay: project.startDay.toString(),
          secondsLeft,
          status,
          percentFunded: percentFunded >= 100 ? 100 : Math.floor(percentFunded),
          backers,
        };
      });

      const resolved = await Promise.all(allProjects);

      // console.log("resolved: ", resolved);
      return resolved;
    }
  );

  return (
    <section className=" px-5 lg:px-5 w-full">
      <h1 className="text-3xl mt-10">Explore Projects</h1>
      <div className="flex flex-col w-full items-center my-10 mb-14">
        {allProjects && (
          <div className={`grid ${allProjects.length >= 4 ? "grid-rows-4": `grid-rows-${allProjects.length}`} grid-cols-1 sm:grid-rows-2 sm:grid-cols-2 lg:grid-rows-1 lg:grid-cols-4 xs:grid-rows-1 xs:grid-cols-4 gap-2 justify-start w-full`}>
            {allProjects?.map((projectInfo) => {
              // console.log("Project Info: ", projectInfo);
              //   getTotalAmountRaisedInDollars({
              //     params: {
              //       abi: abi,
              //       contractAddress: crowdfundAddress,
              //       functionName: "getTotalAmountRaisedInDollars",
              //       params: { _id: projectInfo.id },
              //     },
              //   });

              return <ProjectCard key={projectInfo.id} projectInfo={projectInfo} />;
            })}
          </div>
        )}

        {allProjects?.length > 4 && (
          <button className="text-green-800 p-2 text-xl mt-5 border rounded-md border-green-800">
            See more
          </button>
        )}
      </div>
    </section>
  );
}
