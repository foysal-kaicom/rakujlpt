import Footer from "@/components/footer/footer";
import Header from "@/components/header/header";
import BrevoChat from "@/components/BrevoChat";

export const dynamic = "force-dynamic";
export default function WebLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <div className="w-full min-h-[70vh]">{children}</div>
      <BrevoChat />
      <Footer />
    </>
  );
}
