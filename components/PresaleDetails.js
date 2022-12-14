import { fromWei, now, toWei, allValid } from "../utils/helper";
import TimerCountdown from "./TimerCountdown";

export default function PresaleDetails({ presaleInfo }) {
  let dollarUSLocale = Intl.NumberFormat("en-US");
  const formattedCap = dollarUSLocale.format(
    fromWei(presaleInfo?.cap).toString()
  );
  const formattedAmountRaised = dollarUSLocale.format(
    fromWei(presaleInfo?.weiRaised).toString()
  );

  const millisecondsLeft = presaleInfo.hasEnded || presaleInfo.capReached || presaleInfo.hasClosed ? 0 : Number(presaleInfo.closingTime) * 1000 - now();

  return (
    <>
      {allValid(presaleInfo) && (
        <div>
          <h1 className="lg:text-4xl sm:text-3xl text-2xl px-2 text-center">
            Participate in Flexvis Presale and get yours at a cheaper rate.
          </h1>
          <p className="sc:text-3xl text-xl px-2 py-8 text-center">
            {formattedCap} BNB Target cap, {formattedAmountRaised} BNB Raised
          </p>
          <div className="w-full flex justify-center items-center">
            <div className="">
              <div className="sm:w-96 bg-neutral-200 h-7 rounded-md dark:bg-gray-700">
                <div
                  className={`h-7 rounded-md bg-purple-600`}
                  style={{ width: `${presaleInfo.scaleValue}%` }}
                ></div>
              </div>
              <div className="w-96 flex py-2 justify-between">
                <p className="text-base">{presaleInfo.scaleValue}% raised</p>
                <p className="text-base">
                  1 FLEXVIS = {1 / presaleInfo.rate} BNB
                </p>
              </div>
            </div>
          </div>
          <TimerCountdown millisecondsLeft={millisecondsLeft} />
        </div>
      )}
    </>
  );
}
