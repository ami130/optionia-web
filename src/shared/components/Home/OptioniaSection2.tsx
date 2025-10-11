import { img } from "@/shared/constant/imgExport";
import Image from "next/image";
import SectionHeaderPortion from "../SectionHeaderPortion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function OptioniaSection2() {
  const hoverCardClass =
    "group relative bg-white rounded-2xl p-6 sm:p-10 md:py-11 md:px-14 shadow-md transition-all duration-500 hover:shadow-[0_10px_40px_rgba(139,92,246,0.25)] hover:-translate-y-2 hover:bg-gradient-to-br hover:from-white hover:to-purple-50";

  const glowOverlayClass =
    "absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-purple-100/40 via-transparent to-transparent rounded-2xl blur-[1px]";

  const imageClass =
    "relative z-10 transition-transform duration-500 group-hover:scale-105 w-full h-auto object-contain";

  return (
    <section className="bg-secondPrimaryColor px-4 sm:px-6 md:px-10 lg:p-20 py-10 space-y-10">
      {/* ----------- Row 1 ----------- */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-center">
        {/* Left text section */}
        <div
          data-aos="zoom-in"
          className="col-span-2 bg-white rounded-2xl py-9 px-14"
        >
          <div className="space-y-4">
            <SectionHeaderPortion text="Option Types" />
            <h1 className="text-4xl text-secondaryTextColor">
              The Options Your Customers Will Love
            </h1>
          </div>
          <div className="mt-4 flex items-center gap-3 hover:underline transition-all">
            {" "}
            <Link href={"/"}>See all options</Link>{" "}
            <ArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />{" "}
          </div>{" "}
        </div>

        {/* Right image cards */}
        <div className="col-span-2 grid grid-cols-2 gap-4 sm:gap-6">
          {[img.optionia1, img.optionia2].map((image, i) => (
            <div key={i} className={hoverCardClass}>
              <div className={glowOverlayClass} />
              <Image
                src={image}
                alt={`optionia${i + 1}`}
                className={imageClass}
              />
            </div>
          ))}
        </div>
      </div>

      {/* ----------- Row 2 ----------- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {[img.optionia3, img.optionia4, img.optionia5, img.optionia6].map(
          (image, i) => (
            <div key={i} className={hoverCardClass}>
              <div className={glowOverlayClass} />
              <Image
                src={image}
                alt={`optionia${i + 3}`}
                className={imageClass}
              />
            </div>
          )
        )}
      </div>
    </section>
  );
}
