"use client";
import { motion, useScroll, useSpring } from "framer-motion";

interface BlogPost {
  id: string;
  title: string;
  description: string;
  content: string;
  image: string;
  author: string;
  date: string;
  readTime: string;
}

export default function BlogContentClient({
  blogPost,
}: {
  blogPost: BlogPost;
}) {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  return (
    <div className="relative">
      {/* Top Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-purple-500 origin-left z-50"
        style={{ scaleX }}
      />

      {/* Blog Content */}
      <div className="max-w-4xl mx-auto py-24 px-4 lg:px-0 space-y-6">
        <h1 className="text-4xl font-bold mb-4">{blogPost.title}</h1>
        <p className="text-gray-500 mb-8">{blogPost.description}</p>

        <div
          className="prose prose-lg"
          dangerouslySetInnerHTML={{ __html: blogPost.content }}
        />

        <p className="mt-12 text-sm text-gray-400">
          By {blogPost.author} · {blogPost.date} · {blogPost.readTime} read
        </p>
      </div>
    </div>
  );
}
