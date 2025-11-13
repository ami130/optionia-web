import React from "react";
import SectionHeader from "../../SectionHeader";
import ChooseOptioniaSubSection from "./ChooseOptioniaSubSection";
import { chooseOptionia } from "@/shared/constant/data";

export default function ChooseOptioniaSection() {
  return (
    <div className="max-w-7xl mx-auto py-20 lg:px-0 px-4 space-y-12">
      <SectionHeader
        text="Why  Choose Optionia"
        title="Why Store Owners Choose Optionia"
        subtitle="Built to make product customization simple, powerful, and accessible for every Shopify merchant."
      />
      <ChooseOptioniaSubSection data={chooseOptionia} />
    </div>
  );
}
