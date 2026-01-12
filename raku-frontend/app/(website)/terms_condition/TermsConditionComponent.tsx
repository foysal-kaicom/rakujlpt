"use client";
import BreadCrumb from "@/components/BreadCrumb";
import HeadLine2 from "@/components/HeadLine2";
import Loader from "@/components/Loader";
import WebpageWrapper from "@/components/wrapper/WebpageWrapper";
import axiosInstance from "@/utils/axios";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

interface TermsCondition {
  type: string;
  content: string;
}

export default function TermsConditionComponent() {
  const { t, i18n } = useTranslation("common");
  const breadCrumbData = [
    {
      name: t("breadcrumb.home"),
      to: "/",
    },
    {
      name: t("footer.terms"),
      to: "/terms_condition",
    },
  ];

  const currentLanguage = i18n.language;

  const [termsConditionData, setTermsConditionData] =
    useState<TermsCondition>();
  const [loading, setLoading] = useState(true);

  const getTermsConditionData = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(
        `/policy/page?type=terms&lang=${currentLanguage ?? "en"}`
      );
      const data: TermsCondition = response?.data?.data || {};
      setTermsConditionData(data);
    } catch (error: any) {
      console.error(error);
      toast.error(t("contact.error"));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getTermsConditionData();
  }, [currentLanguage]);

  return (
    <>
      {loading && <Loader />}
      <div className="pt-5 pb-15">
        <WebpageWrapper>
          <BreadCrumb breadCrumbData={breadCrumbData} />
          <div className="w-2/3 mt-5">
            <HeadLine2 mainText={`${t("footer.terms")}`} preText="" subText="" />
          </div>
          <div
            className="mt-3"
            dangerouslySetInnerHTML={{
              __html: termsConditionData?.content ?? "",
            }}
          />
        </WebpageWrapper>
      </div>
    </>
  );
}
