import Link from "next/link";
import { CryptoCards, Button} from '@web3uikit/core';
import { ConnectButton } from 'web3uikit'

export default function () {
  return (
    <div className="h-20">
      {/* Navbar */}
      <nav className="flex items-center px-4 py-4 h-full text-white bg-zinc-800 ">
        <p className="w-5/12 font-logo text-3xl">
          <span className="text-orange-700">{"<"}L</span>arry
          <span className="text-orange-700">C</span>odes
          <span className="text-orange-700">{"/>"}</span>
        </p>
        <div className="flex w-7/12 items-center justify-end">
          <div className="flex justify-between items-center text-lg ">
            <Link href="/">
              <a className="text-white font-semibold hover:text-green-500">
                Home
              </a>
            </Link>
            <Link href="/projects">
              <a className="ml-8 text-white font-semibold hover:text-green-500">
                Projects
              </a>
            </Link>

            <Link href="/launch">
              <a className="mx-8 text-white font-semibold hover:text-green-500">
                Get Funded
              </a>
            </Link>
            <div className="text-white">
            {/* <Button type="button" text="Connect Wallet" /> */}
            <ConnectButton text="This is a button" /> 
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
