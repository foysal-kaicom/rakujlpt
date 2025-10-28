import Footer from "@/components/footer/footer";
import HeaderWrapper from "@/components/wrapper/HeaderWrapper";
import PopUpVedio from "@/components/popVideo/PopUpVideo";
import PoPVideoButton from "@/components/popVideo/PopVideoButton";

export const dynamic = "force-dynamic";
export default function WebLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
     <HeaderWrapper />
      <div className="w-full min-h-[70vh]">{children}</div>
      {/* <PopUpVedio />
      <PoPVideoButton /> */}
      <Footer />
    </>
  );
}
