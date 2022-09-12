import useSWR, { useSWRConfig } from "swr";
import { useMoralis, useChain, useWeb3Contract } from "react-moralis";
import {ethers} from "ethers"

import {
  contractAddresses,
  abi,
  erc20Abi,
  DEPLOYER,
  flexvisAddress,
} from "../constants";

export default function Dashboard() {
  const { isWeb3Enabled, chainId: chainIdHex, enableWeb3 } = useMoralis();
  const { switchNetwork, chain, account } = useChain();

  const {
    data: flexvisBalance,
    error,
    mutate,
  } = useSWR(
    () => (isWeb3Enabled ? "web3/flexvisBalance" : null),
    async () => {
        const provider = await enableWeb3()

      const flexvisContract = new ethers.Contract(
        flexvisAddress,
        erc20Abi,
        provider
      );

      console.log("Account: ", account)
      console.log("Flexvis contract: ", flexvisContract)

      const balance = await flexvisContract.balanceOf(account);

      const formattedBalance = ethers.utils.formatEther(balance)

      return formattedBalance;
    }
  );

  return (
    <>
      {account && flexvisBalance && (
        <div className="my-4 mx-4 bg-gray-200 p-2 w-80 rounded-md">
          <p>
            Account: {account.toString().substring(0, 5)}...
            {account.toString().substring(account.length - 6, account.length)}
          </p>
          <p>Flexvis Balance: {flexvisBalance || "0"} FLEXVIS</p>{" "}
        </div>
      )}
    </>
  );
}
