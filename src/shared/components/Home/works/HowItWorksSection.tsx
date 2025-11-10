import React from "react";
import SectionHeader from "../../SectionHeader";
import WorksSubSection from "./WorksSubSection";
import { workData } from "@/shared/constant/data";

export default function HowItWorksSection() {
  return (
    <div
      id="how-it-works"
      className="max-w-6xl mx-auto py-20 lg:px-8 px-2 space-y-12"
    >
      <SectionHeader
        text="How it works"
        title="Set up your product options in minutes
          no coding! no hassle!"
        subtitle="Give your customers the freedom to personalize every product exactly how they want, while making it easy for you to increase sales, and grow your e-commerce business."
      />
      <WorksSubSection data={workData} />
    </div>
  );
}
