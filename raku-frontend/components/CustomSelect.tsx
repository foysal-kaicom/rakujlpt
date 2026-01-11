"use client";

import { useState, useRef, useEffect } from "react";

interface Option {
  label: string;
  value: string;
}

interface CustomSelectProps {
  options: Option[];
  value: string | null;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export default function CustomSelect({
  options,
  value,
  onChange,
  placeholder = "Select an Exam",
  className = "w-50",
}: CustomSelectProps) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement | null>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const selectedOption = options.find((opt) => opt.value === value);

  return (
    <div ref={rootRef} className={`relative text-sm ${className}`}>
      {/* Select button */}
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="w-full flex justify-between items-center px-5 py-3 text-white text-sm rounded-full shadow-md bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-400 hover:scale-105 transition-transform duration-300 font-medium cursor-pointer"
      >
        <span className="truncate">
          {selectedOption ? (
            selectedOption.label
          ) : (
            <span className="text-gray-400">{placeholder}</span>
          )}
        </span>

        <svg
          className={`w-4 h-4 transition-transform ${
            open ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown */}
      {open && (
        <ul className="absolute z-20 mt-1 w-full bg-gradient-to-r from-indigo-200 to-purple-200 font-medium rounded-md shadow-lg max-h-60 overflow-auto">
          {options.length === 0 && (
            <li className="px-3 py-2 text-gray-500">No options</li>
          )}

          {options.map((opt) => (
            <li
              key={opt.value}
              onClick={() => {
                onChange(opt.value);
                setOpen(false);
              }}
              className={`px-3 py-2 cursor-pointer hover:bg-purple-400 hover:text-white ${
                value === opt.value ? "bg-purple-500 text-white" : ""
              }`}
            >
              {opt.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
