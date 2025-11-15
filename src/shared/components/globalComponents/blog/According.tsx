"use client";
import { useState } from "react";

export interface AccordionItemType {
  id: string;
  question: string;
  answer: string;
}

export default function CustomAccordion({
  items,
}: {
  items: AccordionItemType[];
}) {
  const [openId, setOpenId] = useState<string | null>(null);

  const toggle = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div className="space-y-3">
      {items.map((item) => {
        const isOpen = openId === item.id;

        return (
          <div
            key={item.id}
            className="border bg-white px-6 py-4 rounded-2xl"
          >
            {/* Trigger */}
            <button
              onClick={() => toggle(item.id)}
              className="w-full flex items-center justify-between cursor-pointer text-left font-medium text-xl text-[#360C5F] focus:outline-none"
            >
              {item.question}

              {/* + / - icon */}
              <span
                className={`
    w-7 h-7 flex items-center justify-center 
   text-lg font-bold transition-all duration-200 rounded-full
    ${
      isOpen
        ? "text-white border-0  "
        : "bg-[#F9FAFB] text-[#360C5F] border"
    }
  `}
                style={
                  isOpen
                    ? {
                        background:
                          "linear-gradient(123deg, #F197FE -22.87%, #8838E0 63.14%)",
                      }
                    : {}
                }
              >
                {isOpen ? "−" : "+"}
              </span>
            </button>

            {/* Content */}
            <div
              className={`overflow-hidden transition-all duration-300 ${
                isOpen ? "max-h-40 mt-3" : "max-h-0"
              }`}
            >
              <p className="text-muted-foreground text-[18px] font-normal">
                {item.answer}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
