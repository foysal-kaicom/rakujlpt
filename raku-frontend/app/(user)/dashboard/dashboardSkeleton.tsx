export default function DashboardSkeleton() {
  return (
    <div className="space-y-5 rounded-md w-full opacity-40">
      <div className="h-5 w-30 bg-gray-300 rounded-md animate-pulse"></div>

      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-5 items-center animate-pulse">
        {[1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            className="p-3 bg-gray-300 rounded-md flex items-center gap-3 animate-pulse"
          >
            <div className="size-12 rounded-md bg-gray-50"></div>
            <div className="w-[calc(100%-50px)] space-y-2">
              <div className="h-3 w-1/3 rounded-md bg-gray-100"></div>
              <div className="h-3 w-full rounded-md bg-gray-100"></div>
            </div>
          </div>
        ))}
      </div>

      <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-5 items-center animate-pulse">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="p-3 bg-gray-300 h-40 rounded-md flex items-center gap-3 animate-pulse"
          >
          </div>
        ))}
      </div>

      <div className="w-full bg-gray-300 rounded-md p-5 space-y-5 animate-pulse">
         <div className="h-5 w-30 bg-gray-50 rounded-md animate-pulse"></div>
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="p-3 bg-gray-100 rounded-md flex gap-3 animate-pulse"
          >
            <div className="size-10 rounded-full bg-gray-300"></div>
            <div className="w-[calc(100%-50px)] space-y-2">
              <div className="h-3 w-1/3 rounded-md bg-gray-300"></div>
              <div className="h-3 w-1/4 rounded-md bg-gray-300"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
