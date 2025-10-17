"use client";
import { useState } from "react";
import { CommonPrimaryButton } from "../../CommonButton";
import { img } from "@/shared/constant/imgExport";
import { IoMdCheckmark } from "react-icons/io";
import { pricingPlans } from "@/shared/constant/data";
import Image from "next/image";
import Link from "next/link";
import { MdOutlineArrowOutward } from "react-icons/md";

export default function PricingPlanSubSection() {
  const [isMonthly, setIsMonthly] = useState(true);

  // Calculate savings percentage
  const calculateSavings = (monthlyPrice: number, yearlyPrice: number) => {
    const monthlyTotal = monthlyPrice * 12;
    const savings = ((monthlyTotal - yearlyPrice) / monthlyTotal) * 100;
    return Math.round(savings);
  };

  return (
    <div className="space-y-12">
      {/* Toggle Switch */}
      <div className="flex justify-center">
        <div className="border-2 border-[#BB8AF6] rounded-xl p-1.5 inline-flex bg-white/50 backdrop-blur-sm">
          <div className="flex gap-1 rounded-lg overflow-hidden">
            <button
              onClick={() => setIsMonthly(true)}
              className={`px-6 py-3 rounded-lg font-medium text-base transition-all duration-300 cursor-pointer ${
                isMonthly
                  ? "text-white bg-[#A15DEF] shadow-md"
                  : "text-[#6428A1] hover:bg-white/30"
              }`}
            >
              Monthly
            </button>

            <button
              onClick={() => setIsMonthly(false)}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium text-base transition-all duration-300 cursor-pointer ${
                !isMonthly
                  ? "text-white bg-[#A15DEF] shadow-md"
                  : "text-[#6428A1] hover:bg-white/30"
              }`}
            >
              Yearly
              <span className="rounded-full px-2 py-1 text-xs border border-[#BB8AF6] bg-[#F0E6FF] text-[#6428A1]">
                Save up to {calculateSavings(19, 199)}%
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* pricing card template */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-4 md:px-14">
        {pricingPlans.map((plan) => (
          <div
            key={plan.id}
            className={`border p-2 rounded-[22px] ${
              plan.popular ? "border-[#F197FE]" : "border-[#F2E9FE]"
            }`}
          >
            {/* Header Section */}
            <div
              className={`border px-4 pt-4 pb-6 space-y-4 rounded-[16px] ${
                plan.id === 3
                  ? "bg-cover bg-no-repeat bg-center"
                  : "bg-[#F2E9FE]"
              }`}
              style={
                plan.id === 3
                  ? { backgroundImage: `url(${img.pricingImg.src})` }
                  : {}
              }
            >
              <div className="space-y-2 ">
                <div className="flex items-center justify-between">
                  <h1 className="text-[#360C5F] text-2xl font-medium">
                    {plan.planTitle}
                  </h1>
                  {plan.popular && (
                    <p
                      className="border text-white font-medium text-[14px] px-[14px] py-1 rounded-full
                        bg-white/10 backdrop-blur-lg"
                    >
                      Most Popular
                    </p>
                  )}
                </div>
                <h2 className="text-[#360C5F] text-lg font-light">
                  {plan.plan}
                </h2>
              </div>

              <div className=" text-[#360C5F] ">
                <span className="text-5xl font-bold">
                  {plan.currency}
                  {plan.price}
                </span>
                <span> /{plan.type}</span>
              </div>

              <div className="w-full">
                <CommonPrimaryButton
                  text={plan.buttonText}
                  img={img.shopifyIcon}
                  className="w-full"
                />
              </div>
            </div>

            {/* Features */}
            <div className="px-5 pt-4 pb-[22px] space-y-4">
              {plan.features.map((feature) => (
                <div key={feature.id} className="flex items-center gap-[10px]">
                  <IoMdCheckmark className="text-[#A15DEF]" />
                  <h1
                    className="text-[#360C5F]"
                    style={{ fontWeight: 400, fontSize: "16px" }}
                  >
                    {feature.title}
                  </h1>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <Link
        href={"/pricing"}
        className="flex items-center justify-center gap-[6px] font-medium text-[18px] text-[#360C5F]"
      >
        <h1>See full comparison</h1>
        <MdOutlineArrowOutward />
      </Link>
    </div>
  );
}
