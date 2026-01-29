import type { Metadata } from "next";
import "../css/globals.css";
import { Toaster } from "sonner";
import RouteLoader from "@/components/RouteLoader";
import MetaPixel from "@/components/MetaPixel";
import I18nProvider from "./i18n-provider";

export const metadata: Metadata = {
  title:
    "Free JLPT & JPT Mock Tests | Raku JLPT – Online Japanese Practice Exams",
  description:
    "Take free JLPT and JPT mock tests online. Practice Japanese grammar, vocabulary, listening, and reading with realistic exam-style questions. Improve your Japanese proficiency score with Raku JLPT's interactive practice platform.",
  keywords: [
    "JLPT mock test",
    "JPT mock test",
    "Japanese practice test online",
    "JLPT practice online",
    "JPT practice online",
    "free Japanese mock test",
    "online Japanese test",
    "JLPT N5 N4 N3 N2 N1 practice",
    "JPT exam practice",
    "Japanese grammar test",
    "Japanese vocabulary test",
    "JLPT sample test",
    "JLPT practice questions",
  ],
  authors: [{ name: "Raku JLPT", url: "https://rakujlpt.com" }],
  alternates: { canonical: "https://rakujlpt.com/" },
  openGraph: {
    title: "Free JLPT & JPT Mock Tests | Raku JLPT",
    description:
      "Practice JLPT and JPT mock tests online. Improve your Japanese language skill with free, realistic practice exams.",
    url: "https://rakujlpt.com",
    siteName: "Raku JLPT",
    images: [
      {
        url: "https://rakujlpt.com/og-banner.jpg",
        width: 1200,
        height: 630,
        alt: "Raku JLPT Mock Test Platform",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  icons: { icon: "/favicon.ico" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="max-w-[2000px] mx-auto">
        <I18nProvider>
          <RouteLoader />
          <MetaPixel />
          {children}
          <Toaster
            position="top-center"
            richColors
            duration={3000}
            closeButton={true}
          />
        </I18nProvider>
      </body>
    </html>
  );
}
