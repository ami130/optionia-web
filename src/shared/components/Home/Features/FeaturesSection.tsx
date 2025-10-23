"use client";
import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { img } from "@/shared/constant/imgExport";

export default function FeaturesStack() {
  // -- FEATURES (same data you used in SampleF) --
  const features = [
    {
      title: "Option Sets with Unlimited Options",
      description:
        "Add as many product options and variants as you need, giving your customers full flexibility while keeping your store easy to manage.",
      bgColor: "bg-secondPrimaryColor",
      image: img.optioniaImg1,
      reverse: false,
    },
    {
      title: "Smart Conditional Logic",
      description:
        "Show or hide options automatically based on customer selections to create a cleaner, more personalized shopping experience.",
      bgColor: "bg-[#EAF4F1]",
      image: img.whiteImg,
      reverse: true,
    },
    {
      title: "Intuitive Live Preview",
      description:
        "Design and see your product options in real time before publishing, so every detail looks perfect on your store.",
      bgColor: "bg-[#FEEDEB]",
      image: img.optioniaImg1,
      reverse: false,
    },
    {
      title: "Multi-Level Options",
      description:
        "Build parent and child options for advanced customization, letting customers personalize every detail of your products.",
      bgColor: "bg-[#E9F4FE]",
      image: img.optioniaImg2,
      reverse: true,
    },
    {
      title: "Price Add-ons",
      description:
        "Easily add extra charges for premium features, upgrades, or special customizations to increase your average order value.",
      bgColor: "bg-[#F0F8E9]",
      image: img.optioniaImg1,
      reverse: false,
    },
  ];

  // container ref for scroll tracking
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    // full range: container top = start, container bottom = end
    offset: ["start start", "end end"],
  });

  // height = number of features * 100vh so each feature occupies a viewport
  return (
    <div
      ref={containerRef}
      className="relative w-full"
      style={{ height: `${features.length * 100}vh` }}
    >
      {/* Sticky viewport where cards will stack */}
      <div className="sticky top-4 h-screen flex items-center justify-center overflow-hidden">
        {features.map((item, index) => {
          const start = index / features.length;
          const end = (index + 1) / features.length;

          // ALWAYS call useTransform (deterministic) — map first card to no-motion range
          const translateY = useTransform(
            scrollYProgress,
            [start, end],
            index === 0 ? ["00%", "0%"] : ["100%", "0%"]
          );

          // const opacity = useTransform(
          //   scrollYProgress,
          //   [start, end],
          //   index === 0 ? [1, 1] : [0, 1]
          // );

          // zIndex: higher index overlays above earlier ones
          const zIndex = index + 1;
          ``;
          return (
            <motion.div
              key={index}
              className="absolute inset-0 flex items-center justify-center "
              style={{
                y: translateY,
                zIndex,
              }}
            >
              {/* Card content (replicates your SampleF markup) */}
              <div className={`max-w-6xl w-full `}>
                <div
                  className={`grid grid-cols-1 md:grid-cols-2 lg:gap-32 p-8 rounded-4xl ${item.bgColor}`}
                >
                  {/* Image */}
                  <div
                    className={`${
                      item.reverse ? "md:order-2" : ""
                    } rounded-2xl `}
                  >
                    {/* If your next/image requires fixed sizes you can set width/height here */}

                    <Image
                      src={item.image}
                      alt={item.title}
                      className="lg:w-[564px] lg:h-[462px] object-cover border rounded-2xl "
                      width={600}
                      height={480}
                    />
                  </div>

                  {/* Text */}
                  <div
                    className={`flex flex-col justify-center items-start h-full rounded-2xl py-6 space-y-3 text-center lg:text-left ${
                      index === 0 ? "ps-0 " : "px-9 pe-0 "
                    }`}
                  >
                    <h1 className="text-3xl lg:text-4xl font-semibold leading-snug">
                      {item.title}
                    </h1>
                    <p className="text-sm text-gray-400">{item.description}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
