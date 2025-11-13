import SectionHeader from "../SectionHeader";
import Image from "next/image";
import { img } from "@/shared/constant/imgExport";

export default function OptioniaSection() {
  return (
    <div
      data-aos="fade-up"
      className="max-w-6xl mx-auto py-20 lg:px-0 px-2 space-y-12"
    >
      <SectionHeader
        text="What is optionia"
        title=" Make Your Products Truly Yours"
        subtitle=" Give your customers the freedom to personalize every product exactly how
        they want, while making it easy for you to increase sales, and grow your
        e-commerce business."
      />
      <div className="lg:flex items-center justify-center lg:justify-between gap-12 space-y-5 lg:space-y-0 lg:px-0 px-4">
        <div className="w-full h-full">
          <Image
            src={img.optioniaImg1}
            className="w-full h-full object-contain"
            alt="optionia Img 1"
          />
        </div>
        <div className="w-full h-full">
          <Image
            src={img.optioniaImg2}
            className="w-full h-full object-contain"
            alt="optionia Img 2"
          />
        </div>
      </div>
    </div>
  );
}
