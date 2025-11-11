import BlogContentClient from "./BlogContentClient";
import { Metadata } from "next";
import Script from "next/script";
import { ENV_CONFIG } from "@/shared/constant/app.constant";
import { getSingleBlog } from "@/actions/get/blogPage.helper";
import { img } from "@/shared/constant/imgExport";

interface Props {
  params: { slug: string };
}

// ✅ Generate Metadata for SEO dynamically (SSR)
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  console.log("params", params?.slug);

  const blogData = await getSingleBlog(params?.slug);
  const blogPost = blogData?.data;

  if (!blogPost) {
    return {
      title: "Blog not found | Optionia",
      description: "The blog post you’re looking for could not be found.",
    };
  }

  const meta = JSON.parse(blogPost.metaData || "{}");

  const baseUrl = ENV_CONFIG?.baseApi?.replace(/\/$/, ""); // remove trailing slash if any
  const imageUrl = blogPost?.thumbnailUrl
    ? `${baseUrl}${blogPost.thumbnailUrl}`
    : `${baseUrl}/placeholder.png`;

  const canonicalUrl = meta?.canonicalUrl || `${baseUrl}/blog/${blogPost.slug}`;

  return {
    title: meta?.metaTitle || blogPost.title,
    description: meta?.metaDescription || blogPost.subtitle || "",
    keywords: meta?.metaKeywords?.join(", ") || "blog, Optionia, article",
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: meta?.metaTitle || blogPost.title,
      description: meta?.metaDescription || blogPost.subtitle || "",
      url: canonicalUrl,
      type: "article",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: blogPost.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: meta?.metaTitle || blogPost.title,
      description: meta?.metaDescription || blogPost.subtitle || "",
      images: [imageUrl],
    },
  };
}

// ✅ Main Page Component (Server-rendered)
export default async function BlogPage({ params }: Props) {
  const blogData = await getSingleBlog(params?.slug);
  const blogPost = blogData?.data;

  console.log("blogPost");

  if (!blogPost) {
    return <div className="text-center py-20">Blog not found.</div>;
  }

  const baseUrl = ENV_CONFIG?.baseApi?.replace(/\/$/, "");
  const meta = JSON.parse(blogPost.metaData || "{}");

  const formattedDate = new Date(blogPost.createdAt).toLocaleDateString(
    "en-US",
    { day: "2-digit", month: "long", year: "numeric" }
  );

  const imageUrl = blogPost?.thumbnailUrl
    ? `${baseUrl}${blogPost.thumbnailUrl}`
    : img.blog1;

  const canonicalUrl = meta?.canonicalUrl || `${baseUrl}/blog/${blogPost.slug}`;

  return (
    <div>
      {/* ✅ Structured Data for Google SEO (JSON-LD) */}
      <Script
        id="blog-schema"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: meta?.metaTitle || blogPost.title,
            description:
              meta?.metaDescription || blogPost.subtitle || "Optionia Blog",
            image: imageUrl,
            author: {
              "@type": "Person",
              name: blogPost?.authors?.[0]?.username || "Admin",
            },
            publisher: {
              "@type": "Organization",
              name: "Optionia",
              logo: {
                "@type": "ImageObject",
                url: `${baseUrl}/logo.png`,
              },
            },
            datePublished: blogPost.createdAt,
            dateModified: blogPost.updatedAt,
            mainEntityOfPage: {
              "@type": "WebPage",
              "@id": canonicalUrl,
            },
          }),
        }}
      />

      {/* ✅ Blog Content Client Component */}
      <div>
        <BlogContentClient
          blogPost={{
            ...blogPost,
            date: formattedDate,
          }}
        />
      </div>
    </div>
  );
}
