"use client";
import { motion, useScroll, useSpring } from "framer-motion";

export default function BlogContentClient({ blogPost }: { blogPost: any }) {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  return (
    <div className="relative overflow-hidden">
      {/* --- Scroll Progress Bar --- */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-purple-500 origin-left z-50"
        style={{ scaleX }}
      />

      <motion.div
        className="max-w-4xl mx-auto py-24 px-4 lg:px-0 space-y-6"
        initial={{ opacity: 0, x: -60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{
          type: "spring",
          stiffness: 80,
          damping: 20,
          duration: 0.8,
        }}
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

        {/* Subtitle/Description */}
        <motion.p
          className="text-gray-500 mb-8"
          initial={{ x: -30, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.25 }}
        >
          {blogPost.description}
        </motion.p>

        {/* Blog Content */}
        <motion.div
          className="prose prose-lg max-w-full"
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          dangerouslySetInnerHTML={{ __html: blogPost.content }}
        />

        {/* Author & Date */}
        <motion.p
          className="mt-12 text-sm text-gray-400"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
        >
          By {blogPost.author} · {blogPost.date}
          {blogPost.readTime ? ` · ${blogPost.readTime} read` : ""}
        </motion.p>
      </motion.div>
    </div>
  );
}
