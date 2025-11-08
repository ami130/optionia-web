"use client";
import React, { useState, useRef, useEffect, useCallback } from "react";
import { ChevronDown, LucideSearch } from "lucide-react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";

export default function BlogFilterSections({
  categoriesData,
  initialSearch = "",
  initialCategory = "",
}: {
  categoriesData: any[];
  initialSearch?: string;
  initialCategory?: string;
}) {
  const router = useRouter();
  
  const categories = categoriesData?.map((cat) => ({
    name: cat.name,
    slug: cat.slug || cat.name.toLowerCase().replace(/\s+/g, '-'),
    id: cat.id
  })) || [];
  
  const allCategories = [{ name: "All", slug: "all", id: null }, ...categories];

  const [isFocused, setIsFocused] = useState(false);
  const [searchValue, setSearchValue] = useState(initialSearch);
  const [activeTab, setActiveTab] = useState(initialCategory || "all");
  const [moreOpen, setMoreOpen] = useState(false);
  const [showCategories, setShowCategories] = useState(true);
  const [dropdownPos, setDropdownPos] = useState<{
    top: number;
    left: number;
    width: number;
  } | null>(null);

  const searchRef = useRef<HTMLDivElement>(null);
  const moreRef = useRef<HTMLDivElement>(null);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  const visibleCategories = allCategories.slice(0, 5);
  const moreCategories = allCategories.slice(5);

  // 🧩 INSTANT URL update (no page reload)
  const updateURLParams = useCallback((search: string, categorySlug: string) => {
    const params = new URLSearchParams();
    
    if (search) {
      params.set('search', search);
    }
    
    if (categorySlug && categorySlug !== "all") {
      params.set('category', categorySlug);
    }

    const queryString = params.toString();
    const newUrl = queryString ? `/blog?${queryString}` : '/blog';
    
    // Use replaceState for INSTANT URL update without reload
    window.history.replaceState({}, '', newUrl);
  }, []);

  // 🧩 Faster debounce (300ms instead of 500ms)
  useEffect(() => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(() => {
      updateURLParams(searchValue, activeTab);
    }, 300); // Reduced to 300ms for faster response

    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, [searchValue, activeTab, updateURLParams]);

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
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
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

  // 🧩 Clear search handler
  const handleClearSearch = () => {
    setSearchValue("");
  };

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 w-full relative">
      {/* Categories Section */}
      <div
        className={`transition-all duration-500 ease-in-out ${
          showCategories
            ? "block opacity-100 translate-y-0"
            : "hidden opacity-0 -translate-y-2 pointer-events-none"
        }`}
      >
        <div className="flex flex-wrap items-center gap-4 relative lg:border-b-2 border-gray-200 transition-all duration-500 ease-in-out">
          {visibleCategories.map((cat, index) => (
            <button
              key={cat.slug}
              onClick={() => setActiveTab(cat.slug)}
              className={`px-1 lg:px-3 py-2 text-lg font-medium cursor-pointer -mb-0.5 relative z-10 transition-all duration-500 ease-in-out delay-[${
                index * 50
              }ms] ${
                activeTab === cat.slug
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
                  moreCategories.some(cat => cat.slug === activeTab)
                    ? "text-[#9E77ED] border-b-2 border-[#9E77ED]"
                    : "border-transparent text-[#360C5F]"
                }`}
              >
                More
                <ChevronDown
                  size={16}
                  className={`ml-2 transition-transform duration-300 ${
                    moreOpen ? "rotate-180" : ""
                  }`}
                />
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
                        key={cat.slug}
                        onClick={() => {
                          setActiveTab(cat.slug);
                          setMoreOpen(false);
                        }}
                        className={`text-left px-3 py-2 rounded-md text-lg font-medium cursor-pointer transition-colors duration-300 ${
                          activeTab === cat.slug
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
          border: `1px solid ${
            searchValue || isFocused ? "#9E77ED" : "#D2D6DB"
          }`,
          backgroundColor: "#FFF",
          boxShadow:
            searchValue || isFocused
              ? "0 1px 2px 0 rgba(16,24,40,0.05),0 0 0 4px rgba(158,119,237,0.24)"
              : "0 1px 2px 0 rgba(16,24,40,0.05)",
        }}
      >
        <LucideSearch
          size={20}
          className={`text-gray-400 transition-transform duration-500 ${
            isFocused ? "scale-110" : "scale-100"
          }`}
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
            onClick={handleClearSearch}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
          >
            &#10005;
          </button>
        )}
      </div>
    </div>
  );
}