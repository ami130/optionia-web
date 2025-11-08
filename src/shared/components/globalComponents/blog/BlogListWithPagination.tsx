"use client";
import { useState, useEffect, useMemo, useCallback } from "react";
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
  firstPageCount = 3,
  itemsPerPage = 6,
}: BlogListWithPaginationProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [isFiltering, setIsFiltering] = useState(false);

  // 🧩 Get current URL params for real-time updates
  const [currentParams, setCurrentParams] = useState({
    search: initialSearch,
    category: initialCategory,
  });

  // 🧩 Listen to URL changes INSTANTLY
  useEffect(() => {
    const handleUrlChange = () => {
      const params = new URLSearchParams(window.location.search);
      setCurrentParams({
        search: params.get("search") || "",
        category: params.get("category") || "",
      });
      setCurrentPage(1);
    };

    // Check URL on mount and when popstate occurs
    handleUrlChange();

    // Listen for URL changes (from BlogFilterSections)
    const interval = setInterval(handleUrlChange, 100);

    window.addEventListener("popstate", handleUrlChange);
    return () => {
      clearInterval(interval);
      window.removeEventListener("popstate", handleUrlChange);
    };
  }, []);

  // 🧩 INSTANT Client-side filtering (no API calls)
  const { filteredBlogs, featuredBlogs, latestBlogs } = useMemo(() => {
    setIsFiltering(true);

    let filtered = initialBlogs;

    // Apply search filter INSTANTLY
    if (currentParams.search) {
      const searchLower = currentParams.search.toLowerCase();
      filtered = filtered.filter(
        (blog) =>
          blog.title?.toLowerCase().includes(searchLower) ||
          blog.description?.toLowerCase().includes(searchLower) ||
          blog.content?.toLowerCase().includes(searchLower)
      );
    }

    // Apply category filter INSTANTLY
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

    // Simulate very fast filtering completion
    setTimeout(() => setIsFiltering(false), 50);

    return {
      filteredBlogs: filtered,
      featuredBlogs: featured,
      latestBlogs: latest,
    };
  }, [initialBlogs, currentParams.search, currentParams.category]);

  // 🧩 Pagination logic
  const paginatedBlogs = useMemo(() => {
    if (currentPage === 1) {
      return latestBlogs.slice(0, firstPageCount);
    } else {
      const startIndex = firstPageCount + (currentPage - 2) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      return latestBlogs.slice(startIndex, endIndex);
    }
  }, [latestBlogs, currentPage, firstPageCount, itemsPerPage]);

  const totalBlogs = latestBlogs.length;
  const remainingItems = totalBlogs - firstPageCount;
  const totalPages = 1 + Math.ceil(Math.max(remainingItems, 0) / itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // 🧩 Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [currentParams.search, currentParams.category]);

  return (
    <div className="space-y-12">
      {/* Loading indicator - Only shows briefly */}
      {isFiltering && (
        <div className="fixed top-4 right-4 bg-blue-500 text-white px-4 py-2 rounded-lg shadow-lg z-50 animate-pulse">
          🔄 Filtering...
        </div>
      )}

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
          Latest Articles{" "}
          {filteredBlogs.length !== initialBlogs.length && (
            <span className="text-lg font-normal text-gray-600 ml-2">
              ({filteredBlogs.length} results)
            </span>
          )}
        </h2>

        {paginatedBlogs.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full px-5 lg:px-0 mb-8">
              {paginatedBlogs.map((blog, index) => (
                <BlogCardList key={blog.id} blog={blog} index={index} />
              ))}
            </div>

            {/* Pagination */}
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
              No Blogs found matching your criteria.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
// "use client";
// import { useState, useEffect, useMemo } from "react";
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
//   firstPageCount = 3,
//   itemsPerPage = 6,
// }: BlogListWithPaginationProps) {
//   const [currentPage, setCurrentPage] = useState(1);

//   // 🧩 Get current URL params for real-time updates
//   const [currentParams, setCurrentParams] = useState({
//     search: initialSearch,
//     category: initialCategory,
//   });

//   // 🧩 Listen to URL changes
//   useEffect(() => {
//     const handleUrlChange = () => {
//       const params = new URLSearchParams(window.location.search);
//       setCurrentParams({
//         search: params.get("search") || "",
//         category: params.get("category") || "",
//       });
//       setCurrentPage(1); // Reset to first page on filter change
//     };

//     // Check URL on mount and when popstate occurs
//     handleUrlChange();

//     window.addEventListener("popstate", handleUrlChange);
//     return () => window.removeEventListener("popstate", handleUrlChange);
//   }, []);

//   // 🧩 Client-side filtering (super fast - no API calls)
//   const { filteredBlogs, featuredBlogs, latestBlogs } = useMemo(() => {
//     let filtered = initialBlogs;

//     // Apply search filter
//     if (currentParams.search) {
//       const searchLower = currentParams.search.toLowerCase();
//       filtered = filtered.filter(
//         (blog) =>
//           blog.title?.toLowerCase().includes(searchLower) ||
//           blog.description?.toLowerCase().includes(searchLower) ||
//           blog.content?.toLowerCase().includes(searchLower)
//       );
//     }

//     // Apply category filter using slug
//     if (currentParams.category && currentParams.category !== "all") {
//       filtered = filtered.filter(
//         (blog) =>
//           blog.category?.slug?.toLowerCase() ===
//             currentParams.category?.toLowerCase() ||
//           blog.category?.name?.toLowerCase() ===
//             currentParams.category?.toLowerCase()
//       );
//     }

//     const featured = filtered.filter((blog) => blog.featured).slice(0, 2);
//     const latest = filtered.filter((blog) => !blog.featured);

//     return {
//       filteredBlogs: filtered,
//       featuredBlogs: featured,
//       latestBlogs: latest,
//     };
//   }, [initialBlogs, currentParams.search, currentParams.category]);

//   // 🧩 Pagination logic
//   const paginatedBlogs = useMemo(() => {
//     if (currentPage === 1) {
//       return latestBlogs.slice(0, firstPageCount);
//     } else {
//       const startIndex = firstPageCount + (currentPage - 2) * itemsPerPage;
//       const endIndex = startIndex + itemsPerPage;
//       return latestBlogs.slice(startIndex, endIndex);
//     }
//   }, [latestBlogs, currentPage, firstPageCount, itemsPerPage]);

//   const totalBlogs = latestBlogs.length;
//   const remainingItems = totalBlogs - firstPageCount;
//   const totalPages = 1 + Math.ceil(Math.max(remainingItems, 0) / itemsPerPage);

//   const handlePageChange = (page: number) => {
//     setCurrentPage(page);
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   };

//   // 🧩 Reset to page 1 when filters change
//   useEffect(() => {
//     setCurrentPage(1);
//   }, [currentParams.search, currentParams.category]);

//   return (
//     <div className="space-y-12">
//       {/* Featured Articles */}
//       {featuredBlogs.length > 0 && (
//         <div>
//           <h2 className="text-[#2C076E] font-medium text-[32px] pb-6">
//             Featured Articles
//           </h2>
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full px-5 lg:px-0">
//             {featuredBlogs.map((blog) => (
//               <FeaturedBlogCard key={blog.id} blog={blog} />
//             ))}
//           </div>
//         </div>
//       )}

//       {/* Latest Articles */}
//       <div>
//         <h2 className="text-[#2C076E] font-medium text-[32px] pb-6">
//           Latest Articles{" "}
//           {filteredBlogs.length !== initialBlogs.length &&
//             `(${filteredBlogs.length} results)`}
//         </h2>

//         {paginatedBlogs.length > 0 ? (
//           <>
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full px-5 lg:px-0 mb-8">
//               {paginatedBlogs.map((blog) => (
//                 <BlogCardList key={blog.id} blog={blog} />
//               ))}
//             </div>

//             {/* Pagination */}
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
//               No Blogs found matching your criteria.
//             </p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }
