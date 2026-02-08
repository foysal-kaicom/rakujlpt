"use client";
import BreadCrumb from "@/components/BreadCrumb";
import HeadLine2 from "@/components/HeadLine2";
import WebpageWrapper from "@/components/wrapper/WebpageWrapper";
import axiosInstance from "@/utils/axios";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "raku-toast-react";

interface PrivacyPolicy {
  type: string;
  content: string;
}

export default function PrivacyPolicyComponent() {
  const { t, i18n } = useTranslation("common");
  const breadCrumbData = [
    {
      name: t("breadcrumb.home"),
      to: "/",
    },
    {
      name: t("footer.privacy"),
      to: "/privacy_policy",
    },
  ];
  const currentLanguage = i18n.language;
  const [privacyPolicyData, setPrivacyPolicyData] =
    useState<PrivacyPolicy>();
  const [loading, setLoading] = useState(true);

  const getPrivacyPolicyData = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(
        `/policy/page?type=privacy&lang=${currentLanguage ?? "en"}`
      );
      const data: PrivacyPolicy = response?.data?.data || {};
      setPrivacyPolicyData(data);
    } catch (error: any) {
      console.error(error);
      toast.error(t("contact.error"));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPrivacyPolicyData();
  }, [currentLanguage]);
  return (
    <div className="pt-5 pb-15">
      <WebpageWrapper>
        <BreadCrumb breadCrumbData={breadCrumbData} />
        <div className="w-2/3 mt-5">
          <HeadLine2 mainText={t("footer.privacy")} preText="" subText="" />
        </div>
        <div
          className="mt-3"
          dangerouslySetInnerHTML={{
            __html: privacyPolicyData?.content ?? "",
          }}
        />
      </WebpageWrapper>
    </div>
  );
}
