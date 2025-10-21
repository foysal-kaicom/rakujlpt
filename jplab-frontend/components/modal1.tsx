import React from "react";

interface Modal1Props {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  form: {
    name: string;
    email: string;
    phone: string;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent) => void;
}

export default function Modal1({
  setShowModal,
  form,
  handleChange,
  handleSubmit,
}: Modal1Props) {
  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#000000cc] bg-opacity-60 px-[5%]">
        <div className="bg-white w-full max-w-md mx-auto rounded-2xl shadow-xl p-8 relative">
          <button
            onClick={() => setShowModal(false)}
            className="absolute top-5 right-5 text-gray-400 hover:text-red-600"
          >
            ✕
          </button>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Request for question
          </h2>
          <form onSubmit={handleSubmit} className="space-y-3">
            <input
              type="text"
              required
              name="name"
              placeholder="Enter your name"
              value={form.name}
              onChange={handleChange}
              className="border-b w-full border-gray-300 py-2 px-5 text-sm focus:outline-none"
            />
            <input
              type="email"
              required
              name="email"
              placeholder="Enter your email"
              value={form.email}
              onChange={handleChange}
              className="border-b w-full border-gray-300 py-2 px-5 text-sm focus:outline-none"
            />
            <input
              type="text"
              required
              name="phone"
              placeholder="Enter your phone number"
              value={form.phone}
              onChange={handleChange}
              className="border-b w-full border-gray-300 py-2 px-5 text-sm focus:outline-none"
            />

            <button
              type="submit"
              disabled={!(form.email && form.name && form.phone)}
              className={`w-full px-5 py-1.5 duration-500 text-white rounded-md mt-5 ${
                form.email && form.name && form.phone
                  ? "bg-blue-700 hover:bg-blue-900 cursor-pointer"
                  : "bg-gray-400 hover:bg-gray-500 cursor-not-allowed"
              }`}
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
