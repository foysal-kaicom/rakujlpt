import FeaturesSection from "@/components/home/FeaturesSection";
import HeroSection from "@/components/home/HeroSection";
import PricingSection from "@/components/home/PricingSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import SuspenseLoader from "@/components/SuspenseLoader";
import { Suspense } from "react";

export default function Home() {
  return (
    <Suspense fallback={<SuspenseLoader />}>
      <HeroSection />
      <FeaturesSection />
      <PricingSection />
      <TestimonialsSection />
    </Suspense>
  );
}
