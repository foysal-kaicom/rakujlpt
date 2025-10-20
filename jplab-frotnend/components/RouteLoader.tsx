"use client";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function RouteLoader() {
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (!pathname) return;

    setLoading(true);
    setWidth(30);

    // Animate progress bar
    const interval = setInterval(() => {
      setWidth((old) => {
        if (old >= 90) return old; // max before completion
        return old + Math.random() * 10; // increase randomly
      });
    }, 200);

    // Finish after a short delay
    const timeout = setTimeout(() => {
      setWidth(100);
      setTimeout(() => {
        setLoading(false);
        setWidth(0);
      }, 300);
    }, 800); // adjust based on expected page load

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
      setWidth(0);
      setLoading(false);
    };
  }, [pathname]);

  if (!loading) return null;

  return (
    <div className="fixed top-0 left-0 h-1 z-[60] w-full bg-transparent">
      <div
        className="h-1 bg-[#f8ff00] transition-all duration-200 ease-out"
        style={{ width: `${width}%` }}
      ></div>
    </div>
  );
}
