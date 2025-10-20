import { ReactNode } from "react";

export default function WebpageWrapper({ children }: { children: ReactNode }) {
  return (
    <>
      <div className="px-[5%] md:px-[10%] xl:px-[15%]">
        {children}
      </div>
    </>
  );
}
