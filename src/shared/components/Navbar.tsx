"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { img } from "../constant/imgExport";
import { CommonPrimaryButton } from "./CommonButton";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Option types", href: "/option-types" },
    { name: "Features", href: "/features" },
    { name: "How it works", href: "/how-it-works" },
    { name: "Resources", href: "#" },
    { name: "Pricing", href: "/pricing" },
  ];

  const resourceLinks = [
    { name: "Documentation", href: "/resources/documentation" },
    { name: "Tutorials", href: "/resources/tutorials" },
    { name: "Support", href: "/resources/support" },
  ];

  const isActive = (href: string) => pathname === href;

  return (
    <nav className="bg-[#F6EEFF] backdrop-blur-md sticky top-0 z-50 border-[#E8D7FF]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 ">
        <div className="flex justify-between items-center h-16">
          {/* -------- Left: Logo -------- */}
          <Link
            href="/"
            className="flex items-center gap-2 border bg-white px-3 py-2 rounded-md shadow-sm"
          >
            <Image src={img.logo} alt="Logo" className="w-auto h-6" />
            <p className="text-gray-300">|</p>
            <span className="text-[12px] text-gray-900">
              Product Options <br /> & Variants app
            </span>
          </Link>

          {/* -------- Center: Nav Links (Desktop) -------- */}
          <div className="hidden md:flex items-center space-x-4 border py-2 px-2 rounded-xl bg-white shadow-sm">
            {navLinks.map((link) => {
              const isResourceActive =
                link.name === "Resources" &&
                resourceLinks.some((res) => isActive(res.href));

              const activeState =
                isActive(link.href) || isResourceActive
                  ? "relative overflow-hidden rounded-md px-2 py-2 font-medium text-secondaryTextColor before:absolute before:inset-0 before:bg-primaryColor before:scale-x-100 before:origin-left before:transition-transform before:duration-500 before:ease-out before:rounded-md before:-z-10"
                  : "relative overflow-hidden rounded-md px-2 py-2 font-medium text-gray-700 hover:text-secondaryTextColor before:absolute before:inset-0 before:bg-primaryColor before:scale-x-0 before:origin-left before:transition-transform before:duration-500 before:ease-out hover:before:scale-x-100 before:rounded-md before:-z-10";

              return link.name === "Resources" ? (
                <DropdownMenu key="resources">
                  <DropdownMenuTrigger asChild>
                    <button
                      className={`relative text-sm font-medium transition-all duration-300 group z-10 flex items-center ${activeState}`}
                    >
                      <span className="relative z-10">{link.name}</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-4 h-4 ml-1 mt-0.5 relative z-10 transition-transform duration-200 group-hover:rotate-180"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>
                  </DropdownMenuTrigger>

                  {/* -------- Dropdown Menu -------- */}
                  <DropdownMenuContent
                    align="start"
                    className="mt-2 w-44 overflow-hidden rounded-md shadow-md bg-white border border-gray-100"
                  >
                    {resourceLinks.map((res) => (
                      <DropdownMenuItem key={res.name} asChild>
                        <Link
                          href={res.href}
                          className={`relative block px-2 py-1.5 text-sm rounded-md overflow-hidden transition-all duration-300 
                            ${
                              isActive(res.href)
                                ? "text-secondaryTextColor before:absolute before:inset-0 before:bg-primaryColor before:scale-x-100 before:origin-left before:transition-transform before:duration-500 before:ease-out before:rounded-md before:-z-10"
                                : "text-gray-700 hover:text-secondaryTextColor before:absolute before:inset-0 before:bg-primaryColor before:scale-x-0 before:origin-left before:transition-transform before:duration-500 before:ease-out hover:before:scale-x-100 before:rounded-md before:-z-10"
                            }`}
                        >
                          <span className="relative z-10">{res.name}</span>
                        </Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`relative text-sm font-medium transition-all duration-300 group z-10 ${activeState}`}
                >
                  <span className="relative z-10">{link.name}</span>
                </Link>
              );
            })}
          </div>

          {/* -------- Right: Button (Desktop) -------- */}
          <div className="hidden md:flex">
            <CommonPrimaryButton
              text="Try for Free"
              img={img.rightArrowWhiteIcon}
            />
          </div>

          {/* -------- Mobile Menu Toggle -------- */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-purple-700 hover:bg-gray-100 focus:outline-none transition-all"
          >
            {isOpen ? (
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* -------- Mobile Menu -------- */}
      <div
        className={`md:hidden transition-all duration-500 overflow-hidden ${
          isOpen ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-4 pb-4 pt-2 bg-white/95 backdrop-blur-md border-t border-gray-200 rounded-b-xl shadow-sm space-y-2 uppercase">
          {navLinks.map((link) =>
            link.name === "Resources" ? (
              <div key="resources" className="rounded-lg overflow-hidden">
                <details className="group">
                  <summary className="flex items-center justify-between cursor-pointer px-3 py-2 text-gray-700 font-medium text-sm rounded-md hover:bg-gradient-to-r hover:from-[#F6EEFF] hover:to-[#EAD7FF] hover:text-purple-700 transition-all duration-300">
                    <span>Resources</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 text-gray-500 group-open:rotate-180 transition-transform duration-300"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </summary>
                  <div className="pl-5 mt-2 border-l border-purple-100 space-y-1 animate-accordion-down">
                    {resourceLinks.map((res) => (
                      <Link
                        key={res.name}
                        href={res.href}
                        onClick={() => setIsOpen(false)}
                        className="block px-3 py-2 text-sm text-gray-700 rounded-md hover:text-purple-700 hover:bg-gradient-to-r hover:from-purple-50 hover:to-purple-100 transition-all duration-300"
                      >
                        {res.name}
                      </Link>
                    ))}
                  </div>
                </details>
              </div>
            ) : (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`block px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
                  isActive(link.href)
                    ? "text-purple-700 bg-gradient-to-r from-[#F6EEFF] to-[#EAD7FF] shadow-sm"
                    : "text-gray-700 hover:text-purple-700 hover:bg-gradient-to-r hover:from-[#F6EEFF] hover:to-[#EAD7FF]"
                }`}
              >
                {link.name}
              </Link>
            )
          )}

          <div className="pt-3">
            <CommonPrimaryButton
              text="Try for Free"
              img={img.rightArrowWhiteIcon}
            />
          </div>
        </div>
      </div>
    </nav>
  );
};
