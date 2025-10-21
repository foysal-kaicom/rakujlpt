import { Metadata } from "next";

import { Suspense } from "react";
import SuspenseLoader from "@/components/SuspenseLoader";
import PackagesComponent from "@/components/packages/PackagesComponent";

// Metadata
export const metadata: Metadata = {
  title: "Subscription packages",
  description: "Here the packages can be found for subscription",
};

export default function SignInPageWrapper() {
  return (
    <Suspense fallback={<SuspenseLoader/>}>
      <PackagesComponent />
    </Suspense>
  );
}
