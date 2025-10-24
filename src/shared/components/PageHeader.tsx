import SectionHeaderPortion from "./SectionHeaderPortion";
import { img } from "@/shared/constant/imgExport";
import Image from "next/image";

export default function PageHeader({
  text,
  title,
  subtitle,
  backgroundImage = img.bannerImg,
}: {
  text?: string;
  title: string;
  subtitle: string;
  backgroundImage?: any;
}) {
  return (
    <div className="relative w-full min-h-[45vh] flex items-center justify-center overflow-hidden px-5 lg:px-0 -mt-[var(--nav-height,80px)]">
      {/* ✅ Background Image */}
      <Image
        src={backgroundImage}
        alt="Page Banner"
        fill
        priority
        className="object-cover object-center absolute inset-0 -z-10"
      />

      {/* ✅ Content */}
      <div
        data-aos="zoom-in"
        className="max-w-2xl mx-auto flex flex-col items-center text-center  mt-14"
      >
        {text && <SectionHeaderPortion text={text} />}
        <h1 className="text-5xl md:text-4xl text-secondaryTextColor font-medium mt-3 mb-4">
          {title}
        </h1>
        <p className="text-[18px] font-normal text-gray-800">{subtitle}</p>
      </div>
    </div>
  );
}
