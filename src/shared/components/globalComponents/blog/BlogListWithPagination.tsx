"use client";
import { useState, useEffect, useMemo, useCallback, useRef } from "react";
import BlogCardList from "@/shared/components/globalComponents/blog/BlogCardList";
import FeaturedBlogCard from "@/shared/components/globalComponents/blog/FeaturedBlogCard";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface BlogListWithPaginationProps {
  initialBlogs: any[];
  initialSearch?: string;
  initialCategory?: string;
  firstPageCount?: number;
  itemsPerPage?: number;
}

export default function BlogListWithPagination({
  initialBlogs,
  initialSearch = "",
  initialCategory = "",
  firstPageCount = 6,
  itemsPerPage = 6,
}: BlogListWithPaginationProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [isFiltering, setIsFiltering] = useState(false);

  console.log("currentPage", currentPage);

  // 🧩 Use refs to track changes and prevent unnecessary re-renders
  const prevParams = useRef({
    search: initialSearch,
    category: initialCategory,
  });
  const prevInitialBlogs = useRef(initialBlogs);
  const isInitialMount = useRef(true);

  // 🧩 Get current URL params for real-time updates
  const [currentParams, setCurrentParams] = useState({
    search: initialSearch,
    category: initialCategory,
  });

  // 🧩 Listen to URL changes INSTANTLY but optimized
  useEffect(() => {
    const handleUrlChange = () => {
      const params = new URLSearchParams(window.location.search);
      const newSearch = params.get("search") || "";
      const newCategory = params.get("category") || "";

      setCurrentParams({
        search: newSearch,
        category: newCategory,
      });

      // setCurrentPage(1);
    };

    handleUrlChange();

    const interval = setInterval(handleUrlChange, 300);

    window.addEventListener("popstate", handleUrlChange);
    return () => {
      clearInterval(interval);
      window.removeEventListener("popstate", handleUrlChange);
    };
  }, []);

  // 🧩 OPTIMIZED FILTERING: Only filter when necessary
  const { filteredBlogs, featuredBlogs, latestBlogs, shouldShowResults } =
    useMemo(() => {
      const hasActiveSearch =
        currentParams.search && currentParams.search.trim() !== "";

      // 🧩 FIXED: "all" means show ALL data, no category filtering
      const hasActiveCategory =
        currentParams.category &&
        currentParams.category !== "all" &&
        currentParams.category.trim() !== "";

      const hasActiveFilters = hasActiveSearch || hasActiveCategory;

      // 🧩 Check if we need to filter at all
      const paramsChanged =
        currentParams.search !== prevParams.current.search ||
        currentParams.category !== prevParams.current.category;

      const blogsChanged = initialBlogs !== prevInitialBlogs.current;

      // If no active filters and no changes, return initial data (SHOW ALL)
      if (!hasActiveFilters && !blogsChanged && !isInitialMount.current) {
        const featured = initialBlogs
          .filter((blog) => blog.featured)
          .slice(0, 2);
        const latest = initialBlogs.filter((blog) => !blog.featured);

        return {
          filteredBlogs: initialBlogs, // Show all blogs
          featuredBlogs: featured,
          latestBlogs: latest,
          shouldShowResults: true,
        };
      }

      // Only show filtering indicator when actually filtering
      if (hasActiveFilters && paramsChanged) {
        setIsFiltering(true);
      }

      let filtered = initialBlogs;

      // Apply search filter only if active
      if (hasActiveSearch) {
        const searchLower = currentParams.search.toLowerCase();
        filtered = filtered.filter(
          (blog) =>
            blog.title?.toLowerCase().includes(searchLower) ||
            blog.description?.toLowerCase().includes(searchLower) ||
            blog.content?.toLowerCase().includes(searchLower)
        );
      }

      // 🧩 FIXED: Only apply category filter if it's NOT "all"
      if (hasActiveCategory) {
        filtered = filtered.filter(
          (blog) =>
            blog.category?.slug?.toLowerCase() ===
              currentParams.category?.toLowerCase() ||
            blog.category?.name?.toLowerCase() ===
              currentParams.category?.toLowerCase()
        );
      }

      const featured = filtered.filter((blog) => blog.featured).slice(0, 2);
      const latest = filtered.filter((blog) => !blog.featured);

      // Update refs
      prevParams.current = { ...currentParams };
      prevInitialBlogs.current = initialBlogs;
      isInitialMount.current = false;

      // Clear filtering indicator
      if (hasActiveFilters) {
        setTimeout(() => setIsFiltering(false), 50);
      }

      return {
        filteredBlogs: filtered,
        featuredBlogs: featured,
        latestBlogs: latest,
        shouldShowResults: filtered.length > 0 || !hasActiveFilters,
      };
    }, [initialBlogs, currentParams.search, currentParams.category]);

  // Paginated blogs
  const paginatedBlogs = useMemo(() => {
    if (!latestBlogs || latestBlogs.length === 0) return [];

    if (currentPage === 1) {
      return latestBlogs.slice(0, firstPageCount);
    }

    const startIndex = firstPageCount + (currentPage - 2) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    return latestBlogs.slice(startIndex, endIndex);
  }, [latestBlogs, currentPage, firstPageCount, itemsPerPage]);

  // Total pages
  const totalPages = useMemo(() => {
    if (!latestBlogs || latestBlogs.length === 0) return 1;

    if (latestBlogs.length <= firstPageCount) return 1;

    const remainingItems = latestBlogs.length - firstPageCount;
    return 1 + Math.ceil(remainingItems / itemsPerPage);
  }, [latestBlogs, firstPageCount, itemsPerPage]);

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // 🧩 Reset to page 1 only when search/category actually changes
  useEffect(() => {
    if (
      currentParams.search !== prevParams.current.search ||
      currentParams.category !== prevParams.current.category
    ) {
      setCurrentPage(1);
    }
  }, [currentParams.search, currentParams.category]);

  return (
    <div className="space-y-12">
      {/* Loading indicator - Only shows when actually filtering */}
      {isFiltering && (
        <div className="fixed top-4 right-4 bg-blue-500 text-white px-4 py-2 rounded-lg shadow-lg z-50 animate-pulse">
          🔄 Filtering...
        </div>
      )}

      {/* Featured Articles - Only show if we have featured blogs */}
      {featuredBlogs.length > 0 && (
        <div>
          <h2 className="text-[#2C076E] font-medium text-[32px] pb-6">
            Featured Articles
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full px-5 lg:px-0">
            {featuredBlogs.map((blog, index) => (
              <FeaturedBlogCard key={blog.id} blog={blog} index={index} />
            ))}
          </div>
        </div>
      )}

      {/* Latest Articles */}
      <div>
        <h2 className="text-[#2C076E] font-medium text-[32px] pb-6">
          Latest Articles{" "}
          {filteredBlogs.length !== initialBlogs.length && (
            <span className="text-lg font-normal text-gray-600 ml-2">
              ({filteredBlogs.length} results)
            </span>
          )}
        </h2>

        {shouldShowResults && paginatedBlogs.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full px-5 lg:px-0 mb-8">
              {paginatedBlogs.map((blog, index) => (
                <BlogCardList key={blog.id} blog={blog} index={index} />
              ))}
            </div>

            {/* Pagination - Only show if we have multiple pages */}
            {totalPages > 1 && (
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        if (currentPage > 1) handlePageChange(currentPage - 1);
                      }}
                      className={
                        currentPage === 1
                          ? "pointer-events-none opacity-50"
                          : ""
                      }
                    />
                  </PaginationItem>

                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (page) => (
                      <PaginationItem key={page}>
                        <PaginationLink
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            handlePageChange(page);
                          }}
                          isActive={currentPage === page}
                        >
                          {page}
                        </PaginationLink>
                      </PaginationItem>
                    )
                  )}

                  <PaginationItem>
                    <PaginationNext
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        if (currentPage < totalPages)
                          handlePageChange(currentPage + 1);
                      }}
                      className={
                        currentPage === totalPages
                          ? "pointer-events-none opacity-50"
                          : ""
                      }
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            )}
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              {currentParams.search ||
              (currentParams.category && currentParams.category !== "all")
                ? "No Blogs found matching your criteria."
                : "No blogs available."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
