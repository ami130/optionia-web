import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export default function SingleBlogFaqSection({ data }: any) {
  return (
    <section className="py-12">
      <div className="container max-w-3xl mx-auto lg:px-0 space-y-6">
        <p className="text-[#360C5F] font-medium text-[32px]">
          {data?.faqTitle || "FAQ"}
        </p>
        <Accordion type="single" collapsible className="space-y-3">
          {data?.items?.map((item: FaqItem) => (
            <AccordionItem key={item.id} value={item.id} className="py-1">
              <AccordionTrigger className="font-medium text-xl text-[#360C5F] hover:no-underline text-left cursor-pointer">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-[18px] font-normal">
                <div dangerouslySetInnerHTML={{ __html: item.answer || "" }} />
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
