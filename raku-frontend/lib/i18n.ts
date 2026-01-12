import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "@/public/locales/en/common.json";
import bn from "@/public/locales/bn/common.json";
import nep from "@/public/locales/nep/common.json";

const savedLang =
  typeof window !== "undefined" ? localStorage.getItem("lang") || "en" : "en";

if (!i18n.isInitialized) {
  i18n.use(initReactI18next).init({
    lng: savedLang,
    fallbackLng: "en",
    resources: {
      en: {
        common: en,
      },
      bn: {
        common: bn,
      },
      nep: {
        common: nep,
      },
    },
    ns: ["common"],
    defaultNS: "common",
    interpolation: {
      escapeValue: false,
    },
  });
}

export default i18n;
