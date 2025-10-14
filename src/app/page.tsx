import FaqSection from "@/shared/components/Home/FaqSection";
import FeaturesSection from "@/shared/components/Home/Features/Features";
import HeroSection from "@/shared/components/Home/HeroSection";
import HowItWorksSection from "@/shared/components/Home/works/HowItWorksSection";
import OptioniaSection from "@/shared/components/Home/OptioniaSection";
import OptioniaSection2 from "@/shared/components/Home/OptioniaSection2";

export default function Home() {
  return (
    <div>
      <HeroSection />
      <OptioniaSection />
      <OptioniaSection2 />
      <FeaturesSection />
      <FaqSection />
      <HowItWorksSection />
    </div>
  );
}
