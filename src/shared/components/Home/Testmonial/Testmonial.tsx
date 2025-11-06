"use client";
import React from "react";
import Slider from "react-slick";
import SectionHeaderPortion from "../../SectionHeaderPortion";
import { CommonPrimaryButton } from "../../CommonButton";
import { img } from "@/shared/constant/imgExport";
import { FaStar } from "react-icons/fa";

export default function Testmonial() {
  const testimonials = [
    {
      id: 1,
      name: "Winkula",
      country: "United States",
      text: "I'll be honest with you. I think this is the best customer service I've ever had. Noah and Rayne solved everything quickly and effectively. It's a pleasure to work with a company like this.",
      rating: 5,
    },
    {
      id: 2,
      name: "Jenna",
      country: "Canada",
      text: "The app can be a little challenging at first, but once you get the hang of it, it’s incredibly flexible and powerful for your exact needs.",
      rating: 5,
    },
    {
      id: 3,
      name: "Marcus",
      country: "Australia",
      text: "Optionia changed the way we personalize our Shopify store. The team’s support is top-notch!",
      rating: 3,
    },
  ];

  const settings = {
    dots: false,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 2500,
    speed: 1500,
    slidesToShow: 2,
    slidesToScroll: 1,
    arrows: false,
    responsive: [
      { breakpoint: 1536, settings: { slidesToShow: 2 } }, // 2xl
      { breakpoint: 1280, settings: { slidesToShow: 2 } }, // xl
      { breakpoint: 1024, settings: { slidesToShow: 2 } }, // lg
      { breakpoint: 768, settings: { slidesToShow: 1 } }, // md
      { breakpoint: 640, settings: { slidesToShow: 1 } }, // sm
      { breakpoint: 480, settings: { slidesToShow: 1 } }, // xs
    ],
  };

  return (
    <section className="w-full bg-white">
      <div className="max-w-6xl mx-auto py-16 sm:py-20 md:py-24 px-4  lg:px-8  ">
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-10 items-center">
          {/* === LEFT FIXED SECTION === */}
          <div className="lg:col-span-2 flex flex-col items-center lg:items-start text-center lg:text-left space-y-4">
            <SectionHeaderPortion text="What Merchants Say" />

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-secondaryTextColor leading-tight">
              Loved by Thousands of Merchants
            </h2>

            <p className="text-sm sm:text-base text-gray-500 leading-relaxed max-w-md">
              Discover how store owners use Optionia to personalize products,
              boost sales, and simplify their Shopify experience.
            </p>

            <div className="mt-4 sm:mt-6">
              <CommonPrimaryButton
                text="View all reviews"
                img={img.shopifyIcon}
              />
            </div>
          </div>

          {/* === RIGHT SLIDER SECTION === */}
          <div className="lg:col-span-4 w-full">
            <Slider {...settings}>
              {testimonials.map((t) => (
                <div key={t.id} className="px-2 sm:px-3 md:px-4">
                  <div className="border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 bg-white p-5 sm:p-6 md:p-8 rounded-2xl h-auto min-h-[360px] sm:min-h-[400px] md:min-h-[440px] flex flex-col justify-between">
                    {/* === Rating + Text === */}
                    <div className="space-y-6 sm:space-y-8">
                      <div className="text-yellow-500 flex items-center space-x-1">
                        {[...Array(t.rating)].map((_, i) => (
                          <FaStar key={i} size={18} />
                        ))}
                      </div>
                      <p className="text-gray-600 font-medium text-[15px] sm:text-[16px] leading-relaxed line-clamp-7 sm:line-clamp-8">
                        “{t.text}”
                      </p>
                    </div>

                    {/* === Name + Country === */}
                    <div className="mt-6 sm:mt-9">
                      <h3 className="text-gray-800 font-semibold text-xl sm:text-2xl">
                        {t.name}
                      </h3>
                      <p className="text-gray-500 text-sm sm:text-base">
                        {t.country}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </div>
    </section>
  );
}
