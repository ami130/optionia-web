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
  serverPagination?: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

export default function BlogListWithPagination({
  initialBlogs,
  initialSearch = "",
  initialCategory = "",
  serverPagination,
}: BlogListWithPaginationProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  console.log("initialBlogs", initialBlogs);

  // 🧩 Use refs to track changes
  const prevParams = useRef({
    search: initialSearch,
    category: initialCategory,
  });

  // 🧩 Get current URL params for real-time updates
  const [currentParams, setCurrentParams] = useState({
    search: initialSearch,
    category: initialCategory,
  });

  // 🧩 Use server pagination data if available
  const pagination = useMemo(() => {
    if (serverPagination) {
      return serverPagination;
    }

    // Fallback client-side pagination
    const total = initialBlogs.length;
    const limit = 9;
    const totalPages = Math.ceil(total / limit);

    return {
      total,
      page: currentPage,
      limit,
      totalPages,
      hasNext: currentPage < totalPages,
      hasPrev: currentPage > 1,
    };
  }, [serverPagination, initialBlogs.length, currentPage]);

  // 🧩 Listen to URL changes (only for search & category)
  useEffect(() => {
    const handleUrlChange = () => {
      const params = new URLSearchParams(window.location.search);
      const newSearch = params.get("search") || "";
      const newCategory = params.get("category") || "";

      setCurrentParams({
        search: newSearch,
        category: newCategory,
      });

      // Reset to page 1 when search/category changes
      if (
        newSearch !== currentParams.search ||
        newCategory !== currentParams.category
      ) {
        setCurrentPage(1);
      }
    };

    handleUrlChange();

    const interval = setInterval(handleUrlChange, 300);

    window.addEventListener("popstate", handleUrlChange);
    return () => {
      clearInterval(interval);
      window.removeEventListener("popstate", handleUrlChange);
    };
  }, [currentParams.search, currentParams.category]);

  // 🧩 Handle page change - NO URL UPDATE for page
  const handlePageChange = useCallback((page: number) => {
    setIsLoading(true);
    setCurrentPage(page);

    // Scroll to top
    window.scrollTo({ top: 0, behavior: "smooth" });

    // Simulate loading (in real app, this would be when new data loads)
    setTimeout(() => setIsLoading(false), 300);
  }, []);

  // 🧩 Reset loading state when blogs change
  useEffect(() => {
    if (initialBlogs.length > 0) {
      setIsLoading(false);
    }
  }, [initialBlogs]);

  // 🧩 Filter blogs client-side for instant UI updates
  const { filteredBlogs, featuredBlogs, latestBlogs } = useMemo(() => {
    let filtered = initialBlogs;

    // Apply search filter
    if (currentParams.search) {
      const searchLower = currentParams.search.toLowerCase();
      filtered = filtered.filter(
        (blog) =>
          blog.title?.toLowerCase().includes(searchLower) ||
          blog.subtitle?.toLowerCase().includes(searchLower) ||
          blog.content?.toLowerCase().includes(searchLower)
      );
    }

    // Apply category filter (except "all")
    if (currentParams.category && currentParams.category !== "all") {
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

    return {
      filteredBlogs: filtered,
      featuredBlogs: featured,
      latestBlogs: latest,
    };
  }, [initialBlogs, currentParams.search, currentParams.category]);

  // 🧩 Paginate the latest blogs
  const paginatedBlogs = useMemo(() => {
    if (!latestBlogs || latestBlogs.length === 0) return [];

    const startIndex = (currentPage - 1) * 9; // ✅ Always 9 items per page
    const endIndex = startIndex + 9;

    return latestBlogs.slice(startIndex, endIndex);
  }, [latestBlogs, currentPage]);

  // 🧩 Show loading indicator
  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-12">
      {/* Featured Articles */}
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
          Latest Articles
          <span className="text-lg font-normal text-gray-600 ml-2">
            ({pagination.total} total)
          </span>
        </h2>

        {paginatedBlogs.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full px-5 lg:px-0 mb-8">
              {paginatedBlogs.map((blog, index) => (
                <BlogCardList key={blog.id} blog={blog} index={index} />
              ))}
            </div>

            {/* Client-side Pagination (No URL params) */}
            {pagination.totalPages > 1 && (
              <Pagination>
                <PaginationContent>
                  {/* Previous Button */}
                  <PaginationItem>
                    <PaginationPrevious
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        if (pagination.hasPrev) {
                          handlePageChange(pagination.page - 1);
                        }
                      }}
                      className={
                        !pagination.hasPrev
                          ? "pointer-events-none opacity-50"
                          : ""
                      }
                    />
                  </PaginationItem>

                  {/* Page Numbers */}
                  {Array.from(
                    { length: pagination.totalPages },
                    (_, i) => i + 1
                  ).map((page) => (
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
                  ))}

                  {/* Next Button */}
                  <PaginationItem>
                    <PaginationNext
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        if (pagination.hasNext) {
                          handlePageChange(pagination.page + 1);
                        }
                      }}
                      className={
                        !pagination.hasNext
                          ? "pointer-events-none opacity-50"
                          : ""
                      }
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            )}

            {/* Pagination Info */}
            <div className="text-center text-gray-600 mt-4">
              Page {currentPage} of {pagination.totalPages} • Showing{" "}
              {paginatedBlogs.length} of {pagination.total} articles
            </div>
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              {currentParams.search || currentParams.category
                ? "No blogs found matching your criteria."
                : "No blogs available."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

// "use client";
// import { useState, useEffect, useMemo, useCallback, useRef } from "react";
// import BlogCardList from "@/shared/components/globalComponents/blog/BlogCardList";
// import FeaturedBlogCard from "@/shared/components/globalComponents/blog/FeaturedBlogCard";
// import {
//   Pagination,
//   PaginationContent,
//   PaginationItem,
//   PaginationLink,
//   PaginationNext,
//   PaginationPrevious,
// } from "@/components/ui/pagination";

// interface BlogListWithPaginationProps {
//   initialBlogs: any[];
//   initialSearch?: string;
//   initialCategory?: string;
//   firstPageCount?: number;
//   itemsPerPage?: number;
// }

// export default function BlogListWithPagination({
//   initialBlogs,
//   initialSearch = "",
//   initialCategory = "",
//   firstPageCount = 6,
//   itemsPerPage = 6,
// }: BlogListWithPaginationProps) {
//   const [currentPage, setCurrentPage] = useState(1);
//   const [isFiltering, setIsFiltering] = useState(false);

//   console.log("currentPage", currentPage);

//   // 🧩 Use refs to track changes and prevent unnecessary re-renders
//   const prevParams = useRef({
//     search: initialSearch,
//     category: initialCategory,
//   });
//   const prevInitialBlogs = useRef(initialBlogs);
//   const isInitialMount = useRef(true);
//   console.log("prevInitialBlogs", prevInitialBlogs);

//   // 🧩 Get current URL params for real-time updates
//   const [currentParams, setCurrentParams] = useState({
//     search: initialSearch,
//     category: initialCategory,
//   });

//   // 🧩 Listen to URL changes INSTANTLY but optimized
//   useEffect(() => {
//     const handleUrlChange = () => {
//       const params = new URLSearchParams(window.location.search);
//       const newSearch = params.get("search") || "";
//       const newCategory = params.get("category") || "";

//       setCurrentParams({
//         search: newSearch,
//         category: newCategory,
//       });

//       // setCurrentPage(1);
//     };

//     handleUrlChange();

//     const interval = setInterval(handleUrlChange, 300);

//     window.addEventListener("popstate", handleUrlChange);
//     return () => {
//       clearInterval(interval);
//       window.removeEventListener("popstate", handleUrlChange);
//     };
//   }, []);

//   // 🧩 OPTIMIZED FILTERING: Only filter when necessary
//   const { filteredBlogs, featuredBlogs, latestBlogs, shouldShowResults } =
//     useMemo(() => {
//       const hasActiveSearch =
//         currentParams.search && currentParams.search.trim() !== "";

//       // 🧩 FIXED: "all" means show ALL data, no category filtering
//       const hasActiveCategory =
//         currentParams.category &&
//         currentParams.category !== "all" &&
//         currentParams.category.trim() !== "";

//       const hasActiveFilters = hasActiveSearch || hasActiveCategory;

//       // 🧩 Check if we need to filter at all
//       const paramsChanged =
//         currentParams.search !== prevParams.current.search ||
//         currentParams.category !== prevParams.current.category;

//       const blogsChanged = initialBlogs !== prevInitialBlogs.current;

//       // If no active filters and no changes, return initial data (SHOW ALL)
//       if (!hasActiveFilters && !blogsChanged && !isInitialMount.current) {
//         const featured = initialBlogs
//           .filter((blog) => blog.featured)
//           .slice(0, 2);
//         const latest = initialBlogs.filter((blog) => !blog.featured);

//         return {
//           filteredBlogs: initialBlogs, // Show all blogs
//           featuredBlogs: featured,
//           latestBlogs: latest,
//           shouldShowResults: true,
//         };
//       }

//       // Only show filtering indicator when actually filtering
//       if (hasActiveFilters && paramsChanged) {
//         setIsFiltering(true);
//       }

//       let filtered = initialBlogs;

//       // Apply search filter only if active
//       if (hasActiveSearch) {
//         const searchLower = currentParams.search.toLowerCase();
//         filtered = filtered.filter(
//           (blog) =>
//             blog.title?.toLowerCase().includes(searchLower) ||
//             blog.description?.toLowerCase().includes(searchLower) ||
//             blog.content?.toLowerCase().includes(searchLower)
//         );
//       }

//       // 🧩 FIXED: Only apply category filter if it's NOT "all"
//       if (hasActiveCategory) {
//         filtered = filtered.filter(
//           (blog) =>
//             blog.category?.slug?.toLowerCase() ===
//               currentParams.category?.toLowerCase() ||
//             blog.category?.name?.toLowerCase() ===
//               currentParams.category?.toLowerCase()
//         );
//       }

//       const featured = filtered.filter((blog) => blog.featured).slice(0, 2);
//       const latest = filtered.filter((blog) => !blog.featured);

//       // Update refs
//       prevParams.current = { ...currentParams };
//       prevInitialBlogs.current = initialBlogs;
//       isInitialMount.current = false;

//       // Clear filtering indicator
//       if (hasActiveFilters) {
//         setTimeout(() => setIsFiltering(false), 50);
//       }

//       return {
//         filteredBlogs: filtered,
//         featuredBlogs: featured,
//         latestBlogs: latest,
//         shouldShowResults: filtered.length > 0 || !hasActiveFilters,
//       };
//     }, [initialBlogs, currentParams.search, currentParams.category]);

//   console.log("latestBlogs", latestBlogs);

//   // Paginated blogs
//   // Paginated blogs
//   const paginatedBlogs = useMemo(() => {
//     if (!latestBlogs || latestBlogs.length === 0) return [];

//     const startIndex = (currentPage - 1) * itemsPerPage;
//     const endIndex = startIndex + itemsPerPage;

//     return latestBlogs.slice(startIndex, endIndex);
//   }, [latestBlogs, currentPage, itemsPerPage]);

//   // Total pages
//   const totalPages = useMemo(() => {
//     if (!latestBlogs || latestBlogs.length === 0) return 1;
//     return Math.ceil(latestBlogs.length / itemsPerPage);
//   }, [latestBlogs, itemsPerPage]);

//   // Handle page change
//   const handlePageChange = (page: number) => {
//     setCurrentPage(page);
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   };

