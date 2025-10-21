"use client";

// React and Next.js
import { useState, useEffect, Suspense } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

// Utilities
import axiosInstance from "@/utils/axios";
import { toast } from "sonner";
import { minAgeLimit } from "@/utils/minimumAgeLimit";

// Components
import BreadCrumb from "@/components/BreadCrumb";
import Loader from "@/components/Loader";

// Stores
import { useAuthStore } from "@/stores/useAuthStore";

// Icons
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaGlobe,
  FaIdCard,
  FaMapMarkerAlt,
  FaBirthdayCake,
} from "react-icons/fa";
import { MdVerified } from "react-icons/md";
import { FaSquareFacebook, FaLinkedin } from "react-icons/fa6";
import { IoPersonCircleOutline } from "react-icons/io5";
import SuspenseLoader from "@/components/SuspenseLoader";

export default function UserProfile() {
  // ─── Constants ─────────────────────────────────────────────────────
  const breadCrumbData = [
    { name: "Dashboard", to: "/dashboard" },
    { name: "My Profile", to: "/profile" },
  ];

  // ─── Router and State ──────────────────────────────────────────────
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const updateUser = useAuthStore((state) => state.updateUser);

  const [formData, setFormData] = useState<{
    id: number | null;
    first_name: string;
    last_name: string;
    date_of_birth: string;
    gender: string;
    email: string;
    phone_number: string;
    national_id: string;
    address: string;
    photo: File | string; // <-- important
    social_facebook: string;
    social_linkedin: string;
    createdAt: string;
    is_email_verified: number;
    is_phone_verified: number;
  }>({
    id: null,
    first_name: "",
    last_name: "",
    date_of_birth: "",
    gender: "",
    email: "",
    phone_number: "",
    national_id: "",
    address: "",
    photo: "",
    social_facebook: "",
    social_linkedin: "",
    createdAt: "",
    is_email_verified: 0,
    is_phone_verified: 0,
  });

  // ─── Effects ───────────────────────────────────────────────────────
  useEffect(() => {
    getUserData();
  }, []);

  // ─── Handlers ──────────────────────────────────────────────────────
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setLoading(true);
    const payload = new FormData();
    payload.append("first_name", formData.first_name || "");
    payload.append("last_name", formData.last_name || "");
    payload.append("date_of_birth", formData.date_of_birth || "");
    payload.append("gender", formData.gender || "");
    payload.append("national_id", formData.national_id || "");
    payload.append("address", formData.address || "");
    payload.append("social_facebook", formData.social_facebook || "");
    payload.append("social_linkedin", formData.social_linkedin || "");

    if (formData.photo instanceof File) {
      payload.append("photo", formData.photo);
    }
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
      setEditMode(false);
      setSubmitting(false);
      getUserData();
      setLoading(false);
    }
  };

  // API Calls
  const getUserData = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get("/candidate/profile");
      const {
        id,
        first_name,
        last_name,
        date_of_birth,
        gender,
        email,
        phone_number,
        national_id,
        address,
        photo,
        social_facebook,
        social_linkedin,
        is_email_verified,
        is_phone_verified,
        created_at,
      } = response?.data?.data;

      const formatDate = (input?: string | null) =>
        input ? new Date(input).toISOString().split("T")[0] : "";

      const formatCreatedAt = (input: string) => {
        const date = new Date(input);
        return `${date.toLocaleString("default", {
          month: "long",
        })} ${date.getFullYear()}`;
      };

      setFormData((prev) => ({
        ...prev,
        id,
        first_name,
        last_name,
        date_of_birth: formatDate(date_of_birth),
        gender,
        email,
        phone_number,
        national_id,
        address,
        // photo,
        social_facebook,
        social_linkedin,
        is_email_verified,
        is_phone_verified,
        createdAt: formatCreatedAt(created_at),
      }));
      setPreviewUrl(photo);
      updateUser({
        id: id,
        first_name: first_name,
        email: email,
        is_phone_verified: is_phone_verified,
        is_email_verified: is_email_verified,
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

  return (
    <>
      <Suspense fallback={<SuspenseLoader />}>
        {loading && <Loader />}

        <div className="min-h-[60vh]">
          <BreadCrumb breadCrumbData={breadCrumbData} />
          <div className="flex flex-col lg:flex-row gap-5 sm:gap-10 mt-5 lg:px-10 lg:pb-10">
            {/* Profile Card */}
            <div className="p-5 md:p-10 rounded-md shadow bg-white space-y-5 w-full lg:w-1/3">
              <p className="sm:text-xl font-semibold text-center">
                {`${formData.first_name || ""} ${formData.last_name || ""}`}
              </p>

              {previewUrl ? (
                <Image
                  src={previewUrl}
                  height={200}
                  width={200}
                  alt="profile picture"
                  className="rounded-full mx-auto object-cover size-[200px]"
                />
              ) : (
                <div className="size-[200px] rounded-full bg-blue-300 mx-auto">
                  <IoPersonCircleOutline className="size-[200px] text-white" />
                </div>
              )}
              <p className="text-center text-gray-500 text-sm">
                This image will be use as your exam image
              </p>

              {editMode && (
                <div className="relative rounded-3xl bg-white drop-shadow-md shadow-sm text-center">
                  <input
                    type="file"
                    accept="image/*"
                    required
                    disabled={!editMode}
                    onChange={(e) => {
                      const file = e.target.files?.[0];

                      if (file) {
                        const validTypes = [
                          "image/jpeg",
                          "image/png",
                          "image/jpg",
                        ];
                        const maxSize = 2 * 1024 * 1024; // 2MB

                        // Check file type
                        if (!validTypes.includes(file.type)) {
                          toast.error(
                            "Invalid file type. Please select a JPG, JPEG, or PNG image."
                          );
                          e.target.value = "";
                          return;
                        }

                        // Check file size
                        if (file.size > maxSize) {
                          toast.error(
                            "File size exceeds 2MB. Please choose a smaller image."
                          );
                          e.target.value = "";
                          return;
                        }

                        // If valid → save to state
                        setFormData((prev) => ({ ...prev, photo: file }));
                        setPreviewUrl(URL.createObjectURL(file));
                      }
                    }}
                    className="absolute size-full left-0 top-0 z-10 opacity-0 cursor-pointer"
                  />

                  <p className="text-sm px-5 py-2">Choose Picture</p>
                </div>
              )}

              {!editMode && (
                <div className="flex justify-center gap-4 text-2xl text-blue-600">
                  {formData.social_facebook && (
                    <a
                      href={formData.social_facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="Facebook"
                    >
                      <FaSquareFacebook className="hover:text-blue-800 transition" />
                    </a>
                  )}
                  {formData.social_linkedin && (
                    <a
                      href={formData.social_linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="LinkedIn"
                    >
                      <FaLinkedin className="hover:text-blue-800 transition" />
                    </a>
                  )}
                </div>
              )}

              <p className="p-3 bg-gray-50 rounded text-gray-500 text-sm text-center">
                Member since {formData.createdAt}
              </p>
            </div>

            {/* Editable Form */}
            <div className="p-5 md:p-10 bg-white rounded-md w-full lg:w-2/3">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-3 gap-4">
                  <InputField
                    label="First Name"
                    name="first_name"
                    value={formData.first_name}
                    icon={<FaUser />}
                    editMode={editMode}
                    required
                    onChange={handleChange}
                  />
                  <InputField
                    label="Last Name"
                    name="last_name"
                    value={formData.last_name}
                    icon={<FaUser />}
                    editMode={editMode}
                    required
                    onChange={handleChange}
                  />
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Gender
                    </label>
                    <select
                      name="gender"
                      disabled={!editMode}
                      value={formData.gender || ""}
                      required
                      onChange={handleChange}
                      className={`w-full px-4 py-2 border-b border-gray-300 focus:outline-none focus:ring ${
                        editMode ? "bg-gray-50" : "bg-white"
                      }`}
                    >
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </select>
                  </div>
                </div>

                <div className="grid sm:grid-cols-3 gap-4">
                  <InputField
                    label="Birthday"
                    name="date_of_birth"
                    type="date"
                    max={minAgeLimit(12)}
                    value={formData.date_of_birth}
                    icon={<FaBirthdayCake />}
                    editMode={editMode}
                    required
                    onChange={handleChange}
                  />
                  <div className="relative">
                    <InputField
                      label="Email"
                      name="email"
                      type="email"
                      value={formData.email}
                      icon={<FaEnvelope />}
                      editMode={false}
                      required
                      onChange={handleChange}
                    />
                    <div className="absolute right-3 top-[0px]">
                      {formData.is_email_verified ? (
                        <MdVerified
                          className="text-green-500"
                          title="Email verified"
                        />
                      ) : (
                        <button
                          type="button"
                          className="text-xs text-red-600 font-semibold hover:underline hover:text-blue-600"
                        >
                          Verify now
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="relative">
                    <InputField
                      label="Phone"
                      name="phone_number"
                      value={formData.phone_number}
                      icon={<FaPhone />}
                      editMode={false}
                      required
                      onChange={handleChange}
                    />
                    <div className="absolute right-3 top-[0px]">
                      {formData.is_phone_verified ? (
                        <MdVerified
                          className="text-green-500"
                          title="Phone verified"
                        />
                      ) : (
                        <button
                          type="button"
                          onClick={() =>
                            router.push(
                              `/otp_verify?callbackUrl=${encodeURIComponent(
                                `/profile`
                              )}`
                            )
                          }
                          className="text-xs text-red-600 font-semibold hover:underline hover:text-blue-600"
                        >
                          Verify now
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                <div className="grid sm:grid-cols-1 gap-4">
                  <InputField
                    label="NID / Passport No."
                    name="national_id"
                    value={formData.national_id}
                    icon={<FaIdCard />}
                    editMode={editMode}
                    required
                    onChange={handleChange}
                  />
                </div>

                <InputField
                  label="Address"
                  name="address"
                  value={formData.address}
                  icon={<FaMapMarkerAlt />}
                  editMode={editMode}
                  required
                  onChange={handleChange}
                />

                {editMode && (
                  <div className="grid sm:grid-cols-2 gap-4">
                    <InputField
                      label="Facebook"
                      name="social_facebook"
                      type="url"
                      value={formData.social_facebook}
                      icon={<FaSquareFacebook />}
                      editMode={editMode}
                      onChange={handleChange}
                    />
                    <InputField
                      label="LinkedIn"
                      name="social_linkedin"
                      type="url"
                      value={formData.social_linkedin}
                      icon={<FaLinkedin />}
                      editMode={editMode}
                      onChange={handleChange}
                    />
                  </div>
                )}

                <div className="flex justify-between items-center mt-6">
                  <button
                    type="button"
                    disabled={submitting}
                    onClick={() => setEditMode(!editMode)}
                    className="text-sm bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                  >
                    {editMode ? "Cancel Edit" : "Edit Profile"}
                  </button>

                  {editMode && (
                    <button
                      type="submit"
                      disabled={submitting}
                      className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition text-sm"
                    >
                      {submitting ? "Submitting ..." : "Save Changes"}
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </Suspense>
    </>
  );
}

function InputField({
  label,
  name,
  value,
  max,
  icon,
  type = "text",
  editMode,
  onChange,
  required,
}: {
  label: string;
  name: string;
  value: string;
  max?: string;
  icon: React.ReactNode;
  type?: string;
  editMode: boolean;
  required?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div>
      <label className="text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
        <span className="text-blue-600">{icon}</span>
        {label}
      </label>
      <input
        type={type}
        name={name}
        value={value ?? ""}
        max={max ?? ""}
        disabled={!editMode}
        onChange={onChange}
        required={required}
        className={`w-full px-4 py-2 border-b border-gray-300 focus:outline-none focus:ring ${
          editMode ? "bg-gray-50" : "bg-white"
        }`}
      />
    </div>
  );
}
