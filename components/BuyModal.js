import { RotateLoader, ClipLoader } from "react-spinners";
import { usePromiseTracker } from "react-promise-tracker";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState, useEffect } from "react";

export default function BuyModal(
  {
    buyInfo,
    setbuyInfo,
    handlebuyToken,
      isFetchingBuy,
      isLoadingBuy,
      setCloseBuyModal
  }
) {
  // const handleOnChange = (event) => {
  //   const amount = event.target.value
  //   const { promiseInProgress } = usePromiseTracker();
  // }

  

  const [isValidAmount, setIsValidAmount] = useState(true);

  const [allValid, setAllValid] = useState(false);

  const { promiseInProgress:modalPromiseInProgress } = usePromiseTracker();

  useEffect(() => {
    setAllValid(
      Object.values(buyInfo).every(
        (item) => ![false, 0, null, "", {}].includes(item)
      ) &&
        isValidAmount 
    );
  }, [buyInfo, isValidAmount]);

  const handleOnChange = async (event) => {
    let amount;

    if (event.target.id == "amount") {
      amount = event.target.value;
      console.log("Amount is ", amount)

      setIsValidAmount(() => {
        if (/^\$?\d+(,\d{3})*(\.\d*)?$/.test(amount.toString())) {
          return true;
        }
        return false;
      });
    }

    setbuyInfo((prevbuyInfo) => {
      return {
        ...prevbuyInfo,
        [event.target.id]: event.target.value,
      };
    });
  };

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-75 transition-opacity">
      <div
        tabIndex="-1"
        className="inline-block align-bottom h-5/6  rounded-lg w-full scrollbar-hide text-left outline-none overflow-auto transform max-w-sm mt-16 sm:max-w-md"
      >
        <div className="relative  h-full md:h-auto">
          {/* <!-- Modal content --> */}

          <div className="relative mx-3 rounded-lg shadow dark:bg-gray-700">
            <div className="p-5 font-hand text-xl dark:bg-black bg-white">
              <div className="flex justify-between items-center rounded-t">
                <div className="sm:text-2xl text-3xl text-center text-gray-700">
                  Buy Token
                </div>
                <button
                    onClick={() => setCloseBuyModal(false)}
                  type="button"
                  className="text-gray-400 bg-transparent dark:hover:bg-gray-600 dark:hover:text-white hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
                  data-modal-toggle="small-modal"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </button>
              </div>

              <div className="my-5 w-full flex flex-col ">
                <p className="text-gray-600 text-sm py-2">Enter Amount of BNB</p>
                <div className="w-full flex flex-col border rounded-md p-2">
                  <input
                    onChange={(event) => handleOnChange(event)}
                    type="text"
                    name="text"
                    id="amount"
                    placeholder="0.00"
                    className="w-80 block pl-2 font-medium text-lg focus:outline-none rounded-md"
                  />
                </div>
                {!isValidAmount && (
                    <p className="text-red-700 text-sm">
                      <small>
                        Invalid Amount
                      </small>
                    </p>
                  )}
              </div>

              <button
                className={`p-2 w-full text-gray-800 text-center rounded-md font-medium text-xl disabled:cursor-not-allowed disabled:opacity-50`}
                onClick={handlebuyToken}
                disabled={
                  !allValid ||
                  isFetchingBuy ||
                  isLoadingBuy ||
                  modalPromiseInProgress
                }
              >
              
                {(isFetchingBuy || isLoadingBuy || modalPromiseInProgress) ? (
                  <div className="flex flex-col w-full justify-between bg-gray-300 rounded-md items-center px-3 py-3">
                    <div className="flex">
                      <ClipLoader color="#004d00" loading="true" size={30} />
                      <p className="ml-2"> {modalPromiseInProgress
                    ? "Wait a few Seconds"
                    : "Buying Token"}</p>
                    </div>
                  </div>
                ) : (
                  <div className="flex w-full bg-gray-300 rounded-md items-center px-3 py-3">
                    <p className="w-full">Buy</p>
                  </div>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
