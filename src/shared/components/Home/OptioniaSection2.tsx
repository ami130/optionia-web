import { img } from "@/shared/constant/imgExport";
import Image from "next/image";
import SectionHeaderPortion from "../SectionHeaderPortion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function OptioniaSection2() {
  const hoverCardClass =
    "group w-full h-full relative border transition-all duration-500  hover:-translate-y-2";

  const glowOverlayClass =
    "absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-purple-100/40 via-transparent to-transparent rounded-2xl blur-[1px]";

  const imageClass =
    "relative z-10 w-full  h-full object-fit transition-transform duration-500 group-hover:scale-105 ";

  return (
    <section className="bg-secondPrimaryColor py-20">
      <div className="max-w-7xl mx-auto  space-y-6 lg:px-0 px-4">
        {/* ----------- Row 1 ----------- */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-center">
          {/* Left text section */}
          <div
            data-aos="zoom-in"
            className="col-span-2 bg-white rounded-2xl py-11 px-14"
          >
            <div>
              <div className="flex mb-4">
                <SectionHeaderPortion text="Option Types" />
              </div>
              <h1 className="text-5xl text-secondaryTextColor font-medium">
                15+ Powerful Product Option Types
              </h1>
            </div>
            <div className="mt-8 flex items-center gap-3 hover:underline transition-all">
              <Link href={"/"}>See all options</Link>{" "}
              <ArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />{" "}
            </div>{" "}
          </div>

          {/* Right image cards */}
          <div className="col-span-2 grid grid-cols-2 gap-4 sm:gap-6">
            {[img.optionia1, img.optionia1].map((image, i) => (
              <div key={i} className={`${hoverCardClass}`}>
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
          {[img.optionia1, img.optionia1, img.optionia1, img.optionia1].map(
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
      </div>
    </section>
  );
}
