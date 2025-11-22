// app/privacy-policy/page.tsx
import { Metadata } from "next";
import PageHeader from "@/shared/components/PageHeader";
import { img } from "@/shared/constant/imgExport";
import PrivacyPolicyContent from "./PrivacyPolicyContent";
import { ENV_CONFIG } from "@/shared/constant/app.constant";
import { getPrivacyPolicy } from "@/actions/get/get.action";

// Single function to fetch data
async function fetchPrivacyData() {
  const privacyPolicyData = await getPrivacyPolicy();
  return privacyPolicyData?.data;
}

// Metadata generation using the same API call
export async function generateMetadata(): Promise<Metadata> {
  const data = await fetchPrivacyData();
  const page = data?.page;

  return {
    title: page?.metaTitle || page?.title || "Privacy Policy | Optionia",
    description:
      page?.metaDescription ||
      "Read our Privacy Policy to understand how we handle your data and protect your privacy.",
    openGraph: {
      title: page?.metaTitle || page?.title || "Privacy Policy | Optionia",
      description:
        page?.metaDescription ||
        "Read our Privacy Policy to understand how we handle your data and protect your privacy.",
      url: "/privacy-policy",
      type: "website",
      images: [
        page?.backgroundImage
          ? `${ENV_CONFIG.baseApi}${page.backgroundImage}`
          : "/default-og-image.jpg",
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: page?.metaTitle || page?.title || "Privacy Policy | Optionia",
      description:
        page?.metaDescription ||
        "Read our Privacy Policy to understand how we handle your data and protect your privacy.",
      images: [
        page?.backgroundImage
          ? `${ENV_CONFIG.baseApi}${page.backgroundImage}`
          : "/default-og-image.jpg",
      ],
    },
  };
}

// Page component
export default async function PrivacyPolicy() {
  const data = await fetchPrivacyData();
  const { content, page } = data || {};

  return (
    <div>
      <PageHeader
        text={page?.title || "Privacy Policy"}
        title={page?.subtitle || "Privacy Policy Subtitle"}
        subtitle={page?.metaDescription || "Discover insights"}
        backgroundImage={
          page?.backgroundImage
            ? `${ENV_CONFIG.baseApi}${page.backgroundImage}`
            : img.bannerImg
        }
      />
      <div className="container max-w-6xl mx-auto lg:px-0 px-4 py-12">
        <PrivacyPolicyContent content={content} />
      </div>
    </div>
  );
}
