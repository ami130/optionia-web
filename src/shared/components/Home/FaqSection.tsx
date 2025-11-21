import CustomAccordion from "../globalComponents/blog/According";
import SectionHeader from "../SectionHeader";

export default function FaqSection() {
  const items: any[] = [
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
        "The purpose of a FAQ is to provide answers to common questions and help users find information quickly.",
    },
    {
      id: "faq-3",
      question: "How do I create a FAQ?",
      answer:
        "Compile a list of common questions and answers and organize them clearly and logically.",
    },
  ];

  return (
    <section className="py-20 lg:px-14 bg-secondPrimaryColor">
      <div className="container max-w-3xl mx-auto lg:px-0 px-4">
        <div className="mb-12">
          <SectionHeader
            text="FAQ"
            title="Frequently Asked Questions"
            subtitle="Everything you need to know about Optionia."
          />
        </div>

        <CustomAccordion data={items} />
      </div>
    </section>
  );
}
