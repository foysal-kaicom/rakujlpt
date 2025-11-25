import { Metadata } from "next";
import Image from "next/image";
import { FaLinkedin, FaFacebookSquare, FaGithub } from "react-icons/fa";
import { IoPersonCircle } from "react-icons/io5";

interface Member {
  name:string,
  email:string,
  designation:string,
  description:string,
  photo:string,
  linkedin_url:string,
  facebook_url:string,
  github_url:string,
}

export const metadata: Metadata = {
  title: "Our Team",
  description: "Explore Raku’s capable team",
};

const getTeamList = async (): Promise<Member[]> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/our-member/list`,
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

export default async function OurTeamPage() {
   const teamMembers = await getTeamList();
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
              <div className="relative w-32 h-32 mx-auto">
                {member.photo ? 
                   <Image
                  src={member.photo}
                  alt={member.name}
                  className="rounded-full w-full h-full object-cover border-4 border-blue-300 group-hover:scale-110 transition-transform duration-300"
                  width={128}
                  height={128}
                /> :
                < IoPersonCircle className="rounded-full size-32 object-cover group-hover:scale-110 transition-transform duration-300 text-purple-500 bg-purple-100"/>
                }
                
                
              </div>
              <p className=" bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-medium mt-3 mb-4 w-40 mx-auto">
                  {member.designation}
                </p>

              {/* Name & Role */}
              <h3 className="text-xl font-bold text-gray-900">{member.name}</h3>
              <p className="text-gray-600 text-sm mt-2">
                {member.description}
              </p>

              {/* Social Icons */}
              <div className="flex justify-center gap-4 mt-5 text-blue-500">
                {member.linkedin_url && (
                  <a
                    href={member.linkedin_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-blue-700 transition-colors text-2xl"
                  >
                    <FaLinkedin />
                  </a>
                )}
                {member.facebook_url && (
                  <a
                    href={member.facebook_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-blue-700 transition-colors text-2xl"
                  >
                    <FaFacebookSquare />
                  </a>
                )}
                {member.github_url && (
                  <a
                    href={member.github_url}
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
