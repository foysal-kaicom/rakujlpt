"use client";
import BreadCrumb from "@/components/BreadCrumb";
import HeadLine2 from "@/components/HeadLine2";
import WebpageWrapper from "@/components/wrapper/WebpageWrapper";
import axiosInstance from "@/utils/axios";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

interface Refund {
  type: string;
  content: string;
}

export default function RefundComponent() {
  const { t, i18n } = useTranslation("common");
  const breadCrumbData = [
    {
      name: t("breadcrumb.home"),
      to: "/",
    },
    {
      name: t("footer.refund"),
      to: "/refund_and_cancellation",
    },
  ];
  const currentLanguage = i18n.language;
  const [refundData, setRefundData] =
    useState<Refund>();
  const [loading, setLoading] = useState(true);

  const getRefundData = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(
        `/policy/page?type=return_policy&lang=${currentLanguage ?? "en"}`
      );
      const data: Refund = response?.data?.data || {};
      setRefundData(data);
    } catch (error: any) {
      console.error(error);
      toast.error(t("contact.error"));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getRefundData();
  }, [currentLanguage]);
  return (
      <div className="pt-5 pb-15">
        <WebpageWrapper>
          <BreadCrumb breadCrumbData={breadCrumbData} />
          <div className="w-2/3 mt-5">
            <HeadLine2
              mainText={t("footer.refund")}
              preText=""
              subText=""
            />
          </div>
          <div
          className="mt-3"
          dangerouslySetInnerHTML={{
            __html: refundData?.content ?? "",
          }}
        />
        </WebpageWrapper>
      </div>
  );
}
