import PageHeader from "@/shared/components/PageHeader";
import AuthorInformationSection from "./AuthorInformationSection";
import { getAuthor } from "@/actions/get/get.action";

interface Props {
  params: { slug: string };
}

export default async function AuthorSlug({ params }: Props) {
  const authorData = await getAuthor(params?.slug);

  return (
    <div className="px-4 lg:px-0">
      {/* Page Header */}
      <PageHeader
        text="Author"
        subtitle="Meet our Optionia author a Shopify and Optionia expert"
        title="Optionia Author "
      />
      <div className="max-w-7xl mx-auto lg:px-0 px-4">
        <AuthorInformationSection info={authorData?.data} />
      </div>
    </div>
  );
}
