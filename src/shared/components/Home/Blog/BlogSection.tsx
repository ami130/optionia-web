import { blogData } from "@/shared/constant/data";
import SectionHeader from "../../SectionHeader";
import BlogList from "./BlogList";

export default function BlogSection() {
  return (
    <div className="max-w-6xl mx-auto py-20 lg:px-10 px-2 space-y-12">
      <SectionHeader
        text="Pricing Plan"
        title="Blog & Articles"
        subtitle="Strategies, Insights, and Tools to Navigate the Options Market Like a Pro"
      />
      <BlogList data={blogData} />
    </div>
  );
}
