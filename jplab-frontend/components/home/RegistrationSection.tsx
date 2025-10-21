"use client";

import { FaRegCalendar } from "react-icons/fa";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import WebpageWrapper from "../wrapper/WebpageWrapper";

import axiosInstance from "@/utils/axios";
import { toast } from "sonner";
import { minAgeLimit } from "@/utils/minimumAgeLimit";

import { useBusinessSettingsStore } from "@/stores/useBusinessStore";

interface RegistrationForm {
  first_name: string;
  last_name: string;
  email: string;
  date_of_birth: string;
  phone_number: string;
  national_id: string;
  gender: string;
  photo: File | null;
  address: string;
  accept_marketing: boolean;
}

export default function HomeRegistration() {
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();
  const settings = useBusinessSettingsStore((state) => state.settings);

  const [form, setForm] = useState<RegistrationForm>({
    first_name: "",
    last_name: "",
    email: "",
    date_of_birth: "",
    phone_number: "",
    national_id: "",
    gender: "",
    photo: null,
    address: "",
    accept_marketing: false,
  });

  const isFormValid =
    form.accept_marketing &&
    form.address.trim() !== "" &&
    form.date_of_birth.trim() !== "" &&
    form.email.trim() !== "" &&
    form.first_name.trim() !== "" &&
    form.gender.trim() !== "" &&
    form.last_name.trim() !== "" &&
    form.national_id.trim() !== "" &&
    form.phone_number.trim() !== "" &&
    form.photo !== null;

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const payload = new FormData();

      Object.entries(form).forEach(([key, value]) => {
        if (key === "photo" && value instanceof File) {
          payload.append(key, value);
        } else if (key === "accept_marketing") {
          payload.append(key, value ? "1" : "0");
        } else if (value !== null && value !== undefined) {
          payload.append(key, value.toString());
        }
      });

      const response = await axiosInstance.post(
        "/candidate/register",
        payload,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 201) {
        toast.success(response.data?.message || "Registration successful!");
        router.push("/sign_in?registered=true");
      }
    } catch (error: any) {
      if (Array.isArray(error.response?.data?.errors)) {
        const errors = error.response.data.errors;

        Object.entries(errors).forEach(([field, messages]) => {
          if (Array.isArray(messages)) {
            messages.forEach((msg: string) => {
              toast.error(`${msg}`);
            });
          }
        });
      } else if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="relative">
      <Image
        src="/assets/img/overlay-10.png"
        width={612}
        height={408}
        alt=""
        className="absolute -top-20 -left-10 size-36"
      />

      <Image
        src="/assets/img/overlay-6.png"
        width={612}
        height={408}
        alt=""
        className="absolute top-0 right-0 size-20"
      />

      <WebpageWrapper>
        <div className="flex flex-col lg:flex-row gap-5 mt-10 relative z-10 shadow-xl bg-white rounded-md border border-gray-100">
          <form onSubmit={handleRegister} className="lg:w-1/2 ">
            <div className="space-y-6 p-5 sm:p-8 md:p-10 rounded-md">
              <h1 className="text-2xl md:text-3xl font-semibold text-gray-800">
                Profile Information
                <span className="block text-sm font-normal text-red-600">
                  (Please fill out all of information)
                </span>
              </h1>

              <p className="text-gray-700 text-sm leading-relaxed">
                If you have any questions or concerns about registration for the
                exam or the exam, please contact
                <span className="text-[#173fa4] font-medium">
                  {" "}
                  {settings?.business_email}
                </span>
                , Tel:
                <span className="text-[#173fa4] font-medium">
                  {" "}
                  {settings?.business_phone}
                </span>
              </p>

              <div className="grid sm:grid-cols-2 gap-5">

                <input
                  type="text"
                  name="first_name"
                  required
                  placeholder="First name (required)"
                  value={form.first_name}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setForm({ ...form, first_name: e.target.value })
                  }
                  className="w-full bg-white border-b border-gray-300 text-gray-500 px-4 py-2 text-sm focus:outline-1 outline-blue-300"
                />

                <input
                  type="text"
                  name="last_name"
                  required
                  placeholder="Last name (required)"
                  value={form.last_name}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setForm({ ...form, last_name: e.target.value })
                  }
                  className="w-full bg-white border-b border-gray-300 text-gray-500 px-4 py-2 text-sm focus:outline-1 outline-blue-300"
                />

                <div className="relative">
                  <input
                    type="date"
                    name="date_of_birth"
                    max={minAgeLimit(12)}
                    required
                    value={form.date_of_birth}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setForm({ ...form, date_of_birth: e.target.value })
                    }
                    className="absolute inset-0 z-10 size-full opacity-0 px-4 py-2  peer"
                  />

                  <p className={`px-4 py-2 w-full bg-white flex items-center justify-between gap-3 text-sm border-b border-gray-300 peer-focus-within:outline-1 peer-focus-within:outline-blue-300 ${form.date_of_birth ? '' : 'text-gray-400'}`}>
                    {form.date_of_birth
                      ? form.date_of_birth
                      : "Date of Birth (required)"}
                    <FaRegCalendar />
                  </p>
                </div>

                <select
                  name="gender"
                  value={form.gender}
                  required
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                    setForm({ ...form, gender: e.target.value })
                  }
                  className={`w-full bg-white border-b border-gray-300  px-4 py-2 text-sm focus:outline-1 outline-blue-300 ${form.gender ? '' : 'text-gray-500'}`}
                >
                  <option value="" disabled>
                    Select Gender (required)
                  </option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>

                <input
                  type="email"
                  name="email"
                  required
                  placeholder="Email (required)"
                  value={form.email}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setForm({ ...form, email: e.target.value })
                  }
                  className="w-full bg-white border-b border-gray-300 text-gray-500 px-4 py-2 text-sm focus:outline-1 outline-blue-300"
                />

                <div className="flex gap-2 bg-white text-sm border-b border-gray-300 text-gray-500 px-4 py-2 group focus-within:outline focus-within:outline-blue-300">
                  <span className="bg-white">(+88)</span>
                  <input
                    type="tel"
                    name="phone_number"
                    required
                    minLength={11}
                    maxLength={11}
                    pattern="[0-9]{11}"
                    placeholder="Phone Number (required)"
                    value={form.phone_number}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      const value = e.target.value.replace(/\D/g, "");
                      setForm({ ...form, phone_number: value });
                    }}
                    className="w-full outline-none"
                  />
                </div>

                <input
                  type="text"
                  name="national_id"
                  required
                  placeholder="NID or Passport Number (required)"
                  value={form.national_id}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setForm({ ...form, national_id: e.target.value })
                  }
                  className="w-full bg-white border-b border-gray-300 text-gray-500 px-4 py-2 text-sm focus:outline-1 outline-blue-300"
                />
                <div className="relative">
                  <p className="text-gray-400 p-2 text-center size-full bg-white outline outline-blue-300 rounded-4xl line-clamp-1 leading-7.5 text-sm">
                    {form.photo
                      ? form.photo.name
                      : "Choose profile picture (max 2 MB required)"}
                  </p>
                  <input
                    type="file"
                    name="photo"
                    accept=".jpg,.jpeg,.png"
                    required
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      const file = e.target.files?.[0] || null;

                      if (file) {
                        const validTypes = [
                          "image/jpeg",
                          "image/png",
                          "image/jpg",
                        ];
                        const maxSize = 2 * 1024 * 1024;

                        if (!validTypes.includes(file.type)) {
                          toast.error(
                            "Invalid file type. Please select a JPG, JPEG or PNG image."
                          );
                          e.target.value = "";
                          setForm({ ...form, photo: null });
                          return;
                        }

                        if (file.size > maxSize) {
                          toast.error(
                            "File size exceeds 2 MB. Please choose a smaller image."
                          );
                          e.target.value = "";
                          setForm({ ...form, photo: null });
                          return;
                        }
                      }

                      setForm({ ...form, photo: file });
                    }}
                    className="absolute z-10 size-full top-0 opacity-0"
                  />
                </div>
              </div>
              <input
                type="text"
                name="address"
                required
                placeholder="Full address (required)"
                value={form.address}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setForm({ ...form, address: e.target.value })
                }
                className="w-full bg-white border-b border-gray-300 text-gray-500 px-4 py-2 text-sm focus:outline-1 outline-blue-300"
              />
              {form.photo && (
                <div className="bg-gray-100 p-3 rounded-lg">
                  <Image
                    src={URL.createObjectURL(form.photo)}
                    height={200}
                    width={200}
                    alt=""
                    className="mx-auto"
                  />
                  <p className="text-black text-sm mt-2 text-center">
                    This profile picture will be use in the exam (Max size 2 MB)
                  </p>
                </div>
              )}

              <div className="bg-gray-50 p-4 rounded-md shadow-sm border border-gray-200">
                <label className="flex items-start gap-3 text-xs xl:text-sm text-gray-700">
                  <input
                    type="checkbox"
                    required
                    checked={form.accept_marketing}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setForm({ ...form, accept_marketing: e.target.checked })
                    }
                    className="mt-1 h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span>
                    Kaicom Group will send the job, study, and cultural
                    information about Japan and Bangladesh from time to time. I
                    willingly accept to receive such information.
                  </span>
                </label>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className={`w-full font-semibold text-sm sm:text-base lg:text-lg px-10 py-2 bg-blue-400 hover:bg-[#173fa4] duration-500 rounded-md text-white ${
                  isFormValid ? "cursor-pointer" : "cursor-not-allowed"
                }`}
              >
                {submitting ? "Registering..." : "Register"}
              </button>
            </div>
          </form>

          <div className="w-1/2 hidden lg:flex justify-center items-center relative rounded-r-md border-l border-gray-200">
            <Image
              src="/assets/img/registration/regi-1.jpg"
              width={5472}
              height={3648}
              alt="Registration side image"
              className="2xl:w-2/3 object-cover rounded-md"
            />
          </div>
        </div>
      </WebpageWrapper>
    </div>
  );
}
