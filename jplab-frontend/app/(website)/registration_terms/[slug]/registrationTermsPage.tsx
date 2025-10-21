"use client"; // only if this component needs to run in the browser

import WebpageWrapper from "@/components/wrapper/WebpageWrapper";
import BreadCrumb from "@/components/BreadCrumb";
import HeadLine2 from "@/components/HeadLine2";
import { useAgreementStore } from "@/stores/useAgreementStore";

import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

import { toast } from "sonner";

export default function RegistrationTerm() {
  const params = useParams();
  const slug = params.slug;
  const router = useRouter();

  const [agreed, setAgreed] = useState(false);
  const [notify, setNotify] = useState(false);

  const isFormValid = agreed && notify;

  const setAgreement = useAgreementStore((state) => state.setAgreement);

  const breadCrumbData = [
    {
      name: "Home",
      to: "/",
    },
    {
      name: "Exam Registration Pre-screening System",
      to: `/registration_terms/${slug}`,
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!agreed || !notify) {
     toast.error('You must agree to both terms')
      return;
    }

    setAgreement(true);
    router.push(`/checkout/${slug}`);
  };

  return (
    <>
      <div className="pt-5 pb-15">
        <WebpageWrapper>
          <BreadCrumb breadCrumbData={breadCrumbData} />
          <div className="w-2/3 mt-5">
            <HeadLine2
              mainText="Exam Registration"
              preText="Welcome to"
              subText="Pre-screening System"
            />
          </div>
          <p className="text-red-600 text-lg mt-5">
            * Read this carefully before you register *
          </p>

          <div className="bg-white mt-10 space-y-15 text-gray-700 leading-relaxed">
            {/* General Notes Section */}
            <div>
              <h2 className="text-3xl font-bold text-blue-700 border-l-4 border-blue-500 pl-4 mb-6">
                General Notes on Taking the Test
              </h2>
              <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 space-y-10">
                <ol className="list-decimal list-inside space-y-6 text-[16px] text-gray-800">
                  <li>
                    <strong>Once you apply</strong>, we cannot change the exam
                    date, examinee, or refund your fee.
                  </li>

                  <li>
                    Entry is allowed <strong>only after registration</strong>.
                    <p className="mt-2">
                      Also, you <strong>must bring a valid photo ID</strong> to
                      sit for the exam.
                    </p>
                    {/* ID Card Box */}
                    <div className="border-l-4 border-blue-500 bg-blue-50 p-5 rounded-lg mt-4">
                      <p className="font-semibold text-gray-800">
                        ✅ Accepted IDs
                        <span className="block text-sm font-normal text-gray-600 mt-1">
                          (Must be a valid photo ID issued in Bangladesh)
                        </span>
                      </p>
                      <ul className="list-disc pl-5 mt-2 text-sm space-y-1">
                        <li>National ID Card (NID)</li>
                        <li>Student ID</li>
                        <li>Passport</li>
                        <li>Driver’s License</li>
                      </ul>
                    </div>
                    <p className="mt-4 text-sm text-red-600 italic">
                      *Original ID only. Photocopies not accepted. No refund if
                      disqualified due to ID issues.
                    </p>
                  </li>

                  <li>
                    <strong>Devices:</strong> Turn off all electronic devices
                    (phones, PCs, etc.) during the exam.
                  </li>

                  <li>
                    <strong>Smoking:</strong> Only allowed in designated areas.
                    Follow all proctor instructions.
                  </li>

                  <li>
                    <strong>No food or drinks</strong> allowed in the test room.
                  </li>

                  <li>
                    <strong>Bring a wristwatch</strong> as there will be no
                    clock in the exam room.
                  </li>

                  <li>
                    <span className="text-red-600 font-bold text-[16px]">
                      🚫 Strictly Prohibited Actions:
                    </span>
                    <p className="mt-2 text-sm text-red-600 font-medium">
                      Violation may result in disqualification and your exam
                      will not be scored.
                    </p>

                    <ol className="list-decimal list-inside ml-6 mt-4 space-y-4 text-[15px]">
                      <li>
                        Recording (photo/video/audio) or copying test content
                      </li>
                      <li>Writing outside allowed spaces</li>
                      <li>Removing or sharing test materials</li>
                      <li>Publishing any test content (online or offline)</li>
                      <li>
                        Getting help from others:
                        <ul className="list-disc ml-6 mt-2 space-y-1 text-gray-700">
                          <li>Using unauthorized materials</li>
                          <li>Sending a substitute test taker</li>
                          <li>Talking or receiving help</li>
                          <li>Any dishonest behavior</li>
                        </ul>
                      </li>
                      <li>
                        Overstaying allotted time:
                        <ul className="list-disc ml-6 mt-2 space-y-1 text-gray-700">
                          <li>Answering before or after official time</li>
                        </ul>
                      </li>
                      <li>Acts of sabotage or disruption</li>
                    </ol>
                  </li>
                </ol>
              </div>
            </div>

            {/* Responses to Violations Section */}
            <div>
              <h2 className="text-3xl font-bold text-blue-700 border-l-4 border-blue-500 pl-4 mb-6">
                Responses to Violations
              </h2>
              <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 space-y-8">
                <ol className="list-decimal list-inside space-y-6 text-[16px]">
                  <li>
                    <strong>If you engage in any prohibited acts</strong> or if
                    there's doubt about your answer authenticity, the following
                    may apply:
                    <ul className="list-disc pl-6 mt-3 space-y-2 text-sm text-gray-700">
                      <li>Verbal warning or dismissal from the test center</li>
                      <li>Inspection of personal belongings</li>
                      <li>Your answers may not be scored</li>
                      <li>Disqualification from the test</li>
                      <li>Cancellation of test results</li>
                    </ul>
                  </li>
                  <li>
                    <strong>Proctors may move around</strong> to monitor
                    behavior and ensure fairness.
                  </li>
                </ol>
              </div>
            </div>

            {/* Cancellations Section */}
            <div>
              <h2 className="text-3xl font-bold text-blue-700 border-l-4 border-blue-500 pl-4 mb-6">
                Important Notice on Test Cancellations
              </h2>
              <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 space-y-5 text-[15px]">
                <p>
                  We may cancel or postpone the test in the event of
                  uncontrollable circumstances such as:
                </p>
                <ul className="list-disc pl-6 space-y-1 text-sm text-gray-700">
                  <li>Natural disasters</li>
                  <li>Public disturbances or strikes</li>
                  <li>Outbreaks of disease</li>
                  <li>Transport or blackout issues</li>
                  <li>Network or communication failures</li>
                </ul>
                <p>
                  If the exam is postponed, it will be rescheduled on the next
                  public test date. Only the test fee will be carried forward.
                </p>
                <p className="text-sm text-red-600 italic">
                  ※ We are not liable for personal losses, travel costs, or
                  inconvenience caused by cancellation/postponement.
                </p>
              </div>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 space-y-5 text-[15px]">
              {[
                {
                  title: "Refund Procedure",
                  content: (
                    <>
                      <p>
                        A refund request will be considered valid only if it is
                        made through the{" "}
                        <a
                          href="https://jptbd.com"
                          className="text-blue-600 underline hover:text-blue-800 transition"
                        >
                          jptbd.com
                        </a>{" "}
                        website and from the email or phone number used during
                        registration, within <strong>3 days</strong> of payment.
                      </p>
                      <p className="mt-4">
                        Refunds will be processed via the same mobile financial
                        service used during payment, within{" "}
                        <strong>7 to 10 working days</strong> of approval by JPT
                        Bangladesh Customer Service. You will receive
                        confirmation via email.
                      </p>
                    </>
                  ),
                },
                {
                  title: "Requirements for a Valid Return",
                  content: (
                    <ul className="list-disc list-inside space-y-2">
                      <li>
                        Valid proof of payment (e.g., order number or invoice)
                      </li>
                      <li>
                        A valid reason that meets our return acceptance criteria
                      </li>
                    </ul>
                  ),
                },
                {
                  title: "Return Not Applicable In These Cases",
                  content: (
                    <ul className="list-disc list-inside space-y-2">
                      <li>Refund requests made after 3 days of payment</li>
                      <li>Fraudulent or duplicate subscriptions</li>
                      <li>Missing or invalid serial numbers</li>
                      <li>Issues caused by test taker or exam center faults</li>
                      <li>Payments cannot be cancelled once confirmed</li>
                    </ul>
                  ),
                },
                {
                  title: "Refund Request Conditions",
                  content: (
                    <>
                      <p>
                        Refunds are only available if requested within{" "}
                        <strong>3 working days</strong> of payment. The refund
                        will be issued via the customer's bKash or mobile
                        wallet. Online gateway transaction fees will be
                        deducted.
                      </p>
                      <ul className="list-disc list-inside mt-3 space-y-2">
                        <li>
                          If you face any inconvenience, please contact our
                          customer support team.
                        </li>
                      </ul>
                    </>
                  ),
                },
              ].map((section, idx) => (
                <div key={idx} className="space-y-4 group">
                  <h2 className="text-lg sm:text-xl font-semibold text-blue-700 flex items-center gap-2 border-l-4 border-blue-500 pl-4 group-hover:pl-5 transition-all duration-300">
                    {section.title}
                  </h2>
                  <div className="text-gray-700 leading-relaxed">
                    {section.content}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 mt-10">
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="terms"
                name="terms"
                required
                className="h-4 w-4 border-gray-300 rounded focus:ring-blue-500"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
              />
              <label htmlFor="terms" className="text-sm text-gray-700">
                I agree to the above Terms and Condition.
              </label>
            </div>

            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="notify"
                name="notify"
                required
                className="h-4 w-4 border-gray-300 rounded focus:ring-blue-500"
                checked={notify}
                onChange={(e) => setNotify(e.target.checked)}
              />
              <label htmlFor="notify" className="text-sm text-gray-700">
                Kaicom Group will send the Job , study and cultural information
                about Japan and Bangladesh time to time. I will accept that
                information willingly.
              </label>
            </div>

            <button
              type="submit"
              // disabled={!isFormValid}
              className={`px-5 py-2 rounded transition text-white ${
                isFormValid
                  ? "bg-blue-600 hover:bg-blue-700 cursor-pointer"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
            >
              Continue
            </button>
          </form>
        </WebpageWrapper>
      </div>
    </>
  );
}
