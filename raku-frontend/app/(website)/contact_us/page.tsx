import type { Metadata } from "next";
import { Suspense } from "react";

import SuspenseLoader from "@/components/SuspenseLoader";
import ContactUsComponent from "./ContactUsComponent";

export const metadata: Metadata = {
  title: "Contact Raku JLPT – Get Support for JLPT, JPT & NAT Practice Tests",
  description:
    "Contact Raku JLPT for support with JLPT, JPT, and NAT mock tests, account issues, partnerships, or general inquiries. Our team is here to help you with Japanese exam preparation and platform assistance.",
  keywords: [
    "Contact Raku JLPT",
    "Raku JLPT support",
    "JLPT help center",
    "JPT support",
    "NAT test support",
    "Contact Japanese practice test website",
    "Raku JLPT customer support",
  ],
};


export default function ContactUs() {

  return (
    <Suspense fallback={<SuspenseLoader />}>
      <ContactUsComponent />
    </Suspense>
  );
}
