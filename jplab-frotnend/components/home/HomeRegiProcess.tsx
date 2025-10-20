import HeadLine2 from "../HeadLine2";
import WebpageWrapper from "../wrapper/WebpageWrapper";
import Image from "next/image";

export default function HomeRegiProcess() {
  const process = [
    {
      name: "Click registration option",
    },
    {
      name: "Create your account",
    },
    {
      name: "Select examination date & prefecture",
    },
    {
      name: "Complete your photo registration",
    },
    {
      name: "Payment",
    },
    {
      name: "The test day",
    },
    {
      name: "Result",
    },
    {
      name: "Certificate",
    },
  ];
  return (
    <>
      <div className="">
        <WebpageWrapper>
          <div className="grid grid-cols-1 lg:grid-cols-2  gap-15">
            <div>
              <HeadLine2
                preText="Exmination"
                mainText="Registration Procedure"
                subText="Everything you need to know to complete your registration easily."
              />
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-5 mt-10">
                {process.map((proc, index) => (
                  <div
                    key={index}
                    className={`flex flex-col gap-3 items-center p-3 sm:p-5 drop-shadow-lg rounded-lg ${
                      index % 2 == 0 ? "bg-blue-50" : "bg-white"
                    }`}
                  >
                    <p className="size-12 md:size-15 xl:size-18 border md:text-lg xl:text-2xl flex items-center justify-center rounded-full font-semibold text-white primary-background-color">
                      {index + 1}
                    </p>
                    <p className="text-xs sm:text-sm md:text-base 2xl:text-lg font-semibold text-center">
                      {proc.name}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="hidden lg:block ">
              <div className="flex gap-10 size-full">
                <div className="w-1/2 h-[500px]  relative self-end">
                  <Image
                    src="/assets/img/registration/regi-2.jpg"
                    width={512}
                    height={512}
                    alt=""
                    className="size-full object-cover rounded-tl-[25%] rounded-br-[25%] bg-blue-100"
                  />
                  <Image
                    src="/assets/img/overlay-6.png"
                    width={612}
                    height={408}
                    alt=""
                    className="absolute z-10 -bottom-10 -right-20 size-46"
                  />
                </div>
                <div className="w-1/2 h-[500px] relative">
                  <Image
                    src="/assets/img/registration/regi-3.jpg"
                    width={512}
                    height={512}
                    alt=""
                    className="size-full object-cover rounded-tl-[25%] rounded-br-[25%] bg-blue-100"
                  />
                  <Image
                    src="/assets/img/overlay-10.png"
                    width={612}
                    height={408}
                    alt=""
                    className="absolute z-10 -top-10 -left-20 size-46"
                  />
                </div>
              </div>
            </div>
          </div>
        </WebpageWrapper>
      </div>
    </>
  );
}
