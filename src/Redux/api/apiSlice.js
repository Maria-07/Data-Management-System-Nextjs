import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";

export const getAccessToken = () => {
  return Cookies.get("accessToken");
};

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    // baseUrl: process.env.NEXT_PUBLIC_ADMIN_URL,
    baseUrl: process.env.NEXT_PUBLIC_PROVIDER_URL,
    prepareHeaders: (headers, {}) => {
      const token = getAccessToken();
      if (token) {
        headers.set("Authorization", token);
      }
      // headers.set("Accept", "application/json");
      headers.set("Content-Type", "application/json");
      return headers;
    },
  }),
  tagTypes: ["Payroll"],
  endpoints: () => ({}),
});

//Data recording
