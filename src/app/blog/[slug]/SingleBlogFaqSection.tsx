import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import SectionHeader from "@/shared/components/SectionHeader";

interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

interface FaqSectionProps {
  heading?: string;
  items?: FaqItem[];
}

export default function SingleBlogFaqSection({
  items = [
    {
      id: "faq-1",
      question: "What is a FAQ?",
      answer:
        "A FAQ is a list of frequently asked questions and answers on a particular topic.",
    },
    {
      id: "faq-2",
      question: "What is the purpose of a FAQ?",
      answer:
        "The purpose of a FAQ is to provide answers to common questions and help users find information quickly and easily.",
    },
    {
      id: "faq-3",
      question: "How do I create a FAQ?",
      answer:
        "To create a FAQ, compile a list of common questions and answers on a topic and organize them clearly and logically.",
    },
    {
      id: "faq-4",
      question: "What are the benefits of a FAQ?",
      answer:
        "A FAQ provides quick access to information, reduces support requests, and improves user experience.",
    },
    {
      id: "faq-5",
      question: "How should I organize my FAQ?",
      answer:
        "Organize your FAQ logically, grouping related questions and ordering them from basic to advanced topics.",
    },
    {
      id: "faq-6",
      question: "How long should FAQ answers be?",
      answer:
        "Answers should be concise — a few sentences or a short paragraph is usually enough.",
    },
    {
      id: "faq-7",
      question: "Should I include links in my FAQ?",
      answer:
        "Yes, links to more detailed resources are helpful for users who want to learn more.",
    },
  ],
}: FaqSectionProps) {
  return (
    <section className="py-12">
      <div className="container max-w-3xl mx-auto lg:px-0 space-y-6">
        <p className="text-[#360C5F] font-medium text-[32px]">FAQ</p>
        <Accordion type="single" collapsible className="space-y-3">
          {items.map((item) => (
            <AccordionItem
              key={item.id}
              value={item.id}
              className=" py-1 "
            >
              <AccordionTrigger className="font-medium text-xl text-[#360C5F] hover:no-underline text-left cursor-pointer">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-[18px] font-normal">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
