"use client";
import Image from "next/image";
import React from "react";
import { img } from "../constant/imgExport";
import { footerHeaderData } from "../constant/data";

export default function FooterHeader() {
  return (
    <div className="max-w-6xl mx-auto lg:px-10 px-2">
      <div className="overflow-hidden py-12 relative">
        {/* Left fade - more dramatic */}
        <div className="absolute left-0 top-0 bottom-0 w-80 bg-gradient-to-r from-white via-white/50 to-transparent z-10" />

        {/* Right fade - more dramatic */}
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white via-white/50 to-transparent z-10" />

        <div className="flex animate-marquee whitespace-nowrap">
          {[...footerHeaderData, ...footerHeaderData].map((item, index) => (
            <div key={index} className="flex items-center">
              <h1 className="text-[#360C5F] text-[32px] md:text-[40px] font-medium ps-10 pe-6">
                {item.title}
              </h1>
              <Image
                src={item.image || img.star}
                alt={item.title}
                width={60}
                height={60}
                className=""
              />
            </div>
          ))}
        </div>

        <style jsx>{`
          .animate-marquee {
            display: inline-flex;
            animation: marquee 20s linear infinite;
          }

          @keyframes marquee {
            0% {
              transform: translateX(0%);
            }
            100% {
              transform: translateX(-50%);
            }
          }
        `}</style>
      </div>
    </div>
  );
}
