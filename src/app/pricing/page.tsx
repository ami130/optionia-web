import BannerSection from "@/shared/components/Home/BannerSection";
import FaqSection from "@/shared/components/Home/FaqSection";
import PricingPlanSubSection from "@/shared/components/Home/Pricing/PricingPlanSubSection";
import PageHeader from "@/shared/components/PageHeader";
import { img } from "@/shared/constant/imgExport";
import React from "react";

export default function PricingPage() {
  return (
    <div>
      <PageHeader
        text="Pricing Plan"
        title="Choose the Perfect Plan for Your Store"
        subtitle="Start free and upgrade as your business grows. No hidden fees just the tools you need to customize products and boost sales."
        backgroundImage={img.bannerImg}
      />
      <div className="container max-w-6xl mx-auto lg:px-0 px-4 py-12">
        <PricingPlanSubSection />
      </div>
      <FaqSection />
      <BannerSection />
    </div>
  );
}
