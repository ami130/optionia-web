import { img } from "@/shared/constant/imgExport";
import Image from "next/image";
import React from "react";
import SectionHeaderPortion from "../../SectionHeaderPortion";
import { CiCalendar, CiClock1 } from "react-icons/ci";
import { CommonSecondaryButton } from "../../CommonButton";
import Link from "next/link";
import BlogCardList from "../../globalComponents/BlogCardList";

export default function BlogList({ data }: { data: any }) {
  return (
    <div>
      <BlogCardList data={data} />

      {/* View All Button */}
      <div className="mt-12 flex justify-center">
        <Link href="/blog">
          <CommonSecondaryButton text="View all" img={img.rightArrowIcon} />
        </Link>
      </div>
    </div>
  );
}
