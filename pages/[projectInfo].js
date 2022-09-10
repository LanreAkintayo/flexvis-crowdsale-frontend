import Header from "../components/Header";
import SupportModal from "../components/SupportModal";
import { ethers } from "ethers";
import { useState } from "react";
import { useMoralis, useWeb3Contract } from "react-moralis";
import { contractAddresses, abi, erc20Abi, wbnbAbi } from "../constants";
import { useNotification } from "web3uikit";
import useSWR, { useSWRConfig } from "swr";
import { trackPromise, usePromiseTracker } from "react-promise-tracker";
import Footer from "../components/Footer";
// import { getAllProjects } from "../lib/projects";

const supportedTokens = [
  { name: "BNB", src: "/bnb.svg" },
  { name: "BUSD", src: "/busd.svg" },
  { name: "DAI", src: "/dai.png" },
  { name: "XRP", src: "/xrp.png" },
];

const tokenToAddress = {
  BNB: "0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd",
  BUSD: "0xeD24FC36d5Ee211Ea25A80239Fb8C4Cfd80f12Ee",
  DAI: "0xEC5dCb5Dbf4B114C9d0F65BcCAb49EC54F6A0867",
  XRP: "0xa83575490D7df4E2F47b7D38ef351a2722cA45b9",
};

export default function PageInfo({ projectInfo }) {
  const {
    Moralis,
    isWeb3Enabled,
    chainId: chainIdHex,
    enableWeb3,
    account,
  } = useMoralis();
  const [supportModalOpen, setSupportModalOpen] = useState(false);
  const [selectedToken, setSelectedToken] = useState({});
  const [pledgeAmount, setPledgeAmount] = useState();
  const [isValidAmount, setIsValidAmount] = useState(true);
  const dispatch = useNotification();
  const { mutate } = useSWRConfig();

  const [projectData, setProjectData] = useState({
    ...projectInfo,
  });

  console.log("Seconds Left: ", projectInfo.secondsLeft)
  // // 1662521824
  // console.log("Current Time: ", Math.floor(Number(new Date().getTime() / 1000)))
  // console.log("End day: ", projectInfo.endDay)
  // console.log("Start Day: ", projectInfo.startDay)

  const chainId = parseInt(chainIdHex);

  const length = contractAddresses[chainId]?.length;
  const crowdfundAddress =
    chainId in contractAddresses
      ? contractAddresses[chainId][length - 1]
      : null;

  const dollarUSLocale = Intl.NumberFormat("en-US");

  const formattedAmountRaised = dollarUSLocale
    .format(ethers.utils.formatEther(projectData.amountRaisedInDollars))
    .toString();
  const formattedGoal = dollarUSLocale
    .format(ethers.utils.formatEther(projectInfo.goal))
    .toString();

  let color;

  // console.log("Thees are all the backers ", projectData.backers)

  if (projectData.percentFunded > 70) {
    color = "bg-green-700";
  } else if (projectData.percentFunded > 50) {
    color = "bg-yellow-600";
  } else {
    color = "bg-red-600";
  }

  const {
    runContractFunction: pledge,
    isFetching,
    isLoading,
  } = useWeb3Contract();

  const fetchProjectInfo = async () => {
    // console.log("Inside fetchProject info method");
    const provider = await enableWeb3();

    const crowdfundContract = new ethers.Contract(
      crowdfundAddress,
      abi,
      provider
    );

    const projects = await crowdfundContract.getAllProjects();

    const project = projects.filter(
      (project) => project.id == projectInfo.id
    )[0];

    const amountRaisedInDollars =
      await crowdfundContract.getTotalAmountRaisedInDollars(project.id);
    const backers = await crowdfundContract.getBackers(project.id);
    const backersAddress = backers.map(backer => {
      return backer[0]
    })

    const uniqueBackers = [...new Set(backersAddress)]
    // console.log("Unique backers: ", uniqueBackers)

    let secondsLeft;
    let status;

    if (
      Math.floor(Number(new Date().getTime() / 1000)) > Number(project.endDay)
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

    setProjectData({
      ...project,
      amountRaisedInDollars: amountRaisedInDollars.toString(),
      endDay: project.endDay.toString(),
      goal: project.goal.toString(),
      id: project.id.toString(),
      startDay: project.startDay.toString(),
      secondsLeft,
      status,
      percentFunded: percentFunded >= 100 ? 100 : Math.floor(percentFunded),
      backers: uniqueBackers,
    });
  };

  const time = ((milliseconds)=>{
    const SEC = 1e3;
    const MIN = SEC * 60;
    const HOUR = MIN * 60;
    const DAY = HOUR * 24;
    return time => {
        const ms = Math.abs(time);
        const d = ms / DAY | 0;
        const h = ms % DAY / HOUR | 0;
        const m = ms % HOUR / MIN | 0;
        const s = ms % MIN / SEC | 0;
        return `${time < 0 ? "-" : ""}${d} Days ${h} Hours ${h == 0 && `${m} Minutes`}`;
        // ${m}Minute(s) ${s}Second(s)
    };
})();

  const handleSupport = () => {
    setSupportModalOpen(true);
  };

  const handleCloseSupportModal = () => {
    setSupportModalOpen(false);
  };

  const handleSelectToken = (name, src) => {
    console.log("Token Name: ", name);
    console.log("Token Src: ", src);
    setSelectedToken({ name, src });
  };

  const handleSuccess = async (tx) => {
    console.log("Success transaction: ", tx);
    await trackPromise(tx.wait(1));
    setSupportModalOpen(false);
    dispatch({
      type: "success",
      message: "Pledging Completed!",
      title: "Transaction Notification",
      position: "topR",
    });

    await fetchProjectInfo();
  };

  const getNoOfBackers = () => {
      const backersAddress = projectData.backers.map(backer => {
      return backer[0]
    })

    const uniqueBackers = [...new Set(backersAddress)]

    return uniqueBackers.length
    }

  const handleFailure = async (error) => {
    console.log("Error: ", error);
    dispatch({
      type: "error",
      message: "Pledging Failed",
      title: "Transaction Notification",
      position: "topR",
    });
  };

  const handlePledge = async () => {
    const provider = await enableWeb3();

    // const projects = await crowdfundContract.getAllProjects();

    const formattedPledgeAmount = ethers.utils.parseEther(
      pledgeAmount.replace(/[^0-9.]/g, "")
    );
    const tokenAddress = tokenToAddress[selectedToken.name];
    console.log(formattedPledgeAmount.toString());
    console.log(tokenAddress);

    const signer = provider.getSigner(account);

    const crowdfundContract = new ethers.Contract(
      crowdfundAddress,
      abi,
      provider
    );
    const tokensSupported = await crowdfundContract.getSupportedTokensAddress();
    console.log("Tokens Supported: ", tokensSupported);

    if (tokenAddress == tokenToAddress["BNB"]) {
      const wbnb = new ethers.Contract(tokenAddress, wbnbAbi, provider);

      const depositTx = await trackPromise(
        wbnb.connect(signer).deposit({ value: formattedPledgeAmount })
      );
      await trackPromise(depositTx.wait(1));

      const approveTx = await trackPromise(
        wbnb.connect(signer).approve(crowdfundAddress, formattedPledgeAmount)
      );
      await trackPromise(approveTx.wait(1));

      console.log("Balance of Account: ", await wbnb.balanceOf(account));
    } else {
      const erc20 = new ethers.Contract(tokenAddress, erc20Abi, provider);
      console.log("Balance of token Account: ", await erc20.balanceOf(account));

      const approveTx = await trackPromise(
        erc20.connect(signer).approve(crowdfundAddress, formattedPledgeAmount)
      );
      await trackPromise(approveTx.wait(1));
    }

    console.log("About to pledge");
    pledge({
      params: {
        abi: abi,
        contractAddress: crowdfundAddress, // specify the networkId
        functionName: "pledge",
        params: {
          _id: projectData.id,
          tokenAddress: tokenAddress,
          amount: formattedPledgeAmount,
        },
      },
      onSuccess: handleSuccess,
      onError: handleFailure,
    });
  };

  const handleOnChange = (event) => {
    const pledgeAmount = event.target.value;
    setIsValidAmount(() => {
      if (/^\$?\d+(,\d{3})*(\.\d*)?$/.test(pledgeAmount.toString())) {
        return true;
      }
      return false;
    });
    setPledgeAmount(pledgeAmount);
  };

  return (
    <>
      <section>
        <div className="h-20">
          {/* Navbar */}
          <Header />
        </div>
      </section>
      <section>
        <h1 className="w-full text-center pt-3 text-2xl sm:text-3xl">
          {projectData.projectTitle}
        </h1>
        <p className="text-center text-gray-800">
          {projectData.projectSubtitle}
        </p>
        <div className="flex flex-col md:flex-row mt-11">
          <div className="flex flex-col md:w-7/12 px-8">
            <div className="flex justify-between text-sm lg:text-xl text-gray-500 my-3 py-3 border-b-2">
              <button>Home</button>
              <button>Backers</button>
              <button>Updates</button>
              <button>Comments</button>
            </div>
            <div className="w-full h-96">
              <img
                alt="..."
                src={projectData.projectImageUrl}
                className="object-cover w-full h-full"
              />
            </div>

            <div className="py-4">
              <h1 className=" text-xl md:text-3xl text-gray-800 pt-10 pb-4">
                Why do I need this fund?
              </h1>
              <p className="md:text-base text-sm">{projectData.projectNote}</p>
            </div>
          </div>
          <div className="mx-8 lg:w-5/12 lg:px-8">
            <div className="bg-neutral-300 h-4 dark:bg-gray-700">
              <div
                className={`${color} h-4 `}
                style={{ width: `${projectData.percentFunded}%` }}
              ></div>
            </div>
            <div className="flex justify-between mt-1 text-sm">
              <p className="bg-yellow-100 text-yellow-800 rounded-md p-2 px-3 ">
                {projectData.percentFunded}% funded
              </p>
              <p className="bg-green-100 text-green-800 rounded-md p-2 px-3 ">
                {getNoOfBackers()} {getNoOfBackers() == 1 ? "backer": "backers"}
              </p>
            </div>
            <div className="">
              <div className="flex flex-col mt-6">
                <h1 className=" text-xl md:text-3xl text-gray-800">
                  ${formattedAmountRaised}
                </h1>
                <p className="text-sm text-gray-500">
                  raised of ${formattedGoal}
                </p>
              </div>

              <div className="flex flex-col mt-6">
                <h1 className=" text-xl md:text-2xl text-gray-800">
                  {time(projectInfo.secondsLeft * 1000)}
                </h1>
                <p className="text-sm text-gray-500">
                  remaining
                </p>
              </div>
            </div>

            <button
              className="my-6 w-full rounded-md p-2 bg-green-200 text-green-800"
              onClick={handleSupport}
            >
              Support this Project
            </button>
          </div>
        </div>
      </section>

      {supportModalOpen && (
        <div className="flex justify-center text-center sm:block sm:p-0 mt-2 scrollbar-hide">
          <SupportModal
            handleCloseSupportModal={handleCloseSupportModal}
            handleSelectToken={handleSelectToken}
            selectedToken={selectedToken}
            handleOnChange={handleOnChange}
            isValidAmount={isValidAmount}
            handlePledge={handlePledge}
            isFetching={isFetching}
            isLoading={isLoading}
          />
        </div>
      )}

    <Footer />
    </>
  );
}

export async function getServerSideProps(context) {
  const query = context.query;

  const backers = JSON.parse(query.backers);

  // const availableAmountInContract = JSON.parse(query.availableAmountInContract);
  // const totalBorrowedInContract = JSON.parse(query.totalBorrowedInContract);
  // const totalSuppliedInContract = JSON.parse(query.totalSuppliedInContract);
  // const userTokenBorrowedAmount = JSON.parse(query.userTokenBorrowedAmount);
  // const userTokenLentAmount = JSON.parse(query.userTokenLentAmount);
  // const walletBalance = JSON.parse(query.walletBalance);

  const projectInfo = {
    ...query,
    backers,
  };

  return {
    props: {
      projectInfo,
    },
  };
}

// export async function getStaticPaths() {
//   const paths = await getAllProjects();
//   return {
//     paths,
//     fallback: false,
//   };
// }
