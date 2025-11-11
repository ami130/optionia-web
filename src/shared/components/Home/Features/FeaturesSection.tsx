"use client";
import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { img } from "@/shared/constant/imgExport";

export default function FeaturesStack() {
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

  const containerRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <div
      ref={containerRef}
      className="relative w-full "
      // Height scales smoothly with number of features
      style={{ height: `${4 * 50}vh` }}
    >
      {/* Sticky viewport area — adaptive height for all devices */}
      <div className="sticky  top-10 h-[70vh] sm:h-[90vh] md:h-[80vh] lg:h-[85vh] xl:h-[80vh]  flex items-center justify-center overflow-hidden">
        {features.map((item, index) => {
          const start = index / features.length;
          const end = (index + 1) / features.length;

          const translateY = useTransform(
            scrollYProgress,
            [start, end],
            index === 0 ? ["0%", "0%"] : ["90%", "0%"]
          );

          const zIndex = index + 1;

          return (
            <motion.div
              key={index}
              className="absolute inset-0 flex items-center justify-center  "
              style={{
                y: translateY,
                zIndex,
              }}
            >
              <div className="max-w-6xl w-full">
                <div
                  className={`grid grid-cols-1 md:grid-cols-2 lg:gap-20 p-6 md:p-8 rounded-3xl ${item.bgColor} min-h-[350px] sm:min-h-[400px] md:min-h-[450px] lg:min-h-[500px]`}
                >
                  {/* Image */}
                  <div
                    className={`${
                      item.reverse ? "md:order-2" : ""
                    } flex items-center justify-center`}
                  >
                    <Image
                      src={item.image}
                      alt={item.title}
                      className="w-full max-w-[420px] sm:max-w-[460px] md:max-w-[500px] h-auto object-cover rounded-2xl"
                      width={500}
                      height={400}
                    />
                  </div>

                  {/* Text */}
                  <div
                    className={`flex flex-col justify-center items-start h-full space-y-3 text-center md:text-left ${
                      index === 0 ? "ps-0" : "px-4 md:px-6 pe-0"
                    }`}
                  >
                    <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold leading-snug">
                      {item.title}
                    </h1>
                    <p className="text-xs sm:text-sm md:text-base text-gray-600 leading-relaxed">
                      {item.description}
                    </p>
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

// "use client";
// import React, { useRef } from "react";
// import { motion, useScroll, useTransform } from "framer-motion";
// import Image from "next/image";
// import { img } from "@/shared/constant/imgExport";

// export default function FeaturesStack() {
//   const features = [
//     {
//       title: "Option Sets with Unlimited Options",
//       description:
//         "Add as many product options and variants as you need, giving your customers full flexibility while keeping your store easy to manage.",
//       bgColor: "bg-secondPrimaryColor",
//       image: img.optioniaImg1,
//       reverse: false,
//     },
//     {
//       title: "Smart Conditional Logic",
//       description:
//         "Show or hide options automatically based on customer selections to create a cleaner, more personalized shopping experience.",
//       bgColor: "bg-[#EAF4F1]",
//       image: img.whiteImg,
//       reverse: true,
//     },
//     {
//       title: "Intuitive Live Preview",
//       description:
//         "Design and see your product options in real time before publishing, so every detail looks perfect on your store.",
//       bgColor: "bg-[#FEEDEB]",
//       image: img.optioniaImg1,
//       reverse: false,
//     },
//     {
//       title: "Multi-Level Options",
//       description:
//         "Build parent and child options for advanced customization, letting customers personalize every detail of your products.",
//       bgColor: "bg-[#E9F4FE]",
//       image: img.optioniaImg2,
//       reverse: true,
//     },
//     {
//       title: "Price Add-ons",
//       description:
//         "Easily add extra charges for premium features, upgrades, or special customizations to increase your average order value.",
//       bgColor: "bg-[#F0F8E9]",
//       image: img.optioniaImg1,
//       reverse: false,
//     },
//   ];

//   const containerRef = useRef<HTMLDivElement | null>(null);
//   const { scrollYProgress } = useScroll({
//     target: containerRef,
//     offset: ["start start", "end end"],
//   });

//   // ⏫ height is 80vh per card (not full screen)
//   // allows next card to slightly peek (~10-20%) on scroll
//   return (
//     <div
//       ref={containerRef}
//       className="relative w-full"
//       style={{ height: `${features.length * 50}vh` }}
//     >
//       {/* Sticky wrapper — moderate height, adaptive on large screens */}
//       <div className="sticky top-0 h-[75vh] md:h-[80vh] lg:h-[85vh] flex items-center border overflow-hidden">
//         {features.map((item, index) => {
//           const start = index / features.length;
//           const end = (index + 1) / features.length;

//           // Slight overlap transition (bottom 10% visible)
//           const translateY = useTransform(
//             scrollYProgress,
//             [start, end],
//             index === 0 ? ["0%", "0%"] : ["70%", "0%"]
//           );

//           const zIndex = index + 1;

//           return (
//             <motion.div
//               key={index}
//               className="absolute inset-0 flex items-center justify-center "
//               style={{
//                 y: translateY,
//                 zIndex,
//               }}
//             >
//               <div className="max-w-6xl w-full">
//                 <div
//                   className={`grid grid-cols-1 md:grid-cols-2 lg:gap-20 p-6 rounded-3xl ${item.bgColor} min-h-[400px]`}
//                 >
//                   {/* Image */}
//                   <div
//                     className={`${
//                       item.reverse ? "md:order-2" : ""
//                     } rounded-2xl flex items-center justify-center`}
//                   >
//                     <Image
//                       src={item.image}
//                       alt={item.title}
//                       className="w-full max-w-[500px] h-auto object-cover rounded-2xl"
//                       width={500}
//                       height={400}
//                     />
//                   </div>

//                   {/* Text */}
//                   <div
//                     className={`flex flex-col justify-center items-start h-full rounded-2xl space-y-4 text-center lg:text-left ${
//                       index === 0 ? "ps-0" : "px-6 pe-0"
//                     }`}
//                   >
//                     <h1 className="text-2xl lg:text-3xl font-semibold leading-snug">
//                       {item.title}
//                     </h1>
//                     <p className="text-sm text-gray-600 leading-relaxed">
//                       {item.description}
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             </motion.div>
//           );
//         })}
//       </div>
//     </div>
//   );
// }
