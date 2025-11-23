import BreadCrumb from "@/components/BreadCrumb";
import WebpageWrapper from "@/components/wrapper/WebpageWrapper";

interface QuestionCompositionProps {
  breadCrumbData: { name: string; to: string }[];
  mainText: string;
  preText: string | "";
  subText: string | "";
  type: string | "";
}

export default function QuestionCompositionComponent({
  breadCrumbData,
  type,
}: QuestionCompositionProps) {
  return (
    <div className="bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 overflow-hidden pb-20 pt-5">
      <WebpageWrapper>
        <BreadCrumb breadCrumbData={breadCrumbData} />
        {(type === "jlpt" || type == "") && (
          <section className="relative pt-15">
            <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-300/30 rounded-full blur-3xl animate-bounce-slow"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-pink-300/30 rounded-full blur-3xl animate-pulse-slow"></div>

            <div className="relative z-10 max-w-5xl mx-auto text-center px-6">
              <h2 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 py-2">
                JLPT Question Composition
              </h2>
              <p className="mt-4 text-gray-700 text-lg">
                The JLPT measures Japanese proficiency through{" "}
                <span className="font-semibold text-purple-600">
                  Language Knowledge
                </span>
                , <span className="font-semibold text-indigo-600">Reading</span>
                , and{" "}
                <span className="font-semibold text-pink-600">Listening</span>{" "}
                sections.
              </p>

              <div className="mt-8 grid md:grid-cols-3 gap-6 text-left">
                <div className="p-8 bg-white/80 backdrop-blur-md rounded-2xl shadow-lg hover:-translate-y-2 transition-transform duration-300">
                  <h3 className="text-xl font-bold text-indigo-600 mb-3">
                    🈶 Language Knowledge
                  </h3>
                  <ul className="text-gray-700 space-y-2 list-disc">
                    <li>Vocabulary</li>
                    <li>Kanji Reading</li>
                    <li>Grammar</li>
                  </ul>
                </div>

                <div className="p-8 bg-white/80 backdrop-blur-md rounded-2xl shadow-lg hover:-translate-y-2 transition-transform duration-300">
                  <h3 className="text-xl font-bold text-purple-600 mb-3">
                    📖 Reading
                  </h3>
                  <ul className="text-gray-700 space-y-2 list-disc">
                    <li>Short & medium passages</li>
                    <li>Practical texts (ads, notices, etc.)</li>
                    <li>Long comprehension questions</li>
                  </ul>
                </div>

                <div className="p-8 bg-white/80 backdrop-blur-md rounded-2xl shadow-lg hover:-translate-y-2 transition-transform duration-300">
                  <h3 className="text-xl font-bold text-pink-600 mb-3">
                    🎧 Listening
                  </h3>
                  <ul className="text-gray-700 space-y-2 list-disc">
                    <li>Task comprehension</li>
                    <li>Key point understanding</li>
                    <li>Comprehensive listening</li>
                  </ul>
                </div>
              </div>

              <div className="mt-10 text-sm text-gray-800 font-medium">
                🏅 Levels: N5 → N1 | ⏰ Duration: <b>90–170 mins</b> (varies by level)
              </div>
            </div>
          </section>
        )}
        {(type === "jpt" || type == "") && (
          <section className="relative pt-15">
            <div className="absolute top-0 left-0 w-80 h-80 bg-pink-300/30 rounded-full blur-3xl animate-pulse-slow"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-300/30 rounded-full blur-3xl animate-bounce-slow"></div>

            <div className="relative z-10 max-w-5xl mx-auto text-center px-6">
              <h2 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 py-2">
                JPT Question Composition
              </h2>
              <p className="mt-4 text-gray-700 text-lg">
                The JPT is a comprehensive assessment of practical Japanese
                proficiency, consisting of a{" "}
                <span className="font-semibold text-blue-600">
                  200-point exam{" "}
                </span>
                divided into two sections: Listening and Reading.
              </p>

              <div className="mt-8 grid sm:grid-cols-2 gap-8 text-left">
                <div className="p-8 bg-white/80 backdrop-blur-md rounded-2xl shadow-lg border border-white/60 hover:-translate-y-2 transition-transform duration-300">
                  <h3 className="text-2xl font-bold text-blue-600 mb-3 flex items-center gap-2">
                    🎧 Listening Section (25 mins)
                  </h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>📸 Photo Description — 10 questions</li>
                    <li>💬 Question & Answer — 09 questions</li>
                    <li>🗣 Dialogue — 13 questions</li>
                    <li>🎙 Explanatory Text — 08 questions</li>
                  </ul>
                  <p className="mt-3 text-sm text-gray-800">
                    Tests your ability to understand daily Japanese through
                    sound.
                  </p>
                </div>

                <div className="p-8 bg-white/80 backdrop-blur-md rounded-2xl shadow-lg border border-white/60 hover:-translate-y-2 transition-transform duration-300">
                  <h3 className="text-2xl font-bold text-pink-600 mb-3 flex items-center gap-2">
                    📚 Reading Section (25 mins)
                  </h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>📝 Choose Correct Answer — 06 questions</li>
                    <li>🔤 Correct Wrong Sentences — 11 questions</li>
                    <li>🧩 Fill In The Blanks — 13 questions</li>
                    <li>📖 Reading Comprehension — 10 questions</li>
                  </ul>
                  <p className="mt-3 text-sm text-gray-800">
                    Evaluates grammar, vocabulary, and overall reading skills.
                  </p>
                </div>
              </div>

              <div className="mt-10 text-sm text-gray-800">
                🕒 Total Time: <b>50 minutes</b> | 🔢 Total Questions:{" "}
                <b>80</b> | 🏆 Max Score: <b>200</b>
              </div>
            </div>
          </section>
        )}
      </WebpageWrapper>
    </div>
  );
}
