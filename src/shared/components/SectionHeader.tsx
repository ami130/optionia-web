import React from "react";
import SectionHeaderPortion from "./SectionHeaderPortion";

export default function SectionHeader({
  text,
  title,
  subtitle
}: {
  text?: string;
  title: string;
  subtitle: string;
}) {
  return (
    <div
      data-aos="zoom-in"
      className="max-w-2xl mx-auto flex flex-col items-center text-center space-y-4"
    >
      <SectionHeaderPortion text={text} />
      <h1 className="text-3xl text-secondaryTextColor font-semibold">{title}</h1>
      <p className="text-sm ">{subtitle}</p>
    </div>
  );
}
