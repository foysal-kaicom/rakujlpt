export default function DashboardSkeleton() {
  return (
    <div className="space-y-5 rounded-md w-full opacity-40">
      <div className="h-5 w-30 bg-gray-300 rounded-md animate-pulse"></div>
      <div className="h-50 w-full bg-gray-300 rounded-md p-5 flex justify-center items-center gap-5 animate-pulse">
        <div className="space-y-5 w-2/3">
          <div className="h-8 w-full bg-gray-100 rounded-md"></div>
          <div className="h-5 w-full bg-gray-100 rounded-md"></div>
          <div className="h-8 w-30 bg-gray-100 rounded-md"></div>
        </div>
        <div className="h-full w-1/3 bg-gray-200 rounded-md"></div>
      </div>
      <div className="h-5 w-30 bg-gray-300 rounded-md animate-pulse"></div>
      <div className="grid grid-cols-4 md:flex gap-5 flex-wrap">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
          <div key={i}>
            <div className="h-20 md:h-40 aspect-3/4 bg-gray-300 rounded-md p-3 flex flex-col gap-3 justify-center items-center animate-pulse">
              <div className="size-10 md:size-20 bg-gray-100 rounded-md"></div>
              <div className="h-5 w-full bg-gray-100 rounded-md"></div>
            </div>
          </div>
        ))}
      </div>
      <div className="w-full bg-gray-300 rounded-md p-5 grid grid-cols-1 md:grid-cols-2 gap-5 items-center animate-pulse">
        {[1, 2, 3, 4].map((i) => (
          <div className="p-3 bg-gray-100 rounded-md flex gap-3 animate-pulse">
            <div className="size-10 rounded-full bg-gray-300"></div>
            <div className="w-[calc(100%-50px)] space-y-2">
              <div className="h-3 w-1/3 rounded-md bg-gray-300"></div>
              <div className="h-3 w-full rounded-md bg-gray-300"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
