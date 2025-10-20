import Image from "next/image";
import WebpageWrapper from "../wrapper/WebpageWrapper";
import HeadLine from "../HeadLine";

import { CgCalendarDates } from "react-icons/cg";
import { AiOutlineLogin } from "react-icons/ai";
import Link from "next/link";
import axios from "axios";

interface NewsItem {
  id: number;
  title: string;
  slug: string;
  category_name:string;
  content: string;
  featured_image: string | null;
  is_featured: number;
  published_at: string;
  author_name:string ,
  author_designation :string
}


async function getNewsData(): Promise<NewsItem[]> {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/news/list`);

    const allNews: NewsItem[] = response.data.data || [];
    // const featuredNews = allNews.find((item) => item.is_featured === 1);

    return allNews;
  } catch (error) {
    console.error("Failed to fetch news data:", error);
    return [];
  }
}

export default async function HomeNews() {
  const allNews = await getNewsData();
  console.log(allNews)
  const featuredNews = allNews.find((item) => item.is_featured === 1);
  const filteredNews = allNews
    .filter((item) => item.is_featured != 1)
    .slice(0, 3);
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

  return (
    <div className="relative">
      <div className="relative z-10">
        <WebpageWrapper>
          <div className="lg:w-2/3 mx-auto sm:text-center">
            <HeadLine
              preText="Latest News"
              mainText="Stay updated."
              subText="Get the most recent announcements, updates, and important information about examinations, schedules, and more."
            />
          </div>

          <div className="flex sm:justify-center mt-5">
            <Link
              href="/news"
              className="px-5 py-1.5 sm:py-2 bg-blue-900 hover:bg-blue-800 text-white font-semibold text-xs sm:text-sm rounded-lg inline-flex items-center gap-1"
            >
              Show all news
              <AiOutlineLogin className="size-5" />
            </Link>
          </div>

          <div className="flex flex-col lg:flex-row gap-15 mt-10">
            <div className="lg:w-1/2 group">
              <Link href={`/news/${featuredNews?.slug}`}>
                <div className="w-full h-[350px] relative overflow-hidden rounded-xl">
                  <Image
                    src={featuredNews?.featured_image || "/"}
                    width={512}
                    height={512}
                    alt={featuredNews?.title.slice(0,10) || ''}
                    className="size-full object-cover rounded-xl absolute top-0 group-hover:scale-110 duration-500"
                  />
                </div>
                <div className="flex gap-5 mt-5">
                  <p className="size-16 lg:size-22 rounded-t-full rounded-l-full rounded-br-2xl primary-background-color text-center p-3 text-wrap lg:text-xl font-semibold text-white">
                    {featuredNews?.published_at
                      ? formatDate(featuredNews.published_at).slice(0, 6)
                      : ""}
                  </p>
                  <div className="w-[calc(100%-64px)] lg:w-[calc(100%-88px)] space-y-5">
                    <p className="text-xs sm:text-base lg:text-xl text-gray-500 tracking-widest">
                      {featuredNews?.category_name}
                    </p>
                    <h1 className="text-lg sm:text-xl lg:text-2xl font-semibold line-clamp-1 -mt-3">
                      {featuredNews?.title}
                    </h1>
                    <div
                      className="text-gray-500 line-clamp-2 tracking-wide"
                      dangerouslySetInnerHTML={{
                        __html: featuredNews?.content ?? "",
                      }}
                    />

                    <div>
                      <p className="text-gray-500 text-sm flex gap-1 items-center">
                        <CgCalendarDates className="size-5 text-gray-500" />
                        {featuredNews?.published_at
                          ? formatDate(featuredNews.published_at)
                          : ""}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            </div>

            <div className="lg:w-1/2 flex flex-col gap-5">
              {filteredNews.map((data) => (
                <Link href={`/news/${data.slug}`} key={data.id}>
                  <div className="flex gap-5 items-center group">
                    <div className="w-1/3 h-[150px] relative overflow-hidden rounded-xl">
                      <Image
                        src={data.featured_image || "/"}
                        width={512}
                        height={512}
                        alt=  {data?.title.slice(0,10)}
                        className="size-full object-cover rounded-xl absolute top-0 group-hover:scale-110 duration-500"
                      />

                      <p className="absolute bottom-0 right-0 size-16 rounded-t-full rounded-l-full rounded-br-2xl primary-background-color text-center p-3.5 text-wrap text-sm font-semibold text-white">
                        {data?.published_at
                          ? formatDate(data.published_at).slice(0, 6)
                          : ""}
                      </p>
                    </div>

                    <div className="w-2/3 space-y-2">
                      <p className="text-xs sm:text-base text-gray-500 tracking-widest capitalize">
                        {data?.category_name}
                      </p>
                      <h1 className="text-base sm:text-xl font-semibold line-clamp-1 -mt-2">
                        {data?.title}
                      </h1>
                      <div
                        className="text-gray-500 line-clamp-2 tracking-wide text-xs sm:text-sm"
                        dangerouslySetInnerHTML={{
                          __html: data?.content ?? "",
                        }}
                      />
                      <div>
                        <p className="text-gray-500 text-xs sm:text-sm flex gap-1 items-center">
                          <CgCalendarDates className="size-5 text-gray-500" />
                          {data?.published_at
                            ? formatDate(data.published_at)
                            : ""}
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </WebpageWrapper>
      </div>

      <Image
        src="/assets/img/overlay-10.png"
        width={612}
        height={408}
        alt=""
        className="absolute top-0 right-0 size-20"
      />

      <Image
        src="/assets/img/overlay-8.png"
        width={612}
        height={408}
        alt=""
        className="absolute left-90 top-120 size-10"
      />
      <Image
        src="/assets/img/overlay-11.png"
        width={612}
        height={408}
        alt=""
        className="absolute left-1/2 top-1/2 -translate-1/2 rotate-45 size-9"
      />
      <Image
        src="/assets/img/overlay-5.png"
        width={612}
        height={408}
        alt=""
        className="absolute top-1/2 -left-30 size-56"
      />
      <Image
        src="/assets/img/overlay-9.png"
        width={612}
        height={408}
        alt=""
        className="absolute -bottom-40 -right-40 size-86 opacity-35"
      />
    </div>
  );
}
