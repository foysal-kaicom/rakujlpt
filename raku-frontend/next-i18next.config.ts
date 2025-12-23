import type { UserConfig } from "next-i18next";

const i18nConfig: UserConfig = {
  i18n: {
    defaultLocale: "en",
    locales: ["en", "bn"], // add more languages here
  },
  reloadOnPrerender: process.env.NODE_ENV === "development",
};

export default i18nConfig;
