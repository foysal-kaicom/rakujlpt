import BreadCrumb from "@/components/BreadCrumb";
import WebpageWrapper from "@/components/wrapper/WebpageWrapper";
import Image from "next/image";
import HeadLine2 from "@/components/HeadLine2";
import axios from "axios";
import Link from "next/link";
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

    const allNews: NewsItem[] = response.data.data || [];

    return allNews;
  } catch (error) {
    console.error("Failed to fetch news data:", error);
    return [];
  }
}

export default async function AllNewsPage() {
  const allNews = await getNewsData();
  const featuredNews = allNews.find((item) => item.is_featured === 1);
  const filteredNews = allNews.filter((item) => item.is_featured != 1);
  // console.log("allnews:", allNews, "featurenews", featuredNews);

  function formatDate(isoDate: string) {
    const date = new Date(isoDate);
    const options: Intl.DateTimeFormatOptions = {
      day: "2-digit",
      month: "short",
      year: "numeric",
    };
    return date.toLocaleDateString("en-UK", options);
  }

  const breadCrumbData = [
    { name: "Home", to: "/" },
    { name: "News", to: "/news" },
  ];

  return (
    <Suspense fallback={<SuspenseLoader />}>
      <WebpageWrapper>
        <div className="pt-5">
          <BreadCrumb breadCrumbData={breadCrumbData} />
          <div className="w-1/2 mt-5">
            <HeadLine2 preText="" subText="" mainText="News" />
          </div>
        </div>

        <div className="pb-15">
          {/* Featured News */}
          <div className="mb-10 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="relative h-72 w-full rounded-xl overflow-hidden shadow-lg">
              <Image
                src={featuredNews?.featured_image || "/"}
                alt={featuredNews?.title.slice(0, 10) || ""}
                fill
                className="object-cover"
              />
            </div>
            <div>
              <p className="text-sm text-blue-600 font-semibold">
                Featured —{" "}
                {formatDate(
                  featuredNews?.published_at ? featuredNews?.published_at : ""
                )}
              </p>
              <h2 className="text-2xl font-bold text-gray-900 mt-2 mb-4 line-clamp-2">
                {featuredNews?.title}
              </h2>
              <div
                className="text-gray-600 mb-4 line-clamp-2"
                dangerouslySetInnerHTML={{
                  __html: featuredNews?.content ?? "",
                }}
              />
              <Link
                href={`/news/${featuredNews?.slug}`}
                className="text-blue-600 hover:text-blue-800 font-semibold"
              >
                Read More →
              </Link>
            </div>
          </div>

          {/* All News Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredNews.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg duration-300"
              >
                <div className="relative h-48 w-full">
                  <Image
                    src={item.featured_image || "/"}
                    alt={item.title.slice(0, 10)}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-5">
                  <p className="text-sm text-gray-500">
                    {formatDate(item?.published_at)}
                  </p>
                  <h3 className="text-lg font-bold text-gray-900 mt-1 mb-2 line-clamp-1">
                    {item.title}
                  </h3>
                  <div
                    className="text-gray-600 text-sm mb-4 line-clamp-3"
                    dangerouslySetInnerHTML={{
                      __html: featuredNews?.content ?? "",
                    }}
                  />
                  <Link
                    href={`/news/${item.slug}`}
                    className="text-blue-600 hover:text-blue-800 font-semibold text-sm"
                  >
                    Read More →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </WebpageWrapper>
    </Suspense>
  );
}
