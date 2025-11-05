"use client";

import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";
import { MdVerified } from "react-icons/md";
import { FaSquareFacebook, FaLinkedin } from "react-icons/fa6";
import { RiEdit2Fill } from "react-icons/ri";

import Image from "next/image";
import { useState, useEffect, Suspense } from "react";

import axiosInstance from "@/utils/axios";
import { toast } from "sonner";

import BreadCrumb from "@/components/BreadCrumb";
import UserHeadline from "@/components/user/UserHeadline/UserHeadline";
import Loader from "@/components/Loader";

import { useAuthStore } from "@/stores/useAuthStore";

export default function ProfileNew() {
  const breadCrumbData = [
    { name: "Dashboard", to: "/dashboard" },
    { name: "Settings", to: "/settings" },
    { name: "Profile", to: "/profile" },
  ];

  const [editModal, setEditModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const updateUser = useAuthStore((state) => state.updateUser);

  const [profile, setProfile] = useState<{
    id: number | null;
    first_name: string;
    last_name: string;
    email: string;
    phone_number: string;
    photo: File | string; // <-- important
    cover_photo: File | string; // <-- important
    about: string;
    facebook: string;
    linkedin: string;
    gender: string;
    address: string;
    vocabulary: number | null;
    grammar: number | null;
    listening: number | null;
    reading: number | null;
  }>({
    id: null,
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    photo: "",
    cover_photo: "",
    about: "",
    facebook: "",
    linkedin: "",
    gender: "",
    address: "",
    vocabulary: null,
    grammar: null,
    listening: null,
    reading: null,
  });

  const handleEditChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  // ─── Effects ───────────────────────────────────────────────────────
  useEffect(() => {
    getUserData();
  }, []);

  // API Calls

  const getUserData = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get("/candidate/profile");
      const {
        id,
        first_name,
        last_name,
        email,
        phone_number,
        photo,
        cover_photo,
        about,
        facebook,
        linkedin,
        gender,
        address,
        skills,
      } = response?.data?.data;

      setProfile((prev) => ({
        ...prev,
        id,
        first_name,
        last_name,
        email,
        phone_number,
        photo,
        cover_photo,
        about,
        facebook,
        linkedin,
        gender,
        address,
        vocabulary: skills?.vocabulary,
        grammar: skills?.grammar,
        listening: skills?.listening,
        reading: skills?.reading,
      }));
      updateUser({
        id: id,
        first_name: first_name,
        last_name: last_name,
        email: email,
        phone_number: phone_number,
        photo: photo,
      });
    } catch (error: any) {
      console.log(error);
      toast.error("Failed to get user data");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const payload = new FormData();
    payload.append("first_name", profile.first_name || "");
    payload.append("last_name", profile.last_name || "");
    if (!profile.email) {
      payload.append("email", profile.email);
    }
    if (!profile.phone_number) {
      payload.append("phone_number", profile.phone_number);
    }
    payload.append("about", profile.about || "");
    payload.append("gender", profile.gender || "");
    payload.append("address", profile.address || "");
    payload.append("social_facebook", profile.facebook || "");
    payload.append("social_linkedin", profile.linkedin || "");

    if (profile.photo instanceof File) {
      payload.append("photo", profile.photo);
    }
    // if (profile.cover_photo instanceof File) {
    //   payload.append("cover_photo", profile.cover_photo);
    // }
    payload.append("_method", "put");
    try {
      const response = await axiosInstance.post("/candidate/update", payload, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("Information updated");
    } catch (error: any) {
      console.error(error);
      toast.error("Can not update user information");
    } finally {
      setEditModal(false);
      getUserData();
      setLoading(false);
    }
  };

  return (
    <>
      {/* <Suspense fallback={<Loader />}> */}
        {loading && <Loader />}
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
                  {profile?.photo ? (
                    <Image
                      src={
                        typeof profile.photo === "string"
                          ? profile.photo
                          : URL.createObjectURL(profile.photo)
                      }
                      height={500}
                      width={500}
                      alt="profile image"
                      className="size-30 rounded-full object-cover aspect-auto ring-6 ring-white shadow-md"
                    />
                  ) : (
                    <Image
                      src="/assets/japan/j.jpg"
                      height={500}
                      width={500}
                      alt="profile image"
                      className="size-30 rounded-full object-cover aspect-auto ring-6 ring-white shadow-md"
                    />
                  )}

                  <div className="flex justify-center items-end gap-4 text-2xl text-purple-600">
                    <span className="p-0.5 rounded-md border">
                      <a
                        href={profile?.facebook || "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                        title="Facebook"
                      >
                        <FaSquareFacebook className="hover:text-purple-800 transition size-6" />
                      </a>
                    </span>
                    <span className="p-0.5 rounded-md border">
                      <a
                        href={profile?.linkedin || "#"}
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
                  {profile?.first_name} {""} {profile?.last_name}{" "}
                  <MdVerified className="text-purple-600" />
                </h1>
                <p className="text-gray-600">{profile?.email}</p>
                <p className="text-gray-600">{profile?.about}</p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-6 py-4 sm:px-4 border-t border-b border-gray-200 overflow-clip">
                  <div className="flex items-center gap-4 bg-white rounded-xl">
                    <div className="flex items-center justify-center size-10 bg-pink-50 rounded-full">
                      <FaUser className="text-purple-500 text-lg" />
                    </div>
                    <div className="w-[calc(100%-56px)]">
                      <p className="text-xs text-gray-500 uppercase tracking-wide font-semibold">
                        Gender
                      </p>
                      <p className="text-gray-800 font-medium line-clamp-1 capitalize">
                        {profile?.gender}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 bg-white rounded-xl">
                    <div className="flex items-center justify-center size-10 bg-pink-50 rounded-full">
                      <FaEnvelope className="text-purple-500 text-lg" />
                    </div>
                    <div className="w-[calc(100%-56px)]">
                      <p className="text-xs text-gray-500 uppercase tracking-wide font-semibold">
                        Email
                      </p>
                      <p className="text-gray-800 font-medium line-clamp-1">
                        {profile?.email}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 bg-white rounded-xl">
                    <div className="flex items-center justify-center size-10 bg-pink-50 rounded-full">
                      <FaPhone className="text-purple-500 text-lg rotate-90" />
                    </div>
                    <div className="w-[calc(100%-56px)]">
                      <p className="text-xs text-gray-500 uppercase tracking-wide font-semibold">
                        Phone
                      </p>
                      <p className="text-gray-800 font-medium line-clamp-1">
                        {profile?.phone_number}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 bg-white rounded-xl">
                    <div className="flex items-center justify-center size-10 bg-pink-50 rounded-full">
                      <FaMapMarkerAlt className="text-purple-500 text-lg" />
                    </div>
                    <div className="w-[calc(100%-56px)]">
                      <p className="text-xs text-gray-500 uppercase tracking-wide font-semibold">
                        Address
                      </p>
                      <p className="text-gray-800 font-medium line-clamp-1">
                        {profile?.address}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Skills Section */}
                <h2 className="mt-6 mb-3 text-lg font-semibold text-purple-600">
                  Skills & Progress
                </h2>
                <div className="gap-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2">
                  <div className="p-2 rounded-md bg-white">
                    <div className="flex justify-between mb-1.5">
                      <span className="text-sm font-medium text-purple-700">
                        Vocabulary
                      </span>
                      <span className="text-sm font-medium text-purple-700">
                        {profile?.vocabulary || 0}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-4">
                      <div
                        className={`bg-orange-500 h-4 rounded-full transition-all duration-1000`}
                        style={{ width: `${profile?.vocabulary || 0}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="p-2 rounded-md bg-white">
                    <div className="flex justify-between mb-1.5">
                      <span className="text-sm font-medium text-purple-700">
                        Grammer
                      </span>
                      <span className="text-sm font-medium text-purple-700">
                        {profile?.grammar || 0}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-4">
                      <div
                        className={`bg-sky-400 h-4 rounded-full transition-all duration-1000`}
                        style={{ width: `${profile?.grammar || 0}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="p-2 rounded-md bg-white">
                    <div className="flex justify-between mb-1.5">
                      <span className="text-sm font-medium text-purple-700">
                        Reading
                      </span>
                      <span className="text-sm font-medium text-purple-700">
                        {profile?.reading || 0}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-4">
                      <div
                        className={`bg-yellow-500 h-4 rounded-full transition-all duration-1000`}
                        style={{ width: `${profile?.reading || 0}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="p-2 rounded-md bg-white">
                    <div className="flex justify-between mb-1.5">
                      <span className="text-sm font-medium text-purple-700">
                        Listening
                      </span>
                      <span className="text-sm font-medium text-purple-700">
                        {profile?.listening || 0}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-4">
                      <div
                        className={`bg-indigo-400 h-4 rounded-full transition-all duration-1000`}
                        style={{ width: `${profile?.listening || 0}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Edit Modal */}
        {editModal && (
          <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex justify-center items-center z-50 px-4">
            <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl p-6 relative fade-slide-in-top">
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
              <div className="space-y-4 h-[70vh] overflow-y-auto scrollbar-thin">
                {/* Profile Image */}
                <div className="flex flex-col">
                  <label className="text-sm font-medium text-gray-600 mb-1">
                    Profile Image
                  </label>
                  <input
                    type="file"
                    name="photo"
                    accept="image/*"
                    className="w-full border border-gray-200 rounded-xl p-2 text-sm focus:border-purple-400 focus:ring-2 focus:ring-purple-200 outline-none transition"
                  />
                </div>

                {/* Cover Image */}
                {/* <div className="flex flex-col">
                  <label className="text-sm font-medium text-gray-600 mb-1">
                    Cover Image
                  </label>
                  <input
                    type="file"
                    name="cover_photo"
                    accept="image/*"
                    className="w-full border border-gray-200 rounded-xl p-2 text-sm focus:border-purple-400 focus:ring-2 focus:ring-purple-200 outline-none transition"
                  />
                </div> */}

                {/* first name */}
                <div className="flex flex-col">
                  <label className="text-sm font-medium text-gray-600 mb-1">
                    First Name
                  </label>
                  <input
                    type="text"
                    name="first_name"
                    value={profile?.first_name}
                    onChange={handleEditChange}
                    className="w-full border border-gray-200 rounded-xl p-2 text-sm focus:border-purple-400 focus:ring-2 focus:ring-purple-200 outline-none transition"
                  />
                </div>

                {/* last name */}
                <div className="flex flex-col">
                  <label className="text-sm font-medium text-gray-600 mb-1">
                    Last name
                  </label>
                  <input
                    type="text"
                    name="last_name"
                    value={profile?.last_name}
                    onChange={handleEditChange}
                    className="w-full border border-gray-200 rounded-xl p-2 text-sm focus:border-purple-400 focus:ring-2 focus:ring-purple-200 outline-none transition"
                  />
                </div>

                {/* About */}
                <div className="flex flex-col relative group">
                  <label className="text-sm font-medium text-gray-600 mb-1">
                    About
                  </label>
                  <textarea
                    name="about"
                    value={profile?.about}
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
                    value={profile?.gender}
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
                    placeholder="Enter address"
                    value={profile?.address ?? ""}
                    onChange={handleEditChange}
                    className="w-full border border-gray-200 rounded-xl p-2 text-sm focus:border-purple-400 focus:ring-2 focus:ring-purple-200 outline-none transition"
                  />
                </div>

                {/* Conditional Email / Phone */}
                {profile.email ? (
                  <p className="text-sm text-gray-500">
                    Email: <span className="font-medium">{profile?.email}</span>{" "}
                    (not editable)
                  </p>
                ) : (
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter email"
                    value={profile?.email ?? ""}
                    onChange={handleEditChange}
                    className="w-full border border-gray-200 rounded-xl p-2 text-sm focus:border-purple-400 focus:ring-2 focus:ring-purple-200 outline-none transition"
                  />
                )}

                {profile.phone_number ? (
                  <p className="text-sm text-gray-500">
                    Phone:{" "}
                    <span className="font-medium">{profile?.phone_number}</span>{" "}
                    (not editable)
                  </p>
                ) : (
                  <div className="flex flex-col">
                    <label className="text-sm font-medium text-gray-600 mb-1">
                      Phone
                    </label>
                    <input
                      type="tel"
                      name="phone_number"
                      placeholder="Enter phone number"
                      value={profile?.phone_number ?? ""}
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
                    placeholder="Enter facebook url"
                    value={profile?.facebook}
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
                    placeholder="Enter linkedin url"
                    value={profile?.linkedin}
                    onChange={handleEditChange}
                    className="w-full border border-gray-200 rounded-xl p-2 text-sm focus:border-purple-400 focus:ring-2 focus:ring-purple-200 outline-none transition"
                  />
                </div>
              </div>

              {/* Save Button */}
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="w-full mt-6 py-2.5 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium rounded-xl hover:from-purple-600 hover:to-pink-600 transition cursor-pointer"
              >
                Save Changes
              </button>
            </div>
          </div>
        )}
      {/* </Suspense> */}
    </>
  );
}
