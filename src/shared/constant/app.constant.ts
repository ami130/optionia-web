export const FETCH_OPTIONS: RequestInit = { next: { revalidate: 3600 } };

export const ENV_CONFIG = {
  baseApi: process.env.NEXT_PUBLIC_APP_URL,
};
