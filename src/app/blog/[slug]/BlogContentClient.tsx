"use client";
import SectionHeaderPortion from "@/shared/components/SectionHeaderPortion";
import { ENV_CONFIG } from "@/shared/constant/app.constant";
import { img } from "@/shared/constant/imgExport";
import { motion, useScroll, useSpring } from "framer-motion";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";

interface TOCItem {
  id: string;
  title: string;
}

export default function BlogContentClient({ blogData }: { blogData: any }) {
  const { title, authors, createdAt, thumbnailUrl, readingTime } =
    blogData || {};

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  const contentRef = useRef<HTMLDivElement>(null);
  const [toc, setToc] = useState<TOCItem[]>([]);

  // --- Extract H2 headings for TOC ---
  useEffect(() => {
    if (!blogData?.content) return;

    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = blogData.content;

    const headers = Array.from(tempDiv.querySelectorAll("h2"));
    const tocItems: TOCItem[] = headers.map((header, index) => {
      const id = `header-${index}`;
      header.setAttribute("id", id); // add id for scrolling
      return { id, title: header.textContent || `Section ${index + 1}` };
    });

    setToc(tocItems);

    // Update original content with IDs
    if (contentRef.current) {
      contentRef.current.innerHTML = tempDiv.innerHTML;
    }
  }, [blogData?.content]);

  // --- Scroll to header ---
  const handleTOCClick = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  console.log("first, ", blogData);

  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-0 my-14">
      <div className="grid grid-cols-3 gap-10 w-full border">
        <div className="col-span-2 border">
          <h1 className="font-medium text-[40px]">{title}</h1>

          {/* basic info */}
          <div className="pt-4 pb-9 flex items-center">
            <SectionHeaderPortion text="Growth" />
            <p className="text-gray-300 px-3">|</p>
            <p className="text-[#6C737F] font-normal text-[16px]">
              Written by{" "}
              <span className="text-[#111927] font-medium text-[16px] underline">
                {authors?.[0]?.username}{" "}
              </span>
            </p>
            <p className="text-gray-300 px-3">|</p>
            <p className="text-[#6C737F] font-normal text-[16px]">
              {new Date(createdAt).toLocaleDateString("en-US", {
                day: "2-digit",
                month: "long",
                year: "numeric",
              })}
            </p>
            <p className="text-gray-300 px-3">|</p>

            <p className="text-[#6C737F] font-normal text-[16px]">
              {readingTime} min read{" "}
            </p>
          </div>

          {/* thumbnail */}
          <div className="w-full rounded-2xl aspect-[16/9] lg:aspect-auto ">
            <Image
              src={
                thumbnailUrl
                  ? `${ENV_CONFIG?.baseApi}${thumbnailUrl}`
                  : img.blog1
              }
              alt={title}
              width={600}
              height={600}
              className="border w-full h-full object-cover"
              // sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        </div>
        <div className="col-span-1 border lg:block sticky top space-y-6">
          <p className="text-[18px] font-semibold">Table of Contents</p>

          <div className="list-disc list-inside space-y-4">
            {toc.map((item) => (
              <p
                key={item.id}
                className="cursor-pointer hover:text-[#854BFF] font-medium text-[16px]  text-[#384250]"
                onClick={() => handleTOCClick(item.id)}
              >
                {item.title}
              </p>
            ))}
          </div>
        </div>
      </div>
      <div className="relative overflow-hidden flex flex-col lg:flex-row max-w-6xl mx-auto">
        {/* Scroll Progress Bar */}
        <motion.div
          className="fixed top-0 left-0 right-0 h-1 bg-purple-500 origin-left z-50"
          style={{ scaleX }}
        />

        {/* Blog Content */}
        <motion.div
          className="prose prose-lg max-w-full lg:w-3/4 px-4 py-24"
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          ref={contentRef}
        >
          {/* Title */}
          <motion.h1
            className="text-4xl font-bold mb-4"
            initial={{ x: -40, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            {blogData.title}
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            className="text-gray-500 mb-8"
            initial={{ x: -30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.25 }}
          >
            {blogData.description}
          </motion.p>

          {/* Content is rendered via contentRef innerHTML */}
        </motion.div>

        {/* Table of Contents */}
        <div className="hidden lg:block w-1/4 sticky top-24 h-max px-4">
          <h3 className="font-bold mb-4">Contents</h3>
          <ul className="list-disc list-inside space-y-1">
            {toc.map((item) => (
              <li
                key={item.id}
                className="cursor-pointer text-blue-600 hover:underline"
                onClick={() => handleTOCClick(item.id)}
              >
                {item.title}
              </li>
            ))}
          </ul>
        </div>

        {/* Author & Date */}
        {/* <motion.p
        className="mt-12 text-sm text-gray-400 lg:w-3/4 px-4"
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.6 }}
      >
        By {blogData.author} · {blogData.date}
        {blogData.readTime ? ` · ${blogData.readTime} read` : ""}
      </motion.p> */}
      </div>
    </div>
  );
}
