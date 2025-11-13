import FaqSection from "@/shared/components/Home/FaqSection";
import FeaturesSection from "@/shared/components/Home/Features/Features";
import HeroSection from "@/shared/components/Home/HeroSection";
import HowItWorksSection from "@/shared/components/Home/works/HowItWorksSection";
import OptioniaSection from "@/shared/components/Home/OptioniaSection";
import OptioniaSection2 from "@/shared/components/Home/OptioniaSection2";
import ChooseOptioniaSection from "@/shared/components/Home/ChooseOptionia/ChooseOptioniaSection";
import BannerSection from "@/shared/components/Home/BannerSection";
import SupportSection from "@/shared/components/Home/Support/SupportSection";
import PricingSection from "@/shared/components/Home/Pricing/PricingSection";
import BlogSection from "@/shared/components/Home/Blog/BlogSection";
import Testmonial from "@/shared/components/Home/Testmonial/Testmonial";

export default function Home() {
  return (
    <div>
      <HeroSection />
      <div id="option-types">
        <OptioniaSection />
        <OptioniaSection2 />
      </div>
      <FeaturesSection />
      <HowItWorksSection />
      <ChooseOptioniaSection />
      <PricingSection />
      <Testmonial />
      <SupportSection />

      <FaqSection />
      <BlogSection />
      <BannerSection />
    </div>
  );
}

// import { homeData } from "@/lib/constants";
// import { DynamicSectionRenderer } from "@/shared/components/test/DynamicSectionRenderer";

// async function getSections() {
//   try {
//     const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/sections`, {
//       next: {
//         revalidate: 60, // Revalidate every 60 seconds
//       },
//     });

//     if (!res.ok) {
//       throw new Error("Failed to fetch sections");
//     }

//     return res.json();
//   } catch (error) {
//     console.error("Error fetching sections:", error);
//     return [];
//   }
// }

// export default async function HomePage() {
//   // const sections = await getSections();
//   // console.log("first", sections);

//   return (
//     <main className="min-h-screen">
//       {homeData.length > 0 ? (
//         homeData.map((section: any) => (
//           <DynamicSectionRenderer key={section.id} section={section} />
//         ))
//       ) : (
//         <div className="flex items-center justify-center min-h-screen">
//           <div className="text-center">
//             <h1 className="text-2xl font-bold text-gray-900 mb-4">
//               No Sections Found
//             </h1>
//             <p className="text-gray-600">
//               Add sections to your constants file to see them here.
//             </p>
//           </div>
//         </div>
//       )}
//     </main>
//   );
// }
