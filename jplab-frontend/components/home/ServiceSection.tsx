import Link from "next/link";
import { MdLockClock } from "react-icons/md";

export default function ServiceSection() {
  const brands = [
    {
      name: "JPT",
      img: "/assets/brands/jpt.png",
      background: "/assets/japan/j.jpg",
      text: "Practice real-time JPT mock exams to improve your test-taking speed and confidence.",
      status: 1,
    },
    {
      name: "JLPT",
      img: "/assets/brands/jlpt.png",
      background: "/assets/japan/j2.jpg",
      text: "Prepare for all JLPT levels (N5–N1) with grammar, reading, and listening exercises.",
      status: 1,
    },
    {
      name: "NAT",
      img: "/assets/brands/nat.png",
      background: "/assets/japan/j3.jpg",
      text: "Take full-length NAT practice tests to simulate the actual exam environment.",
      status: 0,
    },
  ];

  return (
    <section className="relative py-20 px-6 bg-linear-to-br from-blue-50 to-purple-50 overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute -top-10 -left-10 w-72 h-72 bg-blue-300/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-300/20 rounded-full blur-3xl"></div>
      </div>

      <div className="px-6 lg:px-8 relative container mx-auto text-center text-black">
        <h2 className="text-4xl font-bold mb-6">
          Practice for{" "}
          <span className="bg-linear-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            JPT
          </span>
          ,
          <span className="bg-linear-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            JLPT
          </span>{" "}
          &
          <span className="bg-linear-to-r from-pink-400 to-indigo-400 bg-clip-text text-transparent">
            {" "}
            NAT
          </span>
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto mb-12">
          Boost your Japanese language skills with our interactive mock tests
          and real exam-style practice designed for every level — from beginners
          to advanced learners.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {brands.map((item, i) => (
            <div
              key={i}
              className="rounded-2xl hover:scale-105 duration-300 relative bg-cover bg-no-repeat bg-center overflow-hidden"
              style={{ backgroundImage: `url(${item.background})` }}
            >
              {/* Locked overlay */}
              {!item.status && (
                <div className="absolute inset-0 bg-black/20 text-white rounded-2xl z-20 flex gap-1 justify-center items-center text-2xl font-semibold backdrop-blur-xs">
                  <MdLockClock />
                  Coming soon ...
                </div>
              )}

              {/* Content layer */}
              <div className="relative z-10 bg-black/30 rounded-2xl min-h-[300px] lg:min-h-[250px] flex flex-col justify-center items-center overflow-hidden group">
                {/* Title */}
                <h3
                  className="text-6xl font-semibold text-white mb-2"
                  style={{
                    WebkitTextStroke: "1px black",
                    textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
                  }}
                >
                  {item.name}
                </h3>

                {/* Description (slides up to fill space) */}
                <p className="absolute bottom-0 left-0 right-0 text-sm md:text-base xl:text-lg text-white bg-purple-600/60 p-4 text-center translate-y-full group-hover:translate-y-0 duration-500">
                  {item.text}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12">
          <Link href="/mock_test_select" className="px-8 py-3 rounded-full bg-linear-to-r from-blue-500 to-purple-500 text-white font-semibold hover:shadow-[0_0_25px_rgba(99,102,241,0.5)] transition-all duration-300">
            Start Practicing Now
          </Link>
        </div>
      </div>
    </section>
  );
}
