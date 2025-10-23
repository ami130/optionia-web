"use client";
import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { img } from "../constant/imgExport";
import { CommonPrimaryButton } from "./CommonButton";

export const NavbarOption = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isResourcesOpen, setIsResourcesOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const router = useRouter();

  const navLinks = [
    { name: "Home", href: "/#home", id: "home" },
    { name: "Option types", href: "/#option-types", id: "option-types" },
    { name: "Features", href: "/#features", id: "features" },
    { name: "How it works", href: "/#how-it-works", id: "how-it-works" },
    // { name: "Resources", href: "#", id: "resources" },
    { name: "Blogs", href: "/blog", id: "blog" },
    { name: "Pricing", href: "/#pricing", id: "pricing" },
  ];

  const resourceLinks = [
    { name: "Documentation", href: "/resources/documentation" },
    { name: "Tutorials", href: "/resources/tutorials" },
    { name: "Support", href: "/resources/support" },
  ];

  const isResourcesActive = resourceLinks.some((res) => pathname === res.href);

  const isHomeSection = activeSection === "home" && pathname === "/";

  useEffect(() => {
    const sections = navLinks
      .filter((link) => link.id !== "resources")
      .map((link) => document.getElementById(link.id))
      .filter(Boolean) as HTMLElement[];

    const observerOptions = {
      root: null,
      rootMargin: "-20% 0px -70% 0px",
      threshold: 0,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
          window.history.replaceState(null, "", `/#${entry.target.id}`);
        }
      });
    }, observerOptions);

    sections.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => {
      sections.forEach((section) => {
        if (section) observer.unobserve(section);
      });
    };
  }, [pathname]);

  useEffect(() => {
    const handleHashChange = (url: string) => {
      const hash = url.split("#")[1];
      if (hash) {
        // Small timeout to ensure the page is loaded
        setTimeout(() => {
          const element = document.getElementById(hash);
          if (element) {
            element.scrollIntoView({
              behavior: "smooth",
              block: "start",
            });
            setActiveSection(hash);
          }
        }, 100);
      }
    };

    if (pathname === "/" && window.location.hash) {
      handleHashChange(window.location.hash);
    } else if (pathname === "/" && !window.location.hash) {
      setActiveSection("home");
    }

    window.addEventListener("hashchange", () =>
      handleHashChange(window.location.hash)
    );

    return () => {
      window.removeEventListener("hashchange", () =>
        handleHashChange(window.location.hash)
      );
    };
  }, [pathname]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsResourcesOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
    setIsResourcesOpen(false);
  }, [pathname]);

  // Check if a section is active based on current scroll position
  const isSectionActive = (href: string, id?: string) => {
    // --- Case 1: Hash-based homepage sections (/ #home etc.) ---
    if (href.startsWith("/#")) {
      const hash = href.split("#")[1];
      return pathname === "/" && activeSection === hash;
    }

    // --- Case 2: Dynamic route pages (/blog, /service, etc.) ---
    const basePath = href.split("/")[1]; // e.g. "blog" from "/blog"
    const currentPath = pathname.split("/")[1]; // e.g. "blog" from "/blog/abc"

    return basePath && basePath === currentPath;
  };

  const activeState = (href: string, isResource = false) => {
    const isActive = isSectionActive(href);
    const active = isActive || (isResource && pathname.startsWith(href));

    return active
      ? "relative overflow-hidden rounded-md px-2 py-2 font-medium text-secondaryTextColor before:absolute before:inset-0 before:bg-primaryColor before:scale-x-100 before:origin-left before:transition-transform before:duration-500 before:ease-out before:rounded-md before:-z-10"
      : "relative overflow-hidden rounded-md px-2 py-2 font-medium text-gray-700 hover:text-secondaryTextColor before:absolute before:inset-0 before:bg-primaryColor before:scale-x-0 before:origin-left before:transition-transform before:duration-500 before:ease-out hover:before:scale-x-100 before:rounded-md before:-z-10";
  };
  // Handle navigation for single page sections or full routes
  const handleNavClick = (href: string, id: string) => {
    // --- For hash-based home sections ---
    if (href.startsWith("/#")) {
      if (pathname !== "/") {
        router.push(href);
      } else {
        const element = document.getElementById(id);
        if (element) {
          setActiveSection(id);
          element.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
          window.history.pushState(null, "", `/#${id}`);
        }
      }
    }
    // --- For full routes like /blog ---
    else {
      router.push(href);
    }
  };

  return (
    <nav
      className={`sticky top-0 pt-2.5 z-50 transition-all duration-300 ${
        isHomeSection ? "bg-[#F6EEFF]" : "bg-none"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* -------- Left: Logo -------- */}
          <Link
            href="/"
            className="flex items-center gap-2  bg-white px-3 py-2 rounded-md shadow-sm"
          >
            <Image src={img.logo} alt="Logo" className="w-auto h-6" />
            <p className="text-gray-300">|</p>
            <span className="text-[12px] text-gray-900">
              Product Options <br /> & Variants app
            </span>
          </Link>

          {/* -------- Center: Nav Links (Desktop) -------- */}
          <div className="hidden md:flex items-center space-x-4  py-2 px-2 rounded-xl bg-white shadow-sm">
            {navLinks.map((link) => {
              if (link.name === "Resources") {
                return (
                  <div key="resources" className="relative" ref={dropdownRef}>
                    <button
                      onClick={() => setIsResourcesOpen(!isResourcesOpen)}
                      className={`text-sm font-medium flex items-center ${activeState(
                        link.href,
                        true
                      )}`}
                    >
                      <span className="relative z-10">{link.name}</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className={`w-4 h-4 ml-1 mt-0.5 relative z-10 transition-transform duration-200 ${
                          isResourcesOpen ? "rotate-180" : ""
                        }`}
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

                    {/* -------- Dropdown Menu -------- */}
                    {isResourcesOpen && (
                      <div className="absolute top-full left-0 mt-2 w-44 overflow-hidden rounded-md shadow-md bg-white border border-gray-100 p-2 z-50">
                        {resourceLinks.map((res) => (
                          <Link
                            key={res.name}
                            href={res.href}
                            className={`relative block w-full px-3 py-2 text-sm rounded-md overflow-hidden transition-all duration-300 mb-1 last:mb-0 ${
                              pathname === res.href
                                ? "text-secondaryTextColor before:absolute before:inset-0 before:bg-primaryColor before:scale-x-100 before:origin-left before:transition-transform before:duration-500 before:ease-out before:rounded-md before:-z-10"
                                : "text-gray-700 hover:text-secondaryTextColor before:absolute before:inset-0 before:bg-primaryColor before:scale-x-0 before:origin-left before:transition-transform before:duration-500 before:ease-out hover:before:scale-x-100 before:rounded-md before:-z-10"
                            }`}
                          >
                            <span className="relative z-10">{res.name}</span>
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <button
                  key={link.name}
                  onClick={() => handleNavClick(link.href, link.id)}
                  className={`relative text-sm font-medium transition-all duration-300 group z-10 cursor-pointer ${activeState(
                    link.href
                  )}`}
                >
                  <span className="relative z-10">{link.name}</span>
                </button>
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
        <div className="px-4 pb-4 pt-2 bg-white/95 backdrop-blur-md border-t border-gray-200 rounded-b-xl shadow-sm space-y-2">
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
                  <div className="pl-5 mt-2 border-l border-purple-100 space-y-1">
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
              <button
                key={link.name}
                onClick={() => {
                  handleNavClick(link.href, link.id);
                  setIsOpen(false);
                }}
                className={`block w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
                  isSectionActive(link.href)
                    ? "text-purple-700 bg-gradient-to-r from-[#F6EEFF] to-[#EAD7FF] shadow-sm"
                    : "text-gray-700 hover:text-purple-700 hover:bg-gradient-to-r hover:from-[#F6EEFF] hover:to-[#EAD7FF]"
                }`}
              >
                {link.name}
              </button>
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
