import { img } from "./imgExport";

export const Features = [
  {
    title: "Matthias Leidinger",
    description:
      "Originally hailing from Austria, Berlin-based photographer Matthias Leindinger is a young creative brimming with talent and ideas.",
    src: img.optionia1,
    link: "https://www.ignant.com/2023/03/25/ad2186-matthias-leidingers-photographic-exploration-of-awe-and-wonder/",
    color: "#BBACAF",
  },
  {
    title: "Clément Chapillon",
    description:
      "This is a story on the border between reality and imaginary, about the contradictory feelings that the insularity of a rocky, arid, and wild territory provokes”—so French photographer Clément Chapillon describes his latest highly captivating project Les rochers fauves (French for ‘The tawny rocks’).",
    src: img.optionia1,
    link: "https://www.ignant.com/2022/09/30/clement-chapillon-questions-geographical-and-mental-isolation-with-les-rochers-fauves/",
    color: "#977F6D",
  },
  {
    title: "Zissou",
    description:
      "Though he views photography as a medium for storytelling, Zissou’s images don’t insist on a narrative. Both crisp and ethereal, they’re encoded with an ambiguity—a certain tension—that lets the viewer find their own story within them.",
    src: img.optionia1,
    link: "https://www.ignant.com/2023/10/28/capturing-balis-many-faces-zissou-documents-the-sacred-and-the-mundane-of-a-fragile-island/",
    color: "#C2491D",
  },
  {
    title: "Mathias Svold and Ulrik Hasemann",
    description:
      "The coastlines of Denmark are documented in tonal colors in a pensive new series by Danish photographers Ulrik Hasemann and Mathias Svold; an ongoing project investigating how humans interact with and disrupt the Danish coast.",
    src: img.optionia1,
    link: "https://www.ignant.com/2019/03/13/a-photographic-series-depicting-the-uncertain-future-of-denmarks-treasured-coastlines/",
    color: "#B62429",
  },
  {
    title: "Mark Rammers",
    description:
      "Dutch photographer Mark Rammers has shared with IGNANT the first chapter of his latest photographic project, ‘all over again’—captured while in residency at Hektor, an old farm in Los Valles, Lanzarote. Titled ‘Beginnings’, the mesmerizing collection of images is a visual and meditative journey into the origins of regrets and the uncertainty of stepping into new unknowns.",
    src: img.optionia1,
    link: "https://www.ignant.com/2023/04/12/mark-rammers-all-over-again-is-a-study-of-regret-and-the-willingness-to-move-forward/",
    color: "#88A28D",
  },
];

export const workData = [
  {
    id: 1,
    title: "Hello Brother",
    subtitle:
      "Experience seamless collaboration with tools designed to keep your team connected and productive every day.",
    img: img.work1,
  },
  {
    id: 2,
    title: "Creative Solutions",
    subtitle:
      "Empower your projects with smart, flexible solutions built to adapt and grow with your business goals.",
    img: img.work2,
  },
  {
    id: 3,
    title: "Innovate Boldly",
    subtitle:
      "Turn ideas into impactful results through innovation, collaboration, and cutting-edge technology.",
    img: img.work1,
  },
  {
    id: 4,
    title: "Empower Teams",
    subtitle:
      "Build stronger teams with tools that simplify communication, boost engagement, and enhance productivity.",
    img: img.work2,
  },
];

export const chooseOptionia = [
  {
    id: 1,
    title: "24/6 Support",
    subtitle:
      "Our dedicated support team is always here to help six days a week.",
    img: img.chooseOption1,
  },
  {
    id: 2,
    title: "Free Version Available",
    subtitle: "Start customizing your products right away with our free plan.",
    img: img.chooseOption2,
  },
  {
    id: 3,
    title: "No Coding Required",
    subtitle: "No developers, no hassle just plug in and start customizing",
    img: img.chooseOption3,
  },
  {
    id: 4,
    title: "Easy to Use",
    subtitle: "Optionia is built for everyone  from beginners to experts.",
    img: img.chooseOption4,
  },
];

