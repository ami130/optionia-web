import BlogCardListWithFeatured from "@/shared/components/globalComponents/blog/BlogCardListWithFeatured";
import BlogFilterSections from "@/shared/components/globalComponents/blog/BlogFilterSections";
import PageHeader from "@/shared/components/PageHeader";
import { blogData } from "@/shared/constant/data";
import { img } from "@/shared/constant/imgExport";

export default function BlogPage() {
  return (
    <div>
      <PageHeader
        text="Blog Page"
        title="Optionia Blog"
        subtitle="Start customizing your products today and watch your Shopify sales grow."
        backgroundImage={img.bannerImg}
      />
      <div className="max-w-6xl mx-auto p-5 lg:py-[60px] lg:px-[35px]  space-y-12">
        <BlogFilterSections />
        <BlogCardListWithFeatured data={blogData} />
      </div>
    </div>
  );
}
