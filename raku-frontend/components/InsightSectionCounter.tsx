"use client";

import { useEffect, useState } from "react";

interface CounterOptions {
  start: number;
  end: number;
  duration: number;
  setter: React.Dispatch<React.SetStateAction<number>>;
}

export default function InsightSectionCounter() {
  const [learners, setLearners] = useState<number>(0);
  const [tests, setTests] = useState<number>(0);
  const [rating, setRating] = useState<number>(0);

  useEffect(() => {
    const animateValue = ({ start, end, duration, setter }: CounterOptions) => {
      let startTimestamp: number | null = null;

      const step = (timestamp: number) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const value = start + (end - start) * progress;
        setter(value);
        if (progress < 1) requestAnimationFrame(step);
      };

      requestAnimationFrame(step);
    };

    animateValue({ start: 0, end: 10000, duration: 1500, setter: setLearners });
    animateValue({ start: 0, end: 200, duration: 1500, setter: setTests });
    animateValue({ start: 0, end: 4.9, duration: 1500, setter: setRating });
  }, []);

  return (
    <div className="mt-10 grid grid-cols-3 gap-6 font-medium">
      <div className="flex flex-col">
        <span className="text-2xl sm:text-4xl font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          {Math.floor(learners).toLocaleString()}+
        </span>
        <span className="text-sm text-gray-500 mt-1">Active Learners</span>
      </div>

      <div className="flex flex-col">
        <span className="text-2xl sm:text-4xl font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          {Math.floor(tests)}+
        </span>
        <span className="text-sm text-gray-500 mt-1">Mock Tests</span>
      </div>

      <div className="flex flex-col">
        <span className="text-2xl sm:text-4xl font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          {rating.toFixed(1)}/5
        </span>
        <span className="text-sm text-gray-500 mt-1">Avg. Rating</span>
      </div>
    </div>
  );
}
