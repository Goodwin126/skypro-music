import React from 'react';
import * as S from './styles';
import { Link, useNavigate } from 'react-router-dom';
import { useSendingSigningUpDataMutation } from '../../services/enter';
import { useState, useCallback } from 'react';

export const Registration = () => {
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const [sandingDate, { isLoading, isError, error }] =
    useSendingSigningUpDataMutation();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    username: '',
  });

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();

      const newErrors = {};

      // Валидация полей
      if (!formData.email) {
        newErrors.email = 'Email обязателен для заполнения';
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = 'Введите корректный email';
      }

      if (!formData.password) {
        newErrors.password = 'Пароль обязателен для заполнения';
      } else if (formData.password.length < 6) {
        newErrors.password = 'Пароль должен содержать минимум 6 символов';
      }

      if (!formData.username) {
        newErrors.username = 'Логин обязателен для заполнения';
      } else if (formData.username.length < 3) {
        newErrors.username = 'Логин должен содержать минимум 3 символа';
      }

      // Если есть ошибки — сохраняем их и выходим
      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        return;
      }

      // Очищаем ошибки, если всё ок
      setErrors({});

      try {
        await sandingDate(formData).unwrap();
        navigate('/login');
      } catch (err) {
        console.error('Registration failed:', err);
      }
    },
    [sandingDate, navigate, formData]
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <S.StyledWrapper>
      <S.StyledContainerEnter>
        <S.StyledModalBlock>
          <S.StyledModalFormLogin>
            <Link to="/">
              <S.StyledModalLogo>
                <S.StyledModalLogoImg src="../img/logo_modal.png" alt="logo" />
              </S.StyledModalLogo>
            </Link>

            <S.StyledModalInput
              type="email"
              name="email"
              placeholder="Почта"
              value={formData.email}
              onChange={handleChange}
              required
            />
            {errors.email && <S.StyledError>{errors.email}</S.StyledError>}
            <S.StyledModalInput
              type="text"
              name="username"
              placeholder="Логин"
              value={formData.username}
              onChange={handleChange}
              required
            />
            {errors.username && (
              <S.StyledError>{errors.username}</S.StyledError>
            )}
            <S.StyledModalInput
              type="password"
              name="password"
              placeholder="Пароль"
              value={formData.password}
              onChange={handleChange}
              required
            />
            {errors.password && (
              <S.StyledError>{errors.password}</S.StyledError>
            )}
            {isError && (
              <S.StyledError>
                Ошибка входа: {error?.data?.message || 'Неверные данные'}
              </S.StyledError>
            )}
            <S.StyledModalBtnSignupEnt
              type="submit"
              disabled={isLoading}
              onClick={handleSubmit}
            >
              Зарегистрироваться
            </S.StyledModalBtnSignupEnt>
          </S.StyledModalFormLogin>
        </S.StyledModalBlock>
      </S.StyledContainerEnter>
    </S.StyledWrapper>
  );
};
