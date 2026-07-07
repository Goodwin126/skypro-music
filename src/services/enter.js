import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const AUTH_BASE_URL = 'https://webdev-music-003b5b991590.herokuapp.com/';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: AUTH_BASE_URL,
    prepareHeaders: (headers) => {
      headers.set('Content-Type', 'application/json');
      return headers;
    },
  }),
  tagTypes: ['Auth'],
  endpoints: (build) => ({
    sendingSigningUpData: build.mutation({
      query: (body) => ({
        url: 'user/signup/',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Auth'],
    }),

    // Логин
    sendingLoggingData: build.mutation({
      query: (body) => ({
        url: 'user/login/',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Auth'],
    }),

    // Получение токенов
    sendingTokenData: build.mutation({
      query: (body) => ({
        url: 'user/token/',
        method: 'POST',
        body,
      }),
      providesTags: ['Auth'],
    }),

    // Обновление токена
    refreshTokenData: build.mutation({
      query: (body) => ({
        url: 'user/token/refresh/',
        method: 'POST',
        body,
      }),
      providesTags: ['Auth'],
    }),
  }),
});

// Экспортируем хуки для использования в компонентах
export const {
  useSendingSigningUpDataMutation,
  useSendingLoggingDataMutation,
  useSendingTokenDataMutation,
  useRefreshTokenDataMutation,
} = authApi;
