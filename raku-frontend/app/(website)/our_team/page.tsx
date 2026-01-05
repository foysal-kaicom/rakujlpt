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
    <section className="pt-5 pb-20 bg-gradient-to-b from-blue-50 via-purple-50 to-white">
      <OurTeamsComponent />
    </section>
  );
}
