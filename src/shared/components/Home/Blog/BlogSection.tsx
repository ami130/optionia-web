import SectionHeader from "../../SectionHeader";
import BlogList from "./BlogList";
import { fetchBlogPageData } from "@/actions/get/blogPage.helper";

export default async function BlogSection() {
  const { blogs: blogData } = await fetchBlogPageData();

  return (
    <div className="max-w-7xl mx-auto py-20 lg:px-0 px-4 space-y-12">
      <SectionHeader
        text="Pricing Plan"
        title="Blog & Articles"
        subtitle="Strategies, Insights, and Tools to Navigate the Options Market Like a Pro"
      />
      <BlogList data={blogData} />
    </div>
  );
}
