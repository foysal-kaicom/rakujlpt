"use client";

import React, { useState, useRef, useEffect } from "react";
import JapanMap from "./JapanMap";
import { prefectures } from "./prefecture";
import { colleges } from "./colleges";

export default function JPTCollegeCompany() {
  const categories = [
    "all",
    "University",
    "Vocational School",
    "Japanese Language School",
    "Company",
    "Junior College",
  ];

  const listRef = useRef<HTMLDivElement | null>(null);

  const [category, setCategory] = useState("all");

  const [selectedPrefecture, setSelectedPrefecture] = useState("all");

  const filteredColleges = colleges
    .filter((c) => (category === "all" ? true : c.classification === category))
    .filter((c) =>
      selectedPrefecture === "all" ? true : c.prefecture === selectedPrefecture
    );

  useEffect(() => {
    if (listRef.current && selectedPrefecture && selectedPrefecture !== "all") {
      listRef.current.scrollIntoView({ behavior: "smooth", block:'start' });
    }
  }, [selectedPrefecture, category]);

  return (
    <div className="space-y-15">
      <JapanMap
        setSelectedPrefecture={setSelectedPrefecture}
        selectedPrefecture={selectedPrefecture}
      />

      <div className="space-y-3 scroll-mt-28" id="listofcol" ref={listRef}>
        <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-end justify-between gap-4 mb-10">
          <h1 className="text-3xl font-bold text-gray-800">List of <span className="capitalize">{category == 'all' ? 'institutions' : category}</span></h1>

          <div className="grid sm:grid-cols-3 lg:grid-cols-2 items-end gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-600">
                Category:
              </label>

              <select
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none shadow-sm text-sm"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex lg:hidden flex-col gap-1">
              <label className="text-sm font-medium text-gray-600">
                Prefecture:
              </label>

              <select
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none shadow-sm text-sm"
                value={selectedPrefecture ?? ""}
                onChange={(e) => setSelectedPrefecture(e.target.value)}
              >
                <option value="">All Prefectures</option>
                {prefectures.map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </select>
            </div>

            <button
              className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-md"
              onClick={() => {
                setCategory("all");
                setSelectedPrefecture("all");
              }}
            >
              Reset All
            </button>
          </div>
        </div>
        <p className="text-red-600 text-sm">
          Please check the * mark in the adopted score column in the entrance
          examination guidelines issued by each school.
        </p>
        <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-md">
          <table className="min-w-full divide-y divide-gray-200 text-sm text-left bg-white">
            <thead className="bg-blue-100 text-gray-700 uppercase text-xs md:text-sm font-bold">
              <tr>
                <th className="px-4 py-3 hidden sm:table-cell">Prefecture</th>
                <th className="px-4 py-3 ">Name</th>
                <th className="px-4 py-3 hidden sm:table-cell">Classification</th>
                <th className="px-4 py-3">Adopted Score</th>
                <th className="px-4 py-3">Website</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredColleges.map((college, idx) => (
                <tr key={idx} className="hover:bg-gray-50 text-xs md:text-sm">
                  <td className="px-4 py-3 hidden sm:table-cell">{college.prefecture}</td>
                  <td className="px-4 py-3">{college.name}</td>
                  <td className="px-4 py-3 text-blue-600 hidden sm:table-cell">
                    {college.classification}
                  </td>
                  <td className="px-4 py-3 text-red-600">{college.score}</td>
                  <td className="px-4 py-3 ">
                    {college.website ? (
                      <a
                        href={college.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-5 py-1.5 text-white bg-blue-800 rounded-md"
                      >
                        Visit
                      </a>
                    ) : (
                      "--"
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
