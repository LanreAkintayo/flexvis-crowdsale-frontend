import Dropdown from "./Dropdown";
import Dropdown2 from "./Dropdown2";
import Dropdown3 from "./Dropdown3";

export default function SupportModal({handleCloseSupportModal, handleSelectToken, selectedToken, handleOnChange}) {

  // const handleOnChange = (event) => {
  //   const pledgeAmount = event.target.value
  // }
  
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
                  Support Project
                </div>
                <button
                onClick={handleCloseSupportModal}
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
                <p className="text-gray-600 text-sm py-2">
                  Select Token to Pledge with
                </p>
                <Dropdown handleSelectToken={handleSelectToken} selectedToken={selectedToken}/>
                {/* <Dropdown3 /> */}
              </div>
              <div className="my-5 w-full flex flex-col ">
                <p className="text-gray-600 text-sm py-2">Enter Amount</p>
                <div className="w-full flex flex-col border rounded-md p-2">
                  <input
                  onChange={() => handleOnChange(event)}
                    type="text"
                    name="text"
                    id="pledgeAmount"
                    placeholder="0.00"
                    className="w-80 block pl-2 font-medium text-lg focus:outline-none rounded-md"
                  />
                  <p className="self-end text-sm text-gray-600 font-medium">MAX</p>
                </div>

                {/* <Dropdown3 /> */}
              </div>

              <div className="my-5 w-full flex flex-col items-center ">
                <button
                  className={`p-2 w-full bg-green-200 text-green-800 text-center rounded-md font-medium text-xl disabled:cursor-not-allowed disabled:opacity-50`}
                >
                  Pledge
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
