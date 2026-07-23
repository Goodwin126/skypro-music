import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { loadFavoriteTracks } from '../../store/trackSlice';
import { useAuth } from '../../context/AuthContext';
import { useToken } from '../../context/TokenContext';
import * as S from './styles';
import { useSendingLoggingDataMutation } from '../../services/enter';

export const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { login: authLogin } = useAuth();

  const { login: tokenLogin } = useToken();

  const [sendLoginData, loginResult] = useSendingLoggingDataMutation();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();

      try {
        //запрсо на логин
        await tokenLogin(formData);
        //ответ закидываем на получение токенов
        console.log('formData = ', formData);
        const userResponse = await sendLoginData(formData).unwrap();

        console.log('userResponse = ', userResponse);

        authLogin(userResponse);

        await dispatch(loadFavoriteTracks());

        navigate('/');
      } catch (err) {
        console.error('Ошибка авторизации:', err);
      }
    },

    [tokenLogin, sendLoginData, authLogin, navigate, formData]
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const isLoading = loginResult.isLoading;
  const error = loginResult.error;

  return (
    <S.StyledWrapper>
      <S.StyledContainerEnter>
        <S.StyledModalBlock>
          <S.StyledModalFormLogin onSubmit={handleSubmit}>
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

            <S.StyledModalInput
              type="password"
              name="password"
              placeholder="Пароль"
              value={formData.password}
              onChange={handleChange}
              required
            />

            {error && (
              <S.StyledError>
                Ошибка входа:{' '}
                {error.data?.detail ||
                  error.data?.message ||
                  'Неверный логин или пароль'}
              </S.StyledError>
            )}
            <S.StyledLoginButton disabled={isLoading} type="submit">
              {isLoading ? 'Вход...' : 'Войти'}
            </S.StyledLoginButton>

            <S.StyledLinkRegistration to="/registration">
              Зарегистрироваться
            </S.StyledLinkRegistration>
          </S.StyledModalFormLogin>
        </S.StyledModalBlock>
      </S.StyledContainerEnter>
    </S.StyledWrapper>
  );
};
