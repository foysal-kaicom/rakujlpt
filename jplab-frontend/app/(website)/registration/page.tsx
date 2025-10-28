"use client";

import { useState, FormEvent, ChangeEvent } from "react";
import { MdEmail } from "react-icons/md";
import { FaUser, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import Link from "next/link";

import { signIn } from "next-auth/react";

import { signOut } from "next-auth/react";



export default function SignUpPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    console.log("Form submitted:", formData);
  };

 const handleGoogleSignup = () => {
  signIn("google", { callbackUrl: "/" });
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="w-full max-w-md relative p-[2px] rounded-3xl bg-gradient-to-r from-pink-200 to-indigo-200 shadow-[0_0_40px_rgba(255,255,255,0.3)]">
        <div className="bg-white backdrop-blur-xl rounded-3xl p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-4xl font-extrabold bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
              Create Your Account
            </h2>
            <p className="text-gray-600 mt-2 text-sm">Join the fun! 🚀</p>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit}>
            {/* Name Fields */}
            <div className="grid grid-cols-2 gap-3">
              <div className="relative group">
                <FaUser className="absolute top-3.5 left-3 text-pink-400 group-focus-within:scale-110 transition-transform" />
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  placeholder="First name"
                  className="w-full pl-10 pr-3 py-2.5 rounded-xl border-2 border-transparent bg-gradient-to-r from-pink-50 to-purple-50 focus:border-pink-400 focus:ring-2 focus:ring-pink-300 outline-none text-gray-700 transition-all duration-300"
                />
              </div>
              <div className="relative group">
                <FaUser className="absolute top-3.5 left-3 text-purple-400 group-focus-within:scale-110 transition-transform" />
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  placeholder="Last name"
                  className="w-full pl-10 pr-3 py-2.5 rounded-xl border-2 border-transparent bg-gradient-to-r from-purple-50 to-indigo-50 focus:border-purple-400 focus:ring-2 focus:ring-purple-300 outline-none text-gray-700 transition-all duration-300"
                />
              </div>
            </div>

            {/* Email */}
            <div className="relative group">
              <MdEmail className="absolute top-3.5 left-3 text-indigo-400 group-focus-within:scale-110 transition-transform" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="you@example.com"
                className="w-full pl-10 pr-3 py-2.5 rounded-xl border-2 border-transparent bg-gradient-to-r from-indigo-50 to-pink-50 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-300 outline-none text-gray-700 transition-all duration-300"
              />
            </div>

            {/* Password */}
            <div className="relative group">
              <FaLock className="absolute top-3.5 left-3 text-yellow-400 group-focus-within:scale-110 transition-transform" />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="Enter password"
                className="w-full pl-10 pr-10 py-2.5 rounded-xl border-2 border-transparent bg-gradient-to-r from-yellow-50 to-pink-50 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-300 outline-none text-gray-700 transition-all duration-300"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute top-3 right-3 text-gray-500 hover:text-pink-600 transition-colors"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            {/* Confirm Password */}
            <div className="relative group">
              <FaLock className="absolute top-3.5 left-3 text-green-400 group-focus-within:scale-110 transition-transform" />
              <input
                type={showConfirm ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                placeholder="Confirm password"
                className="w-full pl-10 pr-10 py-2.5 rounded-xl border-2 border-transparent bg-gradient-to-r from-green-50 to-indigo-50 focus:border-green-400 focus:ring-2 focus:ring-green-300 outline-none text-gray-700 transition-all duration-300"
              />
              <button
                type="button"
                onClick={() => setShowConfirm((prev) => !prev)}
                className="absolute top-3 right-3 text-gray-500 hover:text-green-600 transition-colors"
              >
                {showConfirm ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-pink-500  to-indigo-500 hover:from-pink-600 hover:to-indigo-600 text-white font-extrabold rounded-full py-3 shadow-lg hover:shadow-[0_0_25px_rgba(255,105,180,0.4)] transition-all duration-300 active:scale-95"
            >
              Sign Up ✨
            </button>

            {/* Divider */}
            <div className="relative flex items-center justify-center my-5">
              <div className="w-full h-px bg-gradient-to-r from-pink-300 via-yellow-300 to-indigo-300"></div>
              <span className="absolute bg-white px-3 text-gray-600 text-sm">
                or
              </span>
            </div>

            {/* Google Sign Up */}
            <button
              type="button"
              onClick={handleGoogleSignup}
              className="w-full flex items-center justify-center gap-3 bg-white border border-pink-300 hover:bg-pink-50 text-gray-700 font-semibold rounded-full py-2.5 transition-all duration-300 shadow-[0_0_10px_rgba(255,105,180,0.3)] hover:shadow-[0_0_20px_rgba(255,105,180,0.4)]"
            >
              <img
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                alt="Google"
                className="w-5 h-5"
              />
              <span>Sign up with Google</span>
            </button>
          </form>

          {/* Footer */}
          <p className="text-center text-sm text-gray-600 mt-6">
            Already have an account?{" "}
            <Link
              href="/sign_in"
              className="text-pink-600 hover:underline font-semibold"
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>

      <button
  onClick={() => signOut({ callbackUrl: "/signup" })} // redirect to signup page
  className="bg-red-500 text-white px-4 py-2 rounded"
>
  Sign Out
</button>
    </div>
  );
}
