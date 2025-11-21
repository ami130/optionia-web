"use client";
import {
  CommonPrimaryButton,
  CommonSecondaryButton,
} from "@/shared/components/CommonButton";
import FeaturedBlogCard from "@/shared/components/globalComponents/blog/FeaturedBlogCard";
import SectionHeaderPortion from "@/shared/components/SectionHeaderPortion";
import { ENV_CONFIG } from "@/shared/constant/app.constant";
import { img } from "@/shared/constant/imgExport";
import { motion, useScroll, useSpring } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import { AiOutlineCheck } from "react-icons/ai";
import SingleBlogFaqSection from "./SingleBlogFaqSection";
import BlogAuthorSection from "./BlogAuthorSection";
import CustomAccordion from "@/shared/components/globalComponents/blog/According";

const features = [
  "24/7 support",
  "Unlimited options",
  "Fast delivery",
  "Secure payments",
];

interface TOCItem {
  id: string;
  title: string;
}

export default function BlogContentClient({ blogData }: { blogData: any }) {
  const {
    title,
    authors,
    createdAt,
    thumbnailUrl,
    readingTime,
    relatedBlogs,
    keyTakeaways,
    promotionalData,
    faqData,
  } = blogData || {};

  console.log("blogData", blogData);

  const [activeId, setActiveId] = useState<string>("");

  // Scroll progress bar
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  const contentRef = useRef<HTMLDivElement>(null);
  const [toc, setToc] = useState<TOCItem[]>([]);

  // Extract H2 headings for TOC
  useEffect(() => {
    if (!blogData?.content) return;

    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = blogData.content;

    const headers = Array.from(tempDiv.querySelectorAll("h2"));
    const tocItems: TOCItem[] = headers.map((header, index) => {
      const id = `header-${index}`;
      header.setAttribute("id", id);
      return { id, title: header.textContent || `Section ${index + 1}` };
    });

    setToc(tocItems);

    if (contentRef.current) {
      contentRef.current.innerHTML = tempDiv.innerHTML;
    }
  }, [blogData?.content]);

  // Observe headings for active highlight
  useEffect(() => {
    if (!contentRef.current || toc.length === 0) return;

    const headings = contentRef.current.querySelectorAll("h2");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-40% 0px -40% 0px",
        threshold: 0,
      }
    );

    headings.forEach((h) => observer.observe(h));

    return () => observer.disconnect();
  }, [toc]);

  // Smooth scroll
  const handleTOCClick = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className=" max-w-7xl mx-auto px-4 lg:px-0">
      <div className=" my-14 relative">
        {/* Scroll Progress Bar */}
        <motion.div
          className="fixed top-0 left-0 right-0 h-1 bg-purple-500 origin-left z-[999]"
          style={{ scaleX }}
        />

        <div className="lg:grid grid-cols-3 gap-[133px] w-full">
          {/* LEFT BLOG CONTENT */}
          <motion.div
            className="col-span-2"
            initial={{ x: -60, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <h1 className="font-medium text-[40px]">{title}</h1>
            {/* Metadata */}
            <div className="pt-4 pb-9 flex items-center">
              <SectionHeaderPortion text="Growth" />
              <p className="text-gray-300 px-3">|</p>
              <p className="text-[#6C737F] text-[16px]">
                Written by{" "}
                {authors?.length > 0 &&
                  authors.map((data: any, index: number) => (
                    <span key={data.id}>
                      <span className="text-[#111927] font-medium hover:underline">
                        {data.username}
                      </span>
                      {index < authors.length - 1 && ", "}
                    </span>
                  ))}
              </p>

              <p className="text-gray-300 px-3">|</p>
              <p className="text-[#6C737F] text-[16px]">
                {new Date(createdAt).toLocaleDateString("en-US")}
              </p>
              <p className="text-gray-300 px-3">|</p>
              <p className="text-[#6C737F] text-[16px]">
                {readingTime} min read
              </p>
            </div>
            {/* Thumbnail */}
            <div className="w-full rounded-2xl h-[478px]">
              <Image
                src={
                  thumbnailUrl
                    ? `${ENV_CONFIG?.baseApi}${thumbnailUrl}`
                    : img.blog1
                }
                alt={title}
                width={600}
                height={600}
                className="w-full h-full object-cover rounded-2xl"
              />
            </div>
            {/* Key Takeaways */}
            <div className="border border-[#BB8AF6] rounded-2xl bg-[#FAF6FE] p-5 mt-10">
              <div dangerouslySetInnerHTML={{ __html: keyTakeaways || "" }} />
            </div>
            {/* Blog Content */}
            <motion.div
              className="prose prose-lg max-w-full px-4 pt-24 blog-content"
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              ref={contentRef}
            />
            <CustomAccordion data={faqData} />
            <hr className="mb-12 border-[#BB8AF6]" />
            <BlogAuthorSection authors={authors} />
          </motion.div>

          {/* RIGHT TOC (Sticky) */}
          <div className="col-span-1 sticky top-24 h-max space-y-12">
            <div>
              <p className="text-[18px] font-semibold mb-6">
                Table of Contents
              </p>
              <div className="space-y-4 relative  border-l-1 border-gray-200">
                {toc.map((item) => (
                  <p
                    key={item.id}
                    id={`toc-${item.id}`}
                    className={`cursor-pointer ps-5  text-[16px] py-1 transition-colors relative
        ${
          activeId === item.id
            ? "text-[#854BFF] font-medium"
            : "text-[#384250] hover:text-[#854BFF]"
        }`}
                    onClick={() => handleTOCClick(item.id)}
                  >
                    {/* Active border highlight */}
                    {activeId === item.id && (
                      <span className="absolute -left-0 top-0 h-full w-0.5 bg-[#854BFF]" />
                    )}

                    {item.title}
                  </p>
                ))}
              </div>
            </div>
            <div className="bg-[#FAF6FE] rounded-2xl p-6 space-y-9">
              <div className="space-y-1">
                <p className="text-[#2C076E] text-2xl font-medium">
                  Stay Ahead of <br /> eCommerce Trends
                </p>
                <p className="text-[#2C076E] text-[16px] font-normal">
                  Join 15,000+ store owners getting weekly tips on product
                  design, conversions, and user experience.
                </p>
              </div>
              <div className="space-y-1">
                <div className="bg-[#F2E9FE] px-3.5 py-3 rounded-lg">
                  <input
                    placeholder="Enter Your Email"
                    type="email"
                    className="outline-none w-full"
                  />
                </div>
                <div className="mt-3">
                  <CommonPrimaryButton
                    text="Subscribe Now"
                    img={img.rightArrowWhiteIcon}
                  />
                </div>
                <p className="text-[#2C076E] text-[14px] font-normal mt-2">
                  Unsubscribe anytime. By entering your email, you agree to
                  receive marketing emails from{" "}
                  <span className="font-semibold">Optionia</span>.
                </p>
              </div>
            </div>
            <div className="bg-[#FAF6FE] rounded-2xl p-4 space-y-6">
              <Image
                src={
                  promotionalData?.image
                    ? `${ENV_CONFIG.baseApi}${promotionalData.image}`
                    : img.aboutImg2
                }
                alt={promotionalData?.title}
                width={200}
                height={200}
                className="rounded-xl"
              />
              <div className="space-y-3">
                <p className="text-[#2C076E] text-[24px] font-medium">
                  {promotionalData?.title}{" "}
                </p>
                <div className="space-y-2">
                  {promotionalData?.keywords?.map(
                    (item: string, index: number) => (
                      <div key={index} className="flex items-center gap-2">
                        <AiOutlineCheck className="text-[#A15DEF]" />
                        <p className="text-[16px] font-normal">{item}</p>
                      </div>
                    )
                  )}
                </div>
              </div>
              <div className="">
                <Link href={promotionalData?.promotional_url || "/"}>
                  <CommonPrimaryButton
                    text="Get started for Free"
                    img={img.rightArrowWhiteIcon}
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* relatives blogs */}
      <div className=" py-20 space-y-12">
        <div className=" flex items-center justify-between">
          <p className="text-5xl font-medium">Related Blogs</p>
          {relatedBlogs?.length > 3 && (
            <div className=" flex justify-center ">
              <Link href="/blog">
                <CommonSecondaryButton
                  text="View all"
                  img={img.rightArrowIcon}
                />
              </Link>
            </div>
          )}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full px-5 lg:px-0">
          {relatedBlogs?.slice(0, 3).map((blog: any, index: number) => (
            <FeaturedBlogCard key={blog.id} blog={blog} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
}

//  <div className="relative overflow-hidden flex flex-col lg:flex-row max-w-6xl mx-auto">
//         {/* Scroll Progress Bar */}
//         <motion.div
//           className="fixed top-0 left-0 right-0 h-1 bg-purple-500 origin-left z-50"
//           style={{ scaleX }}
//         />
//         {/* Blog Content */}
//         <motion.div
//           className="prose prose-lg max-w-full lg:w-3/4 px-4 py-24"
//           initial={{ x: -50, opacity: 0 }}
//           animate={{ x: 0, opacity: 1 }}
//           transition={{ delay: 0.4 }}
//           ref={contentRef}
//         ></motion.div>

//         {/* Table of Contents */}
//         <div className="hidden lg:block w-1/4 sticky top-24 h-max px-4">
//           <h3 className="font-bold mb-4">Contents</h3>
//           <ul className="list-disc list-inside space-y-1">
//             {toc.map((item) => (
//               <li
//                 key={item.id}
//                 className="cursor-pointer text-blue-600 hover:underline"
//                 onClick={() => handleTOCClick(item.id)}
//               >
//                 {item.title}
//               </li>
//             ))}
//           </ul>
//         </div>
//       </div>

{
  /* Author & Date */
}
{
  /* <motion.p
        className="mt-12 text-sm text-gray-400 lg:w-3/4 px-4"
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.6 }}
      >
        By {blogData.author} · {blogData.date}
        {blogData.readTime ? ` · ${blogData.readTime} read` : ""}
      </motion.p> */
}
