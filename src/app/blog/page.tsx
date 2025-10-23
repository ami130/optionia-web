import BlogCardListWithFeatured from "@/shared/components/globalComponents/BlogCardListWithFeatured";
import PageHeader from "@/shared/components/PageHeader";
import { blogData } from "@/shared/constant/data";

export default function BlogPage() {
  return (
    <div className="max-w-6xl mx-auto py-20 lg:px-8 px-5 space-y-12">
      <PageHeader
        text="Blog Page"
        title="Optionia Blog"
        subtitle="Start customizing your products today and watch your Shopify sales grow."
      />
      <BlogCardListWithFeatured data={blogData} />
      {/* <BlogSection /> */}
      {/* <PageHeader
        header="Engineering Toward a Trillion Enterprise Interactions"
        description="Combining frontier AI research with real-world  scale, Giga builds
          voice agents enterprises can trust."
      />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <BlogList data={blogData} />
      </div> */}
    </div>
  );
}

// import React from "react";
// import Image from "next/image";
// import Link from "next/link";

// export default function BlogDetails() {
//   // Mock blog data - replace with your actual data
//   const blogPost = {
//     id: 1,
//     title: "Engineering Toward a Trillion Enterprise Interactions",
//     description: "Combining frontier AI research with real-world scale, Giga builds voice agents enterprises can trust.",
//     content: `
//       <p>In today's rapidly evolving digital landscape, enterprises are constantly seeking innovative solutions to streamline their operations and enhance customer interactions. The integration of artificial intelligence has become paramount in achieving these goals.</p>

//       <p>Voice technology, in particular, has emerged as a game-changer for businesses looking to scale their customer service operations while maintaining a personal touch. With advancements in natural language processing and machine learning, voice agents can now understand context, detect emotions, and provide personalized responses.</p>

//       <h2>The Future of Enterprise Communication</h2>

//       <p>As we move toward a future where trillion-scale interactions become the norm, the need for reliable, scalable AI solutions has never been more critical. Traditional customer service models simply cannot keep up with the volume and complexity of modern enterprise demands.</p>

//       <p>Our research indicates that companies implementing AI-powered voice agents experience:</p>

//       <ul>
//         <li>40% reduction in customer service costs</li>
//         <li>65% improvement in response times</li>
//         <li>85% customer satisfaction rates</li>
//         <li>24/7 availability across global markets</li>
//       </ul>

//       <h3>Building Trust Through Technology</h3>

//       <p>Trust remains the cornerstone of any successful enterprise interaction. Our voice agents are designed with multiple layers of security and privacy protection, ensuring that sensitive business information remains confidential while delivering exceptional service quality.</p>

//       <blockquote>
//         "The integration of AI voice technology has transformed how we interact with our customers. The scalability and reliability have exceeded our expectations."
//         <cite>- Sarah Chen, CTO of TechCorp</cite>
//       </blockquote>

//       <p>Looking ahead, we're excited about the potential for even more sophisticated interactions. The combination of voice technology with other emerging technologies like augmented reality and IoT will create entirely new paradigms for enterprise communication.</p>
//     `,
//     image: "/api/placeholder/800/400",
//     author: "John Doe",
//     date: "December 15, 2023",
//     readTime: "8 min read",
//     category: "Technology",
//     tags: ["AI", "Enterprise", "Voice Technology", "Innovation"]
//   };

//   const relatedPosts = [
//     {
//       id: 2,
//       title: "The Future of AI in Customer Service",
//       image: "/api/placeholder/400/200",
//       date: "December 10, 2023",
//       readTime: "5 min read"
//     },
//     {
//       id: 3,
//       title: "Building Scalable Enterprise Solutions",
//       image: "/api/placeholder/400/200",
//       date: "December 5, 2023",
//       readTime: "6 min read"
//     },
//     {
//       id: 4,
//       title: "Voice Technology Trends 2024",
//       image: "/api/placeholder/400/200",
//       date: "November 28, 2023",
//       readTime: "7 min read"
//     }
//   ];

//   return (
//     <div className="min-h-screen bg-gray-50 py-8">
//       <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
//         {/* Breadcrumb */}
//         <nav className="mb-8">
//           <ol className="flex items-center space-x-2 text-sm text-gray-600">
//             <li>
//               <Link href="/" className="hover:text-gray-900 transition-colors">
//                 Home
//               </Link>
//             </li>
//             <li className="flex items-center">
//               <span className="mx-2">/</span>
//               <Link href="/blog" className="hover:text-gray-900 transition-colors">
//                 Blog
//               </Link>
//             </li>
//             <li className="flex items-center">
//               <span className="mx-2">/</span>
//               <span className="text-gray-900">{blogPost.title}</span>
//             </li>
//           </ol>
//         </nav>

