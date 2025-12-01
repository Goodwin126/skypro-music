import styled from "styled-components";

const StyledLoginButton = styled.button`
  border-radius: 10px;
  color: white;
  background-color: #666; /* Более контрастный серый */
  padding: 12px 24px; /* Увеличены отступы */
  border: none;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #888; /* Эффект при наведении */
  }

  &:active {
    transform: scale(0.98); /* Лёгкая анимация при нажатии */
  }
`;

export const NavBar = ({ user, onAuthButtonClick }) => {
  return (
    <StyledLoginButton onClick={onAuthButtonClick}>
      {user ? "Выйти" : "Войти"}
    </StyledLoginButton>
  );
};
