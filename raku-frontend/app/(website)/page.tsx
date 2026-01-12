import AssociatedSection from "@/components/home/AssociatedSection";
import FeaturesSection from "@/components/home/FeaturesSection";
import InsightSection from "@/components/home/InsightSection";
import PricingSection from "@/components/home/PricingSection";
import ServiceSection from "@/components/home/ServiceSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import RoadmapSection from "@/components/home/RoadmapSection";
import HomePageSkeleton from "@/components/home/HomePageSkeleton";
import { Suspense } from "react";

export default function Home() {
  return (
    <Suspense fallback={<HomePageSkeleton />}>
      <InsightSection />
      <ServiceSection />
      <PricingSection />
      <RoadmapSection />
      <FeaturesSection />
      <AssociatedSection />
      <TestimonialsSection />
    </Suspense>
  );
}
