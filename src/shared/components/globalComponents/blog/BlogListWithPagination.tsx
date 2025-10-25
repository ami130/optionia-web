"use client";

import { useState } from "react";
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
  featuredBlogs: any[];
  latestBlogs: any[];
  firstPageCount?: number; // How many items on first page
  itemsPerPage?: number; // How many items on other pages
}

export default function BlogListWithPagination({
  featuredBlogs,
  latestBlogs,
  firstPageCount = 6,
  itemsPerPage = 6,
}: BlogListWithPaginationProps) {
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate slice indexes dynamically
  let paginatedBlogs = [];
  const totalBlogs = latestBlogs.length;

  if (currentPage === 1) {
    paginatedBlogs = latestBlogs.slice(0, firstPageCount);
  } else {
    const startIndex = firstPageCount + (currentPage - 2) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    paginatedBlogs = latestBlogs.slice(startIndex, endIndex);
  }

  // Calculate total pages
  const remainingItems = totalBlogs - firstPageCount;
  const totalPages = 1 + Math.ceil(Math.max(remainingItems, 0) / itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="space-y-12">
      {/* Featured Articles */}
      <div>
        <h2 className="text-[#2C076E] font-medium text-[32px] pb-6">
          Featured Articles
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full px-5 lg:px-0">
          {featuredBlogs.map((blog) => (
            <FeaturedBlogCard key={blog.id} blog={blog} />
          ))}
        </div>
      </div>

      {/* Latest Articles */}
      <div>
        <h2 className="text-[#2C076E] font-medium text-[32px] pb-6">
          Latest Articles
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full px-5 lg:px-0 mb-8">
          {paginatedBlogs.map((blog) => (
            <BlogCardList key={blog.id} blog={blog} />
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <Pagination>
            <PaginationContent>
              {/* Previous */}
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    if (currentPage > 1) handlePageChange(currentPage - 1);
                  }}
                  className={
                    currentPage === 1 ? "pointer-events-none opacity-50" : ""
                  }
                />
              </PaginationItem>

              {/* Page Numbers */}
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

              {/* Next */}
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
      </div>
    </div>
  );
}
