"use client";
import useTimer from "@/hooks/useTimer";
import { motion } from "framer-motion";
import React from "react";
import { TimeUnit } from "@/types/time.types";

const CountDownShift = () => {
  return (
    <div className="flex items-center max-sm:flex-col gap-3 justify-center bg-white px-4">
      <div className="mx-auto flex gap-2 w-full max-w-lg items-center ">
        <CountDownItem unit="DAY" text="Days" />
        <CountDownItem unit="HOUR" text="hours" />
        <CountDownItem unit="MINUTE" text="minutes" />
        <CountDownItem unit="SECOND" text="Seconds" />
      </div>
    </div>
  );
};

export default CountDownShift;

const CountDownItem = ({ unit, text }: { unit: TimeUnit; text: string }) => {
  const { ref, time } = useTimer(unit);
  return (
    <div className="flex h-[40px] flex-1 items-center justify-center gap-2 sm:gap-5 border-r-[1px] border-slate-200 font-mono md:gap-2">
      <motion.div className="relative  overflow-hidden text-center ">
        <motion.span
          ref={ref}
          className="block text-xl font-medium text-black  "
        >
          {time}
        </motion.span>
      </motion.div>
      <span className="text-xs font-light text-slate-500 ">{text}</span>
    </div>
  );
};