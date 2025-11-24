"use client";
import { useState } from "react";

export default function CustomAccordion({ data }: { data: any }) {
  const [openId, setOpenId] = useState<string | null>(null);

  const toggle = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div className="space-y-3 py-12">
      <p className="text-[#360C5F] font-medium text-[32px]">
        {data?.faqTitle || "FAQ"}
      </p>

      {(data?.items || [])?.map((item: any) => {
        const isOpen = openId === item.id;

        return (
          <div
            key={item.id}
            className="border border-[#E7D7FD] bg-white px-6 py-4 rounded-2xl"
          >
            {/* Trigger */}
            <button
              onClick={() => toggle(item.id)}
              className="w-full flex items-center justify-between cursor-pointer text-left font-medium text-xl text-[#360C5F] focus:outline-none"
            >
              {item.question}

              {/* + / - icon */}
              <span
                className={` w-11 h-11 flex items-center justify-center text-lg font-bold transition-all duration-200 rounded-full ${
                  isOpen
                    ? "text-white border-0"
                    : "border-[#F2E9FE] text-[#360C5F] border"
                }`}
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
                isOpen ? "max-h-96 mt-3" : "max-h-0"
              }`}
            >
              <div
                className="text-muted-foreground text-[18px] font-normal"
                dangerouslySetInnerHTML={{ __html: item.answer || "" }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
