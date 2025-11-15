"use client";

import { Input } from "@/components/ui/input";
import { Dribbble, Facebook, Instagram, Twitter } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { img } from "../constant/imgExport";
import { CiMail } from "react-icons/ci";
import { FiCheck, FiCopy } from "react-icons/fi";
import { useState } from "react";
import SectionHeaderPortion from "./SectionHeaderPortion";

export default function Footer() {
  const email = "support@optionia.com";
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (err) {
      console.error("Copy failed:", err);
    }
  };
  return (
    <footer className="max-w-7xl mx-auto lg:px-0 px-4">
      <div className="border-t py-12 ">
        <div className=" grid grid-cols-1 lg:grid-cols-9 gap-10 ">
          {/* Logo + Subscribe */}
          <div className="col-span-5  lg:w-3/5">
            <Link href="/" className=" shadow-sm ">
              <Image
                src={img.logo}
                alt="Logo"
                className="w-auto h-6 mb-[11px]"
              />
            </Link>
            <p className="text-gray-500 font-light text-[16px] mb-[24px]">
              Add unlimited product options, variants, and custom fields to your
              Shopify store. With Optionia, you can build personalized shopping
              experiences that drive conversions without coding
            </p>

            <div className="flex space-x-4 mb-12">
              <a
                href="#"
                className="hover:bg-baseColor  text-white p-2 rounded-full bg-gray-400 duration-300 hover:duration-300"
              >
                <Twitter size={20} />
              </a>
              <a
                href="#"
                className="hover:bg-baseColor  text-white p-2 rounded-full bg-gray-400 duration-300 hover:duration-300"
              >
                <Facebook size={20} />
              </a>
              <a
                href="#"
                className="hover:bg-baseColor  text-white p-2 rounded-full bg-gray-400 duration-300 hover:duration-300"
              >
                <Instagram size={20} />
              </a>
              <a
                href="#"
                className="hover:bg-baseColor  text-white p-2 rounded-full bg-gray-400 duration-300 hover:duration-300"
              >
                <Dribbble size={20} />
              </a>
            </div>

            <div className="flex items-center gap-2 ps-4 py-2 pe-3 bg-[#360C5F] text-white rounded-[12px] overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 w-fit">
              {/* Email Section */}
              <div className="flex items-center gap-2 ">
                <CiMail className="text-[20px]" />
                <h1 className="text-[15px] font-medium">{email}</h1>
              </div>

              {/* Copy Button */}
              <button
                onClick={handleCopy}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-[8px] font-medium transition-all duration-300 
          ${
            copied
              ? "bg-white text-[#360C5F]"
              : "bg-white text-[#360C5F] hover:bg-gray-100"
          }
        `}
              >
                {copied ? (
                  <>
                    <span>Copied!</span>
                    <FiCheck className="text-[16px]" />
                  </>
                ) : (
                  <>
                    <span>Copy</span>
                    <FiCopy className="text-[16px]" />
                  </>
                )}
              </button>
            </div>
          </div>

          <div className="col-span-4 lg:flex justify-between gap-9 space-y-10 lg:space-y-0 ">
            {/* The Product */}
            <div>
              <h3 className="text-[#1E0A52] font-medium mb-8">Product</h3>
              <ul className="space-y-6 text-gray-500 font-light">
                <li>
                  <a href="#" className="hover:text-baseColor">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-baseColor">
                    Option Types{" "}
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-baseColor">
                    Multi-Level Options{" "}
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-baseColor">
                    Pricing{" "}
                  </a>
                </li>
              </ul>
            </div>

            {/* The Resources */}
            <div>
              <h3 className="text-[#1E0A52] font-medium mb-8">Resources</h3>
              <ul className="space-y-6 text-gray-500 font-light">
                <li>
                  <a href="#" className="hover:text-baseColor">
                    Blog
                  </a>
                </li>
                <li className="flex items-center gap-[6px]">
                  <a href="#" className="hover:text-baseColor">
                    Partners{" "}
                  </a>
                  <div className="text-sm border text-secondaryTextColor rounded-full px-[8px]  text-center border-[#BB8AF6] bg-primaryColor ">
                    New
                  </div>
                  {/* <SectionHeaderPortion text="New"/> */}
                </li>
                <li>
                  <a href="#" className="hover:text-baseColor">
                    Case Studies{" "}
                  </a>
                </li>
              </ul>
            </div>

            {/* The Support */}
            <div>
              <h3 className="text-[#1E0A52] font-medium mb-8">Support</h3>
              <ul className="space-y-6 text-gray-500 font-light">
                <li>
                  <a href="#" className="hover:text-baseColor">
                    Live Chat
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-baseColor">
                    Help Center{" "}
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-baseColor">
                    Video Tutorials{" "}
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-baseColor">
                    FAQ{" "}
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t py-12 lg:flex items-center justify-between">
        <div>
          ©{new Date().getFullYear()}
          <span className="text-[#360C5F] font-medium"> Optionia. </span>
          All rights reserved | Powered by
          <span className="text-[#360C5F] font-medium"> ParseLab</span>
        </div>
        <div className="flex items-center gap-4 text-[#360C5F]">
          <Link href={"/terms-of-services"}>
            <p className="hover:underline cursor-pointer">Terms of service</p>
          </Link>
          <p>•</p>
          <Link href={"/privacy-policy"}>
            <p className="hover:underline cursor-pointer">Privacy policy</p>
          </Link>
        </div>
      </div>
    </footer>
  );
}
