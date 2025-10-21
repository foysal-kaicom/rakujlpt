import WebpageWrapper from "@/components/wrapper/WebpageWrapper";
import Image from "next/image";
import HeadLine2 from "@/components/HeadLine2";
import BreadCrumb from "@/components/BreadCrumb";
import Link from "next/link";
import { IoPersonCircleOutline } from "react-icons/io5";
import axios from "axios";
import { Suspense } from "react";
import SuspenseLoader from "@/components/SuspenseLoader";

interface NewsItem {
  id: number;
  title: string;
  slug: string;
  category_name: string;
  content: string;
  featured_image: string | null;
  is_featured: number;
  published_at: string;
  author_name: string;
  author_designation: string;
}

// Fetch all news
async function getNewsData(): Promise<NewsItem[]> {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/news/list`,
      {
        headers: {
          "User-Agent": "Mozilla/5.0",
          Accept: "application/json",
        },
      }
    );
    return response.data.data || [];
  } catch (error) {
    console.error("Failed to fetch news data:", error);
    return [];
  }
}

// Page component
export default async function NewsDetailsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/news/view/${slug}`,
    {
      headers: {
        "User-Agent": "Mozilla/5.0",
        Accept: "application/json",
      },
    }
  );

  const newsDetails: NewsItem = response.data.data || ({} as NewsItem);
  const allNews = await getNewsData();

  const formatDate = (isoDate: string) => {
    const date = new Date(isoDate);
    return date.toLocaleDateString("en-UK", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const breadCrumbData = [
    { name: "Home", to: "/" },
    { name: "News", to: "/news" },
    {
      name: newsDetails?.title?.slice(0, 20) + "..." || "News Details",
      to: `/news/${slug}`,
    },
  ];

  return (
    <Suspense fallback={<SuspenseLoader/>}>
      <WebpageWrapper>
        <div className="pt-5">
          <BreadCrumb breadCrumbData={breadCrumbData} />
          <div className="w-1/2 mt-5">
            <HeadLine2 preText="" subText="" mainText="News Details" />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 pt-10 pb-15">
          {/* Main News */}
          <article className="lg:col-span-2 bg-white shadow-md rounded-2xl overflow-hidden">
            <div className="relative h-64 w-full">
              <Image
                src={newsDetails?.featured_image || "/"}
                alt={newsDetails?.title?.slice(0, 10)}
                fill
                className="object-cover"
              />
            </div>

            <div className="p-8">
              <h1 className="text-2xl font-bold mb-4">{newsDetails?.title}</h1>
              <div
                className="mb-6 text-gray-600"
                dangerouslySetInnerHTML={{ __html: newsDetails?.content ?? "" }}
              />

              <div className="flex items-center gap-4 pt-6 border-t border-gray-200">
                <div className="size-[50px] rounded-full bg-blue-300">
                  <IoPersonCircleOutline className="size-[50px] text-white" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">
                    {newsDetails?.author_name}
                  </p>
                  <p className="text-sm text-gray-500">
                    {newsDetails?.author_designation} —{" "}
                    {formatDate(newsDetails?.published_at)}
                  </p>
                </div>
              </div>
            </div>
          </article>

          {/* Sidebar */}
          <aside className="space-y-6">
            <h2 className="text-lg font-semibold mb-4">Other News</h2>
            {allNews.slice(0, 5).map((item) => (
              <Link
                href={`/news/${item.slug}`}
                key={item.id}
                className={`flex items-center gap-4 p-4 rounded-lg shadow-sm hover:shadow-md duration-200 cursor-pointer hover:bg-white ${newsDetails?.id == item?.id ?"bg-white" :"bg-gray-100"}`}
              >
                <Image
                  src={item?.featured_image || "/"}
                  alt={item?.title?.slice(0, 3)}
                  width={50}
                  height={50}
                  className="rounded-full border border-gray-200 size-[50px]"
                />
                <div className="w-[calc(100%-50px)]">
                  <p className="font-semibold text-gray-800 line-clamp-1">
                    {item?.title}
                  </p>
                  <p className="text-sm text-gray-500">— {item?.author_name}</p>
                </div>
              </Link>
            ))}
          </aside>
        </div>
      </WebpageWrapper>
    </Suspense>
  );
}
