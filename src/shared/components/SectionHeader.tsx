import React from "react";
import SectionHeaderPortion from "./SectionHeaderPortion";

export default function SectionHeader({
  text,
  title,
  subtitle,
}: {
  text?: string;
  title: string;
  subtitle: string;
}) {
  return (
    <div
      data-aos="zoom-in"
      className="max-w-4xl mx-auto flex flex-col items-center text-center"
    >
      <SectionHeaderPortion text={text} />
      <h2 className="text-[48px] text-secondaryTextColor font-medium pt-3 pb-4 ">
        {title}
      </h2>
      <p className="text-[18px] font-normal text-gray-800">{subtitle}</p>
    </div>
  );
}
