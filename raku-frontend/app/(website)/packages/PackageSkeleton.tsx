"use client";

const PackagesSkeleton = () => {
  return (
    <section
      id="pricingSkeleton"
      className="pb-20 pt-5 relative bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 overflow-hidden"
    >
      <div className="absolute -top-10 -left-10 w-40 h-40 bg-blue-300/20 rounded-full blur-3xl animate-bounce-slow"></div>
      <div className="absolute -bottom-10 -right-10 w-56 h-56 bg-pink-300/20 rounded-full blur-3xl animate-pulse-slow"></div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Breadcrumb skeleton */}
        <div className="flex items-center gap-2 mb-6 animate-pulse">
          <div className="h-4 w-16 bg-gray-200 rounded"></div>
          <div className="h-4 w-4 bg-gray-300 rounded-full"></div>
          <div className="h-4 w-20 bg-gray-200 rounded"></div>
        </div>

        {/* Title + description */}
        <div className="text-center mb-16 mt-15 animate-pulse">
          <div className="h-8 w-64 bg-gray-200 rounded mx-auto mb-4"></div>
          <div className="h-5 w-80 bg-gray-200 rounded mx-auto"></div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:max-w-5xl mx-auto gap-8 justify-center animate-pulse">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="rounded-2xl border border-gray-200 shadow-sm bg-white p-6"
            >
              <div className="h-6 w-32 bg-gray-200 rounded mb-4"></div>
              <div className="h-8 w-20 bg-gray-300 rounded mb-6"></div>
              <div className="h-4 w-full bg-gray-200 rounded mb-2"></div>
              <div className="h-4 w-3/4 bg-gray-200 rounded mb-4"></div>
              <div className="h-4 w-full bg-gray-200 rounded mb-2"></div>
              <div className="h-4 w-2/4 bg-gray-200 rounded mb-4"></div>
              <div className="h-10 w-full bg-gray-300 rounded"></div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-center gap-2 mt-10 animate-pulse">
          <div className="h-10 w-10 bg-gray-200 rounded-lg"></div>
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="h-10 w-10 bg-gray-200 rounded-lg"
            ></div>
          ))}
          <div className="h-10 w-10 bg-gray-200 rounded-lg"></div>
        </div>

        {/* Bottom text */}
        <div className="text-center mt-12 animate-pulse">
          <div className="h-4 w-80 bg-gray-200 rounded mx-auto mb-3"></div>
          <div className="flex justify-center items-center gap-3">
            <div className="h-4 w-24 bg-gray-200 rounded"></div>
            <div className="h-4 w-24 bg-gray-200 rounded"></div>
            <div className="h-4 w-24 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PackagesSkeleton;
