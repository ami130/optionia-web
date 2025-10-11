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
      image: img.whiteImg,
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
      image: img.whiteImg,
      reverse: false,
    },
    {
      title: "Multi-Level Options",
      description:
        "Build parent and child options for advanced customization, letting customers personalize every detail of your products.",
      bgColor: "bg-[#E9F4FE]",
      image: img.whiteImg,
      reverse: true,
    },
    {
      title: "Price Add-ons",
      description:
        "Easily add extra charges for premium features, upgrades, or special customizations to increase your average order value.",
      bgColor: "bg-[#F0F8E9]",
      image: img.whiteImg,
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
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        {features.map((item, index) => {
          const start = index / features.length;
          const end = (index + 1) / features.length;

          // ALWAYS call useTransform (deterministic) — map first card to no-motion range
          const translateY = useTransform(
            scrollYProgress,
            [start, end],
            index === 0 ? ["0%", "0%"] : ["100%", "0%"]
          );

          const opacity = useTransform(
            scrollYProgress,
            [start, end],
            index === 0 ? [1, 1] : [0, 1]
          );

          // zIndex: higher index overlays above earlier ones
          const zIndex = index + 1;

          return (
            <motion.div
              key={index}
              className="absolute inset-0 flex items-center justify-center px-6"
              style={{
                y: translateY,
                opacity,
                zIndex,
              }}
            >
              {/* Card content (replicates your SampleF markup) */}
              <div className={`max-w-6xl w-full`}>
                <div
                  className={`grid grid-cols-1 md:grid-cols-2 gap-5 border p-9 rounded-2xl ${item.bgColor}`}
                >
                  {/* Image */}
                  <div className={`${item.reverse ? "md:order-2" : ""}`}>
                    {/* If your next/image requires fixed sizes you can set width/height here */}
                    <Image
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover rounded-2xl"
                      width={900}
                      height={560}
                    />
                  </div>

                  {/* Text */}
                  <div className="py-7">
                    <div className="lg:bg-white flex flex-col justify-center items-start h-full rounded-2xl px-9 space-y-3 text-center lg:text-left">
                      <h1 className="text-3xl font-semibold leading-snug">
                        {item.title}
                      </h1>
                      <p className="text-xs text-gray-400">{item.description}</p>
                    </div>
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
