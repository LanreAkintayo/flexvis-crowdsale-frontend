import { useMoralis, useWeb3Contract } from "react-moralis";
import useSWR, { useSWRConfig } from "swr";
import { contractAddresses, abi, DEPLOYER } from "../constants";
import { ethers } from "ethers";

export async function getAllProjects() {
  const { isWeb3Enabled, chainId: chainIdHex, enableWeb3 } = useMoralis();
  const provider = await enableWeb3();

  const chainId = parseInt(chainIdHex);

  const length = contractAddresses[chainId]?.length;

  const crowdfundAddress =
    chainId in contractAddresses
      ? contractAddresses[chainId][length - 1]
      : null;

  const crowdfundContract = new ethers.Contract(
    crowdfundAddress,
    abi,
    provider
  );

  const projects = await crowdfundContract.getAllProjects();

  return projects.map((project) => {
    return {
      params: { id: project.id },
    };
  });


}
