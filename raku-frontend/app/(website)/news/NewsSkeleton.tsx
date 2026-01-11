import WebpageWrapper from "@/components/wrapper/WebpageWrapper";

export default function NewsSketeton() {
  return (
    <WebpageWrapper>
      <div className="py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="aspect-2/1 bg-gray-200 rounded-lg animate-pulse"></div>
          <div className="space-y-5">
            <div className="h-3 w-40 bg-gray-100 rounded animate-pulse"></div>
            <div className="h-8 w-full bg-gray-200 rounded animate-pulse"></div>
            <div className="h-10 w-full bg-gray-100 rounded animate-pulse"></div>
            <div className="h-3 w-30 bg-gray-100 rounded animate-pulse"></div>
          </div>
        </div>
        <div className="pt-5 grid grid-cols-1 lg:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="animate-pulse">
              <div className="aspect-2/1 bg-gray-200 rounded-lg "></div>
              <div className="space-y-5 bg-gray-50 p-4">
                <div className="h-3 w-40 bg-gray-100 rounded animate-pulse"></div>
                <div className="h-8 w-full bg-gray-200 rounded animate-pulse"></div>
                <div className="h-10 w-full bg-gray-100 rounded animate-pulse"></div>
                <div className="h-3 w-full bg-gray-100 rounded animate-pulse"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </WebpageWrapper>
  );
}
