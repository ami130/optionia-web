import Image from "next/image";
import SectionHeaderPortion from "../SectionHeaderPortion";
import Link from "next/link";
import { CiCalendar, CiClock1 } from "react-icons/ci";

export default function BlogCardList({ data }: { data: any }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full px-5 lg:px-0">
      {data?.slice(0, 3)?.map((blog: any) => (
        <div
          key={blog.id}
          className="col-span-1 group cursor-pointer w-full flex flex-col"
        >
          {/* Image */}
          <div className="relative w-full aspect-[16/9] sm:aspect-[4/3] lg:aspect-[16/9] rounded-2xl overflow-hidden">
            <Image
              src={blog.image}
              alt={blog.title}
              fill
              className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-105 rounded-2xl"
            />
          </div>

          {/* Blog Content */}
          <div className="space-y-3 mt-5">
            <div className="flex">
              <SectionHeaderPortion text={blog.category} />
            </div>
            <div>
              <Link href={blog.link}>
                <h1 className="text-lg sm:text-xl font-semibold text-gray-900 transition-all duration-300 group-hover:underline">
                  {blog.title}
                </h1>
              </Link>
            </div>

            <div className="flex items-center gap-3 text-gray-600 text-sm sm:text-base">
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
  );
}
