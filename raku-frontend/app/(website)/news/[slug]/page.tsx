"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

import WebpageWrapper from "@/components/wrapper/WebpageWrapper";
import BreadCrumb from "@/components/BreadCrumb";
import SuspenseLoader from "@/components/SuspenseLoader";

import { IoPersonCircleOutline } from "react-icons/io5";

import { NewsItem } from "@/types/index.types";
import { newsService } from "@/services/blogs/blog.service";

export default function NewsDetailsPage() {
  const params = useParams();
  const slug = Array.isArray(params?.slug) ? params.slug[0] : params.slug;

  const [newsDetails, setNewsDetails] = useState<NewsItem | null>(null);
  const [allNews, setAllNews] = useState<NewsItem[]>([]);

  const breadCrumbData = [
    { name: "Home", to: "/" },
    { name: "Blogs", to: "/news" },
    {
      name: newsDetails?.title?.slice(0, 20) + "..." || "News Details",
      to: `/news/${slug}`,
    },
  ];

  const formatDate = (isoDate: string) => {
    const date = new Date(isoDate);
    return date.toLocaleDateString("en-UK", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const fetchNewsDetails = async () => {
    if (!slug) return;
    try {
      const data = await newsService.details(slug);
      setNewsDetails(data);
    } catch (error) {
      console.error("Failed to fetch news details:", error);
      setNewsDetails(null);
    }
  };

  const getNewsList = async () => {
    try {
      const response = await newsService.list();
      setAllNews(response || []);
    } catch (error) {
      console.error("Failed to fetch news data:", error);
      setAllNews([]);
    }
  };

  useEffect(() => {
    if (!slug) return;
    fetchNewsDetails();
    getNewsList();
  }, [slug]);

  if (!newsDetails) return <SuspenseLoader />;

  return (
    <Suspense fallback={<SuspenseLoader />}>
      <div className="relative bg-gradient-to-br from-blue-50 via-pink-50 to-purple-100 overflow-clip">
        <div className="absolute -top-16 -left-16 w-60 h-60 bg-yellow-200/30 rounded-full filter blur-3xl animate-bounce-slow"></div>
        <div className="absolute -bottom-24 -right-16 w-96 h-96 bg-pink-200/30 rounded-full filter blur-3xl animate-pulse-slow"></div>
        <WebpageWrapper>
          <div className="pt-5">
            <BreadCrumb breadCrumbData={breadCrumbData} />
            <div className="w-1/2 mt-5">
              <h2 className="text-4xl sm:text-5xl font-extrabold leading-snug bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-pink-400 to-purple-500 animate-gradient-x">
                Blog Details
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 pt-10 pb-15">
            {/* Main News */}
            <article className="lg:col-span-2 bg-white shadow-md rounded-2xl overflow-hidden">
              <div className="relative h-auto aspect-2/1 w-full">
                <Image
                  src={newsDetails.featured_image || "/"}
                  alt={newsDetails.title.slice(0, 10)}
                  fill
                  className="object-cover"
                  loading="lazy"
                />
              </div>

              <div className="p-3 md:p-5 lg:p-8">
                <h1 className="text-lg md:text-2xl font-bold mb-4">
                  {newsDetails.title}
                </h1>

                <div
                  className="mb-6 text-gray-600"
                  dangerouslySetInnerHTML={{
                    __html: newsDetails.content || "",
                  }}
                />

                <div className="flex items-center gap-4 pt-6 border-t border-gray-200">
                  <div className="size-[50px] rounded-full bg-violet-400">
                    <IoPersonCircleOutline className="size-[50px] text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">
                      {newsDetails.author_name}
                    </p>
                    <p className="text-sm text-gray-500">
                      {newsDetails.author_designation} —{" "}
                      {formatDate(newsDetails.published_at)}
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
                  className={`flex items-center gap-4 p-4 rounded-lg shadow-sm hover:shadow-md duration-200 cursor-pointer hover:bg-white ${
                    newsDetails.id === item.id ? "bg-white" : "bg-gray-100"
                  }`}
                >
                  <Image
                    src={item.featured_image || "/"}
                    alt={item.title.slice(0, 3)}
                    width={50}
                    height={50}
                    className="rounded-full border border-gray-200 size-[50px] object-cover"
                    loading="lazy"
                  />
                  <div className="w-[calc(100%-50px)]">
                    <p className="font-semibold text-gray-800 line-clamp-1">
                      {item.title}
                    </p>
                    <p className="text-sm text-gray-500">
                      — {item.author_name}
                    </p>
                  </div>
                </Link>
              ))}
            </aside>
          </div>
        </WebpageWrapper>
      </div>
    </Suspense>
  );
}
