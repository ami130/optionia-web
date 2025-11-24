"use server";

import axiosInstance from "@/shared/config/axios.config";

export const getCategories = async () => {
  try {
    const response = await axiosInstance.get(`/categories`);
    return response.data;
  } catch (error: any) {
    throw new Error(error?.message || "Failed to Categories item");
  }
};

export const getTermsOfService = async () => {
  try {
    const response = await axiosInstance.get(`/terms-of-service`);
    return response.data;
  } catch (error: any) {
    throw new Error(error?.message || "Failed to Terms of service item");
  }
};
export const getPrivacyPolicy = async () => {
  try {
    const response = await axiosInstance.get(`/privacy-policy`);
    return response.data;
  } catch (error: any) {
    throw new Error(error?.message || "Failed to Privacy Policy item");
  }
};

export const getAuthor = async (username: any) => {
  try {
    const response = await axiosInstance.get(`users/username/${username}`);
    return response.data;
  } catch (error: any) {
    throw new Error(error?.message || "Failed to Get Author Data");
  }
};
