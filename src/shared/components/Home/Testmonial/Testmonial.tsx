"use client";
import React from "react";
import Slider from "react-slick";
import SectionHeaderPortion from "../../SectionHeaderPortion";
import { CommonPrimaryButton } from "../../CommonButton";
import { img } from "@/shared/constant/imgExport";
import { FaStar } from "react-icons/fa";
import Image from "next/image";

export default function Testmonial() {
  const testimonials = [
    {
      id: 1,
      name: "Winkula",
      country: "United States",
      text: "I'll be honest with you. I think this is the best customer service I've ever had. Noah and Rayne solved everything quickly and effectively. It's a pleasure to work with a company like this.I'll be honest with you. I think this is the best customer service I've ever had. Noah and Rayne solved everything quickly and effectively. It's a pleasure to work with a company like this.I'll be honest with you. I think this is the best customer service I've ever had. Noah and Rayne solved everything quickly and effectively. It's a pleasure to work with a company like this.",
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
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 768, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <section>
      <div className="max-w-6xl mx-auto py-20 lg:px-10 px-3">
        <div className="grid lg:grid-cols-6 gap-8 items-center">
          {/* === LEFT FIXED SECTION === */}
          <div className="col-span-2 text-center lg:text-left">
            <div className="flex justify-center lg:justify-start">
              <SectionHeaderPortion text="What Merchants Say" />
            </div>
            <p className="text-4xl md:text-5xl font-semibold text-secondaryTextColor leading-tight py-4">
              Loved by Thousands of Merchants
            </p>
            <p className="text-sm text-gray-500 leading-relaxed">
              Discover how store owners use Optionia to personalize products,
              boost sales, and simplify their Shopify experience.
            </p>

            <div className="mt-6 flex justify-center lg:justify-start">
              <CommonPrimaryButton
                text="View all reviews"
                img={img.shopifyIcon}
              />
            </div>
          </div>

          {/* === RIGHT SLIDER SECTION === */}
          <div className="col-span-4">
            <Slider {...settings}>
              {testimonials.map((t) => (
                <div key={t.id} className="px-3">
                  <div className="border p-7 rounded-2xl  h-[440px] flex flex-col justify-between">
                    <div className="space-y-9">
                      <div className="text-yellow-500 flex items-center space-x-1">
                        {[...Array(t.rating)].map((_, i) => (
                          <FaStar key={i} />
                        ))}
                      </div>
                      <p className="text-gray-600 font-medium text-[18px] leading-relaxed line-clamp-8">
                        “{t.text}”
                      </p>
                    </div>
                    <div className="mt-9">
                      <h1 className="text-gray-800 font-semibold text-2xl">
                        {t.name}
                      </h1>
                      <p className="text-gray-500 text-[15px]">{t.country}</p>
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
