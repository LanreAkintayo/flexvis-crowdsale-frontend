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

import {fromWei, now, toWei} from "../utils/helper"

export default function Dashboard({presaleInfo}) {
  let dollarUSLocale = Intl.NumberFormat("en-US");
    // amount = dollarUSLocale.format(price).toString();
    const purchasedFlexvis = dollarUSLocale.format(fromWei(presaleInfo.accountBalance || 0).toString());
  const flexvisAccountBalance = dollarUSLocale.format(fromWei(presaleInfo.flexvisAccountBalance || 0).toString());

  return (
    <>
      { (
        <div className="my-4 mx-4 bg-purple-200 p-2 w-80 text-purple-900 rounded-md">
          <p>
            Account: {presaleInfo.account.toString().substring(0, 5)}...
            {presaleInfo.account.toString().substring(presaleInfo.account.length - 6, presaleInfo.account.length)}
          </p>
          <p><span className="">Flexvis Balance: </span> {flexvisAccountBalance || "0"} FLEXVIS</p>{" "}
          <p>Purchased Balance: { purchasedFlexvis|| "0"} FLEXVIS</p>{" "}
        </div>
      )}
    </>
  );
}
