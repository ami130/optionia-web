import { img } from "@/shared/constant/imgExport";

export const homeData = [
  // 1. Hero Section
  {
    id: "1",
    name: "hero-section",
    title: "Shopify product options app",
    subtitle: "Unlimited Product Options to your Shopify Stores",
    description:
      "Easily create as many product options and variants as you want all customized for what your customers love.",
    contentAlignment: "left",
    isVisible: true,
    order: 1,
    backgroundColor: "linear-gradient(90deg, #F8F0FF 0%, #E7D7FD 100%)",
    backgroundImage: null,
    textColor: "#1f2937",
    layout: "split-grid",
    image: null,
    contents: [
      {
        content: `
            <section
              id="home"
              className="bg-[linear-gradient(180deg,_#F6EEFF_0%,_rgba(249,249,255,0)_100%)]"
            >
              <div className="max-w-6xl mx-auto py-20 lg:px-10 px-2">
                <div className="lg:grid grid-cols-2 gap-4 items-center justify-center space-y-5 lg:space-y-0">
                  {/* First Section */}
                  <div data-aos="fade-right" className="text-center lg:text-left">
                    <div className="flex justify-center lg:justify-start">
                      <SectionHeaderPortion text="Shopify product options app" />
                    </div>
                          Unlimited {{product}} Options to your Shopify Stores
                    </p>
                    <p className="text-sm text-gray-500">
                      Easily create as many product options and variants as you want all
                      customized for what your customers love.
                    </p>
                    <div className="space-x-5 mt-6 ">
                      <div className="flex items-center justify-center lg:justify-start gap-4">
                        <CommonPrimaryButton
                          text="Get started for free"
                          img={img.shopifyIcon}
                        />
                        <CommonSecondaryButton
                          text="Learn more"
                          img={img.rightArrowIcon}
                        />
                      </div>
                      <div className="flex items-center  justify-center lg:justify-start gap-4 mt-5">
                        <div className="flex item-center gap-2">
                          <Image
                            src={img.versionIcon}
                            alt="Version Icon"
                            height={10}
                            width={18}
                          />
                          <p>Free version available</p>
                        </div>
                        <div className="flex item-center gap-2">
                          <Image
                            src={img.codeIcon}
                            alt="Version Icon"
                            height={10}
                            width={18}
                          />
                          <p>No coding required</p>
                        </div>
                      </div>
                    </div>
                  </div>
        
                  {/* Second Section */}
                  <div
                    data-aos="fade-left"
                    className="flex justify-center items-center"
                  >
                    <Image
                      src={img.heroImg}
                      alt="Hero Image"
                      className="max-w-full h-auto"
                      height={10}
                      width={648}
                    />
                  </div>
                </div>
              </div>
            </section>
        `,

        title: "Shopify ",
        subtitle: "Unlimited ",
        description: "Easily create as many product",
        backgroundColor: "linear-gradient(90deg, #F8F0FF 0%, #E7D7FD 100%)",
        icons: [
          {
            id: "1",
            icon: "star",
            text: "Trusted by 10k+ Stores",
            color: "#fbbf24",
            bgColor: "rgba(255,255,255,0.1)",
          },
          {
            id: "2",
            icon: "shield-check",
            text: "Secure & Reliable",
            color: "#10b981",
            bgColor: "rgba(255,255,255,0.1)",
          },
          {
            id: "3",
            icon: "zap",
            text: "Lightning Fast",
            color: "#3b82f6",
            bgColor: "rgba(255,255,255,0.1)",
          },
        ],
        images: [img.heroImg],
        buttons: [
          {
            link: "/demo",
            text: "View Demo",
            bgColor: "#6D28D9",
            textColor: "#fff",
          },
          {
            link: "/signup",
            text: "Get Started",
            bgColor: "#A855F7",
            textColor: "#fff",
          },
        ],
        order: 0,
        isActive: true,
        contentLayout: "text-left",
        gridColumns: 2,
        imagePosition: "right",
      },
    ],
  },

  // 2. Features Section
  {
    id: "2",
    name: "features-section",
    contentAlignment: "center",
    isVisible: true,
    order: 2,
    backgroundColor: "#ffffff",
    backgroundImage: null,
    textColor: "#1f2937",
    layout: "header-grid",
    image: null,
    contents: [
      {
        title: "Powerful Features Designed for Growth",
        subtitle: "Everything You Need to Succeed",
        description:
          "<p>Discover our comprehensive suite of features that make product customization simple and effective.</p>",
        icons: [
          {
            id: "1",
            icon: "settings",
            text: "Easy Drag & Drop",
            color: "#8b5cf6",
            bgColor: "#faf5ff",
          },
          {
            id: "2",
            icon: "trend",
            text: "Boost Conversions",
            color: "#06b6d4",
            bgColor: "#ecfeff",
          },
          {
            id: "3",
            icon: "users",
            text: "Customer Friendly",
            color: "#10b981",
            bgColor: "#ecfdf5",
          },
        ],
        images: [img.codeIcon, img.chooseOption4],
        buttons: [
          {
            link: "/features",
            text: "Explore All Features",
            bgColor: "#3b82f6",
            textColor: "#ffffff",
          },
        ],
        order: 0,
        isActive: true,
        contentLayout: "centered",
        gridColumns: 2,
        imagePosition: "below",
      },
    ],
  },

  // 3. Gallery Section
  {
    id: "3",
    name: "gallery-section",
    contentAlignment: "center",
    isVisible: true,
    order: 3,
    backgroundColor: "#f8fafc",
    backgroundImage: null,
    textColor: "#1f2937",
    layout: "image-gallery",
    image: null,
    contents: [
      {
        title: "See Our App in Action",
        subtitle: "Visual Showcase",
        description:
          "<p>Take a look at how our product options transform the shopping experience for your customers.</p>",
        icons: [],
        images: [
          img.aboutImg2,
          img.chooseOption1,
          img.chooseOption3,
          img.chooseOption4,
        ],
        buttons: [
          {
            link: "/gallery",
            text: "View Full Gallery",
            bgColor: "#8b5cf6",
            textColor: "#ffffff",
          },
        ],
        order: 0,
        isActive: true,
        contentLayout: "centered",
        gridColumns: 4,
        imagePosition: "grid",
      },
    ],
  },

  // 4. Testimonials Section
  {
    id: "4",
    name: "testimonials-section",
    contentAlignment: "center",
    isVisible: true,
    order: 4,
    backgroundColor: "#ffffff",
    backgroundImage: null,
    textColor: "#1f2937",
    layout: "split-grid",
    image: null,
    contents: [
      {
        title: "Trusted by Successful Store Owners",
        subtitle: "Customer Stories",
        description:
          "<p>Hear from merchants who have transformed their businesses with our product options app.</p>",
        icons: [
          {
            id: "1",
            icon: "star",
            text: "4.9/5 Rating",
            color: "#fbbf24",
            bgColor: "#fff7ed",
          },
          {
            id: "2",
            icon: "users",
            text: "10,000+ Stores",
            color: "#3b82f6",
            bgColor: "#eff6ff",
          },
          {
            id: "3",
            icon: "award",
            text: "Top Rated App",
            color: "#10b981",
            bgColor: "#ecfdf5",
          },
        ],
        images: [img.aboutImg2],
        buttons: [
          {
            link: "/testimonials",
            text: "Read More Stories",
            bgColor: "#10b981",
            textColor: "#ffffff",
          },
        ],
        order: 0,
        isActive: true,
        contentLayout: "text-right",
        gridColumns: 2,
        imagePosition: "left",
      },
    ],
  },

  // 5. CTA Section
  {
    id: "5",
    name: "cta-section",
    contentAlignment: "center",
    isVisible: true,
    order: 5,
    backgroundColor: "linear-gradient(135deg, #1e3a8a 0%, #3730a3 100%)",
    backgroundImage: null,
    textColor: "#ffffff",
    layout: "centered",
    image: null,
    contents: [
      {
        title: "Ready to Transform Your Store?",
        subtitle: "Get Started Today",
        description:
          "<p>Join thousands of successful store owners and start increasing your sales with advanced product options.</p>",
        icons: [
          {
            id: "1",
            icon: "clock",
            text: "Setup in 5 Minutes",
            color: "#fbbf24",
            bgColor: "rgba(255,255,255,0.1)",
          },
          {
            id: "2",
            icon: "shield-check",
            text: "No Risk Trial",
            color: "#10b981",
            bgColor: "rgba(255,255,255,0.1)",
          },
          {
            id: "3",
            icon: "support",
            text: "24/7 Support",
            color: "#3b82f6",
            bgColor: "rgba(255,255,255,0.1)",
          },
        ],
        images: [img.blog1],
        buttons: [
          {
            link: "/signup",
            text: "Start Free Trial",
            bgColor: "#ffffff",
            textColor: "#1e3a8a",
          },
          {
            link: "/demo",
            text: "Watch Demo",
            bgColor: "transparent",
            textColor: "#ffffff",
          },
        ],
        order: 0,
        isActive: true,
        contentLayout: "centered",
        gridColumns: 1,
        imagePosition: "below",
      },
    ],
  },
];

