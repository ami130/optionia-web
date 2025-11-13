"use client";
import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export default function WorksSubSection({ data }: { data: any }) {
  const [active, setActive] = useState(1);
  const activeStep = data.find((s: any) => s.id === active)!;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
      {/* LEFT SIDE - STEPS */}
      <div className="flex flex-col">
        {data.map((step: any) => (
          <div
            key={step.id}
            onClick={() => setActive(step.id)}
            className="relative cursor-pointer flex items-start gap-4 ps-6 transition-all duration-300 py-6"
          >
            {/* Gradient border (animated when active) */}
            <span
              className="absolute left-0 inset-y-0 w-[2px] rounded-full transition-all duration-500"
              style={{
                background:
                  active === step.id ? "var(--gradient-active-step)" : "",
              }}
            ></span>

            {/* Number circle */}
            <motion.div
              initial={false}
              animate={{
                background:
                  active === step.id
                    ? "var(--gradient-active-step)"
                    : "transparent",
                color: active === step.id ? "#fff" : "#6C47FF",
                borderColor:
                  active === step.id ? "var(--gradient-active-step)" : "#ccc",
              }}
              transition={{ duration: 0.3 }}
              className="w-8 h-8 border rounded-full flex items-center justify-center text-sm font-medium px-3"
            >
              {step.id}
            </motion.div>

            {/* Text content */}
            <div
              className={`transition-all text-secondaryTextColor ${
                active === step.id ? "font-semibold" : ""
              }`}
            >
              <h3 className="font-medium text-2xl">{step.title}</h3>
              <AnimatePresence mode="wait">
                {active === step.id && (
                  <motion.p
                    key={step.id}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.4 }}
                    className="text-[16px] font-normal text-gray-500 mt-2 leading-relaxed"
                  >
                    {step.subtitle}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          </div>
        ))}
      </div>

      {/* RIGHT SIDE - IMAGE (Full width of the div) */}
      <div className="relative w-full flex justify-center items-center ">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeStep.id}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="w-full"
          >
            <Image
              src={activeStep.img}
              alt={activeStep.title}
              className="w-full h-auto rounded-2xl border"
              width={800} // Add appropriate width
              height={600} // Add appropriate height
              priority={activeStep.id === 1} // Optional: prioritize first image
            />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
