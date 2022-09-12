import {ethers} from "ethers"

export const toWei = (value) => {
    return ethers.utils.parseEther(value.toString())
}

export const fromWei = (value) => {
    return ethers.utils.formatEther(value.toString())
}

export const time = ((milliseconds) => {
    const SEC = 1e3;
    const MIN = SEC * 60;
    const HOUR = MIN * 60;
    const DAY = HOUR * 24;
    return (time) => {
      const ms = Math.abs(time);
      const d = (ms / DAY) | 0;
      const h = ((ms % DAY) / HOUR) | 0;
      const m = ((ms % HOUR) / MIN) | 0;

      return {
        minute: m,
        hour: h,
        day: d
      }
    //   const s = ((ms % MIN) / SEC) | 0;
    //   return `${time < 0 ? "-" : ""}${d} Days ${h} Hours ${
    //     h == 0 ? `${m} Minutes` : ""
    //   }`;
      // ${m}Minute(s) ${s}Second(s)
    };
  })()