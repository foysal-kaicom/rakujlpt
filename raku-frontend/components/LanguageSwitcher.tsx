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
  };

  return (
    <div className="relative inline-block">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 bg-white border-2 border-slate-200 rounded-lg hover:border-blue-400 hover:shadow-md transition-all duration-200 cursor-pointer"
      >
        <Globe className="w-4 h-4 text-slate-600" />
        <span className="hidden xl:block font-medium text-slate-700">
          {languages[currentLang].short}
        </span>
        <span className="xl:hidden font-medium text-slate-700">
          {languages[currentLang].label}
        </span>
        <ChevronDown
          className={`w-4 h-4 text-slate-600 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute xl:right-0 xl:mt-2 w-48 bg-white border-2 border-slate-200 rounded-lg shadow-xl z-20">
            {(Object.keys(languages) as Lang[]).map((lang) => (
              <button
                key={lang}
                onClick={() => changeLanguage(lang)}
                className={`w-full px-4 py-3 text-left flex items-center gap-3 cursor-pointer ${
                  currentLang === lang
                    ? "bg-blue-50 text-blue-700 font-medium"
                    : "text-slate-700 hover:bg-slate-50"
                }`}
              >
                <span className="text-lg">{languages[lang].short}</span>
                <span>{languages[lang].label}</span>
                {currentLang === lang && (
                  <span className="ml-auto text-blue-600">✓</span>
                )}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
