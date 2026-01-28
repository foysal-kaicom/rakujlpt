"use client";

import Image from "next/image";

import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { FaLinkedinIn, FaFacebookF, FaGithub } from "react-icons/fa";
import { IoPersonCircle } from "react-icons/io5";

import OurTeamSkeleton from "./OurTeamSkeleton";
import WebpageWrapper from "@/components/wrapper/WebpageWrapper";
import BreadCrumb from "@/components/BreadCrumb";

import { TeamMember } from "@/types/index.types";
import { ourTeamService } from "@/services/common.service";

export default function OurTeamsComponent() {
  const { t } = useTranslation("common");

  const breadCrumbData = [
    { name: t("breadcrumb.home"), to: "/" },
    { name: t("breadcrumb.our_team"), to: "/our_team" },
  ];

  const [teams, setTeams] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchTeams = async () => {
    try {
      const data = await ourTeamService.getTeamList();
      setTeams(data);
    } catch (error) {
      setTeams([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeams();
  }, []);

  return (
    <div>
      {loading ? (
        <OurTeamSkeleton />
      ) : (
        <WebpageWrapper>
          <BreadCrumb breadCrumbData={breadCrumbData} />
          <h2 className="text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-pink-400 to-purple-500 mb-4 text-center mt-10">
            {t("meet_the_team.title")}
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-16 text-center">
            {t("meet_the_team.description")}
          </p>
          <div className={`gap-10 ${teams.length > 3 ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4' : 'flex justify-center flex-wrap'}`}>
            {teams.map((member, index) => (
              <div
                key={index}
                className="group relative bg-white rounded-3xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 border border-blue-100 hover:-translate-y-2 text-center"
              >
                {/* Avatar */}
                <div className="relative w-32 h-32 mx-auto">
                  {member.photo ? (
                    <Image
                      src={member.photo}
                      alt={member.name}
                      className="rounded-full w-full h-full object-cover border-4 border-violet-300 group-hover:scale-110 transition-transform duration-300"
                      width={128}
                      height={128}
                      loading="lazy"
                    />
                  ) : (
                    <IoPersonCircle className="rounded-full size-32 object-cover group-hover:scale-110 transition-transform duration-300 text-purple-500 bg-purple-100" />
                  )}
                </div>
                <p className=" bg-violet-500 text-white px-3 py-1 rounded-full text-xs font-medium mt-3 mb-4 w-40 mx-auto">
                  {member.designation}
                </p>

                {/* Name & Role */}
                <h3 className="text-xl font-bold text-gray-900">
                  {member.name}
                </h3>
                <p className="text-gray-600 text-sm mt-2">
                  {member.description}
                </p>

                {/* Social Icons */}
                <div className="flex justify-center gap-4 mt-5">
                  {member.linkedin_url && (
                    <a
                      href={member.linkedin_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-linear-to-r from-indigo-400 to-purple-400 text-white rounded-full p-2 drop-shadow-sm drop-shadow-violet-300 border-b border-white/50 hover:scale-110 duration-300"
                    >
                      <FaLinkedinIn className="size-4" />
                    </a>
                  )}
                  {member.facebook_url && (
                    <a
                      href={member.facebook_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-linear-to-r from-indigo-400 to-purple-400 text-white rounded-full p-2 drop-shadow-sm drop-shadow-violet-300 border-b border-white/50 hover:scale-110 duration-300"
                    >
                      <FaFacebookF className="size-4" />
                    </a>
                  )}
                  {member.github_url && (
                    <a
                      href={member.github_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-linear-to-r from-indigo-400 to-purple-400 text-white rounded-full p-2 drop-shadow-sm drop-shadow-violet-300 border-b border-white/50 hover:scale-110 duration-300"
                    >
                      <FaGithub className="size-4" />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </WebpageWrapper>
      )}
    </div>
  );
}
