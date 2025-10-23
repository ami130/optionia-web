import { img } from "@/shared/constant/imgExport";
import Image from "next/image";
import React from "react";
import SectionHeaderPortion from "../../SectionHeaderPortion";
import { CiCalendar, CiClock1 } from "react-icons/ci";
import { CommonSecondaryButton } from "../../CommonButton";
import Link from "next/link";

export default function BlogListSecond({ data }: { data: any }) {
  return (
    <div>
      {/* Blog Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 ">
        {data.slice(0, 2).map((blog: any) => (
          <div
            key={blog.id}
            className="col-span-1 mx-auto group cursor-pointer w-full"
          >
            {/* Image with hover effect */}
            <div className="overflow-hidden hover:rounded-2xl w-full">
              <Image
                src={blog.image}
                alt={blog.title}
                width={900}
                height={900}
                className="rounded-2xl w-full object-fill transition-transform duration-500 ease-in-out group-hover:scale-105"
              />
            </div>

            {/* Blog Content */}
            <div className="space-y-3 mt-5">
              <div className="flex">
                <SectionHeaderPortion text={blog.category} />
              </div>
              <div>
                <Link href={blog.link}>
                  <h1 className="text-lg font-semibold text-gray-900 transition-all duration-300 group-hover:underline">
                    {blog.title}
                  </h1>
                </Link>
              </div>

              <div className="flex items-center gap-3 text-gray-600 text-sm">
                <div className="flex items-center gap-1">
                  <CiCalendar />
                  <p>{blog.date}</p>
                </div>
                <div className="flex items-center gap-1">
                  <CiClock1 />
                  <p>{blog.readTime}</p>
                </div>
              </div>
            </div>
          </div>
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
