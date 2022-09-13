import Countdown from "react-countdown";

export default function TimerCountdown({ millisecondsLeft }) {
  const renderer = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
      return (
        <div className="w-full flex items-center justify-center my-2">
          <p>Presale has ended. Withdraw your Flexvis Token</p>
        </div>
      );
    } else {
      // Render a countdown
      return (
        <div className="w-full flex items-center justify-center my-2">
          <div className="flex items-center">
            <div className="flex flex-col items-center justify-between">
              <p>
                <small>Days</small>
              </p>
              <p className="flex flex-col w-16 h-16 bg-white text-black rounded-md text-center justify-center text-4xl items-center">
                {days}
              </p>
            </div>
            <p className="text-3xl text-white ml-4">:</p>
            <div className="ml-4 flex flex-col items-center justify-between">
              <p>
                <small>Hours</small>
              </p>
              <p className="flex flex-col w-16 h-16 bg-white text-black rounded-md text-center justify-center text-4xl items-center">
                {hours}
              </p>
            </div>
            <p className="text-3xl text-white ml-4">:</p>
            <div className="ml-4 flex flex-col items-center justify-between">
              <p>
                <small>Minutes</small>
              </p>
              <p className="flex flex-col w-16 h-16 bg-white text-black rounded-md text-center justify-center text-4xl items-center">
                {minutes}
              </p>
            </div>
            <p className="text-3xl text-white ml-4">:</p>
            <div className="ml-4 flex flex-col items-center justify-between">
              <p>
                <small>Seconds</small>
              </p>
              <div className="flex flex-col w-16 h-16 bg-white text-black rounded-md text-center justify-center text-4xl items-center">
                <p>{seconds}</p>
              </div>
            </div>
          </div>
        </div>
      );
    }
  };

  return <Countdown date={Date.now() + millisecondsLeft} renderer={renderer} />;
}
