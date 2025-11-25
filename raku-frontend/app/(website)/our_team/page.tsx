import Image from "next/image";
import { FaLinkedin, FaTwitter, FaGithub } from "react-icons/fa";
import { IoPersonCircle } from "react-icons/io5";


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
              <div className="relative w-32 h-32 mx-auto mb-6">
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
                
                <span className="absolute min-w-30 bottom-0 translate-x-1/2 right-1/2 bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                  {member.designation}
                </span>
              </div>

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
                    <FaTwitter />
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
