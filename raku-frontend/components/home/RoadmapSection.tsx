"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function RoadmapSection() {
  const [activeIndex, setActiveIndex] = useState(1);

  const steps = [
    {
      title: "Step 1 — Practice",
      icon: "🚀",
      desc: "Explore structured mock tests with AI-driven hints.",
    },
    {
      title: "Step 2 — Track Progress",
      icon: "📊",
      desc: "Analytics to measure growth and weak areas.",
    },
    {
      title: "Step 3 — Improve Fast",
      icon: "⚡",
      desc: "Fix mistakes with guided solutions.",
    },
    {
      title: "Step 4 — Achieve Excellence",
      icon: "🏆",
      desc: "Reach your target score confidently.",
    },
    {
      title: "Step 5 — Master the Exam",
      icon: "🎓",
      desc: "Be fully prepared for real exam day.",
    },
  ];

  const getPosition = (index: number) => {
    const total = steps.length;
    let position = (index - activeIndex + total) % total;

    switch (position) {
      case 0:
        return { translate: "-50%", scale: 1.08, z: 30, opacity: 1 };
      case 1:
        return { translate: "0%", scale: 0.9, z: 20, opacity: 0.9 };
      case 2:
        return { translate: "50%", scale: 0.8, z: 10, opacity: 0.7 };
      case 3:
        return { translate: "-150%", scale: 0.8, z: 10, opacity: 0.7 };
      case 4:
        return { translate: "-100%", scale: 0.9, z: 20, opacity: 0.9 };
      default:
        return { translate: "0%", scale: 0.8, z: 1, opacity: 0.3 };
    }
  };

  useEffect(() => {
  const timer = setTimeout(() => {
    setActiveIndex(prev => (prev === 5 ? 1 : prev + 1));
  }, 4000);

  return () => clearTimeout(timer);
}, [activeIndex]);

  return (
    <section className="py-20 relative overflow-hidden bg-gradient-to-r from-pink-50/50 via-indigo-50/50 to-blue-50/50">
      {/* Soft Pastel Glow */}

      <div className="relative container mx-auto">
        {/* Heading */}
        <div className="text-center pb-5 lg:pb-8 px-6 lg:px-8">
          <h2 className="text-4xl font-bold mb-6">
            Your {""}
            <span className="bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Learning {""}
            </span>
            <span className="bg-linear-to-r from-purple-600 to-violet-600 bg-clip-text text-transparent">
              Roadmap
            </span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            A beautifully structured journey to help you master every exam.
          </p>
        </div>

        {/* Cards */}
        <div className="relative h-[250px] flex justify-center items-center">
          {steps.map((step, index) => {
            const pos = getPosition(index);

            return (
              <div
                key={index}
                onClick={() => setActiveIndex(index)}
                className="absolute w-[300px] sm:w-[340px] md:w-[420px] lg:w-[480px]
                backdrop-blur-xl bg-gradient-to-tr from-pink-100 via-indigo-200 to-blue-300
                rounded-3xl p-6 md:p-10 shadow-xl border border-purple-100
                cursor-pointer transition-all duration-700"
                style={{
                  left: "50%",
                  transform: `translateX(${pos.translate}) scale(${pos.scale})`,
                  zIndex: pos.z,
                  opacity: pos.opacity,
                }}
              >
                <div className="flex items-start gap-3 lg:gap-5">
                  <div className="text-3xl md:text-4xl lg:text-5xl">
                    {step.icon}
                  </div>

                  <div>
                    <h3 className="text-2xl md:text-3xl font-bold text-black">
                      {step.title}
                    </h3>
                    <p className="mt-3 text-gray-800 leading-relaxed text-sm md:text-base">
                      {step.desc}
                    </p>
                  </div>
                </div>
                <div className="mt-5 h-1.5 w-full bg-gradient-to-r from-indigo-600 to-blue-600 rounded-full opacity-80" />
              </div>
            );
          })}
        </div>
         <div className="flex justify-center pt-5 px-6 lg:px-8">
          <Link
            href="/practice"
            className="px-8 py-3 rounded-full bg-linear-to-r from-blue-500 to-purple-500 text-white font-semibold hover:shadow-[0_0_25px_rgba(99,102,241,0.5)] transition-all duration-300 drop-shadow-sm drop-shadow-violet-600 border-b border-white/50"
          >
            Start Practice Now
          </Link>
        </div>
      </div>
    </section>
  );
}
