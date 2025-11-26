import type { Metadata } from "next";
import "../css/globals.css";
import { Toaster } from "sonner";
import RouteLoader from "@/components/RouteLoader";

export const metadata: Metadata = {
  title: "Raku - Mock Test",
  description:
    "Register for the Japanese Proficiency Mock Test in Bangladesh. Find test dates, centers, application deadlines, and fees.",
  keywords: [
    "Raku JLPT",
    "Japanese Proficiency Test",
    "JPT registration",
    "Japanese mock exam",
    "JPT test dates",
    "study in Japan",
    "JLPT",
    "Japanese language Proficiency Test",
  ],
  authors: [{ name: "Raku JLPT", url: "https://rakujlpt.com" }],
  alternates: {
    canonical: "https://rakujlpt.com/",
  },
  openGraph: {
    title: "Raku Bangladesh – Japanese Proficiency Mock Test Registration",
    description:
      "Get registered for mock test exams in Bangladesh. View all available test dates and center info.",
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
