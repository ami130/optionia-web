import Image from "next/image";
import Link from "next/link";
import SectionHeaderPortion from "../../SectionHeaderPortion";
import { CiCalendar, CiClock1 } from "react-icons/ci";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ENV_CONFIG } from "@/shared/constant/app.constant";

export default function FeaturedBlogCard({
  blog,
  index,
}: {
  blog: any;
  index: number;
}) {
  return (
    <Link
      href={`/blog/${blog?.slug}`}
      className="col-span-1 group cursor-pointer w-full flex flex-col"
    >
      {/* Image */}
      <div className="relative w-full rounded-2xl overflow-hidden aspect-[16/9] lg:aspect-auto lg:h-[367px]">
        <Image
          src={
            blog.thumbnailUrl
              ? `${ENV_CONFIG.baseApi}${blog.thumbnailUrl}`
              : "/placeholder.png"
          }
          alt={blog.title}
          fill
          priority={index < 3} // preloads above-the-fold
          loading={index < 3 ? "eager" : "lazy"}
          className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-105 rounded-2xl"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>

      {/* Content */}
      <div className="space-y-3 mt-5">
        <SectionHeaderPortion text={blog?.category?.name} />

        {/* Title with shadcn Tooltip */}
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <h2 className="text-lg sm:text-xl mt-[12px] font-medium text-gray-900 truncate group-hover:underline cursor-pointer">
                {blog.title}
              </h2>
            </TooltipTrigger>
            <TooltipContent className="max-w-xs">{blog.title}</TooltipContent>
          </Tooltip>
        </TooltipProvider>

        {/* Date & Read time */}
        <div className="flex items-center gap-3 text-gray-600 text-sm sm:text-base">
          <div className="flex items-center gap-1">
            <CiCalendar />
            <p>
              {new Date(blog.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "2-digit",
              })}
            </p>
          </div>
          <div className="flex items-center gap-1">
            <CiClock1 />
            <p>{blog.readingTime} min read</p>
          </div>
        </div>
      </div>
    </Link>
  );
}
