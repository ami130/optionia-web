// app/terms-of-services/page.tsx
import { Metadata } from "next";
import { getTermsOfService } from "@/actions/get/get.action";
import PageHeader from "@/shared/components/PageHeader";
import { ENV_CONFIG } from "@/shared/constant/app.constant";
import { img } from "@/shared/constant/imgExport";
import TermsOfServicesContent from "./TermsOfServiceContent";

interface TermsPageProps {
  termsData: any;
}

// We fetch the data once in a wrapper async function
async function fetchTermsData() {
  const termsData = await getTermsOfService();
  return termsData?.data;
}

// This will be called by Next.js for metadata generation
export async function generateMetadata(): Promise<Metadata> {
  const data = await fetchTermsData();
  const page = data?.page;

  return {
    title: page?.metaTitle || page?.title || "Terms of Services | Optionia",
    description:
      page?.metaDescription ||
      "Read our Terms of Services to understand policies, usage, and guidelines for Optionia.",
    openGraph: {
      title: page?.metaTitle || page?.title || "Terms of Services | Optionia",
      description:
        page?.metaDescription ||
        "Read our Terms of Services to understand policies, usage, and guidelines for Optionia.",
      url: "/terms-of-services",
      type: "website",
      images: [
        page?.backgroundImage
          ? `${ENV_CONFIG.baseApi}${page.backgroundImage}`
          : "/default-og-image.jpg",
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: page?.metaTitle || page?.title || "Terms of Services | Optionia",
      description:
        page?.metaDescription ||
        "Read our Terms of Services to understand policies, usage, and guidelines for Optionia.",
      images: [
        page?.backgroundImage
          ? `${ENV_CONFIG.baseApi}${page.backgroundImage}`
          : "/default-og-image.jpg",
      ],
    },
  };
}

export default async function TermsOfServicesPage() {
  // ✅ Call API once
  const termsData = await fetchTermsData();
  const { content, page } = termsData || {};

  return (
    <div>
      <PageHeader
        text={page?.title || "Terms of Services"}
        title={page?.subtitle || "Terms Of Service Subtitle"}
        subtitle={page?.metaDescription || "Discover insights"}
        backgroundImage={
          page?.backgroundImage
            ? `${ENV_CONFIG.baseApi}${page.backgroundImage}`
            : img.bannerImg
        }
      />
      <div className="container max-w-6xl mx-auto lg:px-0 px-4 py-12">
        <TermsOfServicesContent content={content} />
      </div>
    </div>
  );
}
