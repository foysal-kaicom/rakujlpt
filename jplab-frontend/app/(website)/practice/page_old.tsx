"use client"
import { useState } from "react";
import { CheckCircle, FileText, Headphones, MessageSquare, BookOpen, Mic, PenTool, Eye, Volume2, Edit3 } from "lucide-react";
import Link from "next/link";

export default function Practice() {
  const breadCrumbData = [
    { name: "Home", to: "/" },
    { name: "Practice", to: "/practice" },
  ];
  
  const [activeTab, setActiveTab] = useState("ALL");
  const [loader, setLoader] = useState(false);

const practiceSkills = [
    {
        id: 1,
        title: "Read and Select",
        slug: "read-and-select",
        progress: 1,
        total: 6,
        icon: <CheckCircle className="w-6 h-6" />,
        color: "bg-cyan-100",
        iconColor: "text-cyan-500",
        category: "READING"
    },
    {
        id: 2,
        title: "Fill in the Blanks",
        slug: "fill-in-the-blanks",
        progress: 0,
        total: 6,
        icon: <FileText className="w-6 h-6" />,
        color: "bg-blue-100",
        iconColor: "text-blue-500",
        category: "WRITING"
    },
    {
        id: 3,
        title: "Read and Complete",
        slug: "read-and-complete",
        progress: 0,
        total: 6,
        icon: <BookOpen className="w-6 h-6" />,
        color: "bg-teal-100",
        iconColor: "text-teal-500",
        category: "READING"
    },
    {
        id: 4,
        title: "Listen and Type",
        slug: "listen-and-type",
        progress: 0,
        total: 6,
        icon: <Headphones className="w-6 h-6" />,
        color: "bg-blue-100",
        iconColor: "text-blue-500",
        category: "LISTENING"
    },
    {
        id: 5,
        title: "Write About the Photo",
        slug: "write-about-the-photo",
        progress: 0,
        total: 6,
        icon: <PenTool className="w-6 h-6" />,
        color: "bg-cyan-100",
        iconColor: "text-cyan-500",
        category: "WRITING"
    },
    {
        id: 6,
        title: "Speak About the Photo",
        slug: "speak-about-the-photo",
        progress: 0,
        total: 6,
        icon: <MessageSquare className="w-6 h-6" />,
        color: "bg-blue-100",
        iconColor: "text-blue-500",
        category: "SPEAKING"
    },
    {
        id: 7,
        title: "Read, Then Speak",
        slug: "read-then-speak",
        progress: 0,
        total: 6,
        icon: <BookOpen className="w-6 h-6" />,
        color: "bg-teal-100",
        iconColor: "text-teal-500",
        category: "SPEAKING"
    },
    {
        id: 8,
        title: "Interactive Reading",
        slug: "interactive-reading",
        progress: 0,
        total: 6,
        icon: <Eye className="w-6 h-6" />,
        color: "bg-blue-100",
        iconColor: "text-blue-500",
        category: "READING"
    },
    {
        id: 9,
        title: "Interactive Listening",
        slug: "interactive-listening",
        progress: 0,
        total: 6,
        icon: <Volume2 className="w-6 h-6" />,
        color: "bg-cyan-100",
        iconColor: "text-cyan-500",
        category: "LISTENING"
    },
    {
        id: 10,
        title: "Writing Sample",
        slug: "writing-sample",
        progress: 0,
        total: 6,
        icon: <Edit3 className="w-6 h-6" />,
        color: "bg-blue-100",
        iconColor: "text-blue-500",
        category: "WRITING"
    },
    {
        id: 11,
        title: "Speaking Sample",
        slug: "speaking-sample",
        progress: 0,
        total: 3,
        icon: <Mic className="w-6 h-6" />,
        color: "bg-cyan-100",
        iconColor: "text-cyan-500",
        category: "SPEAKING"
    },
    {
        id: 12,
        title: "Interactive Writing",
        slug: "interactive-writing",
        progress: 0,
        total: 6,
        icon: <Edit3 className="w-6 h-6" />,
        color: "bg-blue-100",
        iconColor: "text-blue-500",
        category: "WRITING"
    },
    {
        id: 13,
        title: "Interactive Speaking",
        slug: "interactive-speaking",
        progress: 0,
        total: 3,
        icon: <MessageSquare className="w-6 h-6" />,
        color: "bg-teal-100",
        iconColor: "text-teal-500",
        category: "SPEAKING"
    }
];

  const tabs = ["ALL", "SPEAKING", "WRITING", "READING", "LISTENING"];

  const filteredSkills = activeTab === "ALL" 
    ? practiceSkills 
    : practiceSkills.filter(skill => skill.category === activeTab);

  return (
    <>
      {loader && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
        </div>
      )}
      
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 pb-20 pt-8 relative overflow-hidden">
        {/* Background Decorations */}
        <div className="absolute top-20 -left-20 w-64 h-64 bg-gradient-to-br from-cyan-200 to-blue-200 rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute bottom-20 -right-20 w-96 h-96 bg-gradient-to-br from-purple-200 to-pink-200 rounded-full opacity-20 blur-3xl"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-gray-600 mb-8">
            {breadCrumbData.map((item, index) => (
              <div key={index} className="flex items-center gap-2">
                <a href={item.to} className="hover:text-blue-600 transition-colors">
                  {item.name}
                </a>
                {index < breadCrumbData.length - 1 && <span>/</span>}
              </div>
            ))}
          </div>

          {/* Header Section */}
          <div className="mb-12">
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-3xl p-8 md:p-12 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full -mr-32 -mt-32"></div>
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-white opacity-10 rounded-full -ml-24 -mb-24"></div>
              
              <div className="relative z-10 md:w-2/3 lg:w-1/2">
                <p className="text-blue-100 text-sm font-semibold tracking-wide uppercase mb-2">Practice Skills</p>
                <h1 className="text-4xl md:text-5xl font-bold mb-4">Take a full length practice test</h1>
                <p className="text-blue-100 mb-6">Improve your language skills with our comprehensive practice exercises</p>
                <button className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-blue-50 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                  PRACTICE FREE
                </button>
              </div>

              {/* Illustration */}
              <div className="absolute right-8 top-1/2 -translate-y-1/2 hidden lg:block">
                <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-2xl p-6 transform rotate-3 hover:rotate-0 transition-transform">
                  <div className="bg-yellow-400 rounded-xl p-4 w-32 h-32 flex items-center justify-center">
                    <BookOpen className="w-16 h-16 text-white" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Practice Skills Section */}
          <div className="bg-white rounded-3xl shadow-xl p-6 md:p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Practice skills</h2>

            {/* Tabs */}
            <div className="flex gap-2 border-b border-gray-200 mb-8 overflow-x-auto">
              {tabs.map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-3 font-semibold whitespace-nowrap transition-all ${
                    activeTab === tab
                      ? "text-blue-600 border-b-4 border-blue-600"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Skills Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredSkills.map(skill => (
                <Link
                  key={skill.id}
                  href={`/practice/${skill.slug}`}
                  className="group border-2 border-gray-200 rounded-2xl p-6 hover:border-blue-400 hover:shadow-lg transition-all cursor-pointer bg-gradient-to-br from-white to-gray-50"
                >
                  <div className="flex items-center gap-4">
                    {/* Icon */}
                    <div className={`${skill.color} ${skill.iconColor} p-4 rounded-xl group-hover:scale-110 transition-transform`}>
                      {skill.icon}
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">
                        {skill.title}
                      </h3>
                      
                      {/* Progress Bar */}
                      <div className="flex items-center gap-3">
                        <div className="flex-1 bg-gray-200 rounded-full h-2 overflow-hidden">
                          <div
                            className="bg-gradient-to-r from-blue-500 to-cyan-500 h-full rounded-full transition-all duration-500"
                            style={{ width: `${(skill.progress / skill.total) * 100}%` }}
                          ></div>
                        </div>
                        <span className="text-sm text-gray-500 font-medium whitespace-nowrap">
                          {skill.progress}/{skill.total}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}