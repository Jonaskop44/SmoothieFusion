export const BACKEND_URL =
  process.env.NODE_ENV === "production"
    ? process.env.NEXT_PUBLIC_BACKEND_URL_PROD
    : process.env.NEXT_PUBLIC_BACKEND_URL;
