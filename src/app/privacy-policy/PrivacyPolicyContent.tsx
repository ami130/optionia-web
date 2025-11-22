"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";

interface TOCItem {
  id: string;
  title: string;
}

export default function PrivacyPolicyContent({ content }: { content: string }) {
  const contentRef = useRef<HTMLDivElement | null>(null);
  const [toc, setToc] = useState<TOCItem[]>([]);
  const [activeId, setActiveId] = useState<string>("");

  // Scroll progress bar
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  // Smooth scroll
  const handleTOCClick = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // Extract H2 tags + assign IDs
  useEffect(() => {
    if (!content) return;

    const temp = document.createElement("div");
    temp.innerHTML = content ?? "";

    const headers = Array.from(temp.querySelectorAll("h2"));
    const tocItems = headers.map((h, index) => {
      const id = `section-${index}`;
      h.setAttribute("id", id);
      return { id, title: h.textContent || `Section ${index + 1}` };
    });

    setToc(tocItems);
    if (contentRef.current) contentRef.current.innerHTML = temp.innerHTML;
  }, [content]);

  // Track active section
  useEffect(() => {
    if (!contentRef.current || toc.length === 0) return;

    const headings = contentRef.current.querySelectorAll("h2");
    if (!headings.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -40% 0px", threshold: 0 }
    );

    headings.forEach((h) => observer.observe(h));

    return () => observer.disconnect();
  }, [toc]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    window.scrollTo({ top: el.offsetTop - 80, behavior: "smooth" });
  };

  return (
    <div className=" lg:grid grid-cols-3 gap-[133px] px-4 lg:px-0 ">
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-purple-500 origin-left z-[999]"
        style={{ scaleX }}
      />
      {/* LEFT CONTENT */}
      <div className="col-span-2">
        <motion.div
          className="prose prose-lg max-w-full px-4  blog-content"
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          ref={contentRef}
        />
      </div>

      {/* RIGHT SIDEBAR - TOC */}
      <div className="sticky top-24 h-max">
        <p className="text-[18px] font-semibold mb-6">Table of Contents</p>

        <div className="space-y-4 relative border-l-1 border-gray-200">
          {toc.map((item) => (
            <p
              key={item.id}
              id={`toc-${item.id}`}
              className={`cursor-pointer ps-5 text-[16px] py-1 transition-colors relative
        ${
          activeId === item.id
            ? "text-[#854BFF] font-medium"
            : "text-[#384250] hover:text-[#854BFF]"
        }`}
              onClick={() => handleTOCClick(item.id)}
            >
              {/* Active border highlight (thicker now) */}
              {activeId === item.id && (
                <span
                  className="absolute -left-0 top-0 h-full  bg-[#854BFF]"
                  style={{ width: "1px" }}
                />
              )}

              {item.title}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}
