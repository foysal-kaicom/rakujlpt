import { Metadata } from "next";

import { Suspense } from "react";

import PackagesComponent from "@/components/packages/PackagesComponent";
import PackagesSkeleton from "./PackageSkeleton";

// Metadata
export const metadata: Metadata = {
  title: "Pricing & Subscription Packages",
  description:
    "Find the perfect Raku subscription plan for your Japanese language learning. Explore pricing options for JPT, JLPT, and NAT exam preparation — flexible, affordable packages designed for every learner.",
};


export default function SignInPageWrapper() {
  return (
    <Suspense fallback={<PackagesSkeleton/>}>
      <PackagesComponent />
    </Suspense>
  );
}
