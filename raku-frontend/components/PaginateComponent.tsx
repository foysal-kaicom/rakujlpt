import { MdOutlineKeyboardArrowLeft , MdOutlineKeyboardArrowRight } from "react-icons/md";


export default function PaginatedComponent({
  totalPages,
  currentPage,
  handlePageChange,
}: any) {
  return (
    <>
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-4 text-sm md:text-lg">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-3 py-1 rounded-md flex items-center border border-purple-500 ${
              currentPage === 1
                ? "bg-white text-purple-700 cursor-not-allowed"
                : "bg-purple-600 text-white hover:scale-105 cursor-pointer"
            }`}
          >
            <MdOutlineKeyboardArrowLeft className="size-5 md:size-6"/>
          </button>

          {Array.from({ length: totalPages })
            .slice(
              Math.max(0, currentPage - 2),
              Math.min(totalPages, Math.max(3, currentPage + 1))
            )
            .map((_, i, arr) => {
              const pageNum =
                currentPage <= 2
                  ? i + 1
                  : totalPages - currentPage < 1
                  ? totalPages - arr.length + i + 1
                  : currentPage - 2 + i + 1;
              return (
                <button
                  key={pageNum}
                  onClick={() => handlePageChange(pageNum)}
                  className={`px-3 py-1 rounded-md cursor-pointer ${
                    currentPage === pageNum
                      ? "bg-purple-600 text-white"
                      : "bg-white text-purple-700 hover:scale-105"
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`px-3 py-1 rounded-md flex items-center ${
              currentPage === totalPages
                ? "bg-white text-purple-700 cursor-not-allowed"
                : "bg-purple-600 text-white hover:scale-105 cursor-pointer"
            }`}
          >
           <MdOutlineKeyboardArrowRight className="size-5 md:size-6"/>
          </button>
        </div>
      )}
    </>
  );
}
