import Image from "next/image";
import { img } from "@/shared/constant/imgExport";
import { CommonPrimaryButton, CommonSecondaryButton } from "../CommonButton";

export default function BannerSection() {
  return (
    <div className="relative max-w-6xl mx-auto rounded-2xl overflow-hidden my-16">
      {/* Background Image */}
      <Image
        src={img.bannerImg}
        alt="Banner Background"
        fill
        priority
        className="object-cover"
      />

      {/* Optional Overlay for better readability */}
      <div className="absolute inset-0" />

      {/* Text + Button Section (centered) */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center py-20 px-6">
        <div className="max-w-2xl mx-auto space-y-6">
          <h1 className="text-4xl md:text-5xl font-semibold text-secondaryTextColor leading-tight">
            Ready to empower your Shopify products?
          </h1>
          <p className="text-base text-gray-800">
            Start offering unlimited product options to your customers today.
          </p>

          {/* Buttons + Info section */}
          <div className="flex flex-col items-center justify-center space-y-6 mt-8">
            {/* Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-4">
              <CommonPrimaryButton
                text="Get started for free"
                img={img.shopifyIcon}
              />
              <CommonSecondaryButton
                text="Learn more"
                img={img.rightArrowIcon}
              />
            </div>

            {/* Feature Text */}
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-700">
              <div className="flex items-center gap-2">
                <Image
                  src={img.versionIcon}
                  alt="Version Icon"
                  width={20}
                  height={20}
                />
                <p>Free version available</p>
              </div>
              <div className="flex items-center gap-2">
                <Image
                  src={img.codeIcon}
                  alt="Code Icon"
                  width={20}
                  height={20}
                />
                <p>No coding required</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
