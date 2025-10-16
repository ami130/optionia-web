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
    yearlyPrice: 0,
    type: "month",
    yearType: "year",
    currency: "$",
    popular: false,
    features: [
      {
        id: 1,
        title: "Free Hosting",
        active: true,
        description: "Basic hosting for small projects",
      },
      {
        id: 2,
        title: "1GB Storage",
        active: true,
        description: "Limited storage space",
      },
      {
        id: 3,
        title: "Basic Support",
        active: true,
        description: "Community forum support",
      },
      {
        id: 4,
        title: "Custom Domain",
        active: false,
        description: "Use your own domain name",
      },
      {
        id: 5,
        title: "Premium Templates",
        active: false,
        description: "Access to premium templates",
      },
    ],
    buttonText: "Get Started Free",
    buttonVariant: "secondary",
  },
  {
    id: 2,
    planTitle: "Pro",
    plan: "14 Days Trial",
    price: 19,
    yearlyPrice: 199, // discounted yearly price
    type: "month",
    yearType: "year",
    currency: "$",
    popular: true,
    features: [
      {
        id: 1,
        title: "Unlimited Hosting",
        active: true,
        description: "Host unlimited projects",
      },
      {
        id: 2,
        title: "50GB Storage",
        active: true,
        description: "Ample storage space",
      },
      {
        id: 3,
        title: "Priority Support",
        active: true,
        description: "24/7 priority support",
      },
      {
        id: 4,
        title: "Custom Domain",
        active: true,
        description: "Use your own domain name",
      },
      {
        id: 5,
        title: "Premium Templates",
        active: true,
        description: "Access to premium templates",
      },
      {
        id: 6,
        title: "Advanced Analytics",
        active: true,
        description: "Detailed performance analytics",
      },
    ],
    buttonText: "Start Free Trial",
    buttonVariant: "primary",
  },
  {
    id: 3,
    planTitle: "Enterprise",
    plan: "Custom Solution",
    price: 49,
    yearlyPrice: 499, // discounted yearly price
    type: "month",
    yearType: "year",
    currency: "$",
    popular: false,
    features: [
      {
        id: 1,
        title: "Unlimited Hosting",
        active: true,
        description: "Host unlimited projects",
      },
      {
        id: 2,
        title: "500GB Storage",
        active: true,
        description: "Massive storage capacity",
      },
      {
        id: 3,
        title: "Dedicated Support",
        active: true,
        description: "Personal account manager",
      },
      {
        id: 4,
        title: "Custom Domain",
        active: true,
        description: "Multiple custom domains",
      },
      {
        id: 5,
        title: "Premium Templates",
        active: true,
        description: "All premium templates included",
      },
      {
        id: 6,
        title: "Advanced Analytics",
        active: true,
        description: "Real-time analytics dashboard",
      },
      {
        id: 7,
        title: "API Access",
        active: true,
        description: "Full API integration",
      },
      {
        id: 8,
        title: "White Label",
        active: true,
        description: "White label solutions",
      },
    ],
    buttonText: "Contact Sales",
    buttonVariant: "secondary",
  },
];

