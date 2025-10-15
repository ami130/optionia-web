"use client";

import Image from "next/image";

interface ChooseOptionItem {
  id: number;
  title: string;
  subtitle: string;
  img: string;
}

export default function ChooseOptioniaSubSection({
  data,
}: {
  data: ChooseOptionItem[];
}) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
      {data.map((item) => (
        <div
          key={item.id}
          className="border p-6 rounded-2xl space-y-5 bg-secondaryBaseColor border-primaryColor group ease-in-out transition-all duration-300 hover:scale-100 hover:shadow-xl"
          style={{
            boxShadow: "0 0 transparent",
            transition: "all 300ms ease-in-out",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "scale(1.05)";
            e.currentTarget.style.boxShadow =
              "0 10px 25px rgba(109, 31, 216, 0.15)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "scale(1)";
            e.currentTarget.style.boxShadow = "0 0 transparent";
          }}
        >
          {/* Icon Section */}
          <div
            className="w-10 h-10 p-1 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110"
            style={{ background: "var(--gradient-active-step)" }}
          >
            <Image
              src={item.img}
              alt={item.title}
              width={24}
              height={24}
              className="object-contain"
            />
          </div>

          {/* Text Section */}
          <div className="space-y-3">
            <h1 className="text-secondaryTextColor font-semibold text-lg transition-colors duration-300">
              {item.title}
            </h1>
            <p className="text-sm font-light text-gray-900">{item.subtitle}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
