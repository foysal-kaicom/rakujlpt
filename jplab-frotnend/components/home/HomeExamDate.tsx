import HeadLine from "@/components/HeadLine";
import WebpageWrapper from "@/components/wrapper/WebpageWrapper";
import ExamCard from "@/components/ExamCard";
import axios from "axios";
import Link from "next/link";
import { AiOutlineLogin } from "react-icons/ai";

interface ExamItem {
  title: string;
  description: string;
  exam_date: string; // e.g. "27-Dec-2025"
  application_deadline: string;
  image: string | null;
  result_publish_date: string;
  slug: string;
  start_time: string; // e.g. "10:00 AM"
  end_time: string;
  fee: string;
  available_to_apply: boolean;
}

// Helper to parse your exam date & time strings into JS Date object
function parseExamDateTime(dateStr: string, timeStr: string): Date {
  const monthMap: Record<string, string> = {
    Jan: "01",
    Feb: "02",
    Mar: "03",
    Apr: "04",
    May: "05",
    Jun: "06",
    Jul: "07",
    Aug: "08",
    Sep: "09",
    Oct: "10",
    Nov: "11",
    Dec: "12",
  };

  const [day, monthAbbr, year] = dateStr.split("-");
  const month = monthMap[monthAbbr];
  if (!month) return new Date(NaN);

  // Convert 12h time to 24h time
  const [time, modifier] = timeStr.split(" ");
  let [hours, minutes] = time.split(":").map(Number);
  if (modifier === "PM" && hours < 12) hours += 12;
  if (modifier === "AM" && hours === 12) hours = 0;

  return new Date(
    `${year}-${month}-${day}T${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:00+06:00`
  );
}

async function getExamData(): Promise<ExamItem[]> {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/exam/list`,
      {
        headers: {
          "User-Agent": "Mozilla/5.0",
          Accept: "application/json",
        },
      }
    );

    const allExams: ExamItem[] = response.data.data || [];
    const now = new Date();

    // Filter out exams that have ended already (passed)
    const notPassed = allExams.filter((exam) => {
      const examEnd = parseExamDateTime(exam.exam_date, exam.end_time);
      return examEnd >= now;
    });

    // Sort by exam start time ascending (nearest exam first)
    notPassed.sort((a, b) => {
      const aStart = parseExamDateTime(a.exam_date, a.start_time);
      const bStart = parseExamDateTime(b.exam_date, b.start_time);
      return aStart.getTime() - bStart.getTime();
    });

    // Return top 3 nearest exams
    return notPassed.slice(0, 3);
  } catch (error) {
    console.error("Failed to fetch exam data:", error);
    return [];
  }
}
export default async function ExamsPage() {
  const examData = await getExamData();
  console.log(examData);
  return (
    <div className="relative">
      <div className="relative z-10">
        <WebpageWrapper>
          <HeadLine
            preText="Exam Application"
            subText="JPT Elementary PBT (Level - N5 & N4)"
            mainText="Date and Times"
          />
          <div className="flex sm:justify-center mt-5">
            <Link
              href="/test_date_in_bangladesh"
              className="px-5 py-1.5 sm:py-2 bg-blue-900 hover:bg-blue-800 text-white font-semibold text-xs sm:text-sm rounded-lg inline-flex items-center gap-1"
            >
              Show all test date
              <AiOutlineLogin className="size-5" />
            </Link>
          </div>

          <div
            className={` gap-5 mt-10 ${
              examData.length > 2
                ? "grid md:grid-cols-2 xl:grid-cols-3"
                : "flex justify-center flex-col md:flex-row"
            }`}
          >
            {examData.map((e, i) => (
              <ExamCard
                  key={i}
                  exam={e}
                  index={i}
                />
            ))}
          </div>
        </WebpageWrapper>
      </div>
    </div>
  );
}
