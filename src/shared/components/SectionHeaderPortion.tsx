import React from "react";

export default function SectionHeaderPortion({ text }: { text?: string }) {
  return (
    <div className="text-sm border text-secondaryTextColor rounded-full w-[213px] h-[28px] flex items-center justify-center border-primaryColor bg-secondaryColor ">
      {text}
    </div>
  );
}
