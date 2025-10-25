import PageHeader from "@/shared/components/PageHeader";
import { img } from "@/shared/constant/imgExport";
import React from "react";

export default function TermsOfServicesPage() {
  return (
    <div>
      <PageHeader
        text="Terms Of Services"
        title="Be aware of terms of conditions"
        subtitle="Start free and upgrade as your business grows. No hidden fees just the tools you need to customize products and boost sales."
        backgroundImage={img.bannerImg}
      />
      <div className="container max-w-6xl mx-auto lg:px-0 px-4 py-12">
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptates,
        illo officiis odio tempora accusamus laudantium iusto alias expedita
        dolor eos, perspiciatis quidem magni nesciunt quis at earum quibusdam
        blanditiis. Totam distinctio, molestiae modi praesentium pariatur odio
        dolor nemo maiores numquam vel, aliquam magni repellendus libero
        eligendi quibusdam nihil molestias asperiores!
      </div>
    </div>
  );
}
