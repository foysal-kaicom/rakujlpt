"use client";
import { useState } from "react";
import { GrMapLocation } from "react-icons/gr";
import { MdKeyboardArrowUp } from "react-icons/md";

interface Center {
  id: string | number;
  name: string;
  address: string;
  location: string;
}

interface ClientMapProps {
  centers: Center[];
}

export default function LocationComponent({ centers }: ClientMapProps) {
  const [viewLocation, setViewLocation] = useState(centers[0]?.location || "");

  return (
    <div
      className={`${
        centers.length > 1
          ? "flex flex-col xl:flex-row gap-10 items-center"
          : "space-y-5"
      }`}
    >
      <div className={`w-full ${centers.length > 1 ? "xl:w-1/2" : ""}`}>
        <iframe
          src={viewLocation}
          width="600"
          height="450"
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="mt-5 w-full border-10 border-blue-200 rounded-lg drop-shadow-lg"
        ></iframe>
      </div>

      <div
        className={`relative w-full ${centers.length > 1 ? "xl:w-1/2" : ""} `}
      >
        <div
          className={`space-y-5 w-full self-center p-1.5 ${
            centers.length > 1
              ? "max-h-[460px] overflow-y-auto scrollbar-hide relative"
              : ""
          }`}
        >
          {centers.map((loc) => (
            <div
              key={loc.id}
              className="p-5 rounded bg-white shadow-md drop-shadow-xl space-y-2"
            >
              <p className="lg:text-2xl font-semibold">{loc.name}</p>
              <p className="text-gray-500 text-sm lg:text-base">
                {loc.address}
              </p>
              <button
                onClick={() => setViewLocation(loc.location)}
                className="primary-text-color flex gap-2 items-center font-semibold cursor-pointer text-sm lg:text-base"
              >
                <GrMapLocation className="lg:size-6" />
                See location
              </button>
            </div>
          ))}
        </div>
        <div className={`absolute top-1/2 translate-y-1/2 right-5 flex flex-col items-end gap-1 ${centers.length > 3 ? "" : "hidden"}`}>
          <button className="p-1 text-lg rounded-full bg-blue-800/50 text-white">
            <MdKeyboardArrowUp />
          </button>
          <button className="p-1 text-lg rounded-full bg-blue-800/50 text-white rotate-180">
            <MdKeyboardArrowUp />
          </button>
        </div>
      </div>
    </div>
  );
}
