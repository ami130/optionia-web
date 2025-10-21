import React from "react";
import SectionHeaderPortion from "../../SectionHeaderPortion";
import { CommonPrimaryButton } from "../../CommonButton";
import Image from "next/image";
import { img } from "@/shared/constant/imgExport";

export default function Testmonial() {
  return (
    <section>
      <div className="max-w-6xl mx-auto py-20 lg:px-10 px-2">
        <div className="lg:grid grid-cols-5 gap-4 items-center justify-center space-y-5 lg:space-y-0">
          {/* First Section */}
          <div
            data-aos="fade-right"
            className="col-span-2 text-center lg:text-left"
          >
            <div className="flex justify-center lg:justify-start">
              <SectionHeaderPortion text="What Merchants Say" />
            </div>
            <p className="text-5xl font-semibold text-secondaryTextColor leading-tight py-4">
              Loved by Thousands of Merchants{" "}
            </p>
            <p className="text-sm text-gray-500">
              Discover how store owners use Optionia to personalize products,
              boost sales, and simplify their Shopify experience.{" "}
            </p>
            <div className="space-x-5 mt-6 ">
              <div className="flex items-center justify-center lg:justify-start gap-4">
                <CommonPrimaryButton
                  text="View all reviews"
                  img={img.shopifyIcon}
                />
              </div>
            </div>
          </div>

          {/* Second Section */}
          <div
            data-aos="fade-left"
            className="flex justify-center items-center border col-span-3"
          >
            <h1>sdvfdv</h1>
          </div>
        </div>
      </div>
    </section>
  );
}
