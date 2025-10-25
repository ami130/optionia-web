import BlogFilterSections from "@/shared/components/globalComponents/blog/BlogFilterSections";
import BlogListWithPagination from "@/shared/components/globalComponents/blog/BlogListWithPagination";
import BannerSection from "@/shared/components/Home/BannerSection";
import PageHeader from "@/shared/components/PageHeader";
import { blogData } from "@/shared/constant/data";
import { img } from "@/shared/constant/imgExport";

export default function BlogPage() {
  // Separate blogs on server side (no client-side filtering)
  const featuredBlogs = blogData?.filter((blog) => blog.featured).slice(0, 2) || [];
  const latestBlogs = blogData?.filter((blog) => !blog.featured) || [];

  return (
    <div>
      <PageHeader
        text="Blog Page"
        title="Optionia Blog"
        subtitle="Start customizing your products today and watch your Shopify sales grow."
        backgroundImage={img.bannerImg}
      />
      <div className="max-w-6xl mx-auto p-5 lg:py-[60px] lg:px-[35px] space-y-12">
        <BlogFilterSections />
        
        {/* Use the client component with pagination */}
        <BlogListWithPagination 
          featuredBlogs={featuredBlogs}
          latestBlogs={latestBlogs}
          itemsPerPage={6}
        />
      </div>
      <BannerSection />
    </div>
  );
}