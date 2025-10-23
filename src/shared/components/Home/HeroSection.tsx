import { img } from "@/shared/constant/imgExport";
import Image from "next/image";
import React from "react";
import SectionHeaderPortion from "../SectionHeaderPortion";
import { CommonPrimaryButton, CommonSecondaryButton } from "../CommonButton";

export default function HeroSection() {
  return (
    <section
      id="home"
      className="bg-[linear-gradient(180deg,_#F6EEFF_0%,_rgba(249,249,255,0)_100%)]"
    >
      <div className="max-w-6xl mx-auto py-20 lg:px-10 px-2">
        <div className="lg:grid grid-cols-2 gap-4 items-center justify-center space-y-5 lg:space-y-0">
          {/* First Section */}
          <div data-aos="fade-right" className="text-center lg:text-left">
            <div className="flex justify-center lg:justify-start">
              <SectionHeaderPortion text="Shopify product options app" />
            </div>
            <h1 className="text-5xl font-semibold text-secondaryTextColor leading-tight py-4">
              Unlimited Product Options to your Shopify Stores
            </h1>
            <p className="text-sm text-gray-500">
              Easily create as many product options and variants as you want all
              customized for what your customers love.
            </p>
            <div className="space-x-5 mt-6 ">
              <div className="flex items-center justify-center lg:justify-start gap-4">
                <CommonPrimaryButton
                  text="Get started for free"
                  img={img.shopifyIcon}
                />
                <CommonSecondaryButton
                  text="Learn more"
                  img={img.rightArrowIcon}
                />
              </div>
              <div className="flex items-center  justify-center lg:justify-start gap-4 mt-5">
                <div className="flex item-center gap-2">
                  <Image
                    src={img.versionIcon}
                    alt="Version Icon"
                    height={10}
                    width={18}
                  />
                  <p>Free version available</p>
                </div>
                <div className="flex item-center gap-2">
                  <Image
                    src={img.codeIcon}
                    alt="Version Icon"
                    height={10}
                    width={18}
                  />
                  <p>No coding required</p>
                </div>
              </div>
            </div>
          </div>

          {/* Second Section */}
          <div
            data-aos="fade-left"
            className="flex justify-center items-center"
          >
            <Image
              src={img.heroImg}
              alt="Hero Image"
              className="max-w-full h-auto"
              height={10}
              width={648}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
