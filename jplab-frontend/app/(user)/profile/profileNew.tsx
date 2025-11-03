import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";
import { MdVerified } from "react-icons/md";
import { FaSquareFacebook, FaLinkedin } from "react-icons/fa6";
import { RiEdit2Fill } from "react-icons/ri";

import Image from "next/image";

import BreadCrumb from "@/components/BreadCrumb";
import UserHeadline from "@/components/user/UserHeadline/UserHeadline";
import { useState } from "react";

export default function ProfileNew() {
  const breadCrumbData = [
    { name: "Dashboard", to: "/dashboard" },
    { name: "Settings", to: "/settings" },
    { name: "Profile", to: "/profile" },
  ];

  const skills = [
    { name: "HTML", level: 90, color: "bg-orange-500" },
    { name: "CSS", level: 80, color: "bg-blue-500" },
    { name: "JavaScript", level: 75, color: "bg-yellow-500" },
    { name: "React", level: 70, color: "bg-indigo-500" },
  ];

  const [editModal, setEditModal] = useState(false);

  const [profile, setProfile] = useState({
    name: "Arif Akib",
    email: "arifrabbaniakib@kaicomsol.com",
    phone: "+880 1234 567 890",
    gender: "Male",
    address: "Dhanmondi, Dhaka, Bangladesh",
    about: "Front-End Developer | Nuxt & Vue Enthusiast | CSE Lecturer",
    profileImg: "/assets/japan/j.jpg",
    coverImg: "/assets/japan/j.jpg",
    social_linkedin:"",
    social_facebook:""

  });

  const handleEditChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <>
      <div className="min-h-[60vh]">
        <BreadCrumb breadCrumbData={breadCrumbData} />
        <div className="mt-5 lg:px-10 lg:pb-10">
          <UserHeadline mainText="Profile" subText="" preText="" />

          <div className="max-w-3xl bg-white p-2 rounded-md mx-auto shadow-md relative">
            <button
              onClick={() => setEditModal(true)}
              className="px-4 py-2 bg-purple-600 text-white flex items-center gap-1 text-sm font-medium rounded-lg drop-shadow absolute z-10 right-5 top-5 cursor-pointer hover:bg-purple-700 duration-300"
            >
              <RiEdit2Fill className="size-5" />
              Edit
            </button>
            {/* Cover Image */}
            <Image
              src="/assets/japan/j.jpg"
              height={500}
              width={500}
              alt="cover image"
              className="w-full h-[200px] rounded-t-md rounded-b-4xl object-cover aspect-auto"
            />

            {/* Profile Info */}
            <div className="px-5 pb-5">
              <div className="flex justify-between -mt-15">
                <Image
                  src="/assets/japan/j.jpg"
                  height={500}
                  width={500}
                  alt="profile image"
                  className="size-30 rounded-full object-cover aspect-auto ring-6 ring-white shadow-md"
                />
                <div className="flex justify-center items-end gap-4 text-2xl text-purple-600">
                  <span className="p-0.5 rounded-md border">
                    <a
                      href="#"
                      target="_blank"
                      rel="noopener noreferrer"
                      title="Facebook"
                    >
                      <FaSquareFacebook className="hover:text-purple-800 transition size-6" />
                    </a>
                  </span>
                  <span className="p-0.5 rounded-md border">
                    <a
                      href="#"
                      target="_blank"
                      rel="noopener noreferrer"
                      title="LinkedIn"
                    >
                      <FaLinkedin className="hover:text-purple-800 transition size-6" />
                    </a>
                  </span>
                </div>
              </div>

              {/* Name and Email */}
              <h1 className="mt-4 font-bold text-2xl flex items-center gap-2">
                Arif Akib <MdVerified className="text-purple-600" />
              </h1>
              <p className="text-gray-600">arifrabbaniakib@kaicomsol.com</p>
              <p className="text-gray-600">
                Front-End Developer | Nuxt & Vue Enthusiast | CSE Lecturer
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-6 py-2 border-t border-b border-gray-200">
                {[
                  {
                    icon: <FaUser className="text-purple-500 text-lg" />,
                    label: "Gender",
                    value: "Male",
                  },
                  {
                    icon: <FaEnvelope className="text-purple-500 text-lg" />,
                    label: "Email",
                    value: "arifrabbaniakib@kaicomsol.com",
                  },
                  {
                    icon: (
                      <FaPhone className="text-purple-500 text-lg rotate-90" />
                    ),
                    label: "Phone",
                    value: "+880 1234 567 890",
                  },
                  {
                    icon: (
                      <FaMapMarkerAlt className="text-purple-500 text-lg" />
                    ),
                    label: "Address",
                    value: "Dhanmondi, Dhaka, Bangladesh",
                  },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 bg-white rounded-xl p-4"
                  >
                    <div className="flex items-center justify-center w-10 h-10 bg-pink-50 rounded-full">
                      {item.icon}
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wide font-semibold">
                        {item.label}
                      </p>
                      <p className="text-gray-800 font-medium">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Skills Section */}
              <h2 className="mt-6 mb-3 text-lg font-semibold text-purple-600">
                Skills & Progress
              </h2>
              <div className="gap-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2">
                {skills.map((skill) => (
                  <div key={skill.name} className="p-2 rounded-md bg-white">
                    <div className="flex justify-between mb-1.5">
                      <span className="text-sm font-medium text-purple-700">
                        {skill.name}
                      </span>
                      <span className="text-sm font-medium text-purple-700">
                        {skill.level}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-4">
                      <div
                        className={`${skill.color} h-4 rounded-full transition-all duration-1000`}
                        style={{ width: `${skill.level}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* ✅ Edit Modal */}
      {editModal && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex justify-center items-center z-50 px-4">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl p-6 relative animate-slideIn">
            {/* Close Button */}
            <button
              onClick={() => setEditModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 transition text-2xl"
            >
              ✕
            </button>

            {/* Header */}
            <h2 className="text-xl font-bold text-purple-600 mb-5 text-center">
              Edit Profile
            </h2>

            {/* Form */}
            <div className="space-y-4">
              {/* Profile Image */}
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-600 mb-1">
                  Profile Image
                </label>
                <input
                  type="file"
                  name="profileImg"
                  accept="image/*"
                  className="w-full border border-gray-200 rounded-xl p-2 text-sm focus:border-purple-400 focus:ring-2 focus:ring-purple-200 outline-none transition"
                />
              </div>

              {/* Cover Image */}
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-600 mb-1">
                  Cover Image
                </label>
                <input
                  type="file"
                  name="coverImg"
                  accept="image/*"
                  className="w-full border border-gray-200 rounded-xl p-2 text-sm focus:border-purple-400 focus:ring-2 focus:ring-purple-200 outline-none transition"
                />
              </div>

              {/* About */}
              <div className="flex flex-col relative group">
                <textarea
                  name="about"
                  value={profile.about}
                  onChange={handleEditChange}
                  rows={3}
                  placeholder="About"
                  className="w-full border border-gray-200 rounded-xl p-3 text-sm focus:border-purple-400 focus:ring-2 focus:ring-purple-200 outline-none transition resize-none"
                />
              </div>

              {/* Gender */}
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-600 mb-1">
                  Gender
                </label>
                <select
                  name="gender"
                  value={profile.gender}
                  onChange={handleEditChange}
                  className="w-full border border-gray-200 rounded-xl p-2 text-sm focus:border-purple-400 focus:ring-2 focus:ring-purple-200 outline-none transition"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>

              {/* Address */}
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-600 mb-1">
                  Address
                </label>
                <input
                  type="text"
                  name="address"
                  value={profile.address}
                  onChange={handleEditChange}
                  className="w-full border border-gray-200 rounded-xl p-2 text-sm focus:border-purple-400 focus:ring-2 focus:ring-purple-200 outline-none transition"
                />
              </div>

              {/* Conditional Email / Phone */}
              {profile.email ? (
                <p className="text-sm text-gray-500">
                  Email: <span className="font-medium">{profile.email}</span>{" "}
                  (not editable)
                </p>
              ) : (
                <input
                  type="email"
                  name="email"
                  placeholder="Enter email"
                  onChange={handleEditChange}
                  className="w-full border border-gray-200 rounded-xl p-2 text-sm focus:border-purple-400 focus:ring-2 focus:ring-purple-200 outline-none transition"
                />
              )}

              {profile.phone ? (
                <p className="text-sm text-gray-500">
                  Phone: <span className="font-medium">{profile.phone}</span>{" "}
                  (not editable)
                </p>
              ) : (
                <div className="flex flex-col">
                  <label className="text-sm font-medium text-gray-600 mb-1">
                    Phone
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={profile.phone}
                    onChange={handleEditChange}
                    className="w-full border border-gray-200 rounded-xl p-2 text-sm focus:border-purple-400 focus:ring-2 focus:ring-purple-200 outline-none transition"
                  />
                </div>
              )}

              {/* social link */}
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-600 mb-1">
                  Facebook Url
                </label>
                <input
                  type="url"
                  name="social_facebook"
                  value={profile.social_facebook}
                  onChange={handleEditChange}
                  className="w-full border border-gray-200 rounded-xl p-2 text-sm focus:border-purple-400 focus:ring-2 focus:ring-purple-200 outline-none transition"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-600 mb-1">
                  Linkedin Url
                </label>
                <input
                  type="url"
                  name="social_linkedin"
                  value={profile.social_linkedin}
                  onChange={handleEditChange}
                  className="w-full border border-gray-200 rounded-xl p-2 text-sm focus:border-purple-400 focus:ring-2 focus:ring-purple-200 outline-none transition"
                />
              </div>
            </div>

            {/* Save Button */}
            <button
              onClick={() => setEditModal(false)}
              className="w-full mt-6 py-2.5 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium rounded-xl hover:from-purple-600 hover:to-pink-600 transition"
            >
              Save Changes
            </button>
          </div>
        </div>
      )}
    </>
  );
}
