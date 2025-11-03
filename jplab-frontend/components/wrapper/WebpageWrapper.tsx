import { ReactNode } from "react";

export default function WebpageWrapper({ children }: { children: ReactNode }) {
  return (
    <>
      <div className="px-6 lg:px-8 relative container mx-auto">
        {children}
      </div>
    </>
  );
}
