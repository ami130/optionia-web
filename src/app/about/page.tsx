import PageHeader from "@/shared/components/PageHeader";
import { img } from "@/shared/constant/imgExport";
import Image from "next/image";
import React from "react";
import { LuStar } from "react-icons/lu";
import AboutPurposeSection from "./AboutPurposeSection";

export default function AboutPage() {
  return (
    <div className="px-4 lg:px-0 ">
      <PageHeader
        header="Engineering Toward a Trillion Enterprise Interactions"
        description=" Combining frontier AI research with real-world scale, Giga builds
          voice agents enterprises can trust."
      />
      <Image
        src={img.aboutImg}
        alt={"About Image"}
        width={800}
        height={400}
        className="mx-auto rounded"
      />
      <AboutPurposeSection />
      <Image src={img.aboutImg2} alt={"About Image"} className="mx-auto " />
    </div>
  );
}
