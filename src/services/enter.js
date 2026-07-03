import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// 1. АДРЕС ТОЛЬКО ДЛЯ АВТОРИЗАЦИИ (как требует куратор)
const AUTH_BASE_URL = 'https://webdev-music-003b5b991590.herokuapp.com/';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: AUTH_BASE_URL, // 🔥 Теперь логин летит на правильный сервер
    prepareHeaders: (headers) => {
      headers.set('Content-Type', 'application/json');
      return headers;
    },
  }),
  tagTypes: ['Auth'],
  endpoints: (build) => ({
    // Регистрация
    sendingSigningUpData: build.mutation({
      query: (body) => ({
        url: 'user/signup/', // Полный путь согласно документации Skyeng
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Auth'],
    }),

    // Логин
    sendingLoggingData: build.mutation({
      query: (body) => ({
        url: 'user/login/', // Полный путь
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Auth'],
    }),

    // Получение токенов (если нужно отдельно, но обычно логин сразу дает токены)
    sendingTokenData: build.mutation({
      query: (body) => ({
        url: 'user/token/', // Полный путь
        method: 'POST',
        body,
      }),
      providesTags: ['Auth'],
    }),

    // Обновление токена
    refreshTokenData: build.mutation({
      query: (body) => ({
        url: 'user/token/refresh/', // Полный путь
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
