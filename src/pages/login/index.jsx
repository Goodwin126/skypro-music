import * as S from "./styles";
import { Link, useNavigate } from "react-router-dom";
import {
  useSendingLoggingDataMutation,
  useSendingTokenDataMutation,
} from "../../services/enter";
import { useState, useCallback } from "react";

export const Login = ({ user, onAuthButtonClick }) => {
  const navigate = useNavigate();

  const [sendLoginData, { isLoading: isLoginLoading, isError, error }] =
    useSendingLoggingDataMutation();

  const [sendDataData, { isLoading: isTokenLoading }] =
    useSendingTokenDataMutation();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();

      try {
        const loginResult = await sendLoginData(formData).unwrap();

        if (loginResult) {
          const tokenResult = await sendDataData(loginResult).unwrap();
          if (tokenResult) {
            await onAuthButtonClick(tokenResult);
          }
          navigate("/");
        }
      } catch (err) {
        console.error("Login failed:", err);
      }
    },
    [sendLoginData, navigate, sendDataData, onAuthButtonClick, formData],
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const isLoading = isLoginLoading || isTokenLoading;

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
            {isError && (
              <S.StyledError>
                Ошибка входа: {error?.data?.message || "Неверные данные"}
              </S.StyledError>
            )}
            <S.StyledLoginButton disabled={isLoading} type="submit">
              {isLoading ? "Вход..." : user ? "Выйти" : "Войти"}
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
