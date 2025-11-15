import { Mail, Phone, MapPin } from "lucide-react";
import PageHeader from "@/shared/components/PageHeader";
import FaqSection from "@/shared/components/Home/FaqSection";
import BannerSection from "@/shared/components/Home/BannerSection";
import SupportSection from "@/shared/components/Home/Support/SupportSection";

export default function ContactPage() {
  return (
    <div className="px-4 lg:px-0">
      {/* Page Header */}
      <PageHeader
        text="Contact"
        subtitle="Start customizing your products today and watch your Shopify sales grow."
        title="Contact Us"
      />

      <SupportSection />
      <FaqSection />
      <BannerSection />
    </div>
  );
}
