import { FaStar, FaCheck } from "react-icons/fa";

import { useRouter } from "next/navigation";

interface AnsEvalProps {
  setShowAnsEval: (value: boolean) => void;
}

export default function MocktestAnsEvaluation({
  setShowAnsEval,
}: AnsEvalProps) {
  const router = useRouter();
  return (
    <>
      <div className="min-h-screen bg-linear-to-br from-purple-50 to-indigo-100 p-4 relative">
        <div className="max-w-5xl p-4 rounded mx-auto">
          <div className="bg-white border border-purple-400 p-3 rounded-xl my-5 flex justify-between tesxt-sm sticky top-0 z-10">
            <button
              onClick={() => setShowAnsEval(false)}
              className="bg-red-600 text-white px-3 py-1 rounded-md hover:opacity-80 duration-300 cursor-pointer drop-shadow-sm drop-shadow-red-800 border-b border-white/50"
            >
              Close
            </button>
            <button
              onClick={() => router.back()}
              className="bg-purple-600 text-white px-3 py-1 rounded-md hover:opacity-80 duration-300 cursor-pointer drop-shadow-sm drop-shadow-violet-800 border-b border-white/50"
            >
              Back
            </button>
          </div>
          <div className="space-y-3">
            <div className="p-4 md:p-8 bg-white rounded-xl outline outline-purple-200">
              {/* Group-level content */}
              {/* {grp.group_type === "audio" && grp.content && ( */}
              <div className="mb-8">
                <audio
                  controls
                  className="w-full h-8 [&::-webkit-media-controls-panel]:bg-purple-50 [&::-webkit-media-controls-panel]:h-8 [&::-webkit-media-controls-enclosure]:rounded-md"
                >
                  <source type="audio/mpeg" />
                  Your browser does not support the audio element.
                </audio>
              </div>
              {/* )} */}

              {/* {grp.group_type === "passage" && grp.content && ( */}
              <div className="p-4 bg-purple-50/50 leading-10 tracking-widest rounded-md mb-8 text-lg">
                <div
                  className="text-gray-800 whitespace-pre-line"
                  dangerouslySetInnerHTML={{
                    __html: "kd;lgsKLbhlmgrsahlyop",
                  }}
                />
              </div>
              {/* )} */}

              {/* Group questions */}
              <div className="space-y-8">
                {/* {grp.questions?.map((question, index) => {
                        const parsedOptions: ParsedOptions = question.options
                          ?.values
                          ? JSON.parse(question.options.values)
                          : {};

                        return ( */}
                <div className="">
                  {/* Question title */}
                  <div className="text-lg mb-2 flex gap-1">
                    {/* {question?.proficiency_level == "N5" && ( */}
                    <FaStar className="mt-1 text-purple-700" />
                    {/* )} */}
                    <span className="font-semibold">Q10: </span>
                    {/* {question.type === "image" ? ( */}
                    <div className="flex flex-col w-full">
                      <img
                        draggable="false"
                        src=""
                        alt=""
                        className="max-w-[250px] sm:max-w-sm mx-auto"
                      />
                      <div
                        className="text-gray-800 whitespace-pre-line mt-1.5 text-center"
                        dangerouslySetInnerHTML={{
                          __html: "dGVFSHBgd",
                        }}
                      />
                    </div>
                    {/* ) : ( */}
                    <div
                      className=""
                      dangerouslySetInnerHTML={{
                        __html: "fBGNG",
                      }}
                    />
                    {/* )} */}
                  </div>

                  {/* Options */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
                    {/* {Object.entries(parsedOptions).filter(([_, option]) => option && option.trim() !== "").map(
                                ([key, option], index) => ( */}
                    <label className="flex space-x-3 p-2 cursor-pointer font-medium items-center">
                      <div className="size-6 relative mt-1">
                        {/* Default Circle */}
                        <span className="w-5 h-5 border-2 border-purple-500 rounded-full flex items-center justify-center"></span>

                        {/* Star When Checked */}
                        <FaCheck className=" w-5 h-5 text-white bg-purple-500 rounded-full p-1" />
                      </div>

                      <div
                        className="leading-10 tracking-widest"
                        dangerouslySetInnerHTML={{
                          __html: "dszhFty",
                        }}
                      />
                    </label>
                    {/* )
                              )} */}
                  </div>
                </div>
                {/* );
                      })} */}
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </>
  );
}