// import { img } from "@/shared/constant/imgExport";

// export const homeData = [
//   {
//     id: "1",
//     name: "hero-section",
//     title: "Unlimited Product Options to your Shopify Stores",
//     subtitle: null,
//     description:
//       "Easily create as many product options and variants as you want all customized for what your customers love.",
//     contentAlignment: "left",
//     isVisible: true,
//     order: 1,
//     contents: [
//       {
//         title: "Boost Your Sales",
//         subtitle: "Increase conversion rates by 40%",
//         description:
//           "<p>Transform your Shopify store with advanced product options that customers love.</p>",
//         icons: [
//           {
//             id: "1",
//             icon: "star",
//             text: "Trusted by 10k+ Stores",
//             color: "#fbbf24",
//             bgColor: "#fff7ed",
//           },
//           {
//             id: "2",
//             icon: "shield-check",
//             text: "Secure Checkout",
//             color: "#10b981",
//             bgColor: "#ecfdf5",
//           },
//           {
//             id: "3",
//             icon: "zap",
//             text: "Fast Performance",
//             color: "#3b82f6",
//             bgColor: "#eff6ff",
//           },
//         ],
//         images: [img.heroImg, img.aboutImg2],
//         buttons: [
//           {
//             link: "/demo",
//             text: "View Demo",
//             bgColor: "#635bff",
//             textColor: "#ffffff",
//           },
//           {
//             link: "/signup",
//             text: "Get Started",
//             bgColor: "#a855f7",
//             textColor: "#ffffff",
//           },
//         ],
//         order: 0,
//         isActive: true,
//       },
//     ],
//   },
//   {
//     id: "2",
//     name: "features-section",
//     title: "Powerful Features for Your Store",
//     subtitle: "Everything you need to succeed",
//     description:
//       "Discover our comprehensive set of features designed to boost your e-commerce performance.",
//     contentAlignment: "center",
//     isVisible: true,
//     order: 2,
//     contents: [
//       {
//         title: "Advanced Customization",
//         subtitle: "Unlimited possibilities",
//         description:
//           "<p>Create any type of product option with our intuitive interface. From color swatches to file uploads, we support it all.</p>",
//         icons: [
//           {
//             id: "1",
//             icon: "settings",
//             text: "Easy Setup",
//             color: "#8b5cf6",
//             bgColor: "#faf5ff",
//           },
//           {
//             id: "2",
//             icon: "trend",
//             text: "Boost Conversions",
//             color: "#06b6d4",
//             bgColor: "#ecfeff",
//           },
//           {
//             id: "3",
//             icon: "users",
//             text: "Customer Friendly",
//             color: "#10b981",
//             bgColor: "#ecfdf5",
//           },
//         ],
//         images: ["https://cdn.optionia.com/features1.png"],
//         buttons: [
//           {
//             link: "/features",
//             text: "Explore Features",
//             bgColor: "#06b6d4",
//             textColor: "#ffffff",
//           },
//         ],
//         order: 0,
//         isActive: true,
//       },
//     ],
//   },
//   {
//     id: "3",
//     name: "testimonial-section",
//     title: "What Our Customers Say",
//     subtitle: "Trusted by thousands of stores",
//     description:
//       "Join thousands of successful Shopify store owners who have transformed their business with our app.",
//     contentAlignment: "center",
//     isVisible: true,
//     order: 3,
//     contents: [
//       {
//         title: "Customer Stories",
//         subtitle: "Real results from real stores",
//         description:
//           "<p>Hear from store owners who have seen incredible results after implementing our product options.</p>",
//         icons: [
//           {
//             id: "1",
//             icon: "star",
//             text: "4.9/5 Rating",
//             color: "#fbbf24",
//             bgColor: "#fff7ed",
//           },
//           {
//             id: "2",
//             icon: "users",
//             text: "10,000+ Stores",
//             color: "#3b82f6",
//             bgColor: "#eff6ff",
//           },
//           {
//             id: "3",
//             icon: "award",
//             text: "Top Rated App",
//             color: "#10b981",
//             bgColor: "#ecfdf5",
//           },
//         ],
//         images: [
//           "https://cdn.optionia.com/testimonial1.png",
//           "https://cdn.optionia.com/testimonial2.png",
//         ],
//         buttons: [
//           {
//             link: "/testimonials",
//             text: "Read More Stories",
//             bgColor: "#8b5cf6",
//             textColor: "#ffffff",
//           },
//         ],
//         order: 0,
//         isActive: true,
//       },
//     ],
//   },
//   {
//     id: "4",
//     name: "about-section",
//     title: "About Our Product Options App",
//     subtitle: "Built for Shopify store owners",
//     description:
//       "We understand the challenges of e-commerce and built the most comprehensive product options solution.",
//     contentAlignment: "left",
//     isVisible: true,
//     order: 4,
//     contents: [
//       {
//         title: "Our Mission",
//         subtitle: "Empowering e-commerce businesses",
//         description:
//           "<p>We believe every store should have access to powerful product customization tools without complex coding. Our mission is to make advanced product options accessible to everyone.</p>",
//         icons: [
//           {
//             id: "1",
//             icon: "rocket",
//             text: "Founded in 2020",
//             color: "#ef4444",
//             bgColor: "#fef2f2",
//           },
//           {
//             id: "2",
//             icon: "globe",
//             text: "Global Reach",
//             color: "#06b6d4",
//             bgColor: "#ecfeff",
//           },
//           {
//             id: "3",
//             icon: "heart",
//             text: "Customer First",
//             color: "#ec4899",
//             bgColor: "#fdf2f8",
//           },
//         ],
//         images: ["https://cdn.optionia.com/about1.png"],
//         buttons: [
//           {
//             link: "/about",
//             text: "Learn More About Us",
//             bgColor: "#1f2937",
//             textColor: "#ffffff",
//           },
//         ],
//         order: 0,
//         isActive: true,
//       },
//     ],
//   },
//   {
//     id: "5",
//     name: "faq-section",
//     title: "Frequently Asked Questions",
//     subtitle: "Get answers to common questions",
//     description:
//       "Learn more about how our product options app can transform your Shopify store.",
//     contentAlignment: "left",
//     isVisible: true,
//     order: 5,
//     contents: [
//       {
//         title: "Common Questions",
//         subtitle: "Quick answers",
//         description:
//           "<p><strong>How does it work?</strong><br>Simply install our app and start creating product options through our dashboard.</p><p><strong>Can I customize the design?</strong><br>Yes, everything is customizable to match your store's branding.</p><p><strong>Is there a free trial?</strong><br>Yes, we offer a 14-day free trial with all features included.</p>",
//         icons: [
//           {
//             id: "1",
//             icon: "support",
//             text: "24/7 Support",
//             color: "#f59e0b",
//             bgColor: "#fffbeb",
//           },
//           {
//             id: "2",
//             icon: "document",
//             text: "Comprehensive Docs",
//             color: "#8b5cf6",
//             bgColor: "#faf5ff",
//           },
//         ],
//         images: ["https://cdn.optionia.com/faq-image.png"],
//         buttons: [
//           {
//             link: "/contact",
//             text: "Contact Support",
//             bgColor: "#6b7280",
//             textColor: "#ffffff",
//           },
//           {
//             link: "/docs",
//             text: "View Documentation",
//             bgColor: "#1f2937",
//             textColor: "#ffffff",
//           },
//         ],
//         order: 0,
//         isActive: true,
//       },
//     ],
//   },
//   {
//     id: "6",
//     name: "pricing-section",
//     title: "Simple, Transparent Pricing",
//     subtitle: "No hidden fees, no surprises",
//     description:
//       "Choose the plan that works best for your business. All plans include our core features.",
//     contentAlignment: "center",
//     isVisible: true,
//     order: 6,
//     contents: [
//       {
//         title: "Flexible Plans",
//         subtitle: "Scale as you grow",
//         description:
//           "<p>Start with our free plan and upgrade as your business grows. All paid plans include a 14-day free trial.</p>",
//         icons: [
//           {
//             id: "1",
//             icon: "check",
//             text: "No Setup Fees",
//             color: "#10b981",
//             bgColor: "#ecfdf5",
//           },
//           {
//             id: "2",
//             icon: "calendar",
//             text: "Free Trial",
//             color: "#3b82f6",
//             bgColor: "#eff6ff",
//           },
//           {
//             id: "3",
//             icon: "download",
//             text: "Easy Cancel",
//             color: "#6b7280",
//             bgColor: "#f9fafb",
//           },
//         ],
//         images: ["https://cdn.optionia.com/pricing1.png"],
//         buttons: [
//           {
//             link: "/pricing",
//             text: "View All Plans",
//             bgColor: "#10b981",
//             textColor: "#ffffff",
//           },
//           {
//             link: "/signup",
//             text: "Start Free Trial",
//             bgColor: "#635bff",
//             textColor: "#ffffff",
//           },
//         ],
//         order: 0,
//         isActive: true,
//       },
//     ],
//   },
//   {
//     id: "7",
//     name: "cta-section",
//     title: "Ready to Transform Your Store?",
//     subtitle: "Join thousands of successful store owners",
//     description:
//       "Start your free trial today and see the difference advanced product options can make.",
//     contentAlignment: "center",
//     isVisible: true,
//     order: 7,
//     contents: [
//       {
//         title: "Get Started Today",
//         subtitle: "No credit card required",
//         description:
//           "<p>Try all features free for 14 days. Easy setup, no coding required.</p>",
//         icons: [
//           {
//             id: "1",
//             icon: "clock",
//             text: "Setup in 5min",
//             color: "#f59e0b",
//             bgColor: "#fffbeb",
//           },
//           {
//             id: "2",
//             icon: "shield-check",
//             text: "No Risk",
//             color: "#10b981",
//             bgColor: "#ecfdf5",
//           },
//           {
//             id: "3",
//             icon: "support",
//             text: "24/7 Support",
//             color: "#3b82f6",
//             bgColor: "#eff6ff",
//           },
//         ],
//         images: ["https://cdn.optionia.com/cta1.png"],
//         buttons: [
//           {
//             link: "/signup",
//             text: "Start Free Trial",
//             bgColor: "#ec4899",
//             textColor: "#ffffff",
//           },
//           {
//             link: "/demo",
//             text: "Watch Demo",
//             bgColor: "#6b7280",
//             textColor: "#ffffff",
//           },
//         ],
//         order: 0,
//         isActive: true,
//       },
//     ],
//   },
//   {
//     id: "8",
//     name: "contact-section",
//     title: "Get In Touch",
//     subtitle: "We're here to help",
//     description:
//       "Have questions? Our support team is ready to assist you with any inquiries.",
//     contentAlignment: "left",
//     isVisible: true,
//     order: 8,
//     contents: [
//       {
//         title: "Contact Us",
//         subtitle: "Multiple ways to reach us",
//         description:
//           "<p>Whether you need technical support or have sales questions, we're here to help you succeed.</p>",
//         icons: [
//           {
//             id: "1",
//             icon: "email",
//             text: "support@optionia.com",
//             color: "#3b82f6",
//             bgColor: "#eff6ff",
//           },
//           {
//             id: "2",
//             icon: "phone",
//             text: "+1 (555) 123-4567",
//             color: "#10b981",
//             bgColor: "#ecfdf5",
//           },
//           {
//             id: "3",
//             icon: "location",
//             text: "Worldwide Support",
//             color: "#8b5cf6",
//             bgColor: "#faf5ff",
//           },
//         ],
//         images: ["https://cdn.optionia.com/contact1.png"],
//         buttons: [
//           {
//             link: "mailto:support@optionia.com",
//             text: "Email Us",
//             bgColor: "#3b82f6",
//             textColor: "#ffffff",
//           },
//           {
//             link: "/contact-form",
//             text: "Contact Form",
//             bgColor: "#1f2937",
//             textColor: "#ffffff",
//           },
//         ],
//         order: 0,
//         isActive: true,
//       },
//     ],
//   },
//   {
//     id: "9",
//     name: "integration-section",
//     title: "Seamless Integrations",
//     subtitle: "Works with your favorite tools",
//     description:
//       "Our app integrates perfectly with your existing Shopify ecosystem and popular apps.",
//     contentAlignment: "center",
//     isVisible: true,
//     order: 9,
//     contents: [
//       {
//         title: "Popular Integrations",
//         subtitle: "Connect with confidence",
//         description:
//           "<p>We work seamlessly with payment gateways, email marketing tools, and other essential Shopify apps.</p>",
//         icons: [
//           {
//             id: "1",
//             icon: "check",
//             text: "Shopify Payments",
//             color: "#5b21b6",
//             bgColor: "#faf5ff",
//           },
//           {
//             id: "2",
//             icon: "check",
//             text: "Mailchimp",
//             color: "#c2410c",
//             bgColor: "#fff7ed",
//           },
//           {
//             id: "3",
//             icon: "check",
//             text: "Zapier",
//             color: "#0ea5e9",
//             bgColor: "#f0f9ff",
//           },
//         ],
//         images: ["https://cdn.optionia.com/integrations1.png"],
//         buttons: [
//           {
//             link: "/integrations",
//             text: "View All Integrations",
//             bgColor: "#7c3aed",
//             textColor: "#ffffff",
//           },
//         ],
//         order: 0,
//         isActive: true,
//       },
//     ],
//   },
//   {
//     id: "10",
//     name: "stats-section",
//     title: "Proven Results",
//     subtitle: "Numbers that speak for themselves",
//     description:
//       "See how our app has helped stores achieve remarkable growth and customer satisfaction.",
//     contentAlignment: "center",
//     isVisible: true,
//     order: 10,
//     contents: [
//       {
//         title: "By The Numbers",
//         subtitle: "Trusted performance",
//         description:
//           "<p>Our results are backed by real data from thousands of successful stores using our platform daily.</p>",
//         icons: [
//           {
//             id: "1",
//             icon: "trend",
//             text: "40% Conversion Boost",
//             color: "#10b981",
//             bgColor: "#ecfdf5",
//           },
//           {
//             id: "2",
//             icon: "users",
//             text: "10K+ Active Stores",
//             color: "#3b82f6",
//             bgColor: "#eff6ff",
//           },
//           {
//             id: "3",
//             icon: "award",
//             text: "99.9% Uptime",
//             color: "#f59e0b",
//             bgColor: "#fffbeb",
//           },
//         ],
//         images: ["https://cdn.optionia.com/stats1.png"],
//         buttons: [
//           {
//             link: "/case-studies",
//             text: "View Case Studies",
//             bgColor: "#dc2626",
//             textColor: "#ffffff",
//           },
//         ],
//         order: 0,
//         isActive: true,
//       },
//     ],
//   },
// ];
