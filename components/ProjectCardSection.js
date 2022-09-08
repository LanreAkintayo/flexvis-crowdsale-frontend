import { useMoralis, useWeb3Contract } from "react-moralis";
import { useEffect, useState } from "react";
import ProjectCard from "../components/ProjectCard";
import useSWR, { useSWRConfig } from "swr";
import { contractAddresses, abi, DEPLOYER } from "../constants";
import { ethers } from "ethers";

export default function ProjectCardSection() {
  const { isWeb3Enabled, chainId: chainIdHex, enableWeb3 } = useMoralis();

  const chainId = parseInt(chainIdHex);

  const crowdfundAddress =
    chainId in contractAddresses ? contractAddresses[chainId][0] : null;

  const { runContractFunction: getAllProjects, isFetching, isLoading } = useWeb3Contract({
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
        const backers =  await crowdfundContract.getBackers(project.id) 

        console.log("Backers: ", backers)

        
        let secondsLeft;
        let status;
        

        if (Number(new Date().getSeconds()) > Number(project.endDay)) {
          status = "Closed";
          secondsLeft = 0;
        } else if (
          Number(new Date().getSeconds()) >= Number(project.startDay)
        ) {
          status = "Active";
          secondsLeft =
            Number(project.endDay) - Number(new Date().getSeconds());
        } else {
          status = "Pending";
          secondsLeft = 0;
        }

        const percentFunded = (Number(amountRaisedInDollars) / Number(project.goal)) * 100;      

        return {
          ...project,
          amountRaisedInDollars: amountRaisedInDollars.toString(),
          endDay: project.endDay.toString(),
          goal: project.goal.toString(),
          id: project.id.toString(),
          startDay: project.startDay.toString(),
          secondsLeft,
          status,
          percentFunded,
          backers
        };
      });

      const resolved = await Promise.all(allProjects);

      console.log("resolved: ", resolved);
      return resolved;
    }
  );


  return (
    <section className="pl-5 w-full">
      <h1 className="text-3xl mt-10">Explore Projects</h1>
      <div className="flex flex-col w-full items-center my-10 mb-14">
        {allProjects && (
          <div className="flex lg:flex-row flex-col justify-start w-full">
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

              return <ProjectCard projectInfo={projectInfo} />;
            })}
          </div>
        )}

        <button className="text-green-800 p-2 text-xl mt-5 border rounded-md border-green-800">
          See more
        </button>
      </div>
    </section>
  );
}
