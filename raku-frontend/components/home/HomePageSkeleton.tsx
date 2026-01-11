import WebpageWrapper from "@/components/wrapper/WebpageWrapper";

export default function HomePageSkeleton() {
  return (
    <div>
      <WebpageWrapper>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center my-8 animate-pulse">
          <div className="animate-pulse">
            <p className="h-4 w-30 rounded-2xl bg-violet-100 mb-5 animate-pulse"></p>
            <p className="h-7 w-[80%] rounded-2xl bg-violet-50 mb-3 animate-pulse"></p>
            <p className="h-7 w-[70%] rounded-2xl bg-violet-50 mb-5 animate-pulse"></p>
            <p className="h-4 w-[70%] rounded-2xl bg-violet-50 mb-2 animate-pulse"></p>
            <p className="h-4 w-[70%] rounded-2xl bg-violet-50 animate-pulse"></p>
            <div className="flex mt-5 gap-5 animate-pulse">
              <p className="h-7 w-25 rounded-2xl bg-violet-100 mb-5 animate-pulse"></p>
              <p className="h-7 w-25 rounded-2xl bg-violet-100 mb-5 animate-pulse"></p>
            </div>

            <div className="flex mt-5 gap-5 animate-pulse">
              <p className="h-7 w-25 rounded-2xl bg-violet-50 animate-pulse"></p>
              <p className="h-7 w-25 rounded-2xl bg-violet-50 animate-pulse"></p>
              <p className="h-7 w-25 rounded-2xl bg-violet-50 animate-pulse"></p>
            </div>
          </div>
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <article
                  key={i}
                  className="flex items-center gap-4 p-4 bg-white rounded-2xl border border-gray-100"
                >
                  <div className="shrink-0 flex items-center justify-center w-12 h-12 rounded-lg bg-purple-50 animate-pulse">
                    <p className="size-6 text-gray-700 animate-pulse"></p>
                  </div>
                  <div className="w-full animate-pulse">
                    <h3 className="bg-purple-100 h-3 w-full rounded-md animate-pulse"></h3>
                    <p className="bg-purple-50 h-3 w-full mt-1 rounded-md animate-pulse"></p>
                  </div>
                </article>
              ))}
            </div>

            <div className="rounded-2xl bg-white border border-gray-100 p-6">
              <div className="flex items-center justify-between ">
                <div className="w-[60%]">
                  <h4 className="bg-purple-100 h-5 w-2/3 rounded-md animate-pulse"></h4>
                  <p className="bg-purple-50 h-4 w-full mt-1 rounded-md animate-pulse"></p>
                </div>
                <p className="w-[30%] h-30 rounded-md bg-purple-100 animate-pulse"></p>
              </div>
            </div>
          </div>
        </div>
      </WebpageWrapper>
      <div className="bg-purple-50/20 py-10">
        <WebpageWrapper>
          <p className="h-7 max-w-1/4 rounded-2xl bg-violet-100 mb-5 mx-auto animate-pulse"></p>
          <p className="h-4 max-w-1/2 rounded-2xl bg-violet-50 mb-3 mx-auto animate-pulse"></p>
          <p className="h-4 max-w-1/3 rounded-2xl bg-violet-50 mb-3 mx-auto animate-pulse"></p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-pulse">
            {[1, 2, 3].map((i) => (
              <p
                key={i}
                className="h-46 rounded-md bg-purple-50 animate-pulse"
              ></p>
            ))}
          </div>
        </WebpageWrapper>
      </div>
    </div>
  );
}
