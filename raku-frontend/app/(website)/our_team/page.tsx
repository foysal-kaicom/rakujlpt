"use client";

import Image from "next/image";
import { FaLinkedin, FaTwitter, FaGithub } from "react-icons/fa";

const teamMembers = [
  {
    name: "Arif Akib",
    role: "Lead Developer",
    image: "/team1.jpg",
    social: {
      linkedin: "#",
      twitter: "#",
      github: "#",
    },
  },
  {
    name: "Sarah Lee",
    role: "UI/UX Designer",
    image: "/team2.jpg",
    social: {
      linkedin: "#",
      twitter: "#",
      github: "#",
    },
  },
  {
    name: "David Kim",
    role: "Project Manager",
    image: "/team3.jpg",
    social: {
      linkedin: "#",
      twitter: "#",
      github: "#",
    },
  },
  {
    name: "Emily Clark",
    role: "Marketing Strategist",
    image: "/team4.jpg",
    social: {
      linkedin: "#",
      twitter: "#",
      github: "#",
    },
  },
];

export default function OurTeamPage() {
  return (
    <section className="py-20 bg-gradient-to-b from-blue-50 via-purple-50 to-white">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text mb-4">
          Meet Our Team
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto mb-16">
          A passionate team working together to build delightful digital
          experiences.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="group relative bg-white rounded-3xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 border border-blue-100 hover:-translate-y-2"
            >
              {/* Avatar */}
              <div className="relative w-32 h-32 mx-auto mb-6">
                <Image
                  src={member.image}
                  alt={member.name}
                  className="rounded-full w-full h-full object-cover border-4 border-blue-300 group-hover:scale-110 transition-transform duration-300"
                  width={128}
                  height={128}
                />
                <span className="absolute bottom-0 right-0 bg-blue-500 text-white px-3 py-1 rounded-full text-xs">
                  {member.role}
                </span>
              </div>

              {/* Name & Role */}
              <h3 className="text-xl font-bold text-gray-900">{member.name}</h3>
              <p className="text-gray-600 text-sm mt-2">
                {member.role} & passionate creator.
              </p>

              {/* Social Icons */}
              <div className="flex justify-center gap-4 mt-5 text-blue-500">
                {member.social.linkedin && (
                  <a
                    href={member.social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-blue-700 transition-colors text-2xl"
                  >
                    <FaLinkedin />
                  </a>
                )}
                {member.social.twitter && (
                  <a
                    href={member.social.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-blue-700 transition-colors text-2xl"
                  >
                    <FaTwitter />
                  </a>
                )}
                {member.social.github && (
                  <a
                    href={member.social.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-blue-700 transition-colors text-2xl"
                  >
                    <FaGithub />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
