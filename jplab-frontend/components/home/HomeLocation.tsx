// app/components/HomeLocation.tsx
import WebpageWrapper from "../wrapper/WebpageWrapper";
import HeadLine2 from "../HeadLine2";
import LocationComponent from "../LocationComponent";

interface Center {
  id: string | number;
  name: string;
  address: string;
  location: string;
}

const getExamCenterList = async (): Promise<Center[]> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/center/list`, {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Failed to fetch centers");
  const data = await res.json();
  return data?.data || [];
};

export default async function HomeLocation() {
  const centers = await getExamCenterList();

  return (
    <div>
      <WebpageWrapper>
        <HeadLine2
          preText="Visit our multiple"
          mainText="Exam Center"
          subText="Locating all over Dhaka, Bangladesh"
        />
        <LocationComponent centers={centers} />
      </WebpageWrapper>
    </div>
  );
}
