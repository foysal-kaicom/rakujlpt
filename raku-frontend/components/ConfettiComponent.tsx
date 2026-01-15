"use client";

import { Confetti } from "@neoconfetti/react";
import { useEffect, useState } from "react";

export default function ConfettiComponent({
  show,
  setShow,
}: {
  show: boolean;
  setShow: (show: boolean) => void;
}) {
  const [size, setSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const updateSize = () => {
      setSize({ width: window.innerWidth, height: window.innerHeight });
    };
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  useEffect(() => {
    if(show) {
      const timer = setTimeout(() => {
        setShow(false);
      }, 6000);
      return () => clearTimeout(timer);
    }
  }, [show]);

  return (
    <>
      {show && (
        <Confetti
          stageWidth={size.width}
          stageHeight={size.height}
          particleShape="mix"
          particleCount={400} // more particles
          force={0.6} // stronger upward force
          duration={6000} // show for 6s
          particleSize={14} // slightly larger
          colors={["#ff0000", "#00ff00", "#0000ff", "#ffdd00", "#ff00dd"]}
          destroyAfterDone={true} // cleanup
        />
      )}
    </>
  );
}
