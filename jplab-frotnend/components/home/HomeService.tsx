import Image from "next/image";
import WebpageWrapper from "../wrapper/WebpageWrapper";
import HeadLine from "../HeadLine";

export default function HomeService() {
  return (
    <>
      <div className="relative z-10">
        <WebpageWrapper>
          <HeadLine preText='Look into' mainText='Why Choose JPT' subText='That we offer in the process of taking the test'/>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mt-12">
            <div className="bg-white p-8 drop-shadow-md hover:shadow-2xl duration-500 rounded-md text-sm sm:text-lg xl:text-xl text-[#595cf7] flex flex-col justify-center items-center text-center gap-2">
              <Image
                src="/assets/icon/glo.png"
                width={573}
                height={435}
                alt=""
                className="size-8 sm:size-10 md:size-14 xl:size-18"
              />
             Registration from anywhere
            </div>
            <div className="bg-white p-8 drop-shadow-md hover:shadow-2xl duration-500 rounded-md text-sm sm:text-lg xl:text-xl text-[#d259f7] flex flex-col justify-center items-center text-center gap-2">
              <Image
                src="/assets/icon/exa.png"
                width={573}
                height={435}
                alt=""
                className="size-8 sm:size-10 md:size-14 xl:size-18"
              />
             Exam every month
            </div>
            <div className="bg-white p-8 drop-shadow-md hover:shadow-2xl duration-500 rounded-md text-sm sm:text-lg xl:text-xl text-[#9059f7] flex flex-col justify-center items-center text-center gap-2">
              <Image
                src="/assets/icon/acc.png"
                width={573}
                height={435}
                alt=""
                className="size-8 sm:size-10 md:size-14 xl:size-18"
              />
              Certificate in one day
            </div>
            <div className="bg-white p-8 drop-shadow-md hover:shadow-2xl duration-500 rounded-md text-sm sm:text-lg xl:text-xl text-[#f759c8] flex flex-col justify-center items-center text-center gap-2">
              <Image
                src="/assets/icon/cer.png"
                width={573}
                height={435}
                alt=""
                className="size-8 sm:size-10 md:size-14 xl:size-18"
              />
              Mock test Facility
            </div>
          </div>
        </WebpageWrapper>
      </div>
    </>
  );
}