//   // 🧩 Reset to page 1 only when search/category actually changes
//   useEffect(() => {
//     if (
//       currentParams.search !== prevParams.current.search ||
//       currentParams.category !== prevParams.current.category
//     ) {
//       setCurrentPage(1);
//     }
//   }, [currentParams.search, currentParams.category]);

//   console.log("paginatedBlogs", paginatedBlogs);

//   return (
//     <div className="space-y-12">
//       {/* Loading indicator - Only shows when actually filtering */}
//       {isFiltering && (
//         <div className="fixed top-4 right-4 bg-blue-500 text-white px-4 py-2 rounded-lg shadow-lg z-50 animate-pulse">
//           🔄 Filtering...
//         </div>
//       )}

//       {/* Featured Articles - Only show if we have featured blogs */}
//       {featuredBlogs.length > 0 && (
//         <div>
//           <h2 className="text-[#2C076E] font-medium text-[32px] pb-6">
//             Featured Articles
//           </h2>
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full px-5 lg:px-0">
//             {featuredBlogs.map((blog, index) => (
//               <FeaturedBlogCard key={blog.id} blog={blog} index={index} />
//             ))}
//           </div>
//         </div>
//       )}

//       {/* Latest Articles */}
//       <div>
//         <h2 className="text-[#2C076E] font-medium text-[32px] pb-6">
//           Latest Articles{" "}
//           {filteredBlogs.length !== initialBlogs.length && (
//             <span className="text-lg font-normal text-gray-600 ml-2">
//               ({filteredBlogs.length} results)
//             </span>
//           )}
//         </h2>

