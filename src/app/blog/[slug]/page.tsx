import BlogContentClient from "./BlogContentClient";

// Simulate server-side fetching
async function getBlog(id: string) {
  // Replace this with your actual DB/API call
  return {
    id,
    title: "Engineering Toward a Trillion Enterprise Interactions",
    description:
      "Combining frontier AI research with real-world scale, Giga builds voice agents enterprises can trust.",
    content: `
   <p>
    <span style="font-size: 18px;">Quill Rich Text Editor</span>
</p>
<p>
    <br>
</p>

<p>
    <br>
</p>
<blockquote>Fast and lightweight</blockquote>
<ul>
    <li>Semantic markup</li>
    <li>Standardized HTML between browsers</li>
    <li>Cross browser support including Chrome, Firefox, Safari, and IE 9+</li>
</ul>
<p>
    <br>
</p>
<p>
    <span style="font-size: 18px;">Downloads</span>
</p>
<p>
    <br>
</p>
<ul>
    <li>
        <a href="https://quilljs.com" target="_blank">Quill.js</a>, the free, open source WYSIWYG editor</li>
    <li>
        <a href="https://zenoamaro.github.io/react-quill" target="_blank">React-quill</a>, a React component that wraps Quill.js</li>
</ul>
<p>
    <br>
</p>
<p class="ql-align-justify">
    <s style="font-size: large; color: rgb(230, 0, 0); background-color: rgb(255, 255, 102);">sdfcsdhfklsdj</s>
</p>
<p class="ql-align-justify">
    <span style="font-size: large;">sadasdjkas</span>
</p>
<p class="ql-align-justify">
    <span style="font-size: large;">asdas</span>
</p>
<p>
    <br>
</p>
<blockquote>l
    <span style="font-family: monospace;">orem5000000000000000000000000000 DSCDSL JCSKLJC SCKJLHSDA KCS;KMhsac sdj schdsncbshjbcn</span>
</blockquote>
  `,
    image: "/api/placeholder/800/400",
    author: "John Doe",
    date: "December 15, 2023",
    readTime: "8 min read",
  };
}

interface Props {
  params: { id: string };
}

export default async function BlogPage({ params }: Props) {
  const blogPost = await getBlog(params.id);

  return (
    <div>
      {/* Pass blogPost to a Client Component */}
      <BlogContentClient blogPost={blogPost} />
    </div>
  );
}

// "use client";
// import { motion, useSpring, useScroll } from "framer-motion";

// export default function BlogDetailPage() {
//   const { scrollYProgress } = useScroll();

//   // Smooth animation
//   const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

//   const blogPost = {
//     id: 1,
//     title: "Engineering Toward a Trillion Enterprise Interactions",
//     description:
//       "Combining frontier AI research with real-world scale, Giga builds voice agents enterprises can trust.",
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
//     tags: ["AI", "Enterprise", "Voice Technology", "Innovation"],
//   };

//   const relatedPosts = [
//     {
//       id: 2,
//       title: "The Future of AI in Customer Service",
//       image: "/api/placeholder/400/200",
//       date: "December 10, 2023",
//       readTime: "5 min read",
//     },
//     {
//       id: 3,
//       title: "Building Scalable Enterprise Solutions",
//       image: "/api/placeholder/400/200",
//       date: "December 5, 2023",
//       readTime: "6 min read",
//     },
//     {
//       id: 4,
//       title: "Voice Technology Trends 2024",
//       image: "/api/placeholder/400/200",
//       date: "November 28, 2023",
//       readTime: "7 min read",
//     },
//   ];

//   return (
//     <div className="relative">
//       {/* Top Progress Bar */}
//       <motion.div
//         className="fixed top-0 left-0 right-0 h-1 bg-purple-500 origin-left z-50"
//         style={{ scaleX }}
//       />

//       {/* Blog Content */}
//       <div className="max-w-4xl mx-auto py-24 px-4 lg:px-0 space-y-6">
//         <h1 className="text-4xl font-bold mb-6">Blog Title</h1>
//         {[...Array(50)].map((_, i) => (
//           <p key={i} className="mb-4">
//             Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eaque,
//             hic?
//           </p>
//         ))}
//       </div>
//     </div>
//   );
// }
