import { Metadata } from "next";

import { Suspense } from "react";

import PackagesComponent from "@/components/packages/PackagesComponent";
import PackagesSkeleton from "./PackageSkeleton";

// Metadata
export const metadata: Metadata = {
  title: "Subscription packages",
  description: "Here the packages can be found for subscription",
};

export default function SignInPageWrapper() {
  return (
    <Suspense fallback={<PackagesSkeleton/>}>
      <PackagesComponent />
    </Suspense>
  );
}
