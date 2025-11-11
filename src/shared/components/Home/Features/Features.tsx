import SectionHeader from "../../SectionHeader";
import FeaturesSection1 from "./FeaturesSection";

export default function FeaturesSection() {
  return (
    <div id="features" className="max-w-6xl mx-auto pt-20 pb-10 lg:px-8 px-2">
      <SectionHeader
        text="Features"
        title="Powerful Features to Customize, Optimize, and Grow Your Store"
        subtitle="From unlimited custom options to smart pricing and conditional logic, Optionia gives you all the tools to delight your customers and grow your Shopify store effortlessly."
      />
      <FeaturesSection1 />
    </div>
  );
}
