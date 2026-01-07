"use client";

import { useState } from "react";
import { Globe, ChevronDown } from "lucide-react";
import i18n from "@/lib/i18n";

type Lang = "en" | "bn";

const getInitialLang = (): Lang => {
  if (typeof window === "undefined") return "en";
  return (localStorage.getItem("lang") as Lang) || "en";
};

export default function LanguageSwitcher() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState<Lang>(getInitialLang);

  const changeLanguage = (lang: Lang) => {
    setCurrentLang(lang);
    i18n.changeLanguage(lang);
    localStorage.setItem("lang", lang);
    setIsOpen(false);
  };

  const languages = {
    en: { label: "English", short: "EN" },
    bn: { label: "বাংলা", short: "বাং" },
    nep: { label: "नेपाली", short: "ने" }
  };

  return (
    <div className="relative inline-block">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/80 backdrop-blur border border-slate-200 shadow-sm hover:shadow-lg hover:border-purple-400 active:scale-[0.97] transition-all duration-200 cursor-pointer"
      >
        <Globe className="w-4 h-4 text-purple-500 group-hover:rotate-12 transition" />

        <span className="hidden xl:block text-sm font-semibold text-slate-800">
          {languages[currentLang].short}
        </span>
        <span className="xl:hidden text-sm font-semibold text-slate-800">
          {languages[currentLang].label}
        </span>

        <ChevronDown
          className={`w-4 h-4 text-slate-500 transition-transform duration-300 ${
            isOpen ? "rotate-180 text-purple-500" : ""
          }`}
        />
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />

          <div className="absolute xl:right-0 mt-3 w-52 z-20 rounded-2xl overflow-clip bg-white/90 backdrop-blur border border-slate-200 shadow-2xl origin-top">
            {(Object.keys(languages) as Lang[]).map((lang) => (
              <button
                key={lang}
                onClick={() => changeLanguage(lang)}
                className={`group w-full px-4 py-3 flex items-center gap-3 text-sm transition-all cursor-pointer
              ${
                currentLang === lang
                  ? "bg-purple-50 text-purple-700 font-semibold"
                  : "text-slate-700 hover:bg-slate-100"
              }`}
              >
                <span className="text-xs px-2 py-0.5 rounded-md bg-slate-100 group-hover:bg-white">
                  {languages[lang].short}
                </span>

                <span>{languages[lang].label}</span>

                {currentLang === lang && (
                  <span className="ml-auto text-purple-600 scale-110">✓</span>
                )}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
