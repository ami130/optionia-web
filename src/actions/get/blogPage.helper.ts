"use server";

import axiosInstance from "@/shared/config/axios.config";

// Simple in-memory cache for production
const cache = new Map();
const CACHE_TTL = 60 * 1000; // 1 minute

export const fetchBlogPageData = async (
  search?: string,
  categorySlug?: string
) => {
  const cacheKey = `blog-${search}-${categorySlug}`;

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

    // Step 2️⃣: Build query params
    const queryParams: string[] = [];
    if (search) queryParams.push(`search=${encodeURIComponent(search)}`);
    if (categorySlug && categorySlug.toLowerCase() !== "all") {
      queryParams.push(`category=${categorySlug}`);
    }
    const queryString = queryParams.length ? `?${queryParams.join("&")}` : "";

    // Step 3️⃣: Fetch blog page with timeout
    const blogRes = await axiosInstance.get(`/pages/blog${queryString}`, {
      timeout: 5000, // 5 second timeout
    });

    const blogs = Array.isArray(blogRes?.data?.data?.blogs)
      ? blogRes.data.data.blogs
      : [];
    const page = blogRes?.data?.data?.page || {};

    const result = {
      page,
      blogs,
      categories,
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

// export const fetchBlogPageData = async (
//   search?: string,
//   categorySlug?: string
// ) => {
//   try {
//     // Step 1️⃣: Fetch categories first
//     const categoriesRes = await axiosInstance.get(`/categories`);
//     const categories = Array.isArray(categoriesRes?.data?.data)
//       ? categoriesRes.data.data
//       : [];

//     // Step 2️⃣: Build query params - pass categorySlug directly
//     const queryParams: string[] = [];
//     if (search) queryParams.push(`search=${encodeURIComponent(search)}`);
//     if (categorySlug && categorySlug.toLowerCase() !== "all") {
//       queryParams.push(`category=${categorySlug}`);
//     }
//     const queryString = queryParams.length ? `?${queryParams.join("&")}` : "";

//     // Step 3️⃣: Fetch blog page
//     const blogRes = await axiosInstance.get(`/pages/blog${queryString}`);

//     const blogs = Array.isArray(blogRes?.data?.data?.blogs)
//       ? blogRes.data.data.blogs
//       : [];
//     const page = blogRes?.data?.data?.page || {};

//     // ✅ Return both so you can reuse categories for the filter UI
//     return {
//       page,
//       blogs,
//       categories,
//     };
//   } catch (error: any) {
//     console.error("❌ Failed to fetch blog page data:", error);
//     return {
//       page: {},
//       blogs: [],
//       categories: [],
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

// "use server";

// import axiosInstance from "@/shared/config/axios.config";

// export const fetchBlogPageData = async (search?: string, category?: string) => {
//   try {
//     const queryParams: string[] = [];
//     if (search) queryParams.push(`search=${search}`);
//     if (category) queryParams.push(`category=${category}`);
//     const queryString = queryParams.length ? `?${queryParams.join("&")}` : "";

//     // fetch both in parallel
//     const [blogRes, categoriesRes] = await Promise.all([
//       axiosInstance.get(`/pages/blog${queryString}`),
//       axiosInstance.get(`/categories`),
//     ]);

//     // ✅ Your blog API returns something like { data: [...blogs], page: {...}, pagination: {...} }
//     const blogs = Array.isArray(blogRes?.data?.data?.blogs)
//       ? blogRes?.data?.data?.blogs
//       : [];
//     const page = blogRes?.data?.data?.page || {};

//     return { page, blogs };
//   } catch (error: any) {
//     console.error("Failed to fetch blog page data:", error);
//     return {
//       page: {},
//       blogs: [],
//       categories: [],
//     };
//   }
// };
