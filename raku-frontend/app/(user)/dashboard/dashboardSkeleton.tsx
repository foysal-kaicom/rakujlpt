export default function DashboardSkeleton() {
  const renderCardSkeleton = () => (
    <div className="p-5 rounded-xl shadow-md animate-pulse space-y-4 border border-transparent">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-gray-100 rounded-full"></div>
        <div className="w-24 h-4 bg-gray-100 rounded"></div>
      </div>
      <div className="w-full h-8 bg-gray-100 rounded mt-4"></div>
    </div>
  );

  const renderTableSkeleton = () => (
    <div className="hidden lg:block rounded-xl border border-gray-200 overflow-hidden">
      <div className="animate-pulse">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className={`w-full h-12 ${i % 2 === 0 ? "bg-gray-200" : "bg-gray-100"} border-b border-gray-300`}
          ></div>
        ))}
      </div>
    </div>
  );

  const renderMobileExamSkeleton = () => (
    <div className="lg:hidden space-y-5">
      {Array.from({ length: 1 }).map((_, i) => (
        <div
          key={i}
          className={`rounded-2xl border border-gray-200 p-6 shadow-md transition-all duration-300 animate-pulse ${
            i % 2 === 0
              ? "bg-gradient-to-br from-white via-gray-50 to-white"
              : "bg-white"
          }`}
        >
          <div className="h-6 w-2/3 bg-gray-300 rounded mb-2"></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm sm:text-base text-gray-700">
            <div className="h-4 w-full bg-gray-100 rounded"></div>
            <div className="h-4 w-full bg-gray-100 rounded"></div>
            <div className="h-4 w-full bg-gray-100 rounded"></div>
            <div className="h-8 w-1/2 bg-gray-100 rounded mt-2"></div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="space-y-5 bg-white p-5 rounded-md absolute w-full inset-0 pt-20 left-0 top-0 z-20">
      {/* Header */}
      <section className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
        <div className="h-6 w-1/3 bg-gray-100 rounded animate-pulse"></div>
      </section>

      {/* Cards */}
      <section className="grid grid-cols-2 xl:grid-cols-4 gap-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i}>{renderCardSkeleton()}</div>
        ))}
      </section>

      {/* Exams */}
      <div className="mt-8 space-y-3">
        <div className="h-6 w-1/3 bg-gray-100 rounded animate-pulse mb-3"></div>
        {renderTableSkeleton()}
        {renderMobileExamSkeleton()}
      </div>
    </div>
  );
}
