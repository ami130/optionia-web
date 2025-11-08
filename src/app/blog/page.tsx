// ✅ /app/blog/page.tsx
export const dynamic = "force-dynamic";
export const revalidate = 60; // ISR for 60 seconds

import { Suspense } from "react";
import Script from "next/script";
import { Metadata } from "next";

import { fetchBlogPageData } from "@/actions/get/blogPage.helper";
import PageHeader from "@/shared/components/PageHeader";
import BannerSection from "@/shared/components/Home/BannerSection";
import { ENV_CONFIG } from "@/shared/constant/app.constant";
import { img } from "@/shared/constant/imgExport";
import BlogFilterSections from "@/shared/components/globalComponents/blog/BlogFilterSections";
import BlogListWithPagination from "@/shared/components/globalComponents/blog/BlogListWithPagination";

// ✅ SEO Metadata (Server Side) - FIXED
export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ search?: string; category?: string }>;
}): Promise<Metadata> {
  // ✅ AWAIT searchParams first
  const resolvedSearchParams = await searchParams;

  const { page } = await fetchBlogPageData(
    resolvedSearchParams?.search,
    resolvedSearchParams?.category
  );

  const metaTitle = page?.metaTitle || page?.title || "Blog";
  const metaDescription =
    page?.metaDescription ||
    page?.description ||
    "Discover the latest insights and articles.";
  const imageUrl = page?.backgroundImage
    ? `${ENV_CONFIG.baseApi}${page.backgroundImage}`
    : "/og-image.jpg";

  return {
    title: metaTitle,
    description: metaDescription,
    keywords: page?.metaKeywords?.join(", ") || "blog, articles, news",
    alternates: {
      canonical: page?.canonicalUrl || "https://optionia-web.vercel.app/blog",
    },
    openGraph: {
      title: metaTitle,
      description: metaDescription,
      url: page?.canonicalUrl,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: page?.title,
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: metaTitle,
      description: metaDescription,
      images: [imageUrl],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

// Preload critical data
const preloadData = (search?: string, category?: string) =>
  fetchBlogPageData(search, category);

// ✅ Main Blog Page with Streaming - FIXED
export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ search?: string; category?: string }>;
}) {
  // ✅ AWAIT searchParams first
  const resolvedSearchParams = await searchParams;

  // Start data loading immediately
  const dataPromise = preloadData(
    resolvedSearchParams?.search,
    resolvedSearchParams?.category
  );

  return (
    <>
      {/* 🔹 JSON-LD Schema - Load after interactive */}
      <Script
        id="blog-schema"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Blog",
            name: "Optionia Blog",
            description: "Discover the latest insights and articles.",
            url: "https://optionia-web.vercel.app/blog",
            publisher: {
              "@type": "Organization",
              name: "Optionia",
              logo: {
                "@type": "ImageObject",
                url: "https://optionia-web.vercel.app/logo.png",
              },
            },
          }),
        }}
      />

      {/* 🔹 Above-the-fold content loads first */}
      <Suspense fallback={<HeaderSkeleton />}>
        <HeaderContent dataPromise={dataPromise} />
      </Suspense>

      {/* 🔹 Main content streams in */}
      <div className="max-w-6xl mx-auto p-5 lg:py-[60px] lg:px-[35px] space-y-12">
        <Suspense fallback={<FilterSkeleton />}>
          <FilterContent
            dataPromise={dataPromise}
            searchParams={resolvedSearchParams}
          />
        </Suspense>

        <Suspense fallback={<BlogListSkeleton />}>
          <BlogListContent
            dataPromise={dataPromise}
            searchParams={resolvedSearchParams}
          />
        </Suspense>
      </div>

      {/* 🔹 Below-the-fold content loads last */}
      <Suspense fallback={<BannerSkeleton />}>
        <BannerSection />
      </Suspense>
    </>
  );
}

// Optimized streaming components
async function HeaderContent({ dataPromise }: { dataPromise: Promise<any> }) {
  const { page } = await dataPromise;

  return (
    <PageHeader
      text={page?.title || "Blog"}
      title={page?.subtitle || "Optionia Blog"}
      subtitle={
        page?.metaDescription || "Discover the latest insights and articles."
      }
      backgroundImage={
        page?.backgroundImage
          ? `${ENV_CONFIG.baseApi}${page.backgroundImage}`
          : img.bannerImg
      }
    />
  );
}

async function FilterContent({
  dataPromise,
  searchParams,
}: {
  dataPromise: Promise<any>;
  searchParams: { search?: string; category?: string };
}) {
  const { categories } = await dataPromise;

  return (
    <BlogFilterSections
      categoriesData={categories}
      initialSearch={searchParams?.search}
      initialCategory={searchParams?.category}
    />
  );
}

async function BlogListContent({
  dataPromise,
  searchParams,
}: {
  dataPromise: Promise<any>;
  searchParams: { search?: string; category?: string };
}) {
  const { blogs } = await dataPromise;

  return (
    <BlogListWithPagination
      initialBlogs={blogs}
      initialSearch={searchParams?.search}
      initialCategory={searchParams?.category}
      itemsPerPage={6}
    />
  );
}

// Optimized Skeletons with proper ARIA labels
function HeaderSkeleton() {
  return (
    <div
      className="h-96 bg-gray-100 animate-pulse"
      role="status"
      aria-label="Loading blog header"
    >
      <div className="container mx-auto h-full flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="h-6 bg-gray-200 rounded w-48 mx-auto"></div>
          <div className="h-12 bg-gray-200 rounded w-96 mx-auto"></div>
          <div className="h-4 bg-gray-200 rounded w-64 mx-auto"></div>
        </div>
      </div>
    </div>
  );
}

function FilterSkeleton() {
  return (
    <div
      className="flex flex-col sm:flex-row items-center justify-between gap-4 w-full"
      role="status"
      aria-label="Loading filters"
    >
      <div className="h-10 bg-gray-100 rounded w-2/3 animate-pulse"></div>
      <div className="h-12 bg-gray-100 rounded w-80 animate-pulse"></div>
    </div>
  );
}

function BlogListSkeleton() {
  return (
    <div className="space-y-12" role="status" aria-label="Loading blog posts">
      <div className="h-8 bg-gray-100 rounded w-64 animate-pulse"></div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="h-80 bg-gray-100 rounded-xl animate-pulse"
          ></div>
        ))}
      </div>
    </div>
  );
}

function BannerSkeleton() {
  return (
    <div
      className="h-60 bg-gray-100 animate-pulse"
      role="status"
      aria-label="Loading banner"
    ></div>
  );
}
