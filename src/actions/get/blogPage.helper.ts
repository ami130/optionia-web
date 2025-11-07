"use server";

import axiosInstance from "@/shared/config/axios.config";

export const fetchBlogPageData = async (search?: string, category?: string) => {
  try {
    // Step 1️⃣: Fetch categories first
    const categoriesRes = await axiosInstance.get(`/categories`);
    const categories = Array.isArray(categoriesRes?.data?.data)
      ? categoriesRes.data.data
      : [];

    // Step 2️⃣: Detect if "category" is slug or numeric ID
    let categoryId: string | undefined = undefined;

    if (category && category.toLowerCase() !== "all") {
      const matchedCategory = categories.find(
        (cat: any) =>
          cat.id?.toString() === category?.toString() ||
          cat.slug?.toLowerCase() === category?.toLowerCase()
      );
      if (matchedCategory) categoryId = matchedCategory.id.toString();
    }

    // Step 3️⃣: Build query params
    const queryParams: string[] = [];
    if (search) queryParams.push(`search=${encodeURIComponent(search)}`);
    if (categoryId) queryParams.push(`category=${categoryId}`);
    const queryString = queryParams.length ? `?${queryParams.join("&")}` : "";

    // Step 4️⃣: Fetch blog page
    const blogRes = await axiosInstance.get(`/pages/blog${queryString}`);

    const blogs = Array.isArray(blogRes?.data?.data?.blogs)
      ? blogRes.data.data.blogs
      : [];
    const page = blogRes?.data?.data?.page || {};

    // ✅ Return both so you can reuse categories for the filter UI
    return {
      page,
      blogs,
      categories,
    };
  } catch (error: any) {
    console.error("❌ Failed to fetch blog page data:", error);
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
