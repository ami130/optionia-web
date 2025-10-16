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

export default function Home() {
  return (
    <div>
      <HeroSection />
      <div id="option-types">
        <OptioniaSection />
        <OptioniaSection2 />
      </div>
      <FeaturesSection />
      <FaqSection />
      <HowItWorksSection />
      <ChooseOptioniaSection />
      <BannerSection />
      <SupportSection />
      <PricingSection />
    </div>
  );
}
