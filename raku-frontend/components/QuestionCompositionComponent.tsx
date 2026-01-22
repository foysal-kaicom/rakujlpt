"use client";
import BreadCrumb from "@/components/BreadCrumb";
import WebpageWrapper from "@/components/wrapper/WebpageWrapper";
import { useTranslation } from "react-i18next";

interface QuestionCompositionProps {
  breadCrumbData: { name: string; to: string }[];
  type: string | "";
  title: string | "";
  duration: string | "";
}

export default function QuestionCompositionComponent({
  breadCrumbData,
  type,
  title,
  duration,
}: QuestionCompositionProps) {
  const { t } = useTranslation();

  return (
    <div className="bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 overflow-hidden pb-20 pt-5">
      <WebpageWrapper>
        <BreadCrumb breadCrumbData={breadCrumbData} />

        {(type === "jlpt" || type === "") && (
          <section className="relative pt-15">
            <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-300/30 rounded-full blur-3xl animate-bounce-slow"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-pink-300/30 rounded-full blur-3xl animate-pulse-slow"></div>

            <div className="relative z-10 max-w-5xl mx-auto text-center md:px-6">
              <h2 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 py-2">
                <span className="uppercase">
                  {title ? title : t("composition.jlpt.default_title")}
                </span>{" "}
                {t("composition.jlpt.heading")}
              </h2>

              <p className="mt-4 text-gray-700 text-lg">
                {t("composition.jlpt.description.before")}
                <span className="font-semibold text-purple-600">
                  {t("composition.jlpt.sections.language")}
                </span>
                ,{" "}
                <span className="font-semibold text-indigo-600">
                  {t("composition.jlpt.sections.reading")}
                </span>
                , {t("composition.jlpt.description.and")}{" "}
                <span className="font-semibold text-pink-600">
                  {t("composition.jlpt.sections.listening")}
                </span>{" "}
                {t("composition.jlpt.description.after")}
              </p>

              <div className="mt-8 grid md:grid-cols-3 gap-6 text-left">
                <div className="p-8 bg-white/80 backdrop-blur-md rounded-2xl shadow-lg hover:-translate-y-2 transition-transform duration-300">
                  <h3 className="text-xl font-bold text-indigo-600 mb-3">
                    🈶 {t("composition.jlpt.cards.language.title")}
                  </h3>
                  <ul className="text-gray-700 space-y-2 list-disc">
                    <li>{t("composition.jlpt.cards.language.items.vocab")}</li>
                    <li>{t("composition.jlpt.cards.language.items.kanji")}</li>
                    <li>
                      {t("composition.jlpt.cards.language.items.grammar")}
                    </li>
                  </ul>
                </div>

                <div className="p-8 bg-white/80 backdrop-blur-md rounded-2xl shadow-lg hover:-translate-y-2 transition-transform duration-300">
                  <h3 className="text-xl font-bold text-purple-600 mb-3">
                    📖 {t("composition.jlpt.cards.reading.title")}
                  </h3>
                  <ul className="text-gray-700 space-y-2 list-disc">
                    <li>{t("composition.jlpt.cards.reading.items.short")}</li>
                    <li>
                      {t("composition.jlpt.cards.reading.items.practical")}
                    </li>
                    <li>{t("composition.jlpt.cards.reading.items.long")}</li>
                  </ul>
                </div>

                <div className="p-8 bg-white/80 backdrop-blur-md rounded-2xl shadow-lg hover:-translate-y-2 transition-transform duration-300">
                  <h3 className="text-xl font-bold text-pink-600 mb-3">
                    🎧 {t("composition.jlpt.cards.listening.title")}
                  </h3>
                  <ul className="text-gray-700 space-y-2 list-disc">
                    <li>{t("composition.jlpt.cards.listening.items.task")}</li>
                    <li>{t("composition.jlpt.cards.listening.items.key")}</li>
                    <li>{t("composition.jlpt.cards.listening.items.comp")}</li>
                  </ul>
                </div>
              </div>

              {title && duration ? (
                <div className="mt-10 text-sm text-gray-800 font-medium">
                  🏅 {t("composition.levels")}:{" "}
                  <span className="uppercase">{title}</span> | ⏰{" "}
                  {t("composition.duration")}: <b>{duration}</b>
                </div>
              ) : (
                <div className="mt-10 text-sm text-gray-800 font-medium">
                  🏅 {t("composition.levels")}: N5 → N1 | ⏰{" "}
                  {t("composition.duration")}:{" "}
                  <b>{t("composition.jlpt.default_duration")}</b>
                </div>
              )}
            </div>
          </section>
        )}

        {(type === "jpt" || type === "") && (
          <section className="relative pt-15">
            <div className="absolute top-0 left-0 w-80 h-80 bg-pink-300/30 rounded-full blur-3xl animate-pulse-slow"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-300/30 rounded-full blur-3xl animate-bounce-slow"></div>

            <div className="relative z-10 max-w-5xl mx-auto text-center px-6">
              <h2 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 py-2">
                {t("composition.jpt.heading")}
              </h2>

              <p className="mt-4 text-gray-700 text-lg">
                {t("composition.jpt.description")}
              </p>

              <div className="mt-8 grid sm:grid-cols-2 gap-8 text-left">
                <div className="p-8 bg-white/80 backdrop-blur-md rounded-2xl shadow-lg border border-white/60 hover:-translate-y-2 transition-transform duration-300">
                  <h3 className="text-2xl font-bold text-blue-600 mb-3">
                    🎧 {t("composition.jpt.listening.title")}
                  </h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>{t("composition.jpt.listening.items.photo")}</li>
                    <li>{t("composition.jpt.listening.items.qa")}</li>
                    <li>{t("composition.jpt.listening.items.dialogue")}</li>
                    <li>{t("composition.jpt.listening.items.text")}</li>
                  </ul>
                </div>

                <div className="p-8 bg-white/80 backdrop-blur-md rounded-2xl shadow-lg border border-white/60 hover:-translate-y-2 transition-transform duration-300">
                  <h3 className="text-2xl font-bold text-pink-600 mb-3">
                    📚 {t("composition.jpt.reading.title")}
                  </h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>{t("composition.jpt.reading.items.choose")}</li>
                    <li>{t("composition.jpt.reading.items.correct")}</li>
                    <li>{t("composition.jpt.reading.items.fill")}</li>
                    <li>{t("composition.jpt.reading.items.comp")}</li>
                  </ul>
                </div>
              </div>

              <div className="mt-10 text-sm text-gray-800">
                {t("composition.jpt.footer")}
              </div>
            </div>
          </section>
        )}
      </WebpageWrapper>
    </div>
  );
}
