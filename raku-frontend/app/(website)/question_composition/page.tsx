import { Metadata } from "next";
import { Suspense } from "react";

import QuestionCompositionComponent from "@/components/QuestionCompositionComponent";
import QuestionCompositionSkeleton from "./QusetionCompositionSkeleton";

// Metadata
export const metadata: Metadata = {
  title:
    "Question Composition – Create & Practice JLPT, JPT & NAT Questions | Raku JLPT",
  description:
    "Compose and practice JLPT, JPT, and NAT exam questions with Raku JLPT. Design custom practice tests, improve your Japanese grammar, vocabulary, listening, and reading skills, and track your performance.",
  keywords: [
    "JLPT question composition",
    "JPT practice questions",
    "NAT mock test creation",
    "Japanese exam practice",
    "Create JLPT test",
    "Practice Japanese questions online",
  ],
};

export default function QuestionComposition() {
  
  return (
    <Suspense fallback={<QuestionCompositionSkeleton />}>
      <div className="relative bg-gradient-to-br from-blue-50 via-pink-50 to-purple-100 overflow-clip">
        <div className="absolute -top-16 -left-16 w-60 h-60 bg-yellow-200/30 rounded-full filter blur-3xl animate-bounce-slow"></div>
        <div className="absolute -bottom-24 -right-16 w-96 h-96 bg-pink-200/30 rounded-full filter blur-3xl animate-pulse-slow"></div>
        <QuestionCompositionComponent/>
      </div>
    </Suspense>
  );
}
