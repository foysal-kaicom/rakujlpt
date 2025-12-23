import type { NextConfig } from "next";
import i18nConfig from "./next-i18next.config";

const nextConfig: NextConfig = {
  /* config options here */
    images: {
    domains: ['media.kaicombd.com','lh3.googleusercontent.com', '192.168.0.101' ,'pub-dd15f62cb7a3448fb10fc928a3738a9d.r2.dev', '127.0.0.1', 'localhost'],
  },
  i18n: i18nConfig.i18n,
};

export default nextConfig;
