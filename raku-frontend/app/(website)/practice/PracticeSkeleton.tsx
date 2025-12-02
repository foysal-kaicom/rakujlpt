export default function PracticeSkeleton() {
  return (
    <div className="bg-gradient-to-br from-blue-50 via-pink-50 to-purple-50 absolute inset-0 z-30 top-20">
      <div className="container mx-auto">
        {/* Question Box */}
        <div className="p-6 mb-8 pt-5">
          <div className="flex gap-2 mb-10">
            <p className="h-3 w-20 bg-gray-200 rounded animate-pulse"></p>
            <p className="size-3 bg-gray-200 rounded animate-pulse"></p>
            <p className="h-3 w-20 bg-gray-200 rounded animate-pulse"></p>
          </div>
          <div className="h-7 w-40 bg-gray-200 rounded mb-5 mx-auto animate-pulse"></div>
          <div className="h-8 w-2/3 bg-gray-200 rounded mb-3 mx-auto animate-pulse"></div>
          <div className="h-5 w-1/2 bg-gray-200 rounded mx-auto mb-8 animate-pulse"></div>
          <div className="size-30 bg-gray-200 rounded mx-auto animate-pulse"></div>
        </div>

        <div className="p-6">
          <div className="h-7 w-1/4 bg-gray-200 rounded mb-8 animate-pulse"></div>
          <div className="space-y-4 grid grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-gray-50 flex flex-col items-center gap-4 p-4 rounded-xl shadow "
              >
                <div className="size-20 bg-gray-100 rounded-md animate-pulse"></div>
                <div className="h-4 w-1/3 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-10 w-1/2 bg-gray-100 rounded animate-pulse"></div>
                <div className="h-2 w-1/2 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-8 w-1/2 bg-gray-200 rounded animate-pulse"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
