import { fromWei, now, toWei, allValid } from "../utils/helper";
import TimerCountdown from "./TimerCountdown";

export default function PresaleDetails({ presaleInfo }) {
  let dollarUSLocale = Intl.NumberFormat("en-US");
  // amount = dollarUSLocale.format(price).toString();
  const formattedCap = dollarUSLocale.format(
    fromWei(presaleInfo?.cap).toString()
  );
  const formattedAmountRaised = dollarUSLocale.format(
    fromWei(presaleInfo?.weiRaised).toString()
  );

  const millisecondsLeft = presaleInfo.hasEnded ? 0 : Number(presaleInfo.closingTime) * 1000 - now();

  return (
    <>
      {allValid(presaleInfo) && (
        <div>
          <h1 className="text-4xl text-center">
            Participate in Flexvis Presale and get yours at a cheaper rate.
          </h1>
          <p className="text-3xl py-8 text-center">
            {formattedCap} BNB Target cap, {formattedAmountRaised} BNB Raised
          </p>
          <div className="w-full flex justify-center items-center">
            <div className="">
              <div className="w-96 bg-neutral-200 h-7 rounded-md dark:bg-gray-700">
                <div
                  className={`h-7 bg-gradient-to-r rounded-md from-purple-600 to-purple-400`}
                  style={{ width: `${presaleInfo.scaleValue}%` }}
                ></div>
              </div>
              <div className="w-96 flex py-2 justify-between">
                <p className="text-base">{presaleInfo.percentRaised}% raised</p>
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
