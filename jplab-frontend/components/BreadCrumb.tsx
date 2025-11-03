'use client'

import Link from "next/link";
import { FaChevronRight } from "react-icons/fa";

interface BreadCrumbItem {
  to: string;
  name: string;
}

interface BreadCrumbProps {
  breadCrumbData: BreadCrumbItem[];
}

export default function BreadCrumb({ breadCrumbData }: BreadCrumbProps) {
  return (
    <nav
      className="flex items-center gap-2 text-sm sm:text-base font-medium text-gray-500"
      aria-label="Breadcrumb"
    >
      {breadCrumbData.map((b, i) => {
        const isLast = i === breadCrumbData.length - 1;
        return (
          <div key={i} className="flex items-center gap-2">
            {!isLast ? (
              <Link
                href={b.to}
                className="transition-all duration-200 hover:text-blue-600"
              >
                {b.name}
              </Link>
            ) : (
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-500 font-semibold">
                {b.name}
              </span>
            )}

            {!isLast && (
              <FaChevronRight
                size={18}
                className="text-gray-400 shrink-0"
                strokeWidth={1.5}
              />
            )}
          </div>
        );
      })}
    </nav>
  );
}
