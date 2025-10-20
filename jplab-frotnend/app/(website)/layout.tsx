import Footer from "@/components/footer/footer";
import Header from "@/components/header/header";
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
      <Header />
      <div className="w-full min-h-[70vh] pt-20 xl:pt-0">{children}</div>
      <PopUpVedio />
      <PoPVideoButton />
      <Footer />
    </>
  );
}
