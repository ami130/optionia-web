import Image from "next/image";
import Link from "next/link";
import SectionHeaderPortion from "../../SectionHeaderPortion";
import { CiCalendar, CiClock1 } from "react-icons/ci";

export default function BlogCardList({ blog }: { blog: any }) {
  return (
    <Link
      href={blog?.link}
      key={blog.id}
      className="col-span-1 group cursor-pointer w-full flex flex-col"
    >
      {/* ✅ Image Wrapper */}
      <div
        className="
          relative w-full rounded-2xl overflow-hidden
          aspect-[16/9]          
          lg:aspect-auto        
          lg:h-[240px]           
        "
      >
        <Image
          src={blog.image}
          alt={blog.title}
          fill
          className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-105 rounded-2xl"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>

      {/* Blog Content */}
      <div className="space-y-3 mt-5">
        <div className="flex">
          <SectionHeaderPortion text={blog.category} />
        </div>
        <div>
          <h1 className="text-lg sm:text-xl font-semibold text-gray-900 transition-all duration-300 group-hover:underline">
            {blog.title}
          </h1>
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
    </Link>
  );
}
