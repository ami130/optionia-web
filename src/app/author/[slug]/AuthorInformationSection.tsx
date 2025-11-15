import SectionHeaderPortion from "@/shared/components/SectionHeaderPortion";
import { img } from "@/shared/constant/imgExport";
import Image from "next/image";
import { FaLinkedin } from "react-icons/fa";

export default function AuthorInformationSection() {
  return (
    <div className="py-12 lg:grid grid-cols-3 gap-6 space-y-3 lg:space-y-0">
      <div className="border col-span-1 bg-[#360C5F] rounded-2xl text-white p-6  text-center">
        <div className="flex flex-col items-center justify-center">
          <Image src={img.inja} alt="Avatar"width={150} height={150} />
          <div className="space-y-1">
            <p className="text-[32px] font-semibold">Inzamamul Hossain</p>
            <p>Content Specialist</p>
          </div>
        </div>
        <hr className="my-5 border-[#6428A1]" />
        <div className="flex items-center justify-center space-x-2">
          <p className="text-[#D2D6DB]">Follow me on:</p>
          <FaLinkedin />
        </div>
      </div>
      <div className="col-span-2 p-9 space-y-9 bg-[#FAF6FE] rounded-2xl">
        <div className="space-y-4">
          <p className="text-[#360C5F] text-2xl font-medium">
            About the author
          </p>
          <p className="text-[#111927] text-[18px] font-normal">
            Inzamamul Hossian is an eCommerce-focused content writer with 5+
            years of experience turning technical product option topics into
            simple, useful, and search-friendly guides. He believes clarity
            always beats complexity especially when helping merchants improve
            their online stores. When he’s not writing, you’ll find him
            exploring new coffee spots, diving into tech reviews, or tinkering
            with Shopify setups just for fun.
          </p>
        </div>{" "}
        <div className="space-y-4">
          <p className="text-[#360C5F] text-2xl font-medium">
            Areas of expertise{" "}
          </p>
          <div className="space-x-2">
            <SectionHeaderPortion text="eCommerce" />
            <SectionHeaderPortion text="Design trends" />
            <SectionHeaderPortion text="Content marketing" />
          </div>
        </div>{" "}
      </div>
    </div>
  );
}
