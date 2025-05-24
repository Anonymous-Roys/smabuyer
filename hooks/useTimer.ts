"use client";

import { useAnimate } from "framer-motion";
import { useEffect, useRef, useState } from "react";

// Constants for time calculations
const SECOND = 1000;
const MINUTE = 60 * SECOND;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;

// Countdown target date
const COUNTDOWN_FROM = new Date("2025-05-21T00:00:00Z").getTime();

type TimeUnit = "DAY" | "HOUR" | "MINUTE" | "SECOND";

const useTimer = (unit: TimeUnit) => {
  const [ref, animate] = useAnimate();

  const interval = useRef<NodeJS.Timeout | null>(null);
  const timeRef = useRef<number>(0);
  const [time, setTime] = useState<number>(0);

  useEffect(() => {
    // Start the interval
    interval.current = setInterval(handleCountdown, 1000);

    // Cleanup interval on unmount
    return () => {
      if (interval.current) {
        clearInterval(interval.current);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCountdown = async () => {
    if (!ref.current) return;

    const now = new Date().getTime();
    const diff = COUNTDOWN_FROM - now;

    if (diff <= 0) {
      clearInterval(interval.current || undefined);
      setTime(0);
      return;
    }

    let newTime: number = 0;

    if (unit === "DAY") {
      newTime = Math.floor(diff / DAY);
    } else if (unit === "HOUR") {
      newTime = Math.floor((diff % DAY) / HOUR);
    } else if (unit === "MINUTE") {
      newTime = Math.floor((diff % HOUR) / MINUTE);
    } else {
      newTime = Math.floor((diff % MINUTE) / SECOND);
    }

    if (newTime !== timeRef.current) {
      // Exit animation
      await animate(
        ref.current,
        { y: ["0%", "-50%"], opacity: [1, 0] },
        { duration: 0.35 }
      );

      // Update the reference and state
      timeRef.current = newTime;
      setTime(newTime);

      // Enter animation
      await animate(
        ref.current,
        { y: ["50%", "0%"], opacity: [0, 1] },
        { duration: 0.35 }
      );
    }
  };

  return { ref, time };
};

export default useTimer;