import Footer from "@/components/footer/footer";
import PopUpVedio from "@/components/popVideo/PopUpVideo";
import PoPVideoButton from "@/components/popVideo/PopVideoButton";
import Header from "@/components/header/header";

export const dynamic = "force-dynamic";
export default function WebLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
     <Header/>
      <div className="w-full min-h-[70vh]">{children}</div>
      {/* <PopUpVedio />
      <PoPVideoButton /> */}
      <Footer />
    </>
  );
}
