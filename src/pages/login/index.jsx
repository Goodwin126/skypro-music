import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const StyledWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  min-height: 100vh;
  background-color: #383838;
  text-align: center;
  padding: 20px;
  gap: 10px;
`;

const StyledTitle = styled.article`
  font-size: 32px;
`;

const StyledLoginButton = styled.button`
  border-radius: 10px;
  color: white;
  background-color: #666;
  padding: 12px 24px;
  border: none;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #888;
  }

  &:active {
    transform: scale(0.98);
  }
`;

const StyledLinkRegistration = styled(Link)`
  color: white;
`;

export const Login = ({ user, onAuthButtonClick }) => {
  const navigate = useNavigate(); // Хук для навигации

  const handleClick = () => {
    onAuthButtonClick(); // Вызываем родительскую функцию (вход/выход)

    // После выполнения onAuthButtonClick:
    if (user) {
      // Если пользователь был авторизован (нажали "Выйти"):
      navigate("/login"); // Остаёмся на /login
    } else {
      // Если не был авторизован (нажали "Войти"):
      navigate("/"); // Переходим на главную
    }
  };

  return (
    <StyledWrapper>
      <StyledTitle>Login</StyledTitle>
      <StyledLoginButton onClick={handleClick}>
        {user ? "Выйти" : "Войти"}
      </StyledLoginButton>
      <StyledLinkRegistration to="/registration">
        регистрация
      </StyledLinkRegistration>
    </StyledWrapper>
  );
};
