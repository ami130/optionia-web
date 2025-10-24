import React from "react";
import Image from "next/image";
import Link from "next/link";
import { CiCalendar, CiClock1 } from "react-icons/ci";
import SectionHeaderPortion from "../../SectionHeaderPortion";
import { blogData } from "@/shared/constant/data";

export default function BlogCardListWithFeatured({ data }: { data: any }) {
  // Separate featured and normal blogs
  const featuredBlogs = data.filter((blog: any) => blog.featured);
  const normalBlogs = data.filter((blog: any) => !blog.featured);

  return (
    <div className="space-y-12">
      {/* Featured Blogs - 2 columns */}
      {featuredBlogs.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {featuredBlogs.map((blog: any) => (
            <BlogCard key={blog.id} blog={blog} gridColumns={2} />
          ))}
        </div>
      )}

      {/* Normal Blogs - 3 columns */}
      {normalBlogs.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {normalBlogs.map((blog: any) => (
            <BlogCard key={blog.id} blog={blog} gridColumns={3} />
          ))}
        </div>
      )}
    </div>
  );
}

// Reusable Blog Card Component
function BlogCard({
  blog,
  gridColumns,
}: {
  blog: (typeof blogData)[0];
  gridColumns: 2 | 3;
}) {
  // Dynamic image height based on grid columns
  const imageHeight = gridColumns === 2 ? "h-[367px]" : "h-[240px]";

  // Aspect ratio classes for consistent proportions
  const aspectRatioClass = "aspect-[4/3]"; // 4:3 aspect ratio

  return (
    <Link
      href={blog.link}
      className="col-span-1 mx-auto group cursor-pointer w-full"
    >
      {/* Image with hover effect and consistent aspect ratio */}
      <div className={`overflow-hidden rounded-2xl w-full ${aspectRatioClass}`}>
        <Image
          src={blog.image}
          alt={blog.title}
          width={900}
          height={600}
          className={`rounded-2xl w-full ${imageHeight} object-cover transition-transform duration-500 ease-in-out group-hover:scale-105`}
          style={{
            aspectRatio: "4/3", // Ensures consistent ratio across different screen sizes
          }}
        />
      </div>

      {/* Blog Content */}
      <div className="space-y-3 mt-5">
        <div className="flex">
          <SectionHeaderPortion text={blog.category} />
        </div>
        <Link href={blog.link}>
          <h1 className="text-lg font-semibold text-gray-900 transition-all duration-300 hover:underline">
            {blog.title}
          </h1>
        </Link>

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
    </Link>
  );
}
