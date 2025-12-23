export default function QuestionCompositionSkeleton() {
  return (
    <>
      <div className="bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 overflow-hidden pb-20 pt-5 min-h-[70vh]">
        <div className="max-w-6xl mx-auto px-4">
          <section className="relative pt-12">
            <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-300/30 rounded-full blur-3xl animate-bounce-slow" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-pink-300/30 rounded-full blur-3xl animate-pulse-slow" />

            <div className="relative z-10 max-w-5xl mx-auto text-center px-6">
              <div className="space-y-4" aria-busy>
                <div className="mx-auto w-64 h-12 rounded-lg bg-gray-200/60 animate-pulse" />
                <div className="mx-auto w-96 h-4 rounded bg-gray-200/60 animate-pulse" />
                <div className="mt-8 grid sm:grid-cols-3 gap-6 text-left">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <SkeletonCard key={i} />
                  ))}
                </div>

                <div className="mt-10 mx-auto w-48 h-4 rounded bg-gray-200/60 animate-pulse" />
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}

function SkeletonCard() {
  return (
    <div className="p-8 bg-white/60 backdrop-blur-md rounded-2xl shadow-lg">
      <div className="h-6 w-36 rounded bg-gray-200/60 animate-pulse mb-3" />
      <ul className="space-y-2">
        <li className="h-3 w-3/4 rounded bg-gray-200/60 animate-pulse" />
        <li className="h-3 w-2/3 rounded bg-gray-200/60 animate-pulse" />
        <li className="h-3 w-1/2 rounded bg-gray-200/60 animate-pulse" />
      </ul>
    </div>
  );
}
