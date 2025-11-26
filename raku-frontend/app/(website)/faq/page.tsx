import { Metadata } from "next";
import FAQ from "./faqPage";
import { Suspense } from "react";
import SuspenseLoader from "@/components/SuspenseLoader";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Explore Raku’s FAQ to learn how our Japanese language proficiency platform works—exam preparation, practice tests, subscriptions, payments, and student support explained.",
};

interface FAQ {
  id: null | number;
  question: string;
  answer: string;
}

const getFaqList = async (): Promise<FAQ[]> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/faq/list`,
      {
        cache: "no-store",
      }
    );
    const data = await res.json();
    return data?.data || [];
  } catch (error) {
    return []
  }
};

export default async function FaqPageWrapper() {
  const faqs = await getFaqList();
  return (
    <Suspense fallback={<SuspenseLoader />}>
      <FAQ faqs={faqs} />
    </Suspense>
  );
}