//         {shouldShowResults && paginatedBlogs.length > 0 ? (
//           <>
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full px-5 lg:px-0 mb-8">
//               {paginatedBlogs?.map((blog, index) => (
//                 <BlogCardList key={blog.id} blog={blog} index={index} />
//               ))}
//             </div>

//             {/* Pagination - Only show if we have multiple pages */}
//             {totalPages > 1 && (
//               <Pagination>
//                 <PaginationContent>
//                   <PaginationItem>
//                     <PaginationPrevious
//                       href="#"
//                       onClick={(e) => {
//                         e.preventDefault();
//                         if (currentPage > 1) handlePageChange(currentPage - 1);
//                       }}
//                       className={
//                         currentPage === 1
//                           ? "pointer-events-none opacity-50"
//                           : ""
//                       }
//                     />
//                   </PaginationItem>

//                   {Array.from({ length: totalPages }, (_, i) => i + 1).map(
//                     (page) => (
//                       <PaginationItem key={page}>
//                         <PaginationLink
//                           href="#"
//                           onClick={(e) => {
//                             e.preventDefault();
//                             handlePageChange(page);
//                           }}
//                           isActive={currentPage === page}
//                         >
//                           {page}
//                         </PaginationLink>
//                       </PaginationItem>
//                     )
//                   )}

//                   <PaginationItem>
//                     <PaginationNext
//                       href="#"
//                       onClick={(e) => {
//                         e.preventDefault();
//                         if (currentPage < totalPages)
//                           handlePageChange(currentPage + 1);
//                       }}
//                       className={
//                         currentPage === totalPages
//                           ? "pointer-events-none opacity-50"
//                           : ""
//                       }
//                     />
//                   </PaginationItem>
//                 </PaginationContent>
//               </Pagination>
//             )}
//           </>
//         ) : (
//           <div className="text-center py-12">
//             <p className="text-gray-500 text-lg">
//               {currentParams.search ||
//               (currentParams.category && currentParams.category !== "all")
//                 ? "No Blogs found matching your criteria."
//                 : "No blogs available."}
//             </p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }
