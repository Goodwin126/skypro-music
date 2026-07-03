import React, { createContext, useContext, useState, useEffect } from 'react';
import { useSendingTokenDataMutation } from '../services/enter';

const TokenContext = createContext(null);

export const TokenProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(null);
  const [refreshToken, setRefreshToken] = useState(null);

  // Хук для запроса новых токенов (логин или рефреш)
  const [getTokens, { isLoading }] = useSendingTokenDataMutation();

  // 1. При загрузке читаем токены из localStorage
  useEffect(() => {
    const saved = localStorage.getItem('tokens');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setAccessToken(parsed.access);
        setRefreshToken(parsed.refresh);
      } catch (e) {
        console.warn('Не удалось распарсить токены:', e);
      }
    }
  }, []);

  // 2. Сохраняем токены в localStorage при изменении
  useEffect(() => {
    if (accessToken && refreshToken) {
      localStorage.setItem(
        'tokens',
        JSON.stringify({
          access: accessToken,
          refresh: refreshToken,
        })
      );
    } else {
      localStorage.removeItem('tokens');
    }
  }, [accessToken, refreshToken]);

  const login = async (credentials) => {
    try {
      const response = await getTokens(credentials).unwrap();

      const access = response.access || response.data?.access;
      const refresh = response.refresh || response.data?.refresh;

      if (!access || !refresh) {
        throw new Error('Сервер не вернул корректные токены');
      }

      setAccessToken(access);
      setRefreshToken(refresh);
      return { success: true };
    } catch (error) {
      console.error('Ошибка входа (токены):', error);
      throw error;
    }
  };

  const refreshAccessToken = async () => {
    if (!refreshToken) return null;

    try {
      const response = await getTokens({ refresh: refreshToken }).unwrap();

      const newAccess = response.access || response.data?.access;
      if (newAccess) {
        setAccessToken(newAccess);
        return newAccess;
      }
      return null;
    } catch (error) {
      console.error('Не удалось обновить токен:', error);
      logout(); // Если рефреш не удался - выходим
      return null;
    }
  };

  const logout = () => {
    setAccessToken(null);
    setRefreshToken(null);
  };

  return (
    <TokenContext.Provider
      value={{
        accessToken,
        refreshToken,
        login,
        refreshAccessToken,
        logout,
        isLoading,
      }}
    >
      {children}
    </TokenContext.Provider>
  );
};

export const useToken = () => {
  const context = useContext(TokenContext);
  if (!context)
    throw new Error('useToken должен использоваться внутри TokenProvider');
  return context;
};
