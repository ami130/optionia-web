import { img } from "@/shared/constant/imgExport";
import React from "react";
import { CommonSecondaryButton } from "../../CommonButton";
import Link from "next/link";
import BlogCardList from "../../globalComponents/blog/BlogCardList";

export default function BlogList({ data }: { data: any }) {
  return (
    <div>
      {/* Grid Wrapper */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full px-5 lg:px-0">
        {data?.slice(0, 3)?.map((blog: any, index:number) => (
          <BlogCardList key={blog.id} blog={blog} index={index} />
        ))}
      </div>

      {/* View All Button */}
      <div className="mt-12 flex justify-center">
        <Link href="/blog">
          <CommonSecondaryButton text="View all" img={img.rightArrowIcon} />
        </Link>
      </div>
    </div>
  );
}
