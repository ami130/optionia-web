// ✅ /app/blog/page.tsx
export const dynamic = "force-dynamic";
export const revalidate = 60;

import { Metadata } from "next";
import Script from "next/script";

import { fetchBlogPageData } from "@/actions/get/blogPage.helper";
import PageHeader from "@/shared/components/PageHeader";
import BannerSection from "@/shared/components/Home/BannerSection";
import { ENV_CONFIG } from "@/shared/constant/app.constant";
import { img } from "@/shared/constant/imgExport";
import BlogFilterSections from "@/shared/components/globalComponents/blog/BlogFilterSections";
import BlogListWithPagination from "@/shared/components/globalComponents/blog/BlogListWithPagination";

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ search?: string; category?: string }>;
}): Promise<Metadata> {
  const resolvedSearchParams = await searchParams;
  const { page } = await fetchBlogPageData(
    resolvedSearchParams?.search,
    resolvedSearchParams?.category
  );

  const metaTitle = page?.metaTitle || page?.title || "Blog";
  const metaDescription = page?.metaDescription || "Discover insights";
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
  };
}

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ search?: string; category?: string }>;
}) {
  // ✅ Properly await searchParams in Server Component
  const resolvedSearchParams = await searchParams;

  // Server-side filtering - data is already filtered from API
  const { page, blogs, categories } = await fetchBlogPageData(
    resolvedSearchParams?.search,
    resolvedSearchParams?.category
  );

  console.log("searchParams", resolvedSearchParams);
  console.log("blogs count:", blogs.length);
  console.log(
    "With filters:",
    resolvedSearchParams?.search,
    resolvedSearchParams?.category
  );

  return (
    <>
      <Script
        id="blog-schema"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Blog",
            name: "Optionia Blog",
            description: "Discover insights",
            url: "https://optionia-web.vercel.app/blog",
            publisher: {
              "@type": "Organization",
              name: "Optionia",
            },
          }),
        }}
      />

      <PageHeader
        text={page?.title || "Blog"}
        title={page?.subtitle || "Optionia Blog"}
        subtitle={page?.metaDescription || "Discover insights"}
        backgroundImage={
          page?.backgroundImage
            ? `${ENV_CONFIG.baseApi}${page.backgroundImage}`
            : img.bannerImg
        }
      />

      <div className="max-w-6xl mx-auto p-5 lg:py-[60px] lg:px-[35px] space-y-12">
        {/* Filters - Will trigger server-side refresh */}
        <BlogFilterSections
          categoriesData={categories}
          initialSearch={resolvedSearchParams?.search}
          initialCategory={resolvedSearchParams?.category}
        />

        {/* Blog List - Shows server-filtered data */}
        <BlogListWithPagination
          initialBlogs={blogs}
          initialSearch={resolvedSearchParams?.search}
          initialCategory={resolvedSearchParams?.category}
          itemsPerPage={6}
        />
      </div>

      <BannerSection />
    </>
  );
}

// // ✅ /app/blog/page.tsx
// export const dynamic = "force-dynamic";
// export const revalidate = 60;

// import { Metadata } from "next";
// import Script from "next/script";

// import { fetchBlogPageData } from "@/actions/get/blogPage.helper";
// import PageHeader from "@/shared/components/PageHeader";
// import BannerSection from "@/shared/components/Home/BannerSection";
// import { ENV_CONFIG } from "@/shared/constant/app.constant";
// import { img } from "@/shared/constant/imgExport";
// import BlogFilterSections from "@/shared/components/globalComponents/blog/BlogFilterSections";
// import BlogListWithPagination from "@/shared/components/globalComponents/blog/BlogListWithPagination";

// export async function generateMetadata({
//   searchParams,
// }: {
//   searchParams: Promise<{ search?: string; category?: string }>;
// }): Promise<Metadata> {
//   const resolvedSearchParams = await searchParams;
//   const { page } = await fetchBlogPageData(
//     resolvedSearchParams?.search,
//     resolvedSearchParams?.category
//   );

//   const metaTitle = page?.metaTitle || page?.title || "Blog";
//   const metaDescription = page?.metaDescription || "Discover insights";
//   const imageUrl = page?.backgroundImage
//     ? `${ENV_CONFIG.baseApi}${page.backgroundImage}`
//     : "/og-image.jpg";

//   return {
//     title: metaTitle,
//     description: metaDescription,
//     keywords: page?.metaKeywords?.join(", ") || "blog, articles, news",
//     alternates: {
//       canonical: page?.canonicalUrl || "https://optionia-web.vercel.app/blog",
//     },
//     openGraph: {
//       title: metaTitle,
//       description: metaDescription,
//       url: page?.canonicalUrl,
//       images: [
//         {
//           url: imageUrl,
//           width: 1200,
//           height: 630,
//           alt: page?.title,
//         },
//       ],
//       type: "website",
//     },
//     twitter: {
//       card: "summary_large_image",
//       title: metaTitle,
//       description: metaDescription,
//       images: [imageUrl],
//     },
//   };
// }

// export default async function BlogPage({
//   searchParams,
// }: {
//   searchParams: Promise<{ search?: string; category?: string }>;
// }) {
//   const resolvedSearchParams = await searchParams;

//   // Load all data at once for instant client-side filtering
//   const { page, blogs, categories } = await fetchBlogPageData(
//     resolvedSearchParams?.search,
//     resolvedSearchParams?.category
//   );

//   console.log("blogs", blogs);

//   return (
//     <>
//       <Script
//         id="blog-schema"
//         type="application/ld+json"
//         strategy="afterInteractive"
//         dangerouslySetInnerHTML={{
//           __html: JSON.stringify({
//             "@context": "https://schema.org",
//             "@type": "Blog",
//             name: "Optionia Blog",
//             description: "Discover insights",
//             url: "https://optionia-web.vercel.app/blog",
//             publisher: {
//               "@type": "Organization",
//               name: "Optionia",
//             },
//           }),
//         }}
//       />

//       <PageHeader
//         text={page?.title || "Blog"}
//         title={page?.subtitle || "Optionia Blog"}
//         subtitle={page?.metaDescription || "Discover insights"}
//         backgroundImage={
//           page?.backgroundImage
//             ? `${ENV_CONFIG.baseApi}${page.backgroundImage}`
//             : img.bannerImg
//         }
//       />

//       <div className="max-w-6xl mx-auto p-5 lg:py-[60px] lg:px-[35px] space-y-12">
//         {/* Filters - Will update URL instantly */}
//         <BlogFilterSections
//           categoriesData={categories}
//           initialSearch={resolvedSearchParams?.search}
//           initialCategory={resolvedSearchParams?.category}
//         />

//         {/* Blog List - Will filter INSTANTLY based on URL changes */}
//         <BlogListWithPagination
//           initialBlogs={blogs}
//           initialSearch={resolvedSearchParams?.search}
//           initialCategory={resolvedSearchParams?.category}
//           itemsPerPage={6}
//         />
//       </div>

//       <BannerSection />
//     </>
//   );
// }
