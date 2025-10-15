import { supportData } from "@/shared/constant/data";
import SectionHeader from "../../SectionHeader";
import SupportSubSection from "./SupportSubSection";

export default function SupportSection() {
  return (
    <div id="" className="bg-secondaryBaseColor">
      <div className="max-w-6xl mx-auto py-20 lg:px-10 px-2 space-y-12 ">
        <SectionHeader
          text="24/6 Support"
          title="We’re Here Whenever You Need Help"
          subtitle="Get quick, reliable support from real people who care about your success. Whether you’re setting up your first option set or managing advanced features, we’ve got you covered."
        />
        <SupportSubSection data={supportData} />
      </div>
    </div>
  );
}
