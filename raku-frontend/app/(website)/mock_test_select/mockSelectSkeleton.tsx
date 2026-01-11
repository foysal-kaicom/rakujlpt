import WebpageWrapper from "@/components/wrapper/WebpageWrapper";

export default function MockTestSelectSkeleton() {
  return (
    <div className="py-20 bg-linear-to-br from-blue-50 via-pink-50 to-purple-100 min-h-[70vh]">
      <WebpageWrapper>
        <div className="md:w-2/3 xl:w-1/2 mb-8 text-center mx-auto animate-pulse">
          {/* Title skeleton */}
          <div className="mx-auto w-3/4 h-10 sm:h-12 bg-linear-to-r from-indigo-100 via-pink-100 to-purple-100 rounded-lg mb-4 animate-pulse"></div>

          {/* Subtitle skeleton lines */}
          <div className="mx-auto w-5/6 h-4 bg-gray-200/80 rounded-full mb-2 animate-pulse"></div>
          <div className="mx-auto w-2/3 h-4 bg-gray-200/80 rounded-full mb-5 animate-pulse"></div>
          <div className="mx-auto max-w-50 h-8 bg-purple-200/80 rounded-full animate-pulse"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-10">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="relative rounded-2xl bg-white border border-white/50 shadow-lg overflow-hidden p-8 animate-pulse"
            >
              <div className="flex flex-col items-center text-center">
                {/* Icon placeholder */}
                <div className="w-20 h-20 mb-5 rounded-2xl bg-linear-to-r from-pink-100 via-purple-100 to-indigo-100"></div>

                {/* Title placeholder */}
                <div className="w-2/3 h-5 bg-gray-200 rounded-full mb-3"></div>

                {/* Description placeholder */}
                <div className="w-full h-3 bg-gray-200/80 rounded-full mb-2"></div>
                <div className="w-5/6 h-3 bg-gray-200/80 rounded-full mb-6"></div>

                {/* Button placeholder */}
                <div className="w-32 h-10 bg-linear-to-r from-indigo-100 via-purple-100 to-pink-100 rounded-full"></div>
              </div>

              {/* Sparkle emoji fade-in placeholder */}
              <div className="absolute top-2 right-2 text-2xl text-gray-300 animate-pulse-slow">
                ✨
              </div>
            </div>
          ))}
        </div>
      </WebpageWrapper>
    </div>
  );
}
