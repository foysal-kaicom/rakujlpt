import BreadCrumb from "@/components/BreadCrumb";
import HeadLine2 from "@/components/HeadLine2";
import WebpageWrapper from "@/components/wrapper/WebpageWrapper";
import AmountComponent from "./amontComponent";
import SuspenseLoader from "@/components/SuspenseLoader";

import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";

import { LuCalendarClock } from "react-icons/lu";
import { MdOutlineNotificationsActive } from "react-icons/md";


export default function ResultAndCertificate() {
  const breadCrumbData = [
    { name: "Dashboard", to: "/dashboard" },
    { name: "Result & Certificate", to: "/exam_result" },
  ];
  
  return (
    <Suspense fallback={<SuspenseLoader/>}>
    <div className="relative overflow-clip">
      <WebpageWrapper>
        <div className="pt-5 pb-15 relative z-10">
          <BreadCrumb breadCrumbData={breadCrumbData} />
          <div className="md:w-1/2 mt-5">
            <HeadLine2
              mainText="Results & Certificate"
              subText=""
              preText="How to get exam"
            />
          </div>
          <div className="mt-10 space-y-10">
            {/* Result Notification Card */}
            <div className="p-6 bg-white shadow-md rounded-2xl border border-gray-100 hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 flex items-center justify-center rounded-full bg-green-100">
                    <MdOutlineNotificationsActive className="size-7 text-green-800" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-600 mb-1">
                    Result Notification
                  </h3>
                  <p className="text-gray-700">
                    Once the result is published, you will receive a message on
                    your registered number.
                  </p>
                  <p className="text-sm text-gray-500 mt-2">
                    You can also view your score in your profile.
                  </p>
                </div>
              </div>
            </div>

            {/* Certificate Info Card */}
            <div className="p-6 bg-white shadow-md rounded-2xl border border-gray-100 hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 flex items-center justify-center rounded-full bg-blue-100">
                    <LuCalendarClock className="size-7 text-blue-600" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    Certificate Collection Info
                  </h3>
                  <ul className="text-gray-700 text-sm space-y-1 list-disc">
                    <li>
                      Apply from your profile after results are published.
                    </li>
                    <li>
                      Application fee:{" "}
                      <span className="font-semibold text-gray-900">
                       <AmountComponent/>
                      </span>
                    </li>
                    <li>
                      Ready within{" "}
                      <span className="font-semibold text-gray-900">
                        3–4 working days
                      </span>
                      .
                    </li>
                    <li>
                      You’ll get an{" "}
                      <span className="font-semibold text-gray-900">
                        email notification
                      </span>{" "}
                      once it's ready.
                    </li>
                    <li>Collect your certificate from our office.</li>
                    <li>
                      Need help? Use the{" "}
                      <Link href='/support' className="text-blue-600 underline hover:text-blue-700 transition">
                        Support
                      </Link>{" "}
                      option in your profile.
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </WebpageWrapper>
      <Image
        src="/assets/img/overlay-6.png"
        width={612}
        height={408}
        alt=""
        className="absolute -top-20 left-150 size-36"
      />

      <Image
        src="/assets/img/overlay-10.png"
        width={612}
        height={408}
        alt=""
        className="absolute top-0 right-0 size-20"
      />

      <Image
        src="/assets/img/overlay-5.png"
        width={612}
        height={408}
        alt=""
        className="absolute bottom-1/2 -left-30 size-56"
      />
      <Image
        src="/assets/img/overlay-9.png"
        width={612}
        height={408}
        alt=""
        className="absolute bottom-10 -right-40 size-86 opacity-35"
      />
    </div>
    </Suspense>
  );
}
