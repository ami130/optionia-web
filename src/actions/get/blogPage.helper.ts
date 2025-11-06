"use server";

import axiosInstance from "@/shared/config/axios.config";

export const fetchBlogPageData = async (search?: string, category?: string) => {
  try {
    const queryParams: string[] = [];
    if (search) queryParams.push(`search=${search}`);
    if (category) queryParams.push(`category=${category}`);
    const queryString = queryParams.length ? `?${queryParams.join("&")}` : "";

    // fetch both in parallel
    const [blogRes, categoriesRes] = await Promise.all([
      axiosInstance.get(`/pages/blog${queryString}`),
      axiosInstance.get(`/categories`),
    ]);

    // ✅ Your blog API returns something like { data: [...blogs], page: {...}, pagination: {...} }
    const blogs = Array.isArray(blogRes?.data?.data?.blogs)
      ? blogRes?.data?.data?.blogs
      : [];
    const page = blogRes?.data?.data?.page || {};


    return { page, blogs };
  } catch (error: any) {
    console.error("Failed to fetch blog page data:", error);
    return {
      page: {},
      blogs: [],
      categories: [],
    };
  }
};
