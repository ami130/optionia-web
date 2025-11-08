"use client";
import {
  useState,
  useEffect,
  useMemo,
  useCallback,
  startTransition,
} from "react";
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
  const [currentParams, setCurrentParams] = useState({
    search: initialSearch,
    category: initialCategory,
  });

  // 🧩 Optimized URL listener
  useEffect(() => {
    const handleUrlChange = () => {
      const params = new URLSearchParams(window.location.search);
      startTransition(() => {
        setCurrentParams({
          search: params.get("search") || "",
          category: params.get("category") || "",
        });
        setCurrentPage(1);
      });
    };

    handleUrlChange();
    window.addEventListener("popstate", handleUrlChange);
    return () => window.removeEventListener("popstate", handleUrlChange);
  }, []);

  // 🧩 Highly optimized filtering
  const { featuredBlogs, latestBlogs, filteredBlogs } = useMemo(() => {
    // Fast path: no filters applied
    if (
      !currentParams.search &&
      (!currentParams.category || currentParams.category === "all")
    ) {
      const featured = [];
      const latest = [];

      for (let i = 0; i < initialBlogs.length; i++) {
        const blog = initialBlogs[i];
        if (blog.featured && featured.length < 2) {
          featured.push(blog);
        } else {
          latest.push(blog);
        }
      }

      return {
        featuredBlogs: featured,
        latestBlogs: latest,
        filteredBlogs: initialBlogs,
      };
    }

    // Filtered path
    let filtered = initialBlogs;
    const searchLower = currentParams.search?.toLowerCase();
    const categoryLower = currentParams.category?.toLowerCase();

    if (searchLower) {
      filtered = filtered.filter(
        (blog) =>
          blog.title?.toLowerCase().includes(searchLower) ||
          blog.description?.toLowerCase().includes(searchLower)
      );
    }

    if (categoryLower && categoryLower !== "all") {
      filtered = filtered.filter(
        (blog) =>
          blog.category?.slug?.toLowerCase() === categoryLower ||
          blog.category?.name?.toLowerCase() === categoryLower
      );
    }

    const featured = [];
    const latest = [];

    for (let i = 0; i < filtered.length; i++) {
      const blog = filtered[i];
      if (blog.featured && featured.length < 2) {
        featured.push(blog);
      } else {
        latest.push(blog);
      }
    }

    return {
      featuredBlogs: featured,
      latestBlogs: latest,
      filteredBlogs: filtered,
    };
  }, [initialBlogs, currentParams.search, currentParams.category]);

  // 🧩 Optimized pagination
  const paginatedBlogs = useMemo(() => {
    if (currentPage === 1) {
      return latestBlogs.slice(0, firstPageCount);
    }
    const startIndex = firstPageCount + (currentPage - 2) * itemsPerPage;
    return latestBlogs.slice(startIndex, startIndex + itemsPerPage);
  }, [latestBlogs, currentPage, firstPageCount, itemsPerPage]);

  const totalPages = useMemo(() => {
    const remainingItems = Math.max(0, latestBlogs.length - firstPageCount);
    return 1 + Math.ceil(remainingItems / itemsPerPage);
  }, [latestBlogs.length, firstPageCount, itemsPerPage]);

  // 🧩 Optimized page change with proper focus management
  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
    // Use requestAnimationFrame for smooth scrolling
    requestAnimationFrame(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }, []);

  // Reset page on filter change
  useEffect(() => {
    setCurrentPage(1);
  }, [currentParams.search, currentParams.category]);

  return (
    <div className="space-y-12">
      {/* Featured Articles */}
      {featuredBlogs.length > 0 && (
        <section aria-labelledby="featured-articles">
          <h2
            id="featured-articles"
            className="text-[#2C076E] font-medium text-[32px] pb-6"
          >
            Featured Articles
          </h2>
          <div
            className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full px-5 lg:px-0"
            role="list"
            aria-label="Featured articles"
          >
            {featuredBlogs.map((blog, index) => (
              <FeaturedBlogCard key={blog.id} blog={blog} index={index} />
            ))}
          </div>
        </section>
      )}

      {/* Latest Articles */}
      <section aria-labelledby="latest-articles">
        <h2
          id="latest-articles"
          className="text-[#2C076E] font-medium text-[32px] pb-6"
        >
          Latest Articles
          {filteredBlogs.length !== initialBlogs.length && (
            <span className="text-lg font-normal text-gray-600 ml-2">
              ({filteredBlogs.length} results)
            </span>
          )}
        </h2>

        {paginatedBlogs.length > 0 ? (
          <>
            <div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full px-5 lg:px-0 mb-8"
              role="list"
              aria-label="Latest articles"
            >
              {paginatedBlogs.map((blog, index) => (
                <BlogCardList key={blog.id} blog={blog} index={index} />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <nav aria-label="Blog pagination">
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          if (currentPage > 1)
                            handlePageChange(currentPage - 1);
                        }}
                        aria-label="Go to previous page"
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
                            aria-label={`Go to page ${page}`}
                            aria-current={
                              currentPage === page ? "page" : undefined
                            }
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
                        aria-label="Go to next page"
                        className={
                          currentPage === totalPages
                            ? "pointer-events-none opacity-50"
                            : ""
                        }
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </nav>
            )}
          </>
        ) : (
          <div className="text-center py-12" role="status">
            <p className="text-gray-500 text-lg">
              No blogs found matching your criteria.
            </p>
          </div>
        )}
      </section>
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
