"use client";
import { pricingPlans } from "@/shared/constant/data";
import React, { useState } from "react";
import { CommonPrimaryButton } from "../../CommonButton";
import { img } from "@/shared/constant/imgExport";

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
              Monthly billing
            </button>

            <button
              onClick={() => setIsMonthly(false)}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium text-base transition-all duration-300 cursor-pointer ${
                !isMonthly
                  ? "text-white bg-[#A15DEF] shadow-md"
                  : "text-[#6428A1] hover:bg-white/30"
              }`}
            >
              Annual billing
              <span className="rounded-full px-2 py-1 text-xs border border-[#BB8AF6] bg-[#F0E6FF] text-[#6428A1]">
                Save up to {calculateSavings(19, 199)}%
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* pricing card template */}
      <div className=" grid grid-cols-3 gap-6 ">
        <div
          className="border px-4 pt-4 pb-6 space-y-4 bg-secondaryColor border-[#BB8AF6]"
          style={{ borderRadius: "16px 16px 0 0" }}
        >
          <div className="space-y-2">
            <h1 className="text-[#360C5F] text-2xl font-medium">Free</h1>
            <h2 className="text-[#360C5F] text-lg font-light">
              Free to install
            </h2>
          </div>
          <div className="mt-6 text-[#360C5F]">
            <span className="text-5xl font-bold">$0</span>
            <span>/month</span>
          </div>
          <div className="w-full ">
            <CommonPrimaryButton
              text="Get Started"
              img={img.shopifyIcon}
              className={`w-full`}
            />
          </div>
        </div>
        <div className="border">1</div>
        <div className="border">1</div>
      </div>

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4 md:px-14 py-12">
        {pricingPlans.map((plan) => {
          const displayPrice = isMonthly ? plan.price : plan.yearlyPrice;
          const displayType = isMonthly ? plan.type : plan.yearType;
          const savings = calculateSavings(plan.price, plan.yearlyPrice);

          return (
            <div
              key={plan.id}
              className={`relative border-2 rounded-2xl p-8 transition-all duration-500 ease-out hover:scale-[1.02] hover:shadow-xl ${
                plan.popular
                  ? "border-[#A15DEF] bg-gradient-to-b from-[#F6EEFF] to-white shadow-2xl transform scale-105 border-[3px]"
                  : "border-gray-100 bg-white hover:border-[#A15DEF]/30"
              }`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-[#A15DEF] to-[#8838E0] text-white px-6 py-2 rounded-full text-sm font-semibold shadow-lg">
                  ⭐ Most Popular
                </div>
              )}

              {/* Savings Badge for Yearly */}
              {!isMonthly && plan.price > 0 && (
                <div className="absolute -top-3 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
                  Save {savings}%
                </div>
              )}

              {/* Plan Header */}
              <div className=" mb-8">
                <h3 className="text-3xl font-bold bg-gradient-to-r from-[#360C5F] to-[#A15DEF] bg-clip-text text-transparent">
                  {plan.planTitle}
                </h3>
                <p className="text-gray-600 mt-2 font-medium">{plan.plan}</p>

                {/* Price Display */}
                <div className="mt-6 text-[#360C5F]">
                  <span className="text-5xl font-bold">
                    {plan.currency}
                    {displayPrice}
                  </span>
                  <span className="text-gray-600">/{displayType}</span>
                </div>

                {/* Equivalent Monthly Price for Yearly */}
                {!isMonthly && plan.price > 0 && (
                  <p className="text-sm text-gray-500 mt-2">
                    Equivalent to {plan.currency}
                    {(plan.yearlyPrice / 12).toFixed(2)}/month
                  </p>
                )}

                {/* Free plan message */}
                {plan.price === 0 && !isMonthly && (
                  <p className="text-sm text-green-600 mt-2 font-medium">
                    Free forever, no hidden costs!
                  </p>
                )}
                <br />
                <div className="w-full ">
                  <CommonPrimaryButton
                    text={plan.buttonText}
                    img={img.shopifyIcon}
                    className={`w-full ${plan.popular ? "shadow-lg" : ""}`}
                  />
                </div>
              </div>

              {/* Features List */}
              {/* <div className="space-y-4 mb-8">
                {plan.features.map((feature, index) => (
                  <div
                    key={feature.id}
                    className={`flex items-start gap-4 p-3 rounded-lg transition-all duration-300 hover:bg-gray-50 ${
                      feature.active ? "text-gray-900" : "text-gray-400"
                    }`}
                  >
                    <div
                      className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300 ${
                        feature.active
                          ? "bg-gradient-to-r from-[#A15DEF] to-[#8838E0] text-white shadow-md"
                          : "bg-gray-200 text-gray-400"
                      }`}
                    >
                      {feature.active ? "✓" : "✗"}
                    </div>
                    <div className="flex-1">
                      <span
                        className={`font-semibold ${
                          feature.active ? "text-gray-900" : "text-gray-400"
                        }`}
                      >
                        {feature.title}
                      </span>
                      <p className="text-sm text-gray-500 mt-1 leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div> */}

              {/* Subtle Background Pattern */}
              {plan.popular && (
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#A15DEF]/5 to-transparent pointer-events-none" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
