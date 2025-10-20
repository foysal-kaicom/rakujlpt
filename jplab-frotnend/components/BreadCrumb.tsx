'use client'

import Link from "next/link";

interface BreadCrumbItem {
  to: string;
  name: string;
}

interface BreadCrumbProps {
  breadCrumbData: BreadCrumbItem[];
}

export default function BreadCrumb({ breadCrumbData }: BreadCrumbProps) {
  return (
    <div className="flex gap-3 text-xs sm:text-sm font-semibold text-gray-500 items-center w-full">
      {breadCrumbData.map((b, i) => (
        <div key={i} className="flex gap-3 items-center">
          <Link href={b.to}>
            <p className={`cursor-pointer line-clamp-1 ${i === breadCrumbData.length - 1 ? 'text-blue-500' : ''}`}>
              {b.name}
            </p>
          </Link>

          {i !== breadCrumbData.length - 1 && (
            <p className="text-3xl font-thin">/</p>
          )}
        </div>
      ))}
    </div>
  );
}
