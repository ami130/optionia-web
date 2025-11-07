export const dynamic = "force-dynamic";

import { fetchBlogPageData } from "@/actions/get/blogPage.helper";
import BlogFilterSections from "@/shared/components/globalComponents/blog/BlogFilterSections";
import PageHeader from "@/shared/components/PageHeader";
import BannerSection from "@/shared/components/Home/BannerSection";
import { ENV_CONFIG } from "@/shared/constant/app.constant";
import { img } from "@/shared/constant/imgExport";
import Script from "next/script";
import { Metadata } from "next";
import BlogListWithPagination from "@/shared/components/globalComponents/blog/BlogListWithPagination";

// ✅ Step 1: generateMetadata using server-side fetch
export async function generateMetadata(): Promise<Metadata> {
  const { page, blogs } = await fetchBlogPageData();

  return {
    title: page?.metaTitle || page?.title || "Blog",
    description: page?.metaDescription || page?.description,
    keywords: page?.metaKeywords?.join(", ") || "blog, articles, news",
    alternates: {
      canonical: page?.canonicalUrl || "https://optionia-web.vercel.app/blog",
    },
    openGraph: {
      title: page?.metaTitle,
      description: page?.metaDescription,
      url: page?.canonicalUrl,
      images: [
        {
          url: `${ENV_CONFIG?.baseApi}${page?.backgroundImage}`,
          width: 1200,
          height: 630,
          alt: page?.title,
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: page?.metaTitle,
      description: page?.metaDescription,
      images: [`${ENV_CONFIG?.baseApi}${page?.backgroundImage}`],
    },
  };
}

// ✅ Step 2: Server Component for Blog Page
export default async function BlogPage({
  searchParams,
}: {
  searchParams?: { search?: string; category?: string };
}) {
  const params = await searchParams;
  // fetch filtered blogs dynamically
  const { page, blogs, categories } = await fetchBlogPageData(
    params?.search,
    params?.category
  );

  // ✅ Safety check: blogs is always an array
  const featuredBlogs = (blogs || [])
    .filter((b: any) => b.featured)
    .slice(0, 2);
  const latestBlogs = (blogs || []).filter((b: any) => !b.featured);

  return (
    <div>
      {/* 🔹 JSON-LD Schema */}
      <Script
        id="blog-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Blog",
            name: page?.metaTitle,
            description: page?.metaDescription,
            url: page?.canonicalUrl,
            image: `${ENV_CONFIG?.baseApi}${page?.backgroundImage}`,
          }),
        }}
      />

      {/* 🔹 Page Header */}
      <PageHeader
        text={page?.title || "Blog Page"}
        title={page?.subtitle || "Optionia Blog"}
        subtitle={
          page?.metaDescription || "Start customizing your products today."
        }
        backgroundImage={
          page?.backgroundImage
            ? ENV_CONFIG?.baseApi + page.backgroundImage
            : img.bannerImg
        }
      />

      {/* 🔹 Blog Section */}
      <div className="max-w-6xl mx-auto p-5 lg:py-[60px] lg:px-[35px] space-y-12">
        <BlogFilterSections categoriesData={categories} />
        <BlogListWithPagination
          featuredBlogs={featuredBlogs}
          latestBlogs={latestBlogs}
          itemsPerPage={6}
        />
      </div>

      {/* 🔹 Banner */}
      <BannerSection />
    </div>
  );
}