export const supportData = [
  {
    id: 1,
    title: "Live Chat Support",
    subtitle:
      "Chat with our support team directly from your dashboard for instant help and real-time solutions.",
    img: img.support1,
    link: "/",
    buttonText: "Chat Now",
  },
  {
    id: 2,
    title: "Email Support",
    subtitle:
      "Reach out anytime at support@optionia.com we typically reply within a few hours.",
    img: img.support2,
    link: "/",
    buttonText: "Email Us",
  },
  {
    id: 3,
    title: "Video Tutorials",
    subtitle:
      "Watch easy-to-follow video tutorials that guide you through setup, customization, and advanced features.",
    img: img.support3,
    link: "/",
    buttonText: "Watch Videos",
  },
  {
    id: 4,
    title: "Help Center",
    subtitle:
      "Visit our Help Center for step-by-step guides, tutorials, and tips to make the most of Optionia.",
    img: img.support4,
    link: "/",
    buttonText: "Visit Help Center",
  },
];

export const pricingPlans = [
  {
    id: 1,
    planTitle: "Free",
    plan: "Free Forever",
    price: 0,
    type: "month",
    currency: "$",
    popular: false,
    features: [
      { id: 1, title: "Up to 10 Option Sets" },
      { id: 2, title: "Up to 20 Products" },
      { id: 3, title: "Basic Support" },
      { id: 4, title: "Community Access" },
    ],
    buttonText: "Get Started",
  },
  {
    id: 2,
    planTitle: "Pro",
    plan: "14 Days Trial",
    price: 9.99,
    type: "month",
    currency: "$",
    popular: false,
    features: [
      { id: 1, title: "Up to 50 Option Sets" },
      { id: 2, title: "Unlimited Products" },
      { id: 3, title: "Priority Support" },
      { id: 4, title: "Advanced Analytics" },
    ],
    buttonText: "Get Started",
  },
  {
    id: 3,
    planTitle: "Advanced",
    plan: "14-day free trial",
    price: 19.99,
    type: "month",
    currency: "$",
    popular: true,
    features: [
      { id: 1, title: "Unlimited Option Sets" },
      { id: 2, title: "Unlimited Products" },
      { id: 3, title: "Premium Support" },
      { id: 4, title: "Complex Conditional Logic" },
      { id: 5, title: "Price Add-ons & Upsells" },
      { id: 6, title: "All Option Types (30+)" },
      { id: 7, title: "Multi-File Upload" },
      { id: 8, title: "Editor for Image Uploads" },
      { id: 9, title: "Edit Options in Cart" },
    ],
    buttonText: "Get Started",
  },
];

export const blogData = [
  {
    id: 1,
    category: "Growth",
    title: "How to Use Product Customization as an Upselling Strategy",
    date: "November 01, 2025",
    readTime: "7 min read",
    image: img.blog2,
    link: "/blog/how-to-use-product-customization",
    order: 1,
    featured: true, // featured item
  },
  {
    id: 2,
    category: "E-commerce",
    title: "Boost Your Sales with Personalization Techniques",
    date: "October 25, 2025",
    readTime: "5 min read",
    image: img.blog1 || img.blog1,
    link: "/blog/boost-your-sales",
    order: 2,
    featured: true, // featured item
  },
  {
    id: 3,
    category: "Marketing",
    title: "Top 10 Strategies to Increase Customer Retention in 2025",
    date: "October 10, 2025",
    readTime: "6 min read",
    image: img.blog3 || img.blog1,
    link: "/blog/customer-retention-2025",
    order: 3,
    featured: false, // not featured
  },
  {
    id: 4,
    category: "Marketing",
    title: "Top 10 Strategies to Increase Customer Retention in 2025",
    date: "October 10, 2025",
    readTime: "6 min read",
    image: img.blog6 || img.blog1,
    link: "/blog/customer-retention-2025",
    order: 3,
    featured: false, // not featured
  },
  {
    id: 5,
    category: "Marketing",
    title: "Top 10 Strategies to Increase Customer Retention in 2025",
    date: "October 10, 2025",
    readTime: "6 min read",
    image: img.blog5,
    link: "/blog/customer-retention-2025",
    order: 3,
    featured: false, // not featured
  },
];

// footerHeaderData.ts (or inside FooterHeader.tsx)
export const footerHeaderData = [
  {
    id: 1,
    title: "Unlimited Options",
    image: img.star, // or img.star if using imports
  },
  {
    id: 2,
    title: "Effortless",
    image: img.star,
  },
  {
    id: 3,
    title: "Boost Sale",
    image: img.star,
  },
  {
    id: 4,
    title: "Product",
    image: img.star,
  },
];
