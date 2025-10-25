import SectionHeader from "../../SectionHeader";
import PricingPlanSubSection from "./PricingPlanSubSection";

export default function PricingSection() {
  return (
    <section id="pricing" className="py-20 lg:px-14 bg-[#FAF6FE]">
      <div className="container max-w-6xl mx-auto lg:px-0 px-4">
        <div className="mb-12">
          <SectionHeader
            text="Pricing Plan"
            title="Choose the Perfect Plan for Your Store"
            subtitle="Start free and upgrade as your business grows. No hidden fees just the tools you need to customize products and boost sales."
          />
        </div>
        <PricingPlanSubSection />
      </div>
    </section>
  );
}
