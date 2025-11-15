import PageHeader from "@/shared/components/PageHeader";
import AuthorInformationSection from "./AuthorInformationSection";

export default function AuthorSlug() {
  return (
    <div className="px-4 lg:px-0">
      {/* Page Header */}
      <PageHeader
        text="Author"
        subtitle="Meet our Optionia author a Shopify and Optionia expert"
        title="Optionia Author "
      />
      <div className="max-w-7xl mx-auto lg:px-0 px-4">
        <AuthorInformationSection />
      </div>
    </div>
  );
}