//         {/* Article Header */}
//         <article className="bg-white rounded-2xl shadow-lg overflow-hidden">
//           {/* Featured Image */}
//           <div className="relative h-64 sm:h-80 md:h-96 w-full">
//             <Image
//               src={blogPost.image}
//               alt={blogPost.title}
//               fill
//               className="object-cover"
//               priority
//             />
//           </div>

//           {/* Article Content */}
//           <div className="p-6 sm:p-8 md:p-12">
//             {/* Category and Metadata */}
//             <div className="flex flex-wrap items-center gap-4 mb-6">
//               <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
//                 {blogPost.category}
//               </span>
//               <div className="flex items-center space-x-4 text-sm text-gray-600">
//                 <span>{blogPost.date}</span>
//                 <span>•</span>
//                 <span>{blogPost.readTime}</span>
//               </div>
//             </div>

//             {/* Title */}
//             <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
//               {blogPost.title}
//             </h1>

//             {/* Description */}
//             <p className="text-xl text-gray-600 mb-8 leading-relaxed">
//               {blogPost.description}
//             </p>

//             {/* Author Info */}
//             <div className="flex items-center space-x-4 mb-8 pb-8 border-b border-gray-200">
//               <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
//                 <span className="text-white font-bold text-sm">
//                   {blogPost.author.charAt(0)}
//                 </span>
//               </div>
//               <div>
//                 <p className="font-semibold text-gray-900">{blogPost.author}</p>
//                 <p className="text-sm text-gray-600">Senior AI Researcher</p>
//               </div>
//             </div>

//             {/* Article Content */}
//             <div
//               className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-li:text-gray-700 prose-blockquote:border-l-blue-500 prose-blockquote:bg-blue-50 prose-blockquote:py-2 prose-strong:text-gray-900"
//               dangerouslySetInnerHTML={{ __html: blogPost.content }}
//             />

//             {/* Tags */}
//             <div className="mt-12 pt-8 border-t border-gray-200">
//               <h3 className="text-lg font-semibold text-gray-900 mb-4">Tags</h3>
//               <div className="flex flex-wrap gap-2">
//                 {blogPost.tags.map((tag, index) => (
//                   <span
//                     key={index}
//                     className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full hover:bg-gray-200 transition-colors cursor-pointer"
//                   >
//                     #{tag}
//                   </span>
//                 ))}
//               </div>
//             </div>

//             {/* Share Buttons */}
//             <div className="mt-8 pt-8 border-t border-gray-200">
//               <h3 className="text-lg font-semibold text-gray-900 mb-4">Share this article</h3>
//               <div className="flex space-x-4">
//                 {['Twitter', 'LinkedIn', 'Facebook', 'Copy Link'].map((platform) => (
//                   <button
//                     key={platform}
//                     className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium"
//                   >
//                     {platform}
//                   </button>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </article>

//         {/* Related Posts */}
//         <section className="mt-16">
//           <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8">Related Articles</h2>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {relatedPosts.map((post) => (
//               <article
//                 key={post.id}
//                 className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden"
//               >
//                 <div className="relative h-48 w-full">
//                   <Image
//                     src={post.image}
//                     alt={post.title}
//                     fill
//                     className="object-cover"
//                   />
//                 </div>
//                 <div className="p-6">
//                   <div className="flex items-center space-x-2 text-sm text-gray-600 mb-2">
//                     <span>{post.date}</span>
//                     <span>•</span>
//                     <span>{post.readTime}</span>
//                   </div>
//                   <h3 className="text-lg font-semibold text-gray-900 mb-3 line-clamp-2">
//                     {post.title}
//                   </h3>
//                   <Link
//                     href={`/blog/${post.id}`}
//                     className="text-blue-600 hover:text-blue-700 font-medium text-sm inline-flex items-center space-x-1"
//                   >
//                     <span>Read more</span>
//                     <span>→</span>
//                   </Link>
//                 </div>
//               </article>
//             ))}
//           </div>
//         </section>

//         {/* Newsletter CTA */}
//         <section className="mt-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-8 text-center text-white">
//           <h2 className="text-2xl sm:text-3xl font-bold mb-4">Stay Updated</h2>
//           <p className="text-purple-100 mb-6 max-w-md mx-auto">
//             Get the latest articles and insights delivered to your inbox. No spam ever.
//           </p>
//           <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
//             <input
//               type="email"
//               placeholder="Enter your email"
//               className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-purple-600"
//             />
//             <button className="px-6 py-3 bg-white text-purple-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors whitespace-nowrap">
//               Subscribe
//             </button>
//           </div>
//         </section>
//       </div>
//     </div>
//   );
// }
