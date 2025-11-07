"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { ChevronDown, LucideSearch } from "lucide-react";
import { createPortal } from "react-dom";
import { useRouter, useSearchParams } from "next/navigation";

export default function BlogFilterSections({
  categoriesData,
}: {
  categoriesData: { id: number; name: string; slug: string }[];
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // ✅ Include "All" at the beginning
  const categories = [
    { id: 0, name: "All", slug: "all" },
    ...(categoriesData || []),
  ];

  // ✅ Extract params from URL
  const urlCategorySlug = searchParams.get("category") || "all";
  const urlSearch = searchParams.get("search") || "";

  const [isFocused, setIsFocused] = useState(false);
  const [searchValue, setSearchValue] = useState(urlSearch);
  const [activeCategory, setActiveCategory] = useState(urlCategorySlug);
  const [moreOpen, setMoreOpen] = useState(false);
  const [showCategories, setShowCategories] = useState(true);
  const [dropdownPos, setDropdownPos] = useState<{ top: number; left: number; width: number } | null>(null);

  const searchRef = useRef<HTMLDivElement>(null);
  const moreRef = useRef<HTMLDivElement>(null);

  const visibleCategories = categories.slice(0, 5);
  const moreCategories = categories.slice(5);

  // 🧩 Find ID for backend from slug
  const findCategoryIdBySlug = (slug: string) => {
    if (slug === "all") return undefined;
    return categories.find((cat) => cat.slug === slug)?.id;
  };

  // 🧩 Debounce helper
  const debounce = (func: Function, delay: number) => {
    let timer: NodeJS.Timeout;
    return (...args: any[]) => {
      clearTimeout(timer);
      timer = setTimeout(() => func(...args), delay);
    };
  };

  // 🧩 Update URL params (for SEO)
  const updateParams = useCallback(
    debounce((search: string, slug: string) => {
      const params = new URLSearchParams(window.location.search);

      if (search) params.set("search", search);
      else params.delete("search");

      if (slug && slug !== "all") params.set("category", slug);
      else params.delete("category");

      const newUrl = params.toString() ? `/blog?${params.toString()}` : `/blog`;
      router.push(newUrl, { scroll: false });
    }, 600),
    []
  );

  // 🧩 Trigger URL updates
  useEffect(() => {
    updateParams(searchValue, activeCategory);
  }, [searchValue, activeCategory]);

  // 🧩 Focus handler
  const handleFocus = () => {
    setIsFocused(true);
    setShowCategories(false);
  };

  // 🧩 Click outside handler
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (moreRef.current && !moreRef.current.contains(event.target as Node)) {
        setMoreOpen(false);
      }
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsFocused(false);
        setTimeout(() => setShowCategories(true), 400);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // 🧩 Handle More dropdown positioning
  const handleMoreClick = () => {
    if (moreRef.current) {
      const rect = moreRef.current.getBoundingClientRect();
      setDropdownPos({
        top: rect.bottom + window.scrollY + 8,
        left: rect.left + window.scrollX,
        width: rect.width,
      });
    }
    setMoreOpen((v) => !v);
  };

  // 🧩 Backend-safe category ID
  const selectedCategoryId = findCategoryIdBySlug(activeCategory);

  // ✅ Example of using this ID in a fetch call:
  // fetchBlogPageData(searchValue, selectedCategoryId);

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 w-full relative">
      {/* Categories Section */}
      <div
        className={`transition-all duration-500 ease-in-out ${
          showCategories ? "block opacity-100 translate-y-0" : "hidden opacity-0 -translate-y-2 pointer-events-none"
        }`}
      >
        <div className="flex flex-wrap items-center gap-4 relative lg:border-b-2 border-gray-200 transition-all duration-500 ease-in-out">
          {visibleCategories.map((cat, index) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.slug)}
              className={`px-1 lg:px-3 py-3 text-lg font-medium cursor-pointer -mb-0.5 relative z-10 transition-all duration-500 ease-in-out delay-[${index * 50}ms] ${
                activeCategory === cat.slug
                  ? "text-[#9E77ED] border-b-2 border-[#9E77ED]"
                  : "text-[#360C5F] hover:text-purple-600"
              }`}
            >
              {cat.name}
            </button>
          ))}

          {/* More button */}
          {moreCategories.length > 0 && (
            <div className="relative" ref={moreRef}>
              <button
                onClick={handleMoreClick}
                className={`inline-flex px-4 py-3 items-center text-lg font-medium cursor-pointer border-b-2 transition-all duration-300 relative z-20 ${
                  moreCategories.some((cat) => cat.slug === activeCategory)
                    ? "text-[#9E77ED] border-b-2 border-[#9E77ED]"
                    : "border-transparent text-[#360C5F]"
                }`}
              >
                More
                <ChevronDown size={16} className={`ml-2 transition-transform duration-300 ${moreOpen ? "rotate-180" : ""}`} />
              </button>

              {moreOpen &&
                dropdownPos &&
                createPortal(
                  <div
                    style={{
                      position: "absolute",
                      top: dropdownPos.top,
                      left: dropdownPos.left,
                      width: "400px",
                      zIndex: 99999,
                    }}
                    className="bg-white border w-40 border-[#EDEAFD] rounded-[16px] shadow-[0_10px_40px_0_rgba(150,78,238,0.15)] p-4 flex flex-col gap-2"
                  >
                    {moreCategories.map((cat) => (
                      <button
                        key={cat.id}
                        onClick={() => {
                          setActiveCategory(cat.slug);
                          setMoreOpen(false);
                        }}
                        className={`text-left px-3 py-2 rounded-md text-lg font-medium cursor-pointer transition-colors duration-300 ${
                          activeCategory === cat.slug
                            ? "text-[#8838E0]"
                            : "text-[#360C5F] hover:underline"
                        }`}
                      >
                        {cat.name}
                      </button>
                    ))}
                  </div>,
                  document.body
                )}
            </div>
          )}
        </div>
      </div>

      {/* 🔍 Search Input */}
      <div
        ref={searchRef}
        className={`flex items-center gap-2 transition-all duration-500 ease-in-out rounded-[8px] relative z-10 ${
          isFocused ? "w-full ml-0" : "w-full lg:w-[320px] ml-auto"
        }`}
        style={{
          padding: "12px 14px",
          border: `1px solid ${searchValue || isFocused ? "#9E77ED" : "#D2D6DB"}`,
          backgroundColor: "#FFF",
          boxShadow:
            searchValue || isFocused
              ? "0 1px 2px 0 rgba(16,24,40,0.05),0 0 0 4px rgba(158,119,237,0.24)"
              : "0 1px 2px 0 rgba(16,24,40,0.05)",
        }}
      >
        <LucideSearch
          size={20}
          className={`text-gray-400 transition-transform duration-500 ${isFocused ? "scale-110" : "scale-100"}`}
        />
        <input
          type="text"
          placeholder="Search"
          className="flex-1 outline-none text-gray-900 bg-transparent font-normal text-[16px] pl-2 pr-8"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          onFocus={handleFocus}
        />
        {searchValue && (
          <button
            type="button"
            onClick={() => setSearchValue("")}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
          >
            &#10005;
          </button>
        )}
      </div>
    </div>
  );
}
