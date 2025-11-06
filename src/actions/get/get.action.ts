"use server";

import axiosInstance from "@/shared/config/axios.config";

export const getBlog = async () => {
  try {
    const response = await axiosInstance.get(`/pages/blog`);
    return response.data;
  } catch (error: any) {
    throw new Error(error?.message || "Failed to Blog item");
  }
};

export const getCategories = async () => {
  try {
    const response = await axiosInstance.get(`/categories`);
    return response.data;
  } catch (error: any) {
    throw new Error(error?.message || "Failed to Categories item");
  }
};
