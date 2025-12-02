import type { Metadata } from "next";
import "../css/globals.css";
import { Toaster } from "sonner";
import RouteLoader from "@/components/RouteLoader";

export const metadata: Metadata = {
  title: "Raku - Mock Test",
  description:
    "Register for the Japanese Proficiency Mock Test. Access an international Japanese language mock test platform with practice exams, scoring, and performance tracking for JLPT and JPT-style tests",
  keywords: [
    "Raku JLPT",
    "Japanese Proficiency Test",
    "JPT registration",
    "JPLT registration",
    "Japanese mock exam",
    "JPT test dates",
    "JPLT test dates",
    "study in Japan",
    "JLPT",
    "JPT",
    "Japanese language test online",
    "Japanese language practice test",
    "LPT mock test online",
    "JPT online mock test",
    "Japanese proficiency exam practice",
    "Japanese grammar test online",
    "JLPT preparation test",
    "JLPT sample questions",
    "Practice Japanese vocabulary test",
    "Japanese listening mock test",
    "Japanese reading mock test",
    "Japanese language Proficiency Test",
  ],
  authors: [{ name: "Raku JLPT", url: "https://rakujlpt.com" }],
  alternates: {
    canonical: "https://rakujlpt.com/",
  },
  openGraph: {
    title: "Raku JLPT – Japanese Proficiency Mock Test",
    description:
      "Get registered for mock test website practice all available tests to improve your score.",
    url: "https://rakujlpt.com",
    siteName: "Raku JLPT",
    images: [
      {
        url: "https://rakujlpt.com/og-banner.jpg",
        width: 571,
        height: 519,
        alt: "Raky JLPT",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="max-w-[2000px] mx-auto">
        <RouteLoader/>
        {children}
        <Toaster position="top-center" richColors />
      </body>
    </html>
  );
}
