import BreadCrumb from "@/components/BreadCrumb";
import HeadLine2 from "@/components/HeadLine2";
import WebpageWrapper from "@/components/wrapper/WebpageWrapper";

interface QuestionCompositionProps {
  breadCrumbData: { name: string; to: string }[];
  mainText: string;
  preText: string | "";
  subText: string | "";
}

export default function QuestionCompositionComponent({
  breadCrumbData,
  mainText,
  preText,
  subText,
}: QuestionCompositionProps){
 
  return (
    <div className="pt-5">
        <WebpageWrapper>
          <BreadCrumb breadCrumbData={breadCrumbData} />
          <div className="md:w-1/2 mt-5">
            <HeadLine2 mainText={mainText} preText={preText} subText={subText} />
          </div>
          <div className="mt-10 pb-15 space-y-15">
            <table className="w-full border-collapse rounded-xl overflow-hidden shadow-xl mt-6 bg-white text-xs sm:text-sm hidden sm:table">
              <thead>
                <tr className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
                  <th
                    className="p-4 sm:p-5 text-left font-semibold border-r border-blue-200"
                    colSpan={2}
                  >
                    Constitute
                  </th>
                  <th className="p-4 sm:p-5 text-left font-semibold border-r border-blue-200">
                    Number of questions
                  </th>
                  <th className="p-4 sm:p-5 text-left font-semibold border-r border-blue-200">
                    Time
                  </th>
                  <th className="p-4 sm:p-5 text-left font-semibold">
                    Fraction
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-200">
                {/* Listening Section */}
                <tr className="bg-gray-50">
                  <td
                    rowSpan={4}
                    className="p-4 font-semibold text-blue-700 border-r border-gray-200 align-center"
                  >
                    <a href="#Listening_Comprehension">
                      Listening Comprehension
                    </a>
                  </td>
                  <td className="p-4 border-r border-gray-200">
                    <a href="#Photo_description">Photo description</a>
                  </td>
                  <td className="p-4 border-r border-gray-200">10</td>
                  <td
                    rowSpan={4}
                    className="p-4 font-semibold text-blue-700 border-r border-gray-200 align-center"
                  >
                    25 mins
                  </td>
                  <td
                    rowSpan={4}
                    className="p-4 font-semibold text-blue-700 align-center"
                  >
                    100 pts
                  </td>
                </tr>
                <tr className="bg-white">
                  <td className="p-4 border-r border-gray-200">
                    <a href="#Questions_and_Answers">Questions and Answers</a>
                  </td>
                  <td className="p-4 border-r border-gray-200">09</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="p-4 border-r border-gray-200">
                    <a href="#Dialogue">Dialogue</a>
                  </td>
                  <td className="p-4 border-r border-gray-200">13</td>
                </tr>
                <tr className="bg-white">
                  <td className="p-4 border-r border-gray-200">
                    <a href="#Explanatory_text">Explanatory text</a>
                  </td>
                  <td className="p-4 border-r border-gray-200">08</td>
                </tr>

                {/* Reading Section */}
                <tr className="bg-gray-50">
                  <td
                    rowSpan={4}
                    className="p-4 font-semibold text-blue-700 border-r border-gray-200 align-center"
                  >
                    <a href="#Reading_Comprehension">Reading Comprehension</a>
                  </td>
                  <td className="p-4 border-r border-gray-200">
                    <a href="#Choose_correct_answer">Choose correct answer</a>
                  </td>
                  <td className="p-4 border-r border-gray-200">06</td>
                  <td
                    rowSpan={4}
                    className="p-4 font-semibold text-blue-700 border-r border-gray-200 align-center"
                  >
                    25 mins
                  </td>
                  <td
                    rowSpan={4}
                    className="p-4 font-semibold text-blue-700 align-center"
                  >
                    100 pts
                  </td>
                </tr>
                <tr className="bg-white">
                  <td className="p-4 border-r border-gray-200">
                    <a href="#Correct_wrong_sentences">
                      Correct wrong sentences
                    </a>
                  </td>
                  <td className="p-4 border-r border-gray-200">11</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="p-4 border-r border-gray-200">
                    <a href="#Fill_in_the_blanks"> Fill in the blanks</a>
                  </td>
                  <td className="p-4 border-r border-gray-200">13</td>
                </tr>
                <tr className="bg-white">
                  <td className="p-4 border-r border-gray-200">
                    <a href="#Reading_comprehension">Reading comprehension</a>
                  </td>
                  <td className="p-4 border-r border-gray-200">10</td>
                </tr>

                {/* Total Row */}
                <tr className="bg-gradient-to-r from-sky-500 to-sky-600 text-white font-semibold text-sm sm:text-base">
                  <td
                    colSpan={2}
                    className="p-4 sm:p-5 border-r border-blue-200"
                  >
                    Total
                  </td>
                  <td className="p-4 sm:p-5 border-r border-blue-200">
                    80 lanes
                  </td>
                  <td className="p-4 sm:p-5 border-r border-blue-200">
                    50 minutes
                  </td>
                  <td className="p-4 sm:p-5">200 points</td>
                </tr>
              </tbody>
            </table>

            <div className="space-y-4 sm:hidden text-sm">
              {/* Listening Section */}
              <div className="bg-white rounded-lg shadow p-4">
                <h3 className="text-blue-700 font-semibold mb-2">
                  Listening Comprehension
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="font-medium">Photo description</span>
                    <span>10</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Questions and Answers</span>
                    <span>09</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Dialogue</span>
                    <span>13</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Explanatory text</span>
                    <span>08</span>
                  </div>
                  <div className="mt-2 text-blue-700 font-semibold flex justify-between">
                    <span>Time</span>
                    <span>25 mins</span>
                  </div>
                  <div className="text-blue-700 font-semibold flex justify-between">
                    <span>Fraction</span>
                    <span>100 pts</span>
                  </div>
                </div>
              </div>

              {/* Reading Section */}
              <div className="bg-white rounded-lg shadow p-4">
                <h3 className="text-blue-700 font-semibold mb-2">
                  Reading Comprehension
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="font-medium">Choose correct answer</span>
                    <span>06</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Correct wrong sentences</span>
                    <span>11</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Fill in the blanks</span>
                    <span>13</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Reading comprehension</span>
                    <span>10</span>
                  </div>
                  <div className="mt-2 text-blue-700 font-semibold flex justify-between">
                    <span>Time</span>
                    <span>25 mins</span>
                  </div>
                  <div className="text-blue-700 font-semibold flex justify-between">
                    <span>Fraction</span>
                    <span>100 pts</span>
                  </div>
                </div>
              </div>

              {/* Total Summary */}
              <div className="bg-gradient-to-r from-sky-500 to-sky-600 rounded-lg shadow text-white p-4 text-xs font-semibold">
                <div className="flex justify-between mb-1">
                  <span>Total Questions</span>
                  <span>80 lanes</span>
                </div>
                <div className="flex justify-between mb-1">
                  <span>Total Time</span>
                  <span>50 minutes</span>
                </div>
                <div className="flex justify-between">
                  <span>Total Fraction</span>
                  <span>200 points</span>
                </div>
              </div>
            </div>

            <div className="overflow-x-auto mt-6 rounded-xl shadow-xl">
              <table className="min-w-[600px] w-full border-collapse text-xs sm:text-sm bg-white">
                <thead>
                  <tr className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
                    <th className="p-4 sm:p-5 text-left font-semibold whitespace-nowrap border-r border-blue-200">
                      Constitute
                    </th>
                    <th className="p-4 sm:p-5 text-left font-semibold whitespace-nowrap border-r border-blue-200">
                      Part
                    </th>
                    <th
                      className="p-4 sm:p-5 text-left font-semibold whitespace-nowrap border-r border-blue-200"
                      colSpan={2}
                    >
                      Examination Content
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-200">
                  {/* Listening Section */}
                  <tr className="bg-gray-50">
                    <td
                      id="Listening_Comprehension"
                      rowSpan={4}
                      className="p-4 sm:p-5 font-semibold text-blue-700 align-top border-r border-gray-200 bg-gray-100 whitespace-nowrap scroll-mt-32 sm:align-middle"
                    >
                      Listening Comprehension
                    </td>
                    <td className="p-4 sm:p-5 border-r border-gray-200 whitespace-nowrap scroll-mt-32">
                      Photo description
                    </td>
                    <td
                      className="p-4 sm:p-5 border-r border-gray-200"
                      colSpan={2}
                    >
                      Look at the picture and listen to the sound, and choose
                      the correct picture from the 4 options. Listening and
                      instant judgment are examined.
                    </td>
                  </tr>

                  <tr className="bg-white">
                    <td className="p-4 sm:p-5 border-r border-gray-200 whitespace-nowrap scroll-mt-32">
                      Questions and Answers
                    </td>
                    <td
                      className="p-4 sm:p-5 border-r border-gray-200"
                      colSpan={2}
                    >
                      By listening to short dialogue-type sentences and choosing
                      appropriate response sentences, momentary dialogue ability
                      is examined.
                    </td>
                  </tr>

                  <tr className="bg-gray-50">
                    <td className="p-4 sm:p-5 border-r border-gray-200 whitespace-nowrap scroll-mt-32">
                      Dialogue
                    </td>
                    <td
                      className="p-4 sm:p-5 border-r border-gray-200"
                      colSpan={2}
                    >
                      The ability to capture information is examined by
                      listening to the dialogue and understanding the context
                      and content.
                    </td>
                  </tr>

                  <tr className="bg-white">
                    <td className="p-4 sm:p-5 border-r border-gray-200 whitespace-nowrap scroll-mt-32">
                      Explanatory text
                    </td>
                    <td
                      className="p-4 sm:p-5 border-r border-gray-200"
                      colSpan={2}
                    >
                      After listening to a long narrative, answer 3–4 questions
                      about its content to test comprehension.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="overflow-x-auto mt-6 rounded-xl shadow-xl">
              <table className="min-w-full border-collapse bg-white rounded-xl overflow-hidden text-xs sm:text-sm">
                <thead>
                  <tr className="bg-gradient-to-r from-blue-600 to-blue-800 text-white ">
                    <th className="p-4 sm:p-5 text-left font-semibold border-r border-blue-200 whitespace-nowrap">
                      Constitute
                    </th>
                    <th className="p-4 sm:p-5 text-left font-semibold border-r border-blue-200 whitespace-nowrap">
                      Part
                    </th>
                    <th
                      className="p-4 sm:p-5 text-left font-semibold border-r border-blue-200 whitespace-nowrap"
                      colSpan={2}
                    >
                      Examination Content
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-200">
                  {/* Listening Section */}
                  <tr className="bg-gray-50">
                    <td
                      id="Reading_Comprehension"
                      rowSpan={4}
                      className="p-4 font-semibold text-blue-700 border-r border-gray-200 align-top sm:align-middle whitespace-nowrap"
                    >
                      Reading Comprehension
                    </td>
                    <td
                      id="Choose_correct_answer"
                      className="p-4 border-r border-gray-200 whitespace-nowrap"
                    >
                      Choose the correct answer
                    </td>
                    <td className="p-4 border-r border-gray-200" colSpan={2}>
                      To evaluate whether you have mastered the ability to read
                      and write Japanese kanji, and the basic ability to use
                      common grammar and vocabulary to write articles, and
                      examine the basic knowledge of Japanese.
                    </td>
                  </tr>
                  <tr className="bg-white">
                    <td
                      id="Correct_wrong_sentences"
                      className="p-4 border-r border-gray-200 whitespace-nowrap"
                    >
                      Make mistakes
                    </td>
                    <td className="p-4 border-r border-gray-200" colSpan={2}>
                      This is a test to select the wrongly used word or phrase
                      from the 4 underlined words or phrases. To examine the
                      basic skills of writing.
                    </td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td
                      id="Fill_in_the_blanks"
                      className="p-4 border-r border-gray-200 whitespace-nowrap"
                    >
                      Fill in the blank
                    </td>
                    <td className="p-4 border-r border-gray-200" colSpan={2}>
                      For an incomplete article that lacks a part, can you
                      understand the context and use it to piece together a
                      complete article. As with the error correction question,
                      examine the basic ability of writing.
                    </td>
                  </tr>
                  <tr className="bg-white">
                    <td
                      id="Reading_comprehension"
                      className="p-4 border-r border-gray-200 whitespace-nowrap"
                    >
                      Reading comprehension
                    </td>
                    <td className="p-4 border-r border-gray-200 " colSpan={2}>
                      By reading long articles on various topics, examine
                      whether you can understand the flow of the topic and the
                      detailed expression of the intention.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </WebpageWrapper>
      </div>
  );
}