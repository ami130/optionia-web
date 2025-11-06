import axios from "axios";

import { ENV_CONFIG } from "@/shared/constant/app.constant";

const axiosInstance = axios.create({
  baseURL: ENV_CONFIG.baseApi,
});

export default axiosInstance;
