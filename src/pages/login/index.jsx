import * as S from "./stysle";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export const Login = ({ user, onAuthButtonClick }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    onAuthButtonClick();

    if (user) {
      navigate("/login");
    } else {
      navigate("/");
    }
  };

  return (
    <S.StyledWrapper>
      <S.StyledContainerEnter>
        <S.StyledModalBlock>
          <S.StyledModalFormLogin
            action="#"
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <Link to="/">
              <S.StyledModalLogo>
                <S.StyledModalLogoImg src="../img/logo_modal.png" alt="logo" />
              </S.StyledModalLogo>
            </Link>
            <S.StyledModalInput type="text" name="login" placeholder="Почта" />
            <S.StyledModalInput
              type="password"
              name="password"
              placeholder="Пароль"
            />
            <S.StyledLoginButton onClick={handleClick}>
              {user ? "Выйти" : "Войти"}
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
