"use server";

import axiosInstance from "@/shared/config/axios.config";

// Simple in-memory cache for production
const cache = new Map();
const CACHE_TTL = 60 * 1000; // 1 minute

export const fetchBlogPageData = async (
  search?: string,
  categorySlug?: string,
  page: number = 1, // ✅ Internal parameter (not in URL)
  limit: number = 9 // ✅ Internal parameter (not in URL)
) => {
  const cacheKey = `blog-${search}-${categorySlug}-${page}-${limit}`;

  // Check cache first
  const cached = cache.get(cacheKey);
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return cached.data;
  }

  try {
    // Step 1️⃣: Fetch categories with cache
    let categories = [];
    const categoriesCache = cache.get("categories");

    if (categoriesCache && Date.now() - categoriesCache.timestamp < CACHE_TTL) {
      categories = categoriesCache.data;
    } else {
      const categoriesRes = await axiosInstance.get(`/categories`);
      categories = Array.isArray(categoriesRes?.data?.data)
        ? categoriesRes.data.data
        : [];
      cache.set("categories", { data: categories, timestamp: Date.now() });
    }

    // Step 2️⃣: Build query params for API - ONLY search & category in URL
    const queryParams: string[] = [];
    if (search) queryParams.push(`search=${encodeURIComponent(search)}`);
    if (categorySlug && categorySlug !== "all") {
      queryParams.push(`category=${categorySlug}`);
    }
    // ✅ Add pagination params INTERNALLY (not in URL)
    queryParams.push(`page=${page}`);
    queryParams.push(`limit=${limit}`);

    const queryString = queryParams.length ? `?${queryParams.join("&")}` : "";

    // Step 3️⃣: Fetch blog page with timeout
    const blogRes = await axiosInstance.get(`/pages/blog${queryString}`, {
      timeout: 5000,
    });

    const blogs = Array.isArray(blogRes?.data?.data?.blogs)
      ? blogRes.data.data.blogs
      : [];
    const pagination = blogRes?.data?.data?.pagination || {};
    const pageData = blogRes?.data?.data?.page || {};

    console.log("📊 Pagination Data:", pagination);

    const result = {
      page: pageData,
      blogs,
      categories,
      pagination: {
        total: pagination.total || 0,
        page: pagination.page || 1,
        limit: pagination.limit || limit,
        totalPages: pagination.totalPages || 1,
        hasNext: pagination.hasNext || false,
        hasPrev: pagination.hasPrev || false,
      },
      filters: { search, category: categorySlug }, // ✅ No page/limit in filters
    };

    // Cache the result
    cache.set(cacheKey, { data: result, timestamp: Date.now() });

    return result;
  } catch (error: any) {
    console.error("❌ Failed to fetch blog page data:", error);

    // Return stale cache if available
    const staleCached = cache.get(cacheKey);
    if (staleCached) {
      return staleCached.data;
    }

    return {
      page: {},
      blogs: [],
      categories: [],
      pagination: {
        total: 0,
        page: 1,
        limit: 9,
        totalPages: 0,
        hasNext: false,
        hasPrev: false,
      },
      filters: { search, category: categorySlug }, // ✅ No page/limit in filters
    };
  }
};

export const getSingleBlog = async (slug: string) => {
  try {
    const response = await axiosInstance.get(
      `/pages/blog/${encodeURIComponent(slug)}`
    );
    return response.data;
  } catch (error: any) {
    throw new Error(error?.message || "Failed to Blog data item");
  }
};

// "use server";

// import axiosInstance from "@/shared/config/axios.config";

// // Simple in-memory cache for production
// const cache = new Map();
// const CACHE_TTL = 60 * 1000; // 1 minute

// export const fetchBlogPageData = async (
//   search?: string,
//   categorySlug?: string
// ) => {
//   const cacheKey = `blog-${search}-${categorySlug}`;

//   // Check cache first
//   const cached = cache.get(cacheKey);
//   if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
//     return cached.data;
//   }

//   try {
//     // Step 1️⃣: Fetch categories with cache
//     let categories = [];
//     const categoriesCache = cache.get("categories");

//     if (categoriesCache && Date.now() - categoriesCache.timestamp < CACHE_TTL) {
//       categories = categoriesCache.data;
//     } else {
//       const categoriesRes = await axiosInstance.get(`/categories`);
//       categories = Array.isArray(categoriesRes?.data?.data)
//         ? categoriesRes.data.data
//         : [];
//       cache.set("categories", { data: categories, timestamp: Date.now() });
//     }

//     // Step 2️⃣: Build query params for API
//     const queryParams: string[] = [];
//     if (search) queryParams.push(`search=${encodeURIComponent(search)}`);
//     if (categorySlug && categorySlug !== "all") {
//       queryParams.push(`category=${categorySlug}`);
//     }
//     const queryString = queryParams.length ? `?${queryParams.join("&")}` : "";

//     // Step 3️⃣: Fetch blog page with timeout
//     const blogRes = await axiosInstance.get(`/pages/blog${queryString}`, {
//       timeout: 5000,
//     });

//     const blogs = Array.isArray(blogRes?.data?.data?.blogs)
//       ? blogRes.data.data.blogs
//       : [];
//     const pagination = blogRes?.data?.data?.pagination;

//     console.log("blogRes", blogRes);

//     const page = blogRes?.data?.data?.page || {};
//     console.log("pagination", blogRes?.data?.data?.pagination);

//     const result = {
//       page,
//       blogs,
//       categories,
//       pagination,
//       filters: { search, category: categorySlug }, // Include current filters
//     };

//     // Cache the result
//     cache.set(cacheKey, { data: result, timestamp: Date.now() });

//     return result;
//   } catch (error: any) {
//     console.error("❌ Failed to fetch blog page data:", error);

//     // Return stale cache if available
//     const staleCached = cache.get(cacheKey);
//     if (staleCached) {
//       return staleCached.data;
//     }

//     return {
//       page: {},
//       blogs: [],
//       categories: [],
//       filters: { search, category: categorySlug },
//     };
//   }
// };

// export const getSingleBlog = async (slug: string) => {
//   try {
//     const response = await axiosInstance.get(
//       `/pages/blog/${encodeURIComponent(slug)}`
//     );
//     return response.data;
//   } catch (error: any) {
//     throw new Error(error?.message || "Failed to Blog data item");
//   }
// };
