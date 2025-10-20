import type { Metadata } from "next";
import "../css/globals.css";
import { Toaster } from "sonner";
import RouteLoader from "@/components/RouteLoader";
import MessengerWrapper from "@/components/wrapper/MessengerWrapper";

export const metadata: Metadata = {
  title: "Hashira - Mock Test",
  description:
    "Register for the Japanese Proficiency Mock Test in Bangladesh. Find test dates, centers, application deadlines, and fees.",
  keywords: [
    "Hashira Bangladesh",
    "Japanese Proficiency Test",
    "JPT registration",
    "Japanese mock exam",
    "JPT test dates",
    "study in Japan",
  ],
  authors: [{ name: "Hashira Bangladesh", url: "https://yourdomain.com" }],
  alternates: {
    canonical: "https://yourdomain.com/",
  },
  openGraph: {
    title: "Hashira Bangladesh – Japanese Proficiency Mock Test Registration",
    description:
      "Get registered for mock test exams in Bangladesh. View all available test dates and center info.",
    url: "https://yourdomain.com",
    siteName: "Hashira Bangladesh",
    // images: [
    //   {
    //     url: "https://yourdomain.com/og-banner.jpg",
    //     width: 1200,
    //     height: 630,
    //     alt: "JPT Bangladesh Exam Banner",
    //   },
    // ],
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
        <Toaster />
         {/* <MessengerWrapper /> */}
      </body>
    </html>
  );
}
