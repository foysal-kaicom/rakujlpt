import { Metadata } from "next";
import OurTeamsComponent from "./OurTeamsComponent";

export const metadata: Metadata = {
  title:
    "Our Team – Meet the Raku JLPT Experts Behind JLPT, JPT & NAT Practice",
  description:
    "Meet the team behind Raku JLPT — educators, developers, and language experts dedicated to creating the best JLPT, JPT, and NAT mock test platform. Learn about the people who design your practice tests and support your Japanese learning journey.",
  keywords: [
    "Raku JLPT team",
    "About Raku team",
    "JLPT platform team",
    "Japanese test creators",
    "JPT exam team",
    "NAT test platform team",
    "Japanese learning experts",
  ],
};

export default function OurTeamPage() {
  return (
    <section className="pt-5 pb-20 relative bg-gradient-to-br from-blue-50 via-pink-50 to-purple-100 overflow-clip">
      <div className="absolute -top-16 -left-16 w-60 h-60 bg-yellow-200/30 rounded-full filter blur-3xl animate-bounce-slow"></div>
      <div className="absolute -bottom-24 -right-16 w-96 h-96 bg-pink-200/30 rounded-full filter blur-3xl animate-pulse-slow"></div>
      <OurTeamsComponent />
    </section>
  );
}
