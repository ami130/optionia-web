"use client";
import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { img } from "../constant/imgExport";
import { CommonPrimaryButton } from "./CommonButton";
import { FiBook, FiLifeBuoy, FiPlayCircle } from "react-icons/fi";

export const NavbarOption = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isResourcesOpen, setIsResourcesOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [hasScrolled, setHasScrolled] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const router = useRouter();

  const navLinks = [
    { name: "Home", href: "/#home", id: "home" },
    { name: "Option types", href: "/#option-types", id: "option-types" },
    { name: "Features", href: "/#features", id: "features" },
    { name: "How it works", href: "/#how-it-works", id: "how-it-works" },
    { name: "Pricing", href: "/pricing", id: "pricing" },
    { name: "Resources", href: "#", id: "resources" },
  ];

  const resourceLinks = [
    {
      icon: FiBook,
      title: "Blogs & Articles",
      subtitle:
        "Explore tips, trends, and insights to grow your Shopify store.",
      href: "/blog",
    },
    {
      icon: FiPlayCircle,
      title: "Help Center",
      subtitle: "Find guides, FAQs, and quick answers to common questions.",
      href: "/help-center",
    },
    {
      icon: FiLifeBuoy,
      title: "Contact Us",
      subtitle: "Reach our team anytime — we're here to help you succeed.",
      href: "/contact",
    },
    {
      icon: FiLifeBuoy,
      title: "Affiliate Program",
      subtitle: "Partner with Optionia and earn by sharing our app.",
      href: "/resources/support",
    },
    {
      icon: FiLifeBuoy,
      title: "Partnership",
      subtitle: "Collaborate with us to bring better experiences to merchants.",
      href: "/partnership",
    },
  ];

  // Check if we're on homepage
  const isHomePage = pathname === "/";

  // Handle scroll effect
  useEffect(() => {
    if (!isHomePage) {
      setHasScrolled(true);
      return;
    }

    const handleScroll = () => {
      const scrollY = window.scrollY;
      setHasScrolled(scrollY > 10); // Small threshold to trigger immediately
    };

    // Set initial state
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHomePage]);

  // Rest of your existing code remains the same...
  const isResourcesActive = resourceLinks.some(
    (res) => pathname === res.href || pathname.startsWith(res.href + "/")
  );

  // Your existing useEffect hooks for intersection observer and hash change...
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

  // Your existing click outside and route change effects...
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

  useEffect(() => {
    setIsOpen(false);
    setIsResourcesOpen(false);
  }, [pathname]);

  const isSectionActive = (href: string, id?: string) => {
    if (href.startsWith("/#")) {
      const hash = href.split("#")[1];
      return pathname === "/" && activeSection === hash;
    }

    const basePath = href.split("/")[1];
    const currentPath = pathname.split("/")[1];
    return basePath && basePath === currentPath;
  };

  const isResourceActive = (href: string) => {
    return pathname === href || pathname.startsWith(href + "/");
  };

  const activeState = (href: string, isResource = false) => {
    const isActive = isSectionActive(href);
    const active = isActive || (isResource && isResourcesActive);

    return active
      ? "relative bg-[#f3ebff] overflow-hidden rounded-md px-3 py-2 font-medium text-secondaryTextColor before:absolute before:inset-0 before:bg-[#f3ebff] before:scale-x-100 before:origin-left before:transition-transform before:duration-500 before:ease-out before:rounded-md before:-z-10"
      : "relative overflow-hidden rounded-md px-2 py-2 font-medium text-gray-700 hover:text-secondaryTextColor before:absolute before:inset-0 before:bg-[#f3ebff] before:scale-x-0 before:origin-left before:transition-transform before:duration-500 before:ease-out hover:before:scale-x-100 before:rounded-md before:-z-10";
  };

  const handleNavClick = (href: string, id: string) => {
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
    } else {
      router.push(href);
    }
  };

  return (
    <nav
      className={`sticky top-0 pt-2.5 z-50 transition-all duration-500 ${
        isHomePage && !hasScrolled ? "bg-[#F6EEFF]" : "bg-none"
      }`}
    >
      {/* Rest of your JSX remains exactly the same */}
      <div className="max-w-7xl mx-auto  border">
        <div className="flex justify-between items-center h-16">
          {/* Your existing logo, nav links, and button code... */}
          <Link
            href="/"
            className="flex items-center gap-2 bg-white px-3 py-2 rounded-md shadow-sm"
          >
            <Image src={img.logo} alt="Logo" className="w-auto h-6" />
            <p className="text-gray-300">|</p>
            <span className="text-[12px] text-gray-900">
              Product Options <br /> & Variants app
            </span>
          </Link>

          {/* Center: Nav Links (Desktop) */}
          <div className="hidden md:flex items-center space-x-4 py-2 px-2  rounded-xl bg-white shadow-sm">
            {navLinks.map((link) => {
              if (link.name === "Resources") {
                return (
                  <div key="resources" className="relative" ref={dropdownRef}>
                    <button
                      onClick={() => setIsResourcesOpen(!isResourcesOpen)}
                      className={`text-sm font-medium flex items-center cursor-pointer ${activeState(
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

                    <div
                      className={`absolute top-full mt-3 right-0 min-w-[560px] bg-white rounded-2xl shadow-lg p-4 z-50 grid grid-cols-2 gap-2 transition-all duration-300 transform ${
                        isResourcesOpen
                          ? "opacity-100 scale-100 translate-y-0 pointer-events-auto"
                          : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
                      }`}
                    >
                      {resourceLinks.map((res, index) => {
                        const Icon = res.icon;
                        const isActive = isResourceActive(res.href);

                        return (
                          <Link
                            key={res.title}
                            href={res.href}
                            className={`
                              flex items-start gap-4 p-2 rounded-md group
                              transform transition-all duration-500 ${
                                isResourcesOpen
                                  ? "opacity-100 translate-x-0"
                                  : "opacity-0 translate-x-4"
                              }
                            `}
                            style={{
                              transitionDelay: isResourcesOpen
                                ? `${index * 100}ms`
                                : "0ms",
                            }}
                          >
                            <div
                              className={`text-[#A15DEF] text-2xl flex-shrink-0 border-2 border-[#E7D7FD] rounded-[8px] p-[10px] transition-all duration-300 hover:duration-300 group-hover:bg-[#A15DEF] group-hover:text-white 
                                ${isActive ? "bg-[#A15DEF] text-white" : ""}
                              `}
                            >
                              <Icon />
                            </div>
                            <div className="flex flex-col">
                              <span
                                className={`text-[#360C5F] font-medium text-[16px] transition-all duration-300 group-hover:text-[#A15DEF]
                                  ${isActive ? "text-[#A15DEF]" : ""}
                                `}
                              >
                                {res.title}
                              </span>
                              <span className="text-gray-500 text-[12px] font-normal transition-all duration-300">
                                {res.subtitle}
                              </span>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
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

          {/* Right: Button (Desktop) */}
          <div className="hidden md:flex">
            <CommonPrimaryButton
              text="Try for Free"
              img={img.rightArrowWhiteIcon}
            />
          </div>

          {/* Mobile Menu Toggle */}
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

      {/* Mobile Menu */}
      <div
        className={`md:hidden transition-all duration-500 overflow-hidden ${
          isOpen ? "max-h-[800px] opacity-100" : "max-h-0 opacity-0"
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
                  <div className="mt-3 space-y-3">
                    {resourceLinks.map((res) => {
                      const Icon = res.icon;
                      const isActive = isResourceActive(res.href);

                      return (
                        <Link
                          key={res.title}
                          href={res.href}
                          onClick={() => setIsOpen(false)}
                          className={`
                            flex items-start gap-4 p-3 rounded-xl transition-all duration-300
                            ${isActive ? "bg-purple-50" : ""}
                          `}
                        >
                          <div
                            className={`text-[#A15DEF] text-xl flex-shrink-0 border-2 border-[#E7D7FD] rounded-[8px] p-2 transition-all duration-300
                              ${isActive ? "bg-[#A15DEF] text-white" : ""}
                            `}
                          >
                            <Icon />
                          </div>
                          <div className="flex flex-col flex-1">
                            <span
                              className={`text-[#360C5F] font-medium text-[14px] transition-all duration-300 
                                ${isActive ? "text-[#A15DEF]" : ""}
                              `}
                            >
                              {res.title}
                            </span>
                            <span className="text-gray-500 text-[11px] font-normal transition-all duration-300 leading-tight mt-1">
                              {res.subtitle}
                            </span>
                          </div>
                        </Link>
                      );
                    })}
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
