import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// const BASE_URL = "https://skypro-music-api.skyeng.tech/user/";
const BASE_URL = "http://localhost:3001/";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers) => {
      headers.set("content-type", "application/json");
      return headers;
    },
  }),
  tagTypes: ["Auth"],
  endpoints: (build) => ({
    sendingSigningUpData: build.mutation({
      query: (body) => ({
        url: "signup",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Auth"],
    }),
    sendingLoggingData: build.mutation({
      query: (body) => ({
        url: "login",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Auth"],
    }),
    sendingTokenData: build.mutation({
      query: (body) => ({
        url: "token",
        method: "POST",
        body,
      }),
      providesTags: ["Auth"],
    }),
    refreshTokenData: build.mutation({
      query: (body) => ({
        url: "token/refresh",
        method: "POST",
        body,
      }),
      providesTags: ["Auth"],
    }),
  }),
});

export const {
  useSendingSigningUpDataMutation,
  useSendingLoggingDataMutation,
  useSendingTokenDataMutation,
  useRefreshTokenDataMutation,
} = authApi;
