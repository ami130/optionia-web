import { img } from "@/shared/constant/imgExport";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { IoIosArrowRoundForward } from "react-icons/io";

export default function SupportSubSection({ data }: { data: any[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {data.map((item, index) => (
        <div
          key={item.id}
          className={`p-6 pe-0 space-y-5 transition-all duration-300 ease-in-out
              ${index === 0 ? "" : "lg:border-l-2 border-l-0"} 
              border-primaryColor`}
        >
          {/* Icon Section */}
          <div className="w-10 h-10 p-1 rounded-xl flex items-center justify-center bg-[#F2E9FE] border-2 border-primaryColor">
            <Image
              src={item.img}
              alt={item.title}
              width={24}
              height={24}
              className="object-contain"
            />
          </div>

          {/* Text Section */}
          <div className="space-y-3">
            <h1 className="text-secondaryTextColor font-semibold text-lg transition-colors duration-300">
              {item.title}
            </h1>
            <p className="text-sm font-light text-gray-900">{item.subtitle}</p>
          </div>

          {/* Button as Link */}
          <Link
            href={item.link}
            className="flex items-center gap-1 text-gray-700 font-medium transition-colors duration-200 hover:text-baseColor"
          >
            <span>{item.buttonText}</span>
            <IoIosArrowRoundForward className="w-6 h-6" />
          </Link>
        </div>
      ))}
    </div>
  );
}
