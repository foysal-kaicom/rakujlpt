"use client";

import Image from "next/image";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import NewsSketeton from "./NewsSkeleton";

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

export default function NewsComponent() {
  const [allNews, setAllNews] = useState<NewsItem[]>([]);
  const featuredNews = allNews.find((item) => item.is_featured === 1);
  const filteredNews = allNews.filter((item) => item.is_featured != 1);
  const [loading, setLoading] = useState(true);

  function formatDate(isoDate: string) {
    const date = new Date(isoDate);
    const options: Intl.DateTimeFormatOptions = {
      day: "2-digit",
      month: "short",
      year: "numeric",
    };
    return date.toLocaleDateString("en-UK", options);
  }

  const getNewsData = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/news/list`
      );

      const allNews = response.data.data || [];

      setAllNews(allNews);
    } catch (error) {
      console.error("Failed to fetch news data:", error);
      setAllNews([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getNewsData();
  }, []);

  return (
    <>
      {loading ? (
        <NewsSketeton />
      ) : (
        <div className="pb-15 pt-8">
          {/* Featured News */}
          <div className="mb-10 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="relative aspect-2/1 h-auto w-full rounded-xl overflow-hidden shadow-lg">
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
                className="text-gray-900 mb-4 line-clamp-2"
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
                <div className="relative aspect-2/1 h-auto w-full">
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
      )}
    </>
  );
}
