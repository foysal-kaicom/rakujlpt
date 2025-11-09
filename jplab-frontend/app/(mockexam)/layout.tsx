export const dynamic = "force-dynamic";
export default function WebLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="w-full min-h-[70vh] ">{children}</div>
    </>
  );
}
