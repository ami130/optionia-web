import PageHeader from "@/shared/components/PageHeader";
import React from "react";
import AboutPurposeSection from "./AboutPurposeSection";

export default function AboutPage() {
  return (
    <div className="px-4 lg:px-0 ">
      <PageHeader
        subtitle="hello"
        text="Engineering Toward a Trillion Enterprise Interactions"
        title=" Combining frontier AI research with real-world scale, Giga builds
          voice agents enterprises can trust."
      />
      {/* <Image
        src={img.aboutImg}
        alt={"About Image"}
        width={800}
        height={400}
        className="mx-auto rounded"
      /> */}
      <AboutPurposeSection />
      {/* <Image src={img.aboutImg2} alt={"About Image"} className="mx-auto " /> */}
    </div>
  );
}
