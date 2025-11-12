"use client";
import { motion, useScroll, useSpring } from "framer-motion";
import { useEffect, useState, useRef } from "react";

interface TOCItem {
  id: string;
  title: string;
}

export default function BlogContentClient({ blogPost }: { blogPost: any }) {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  const contentRef = useRef<HTMLDivElement>(null);
  const [toc, setToc] = useState<TOCItem[]>([]);

  // --- Extract H2 headings for TOC ---
  useEffect(() => {
    if (!blogPost?.content) return;

    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = blogPost.content;

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
  }, [blogPost?.content]);

  // --- Scroll to header ---
  const handleTOCClick = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="relative overflow-hidden flex flex-col lg:flex-row max-w-6xl mx-auto">
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-purple-500 origin-left z-50"
        style={{ scaleX }}
      />

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
          {blogPost.title}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="text-gray-500 mb-8"
          initial={{ x: -30, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.25 }}
        >
          {blogPost.description}
        </motion.p>

        {/* Content is rendered via contentRef innerHTML */}
      </motion.div>

      {/* Author & Date */}
      {/* <motion.p
        className="mt-12 text-sm text-gray-400 lg:w-3/4 px-4"
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.6 }}
      >
        By {blogPost.author} · {blogPost.date}
        {blogPost.readTime ? ` · ${blogPost.readTime} read` : ""}
      </motion.p> */}
    </div>
  );
}
