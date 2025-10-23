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
    <p>In today's rapidly evolving digital landscape, enterprises are constantly seeking innovative solutions to streamline operations and enhance customer experiences. AI-driven voice technology is leading this transformation.</p>

    <h2>Why Voice Technology Matters</h2>
    <p>Voice interfaces allow users to interact naturally, making processes faster and more intuitive. Companies leveraging AI voice agents report improved efficiency and customer satisfaction.</p>

    <div class="my-6">
      <img src="/api/placeholder/800/400" alt="Voice Technology" class="rounded-xl w-full object-cover" />
    </div>

    <h3>Key Benefits of AI Voice Agents</h3>
    <ul class="list-disc ml-6 space-y-2">
      <li>24/7 customer support without additional staffing costs</li>
      <li>Faster response times and fewer errors</li>
      <li>Consistent and scalable customer experience</li>
      <li>Integration with CRM and other enterprise tools</li>
    </ul>

    <br/>
    
    <h3>How It Works</h3>
    <br/>

    <ol class="list-decimal ml-6 space-y-2">
      <li>Speech input is captured from the user</li>
      <li>Natural language processing interprets the intent</li>
      <li>AI generates a contextual response</li>
      <li>Response is delivered via voice or chat</li>
    </ol>

    <blockquote class="border-l-4 border-purple-500 pl-4 italic my-6 text-gray-700">
      "The integration of AI voice technology has transformed our customer service. It’s faster, smarter, and more personal than ever."
      <cite class="block mt-2 text-sm font-semibold">- Sarah Chen, CTO of TechCorp</cite>
    </blockquote>

    <h3>Performance Metrics</h3>

    <table class="table-auto border border-gray-300 w-full my-6 text-left">
      <thead>
        <tr class="bg-gray-100">
          <th class="px-4 py-2">Metric</th>
          <th class="px-4 py-2">Before AI</th>
          <th class="px-4 py-2">After AI</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td class="px-4 py-2">Average Response Time</td>
          <td class="px-4 py-2">12 min</td>
          <td class="px-4 py-2">2 min</td>
        </tr>
        <tr>
          <td class="px-4 py-2">Customer Satisfaction</td>
          <td class="px-4 py-2">72%</td>
          <td class="px-4 py-2">91%</td>
        </tr>
        <tr>
          <td class="px-4 py-2">Support Costs</td>
          <td class="px-4 py-2">$120k/month</td>
          <td class="px-4 py-2">$75k/month</td>
        </tr>
      </tbody>
    </table>

    <h3>Sample Code Integration</h3>
    <pre class="bg-gray-100 p-4 rounded-lg overflow-x-auto">
<code>
const voiceAgent = new AIVoiceAgent();
voiceAgent.listen();
voiceAgent.respond("How can I help you today?");
</code>
    </pre>

    <h3>Conclusion</h3>
    <p>AI-powered voice agents are transforming the way enterprises interact with customers. From efficiency gains to improved satisfaction, adopting this technology is critical for scaling modern businesses.</p>

    <div class="my-6">
      <img src="/api/placeholder/800/400" alt="Future of AI" class="rounded-xl w-full object-cover" />
    </div>
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
