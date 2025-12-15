import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const StyledWrapper = styled.div`
  width: 100%;
  min-height: 100%;
  overflow: hidden;
`;

const StyledContainerEnter = styled.div`
  max-width: 100%;
  height: 100vh;
  margin: 0 auto;
  position: relative;
  background-color: rgba(0, 0, 0, 0.85);
`;

const StyledModalBlock = styled.div`
  position: absolute;
  z-index: 2;
  left: calc(50% - (366px / 2));
  top: calc(50% - (439px / 2));
  opacity: 1;
`;

const StyledModalFormLogin = styled.form`
  width: 366px;
  height: 439px;
  background-color: #ffffff;
  border-radius: 12px;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  padding-top: 43px;
  & input:first-child {
    margin-bottom: 30px;
  }
`;

const StyledModalLogo = styled.div`
  width: 140px;
  height: 21px;
  margin-bottom: 42px;
  background-color: transparent;
`;

const StyledModalLogoImg = styled.img`
  width: 140px;
  height: auto;
`;

const StyledModalInput = styled.input`
  width: 278px;
  border-top: none;
  border-left: none;
  border-right: none;
  border-bottom: 1px solid #d0cece;
  padding: 8px 1px;
  margin-right: 3px;
  margin-bottom: 30px;

  &::placeholder {
    font-style: normal;
    font-weight: 400;
    font-size: 18px;
    line-height: 24px;
    letter-spacing: -0.05px;
    color: #d0cece;
  }

  /* Для старых браузеров (опционально) */
  &::-webkit-input-placeholder {
    font-style: normal;
    font-weight: 400;
    font-size: 18px;
    line-height: 24px;
    letter-spacing: -0.05px;
    color: #d0cece;
  }

  &:-ms-input-placeholder {
    font-style: normal;
    font-weight: 400;
    font-size: 18px;
    line-height: 24px;
    letter-spacing: -0.05px;
    color: #d0cece;
  }
`;

const StyledLoginButton = styled.button`
  width: 278px;
  height: 52px;
  background-color: #580ea2;
  border-radius: 6px;
  margin-top: 60px;
  margin-bottom: 20px;
  border: none;

  display: flex;
  align-items: center;
  justify-content: center;

  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 24px;
  letter-spacing: -0.05px;
  color: #ffffff;

  & a {
    display: block;
    width: 100%;
    height: 100%;
    text-decoration: none;
    color: inherit;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &:hover {
    opacity: 0.9;
  }

  &:focus {
    outline: 2px solid #8e44ad;
    outline-offset: 2px;
  }
`;

const StyledLinkRegistration = styled(Link)`
  width: 278px;
  height: 52px;
  background-color: transparent;
  border: 1px solid #d0cece;
  border-radius: 6px;

  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 24px;
  letter-spacing: -0.05px;
  color: #000000;

  display: flex;
  align-items: center;
  justify-content: center;

  & a {
    display: block;
    width: 100%;
    height: 100%;
    text-decoration: none;
    color: inherit;

    display: flex;
    align-items: center;
    justify-content: center;
  }

  &:hover {
    background-color: rgba(0, 0, 0, 0.05);
  }

  &:focus {
    outline: 2px solid #8e44ad;
    outline-offset: 2px;
  }
`;

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
    <StyledWrapper>
      <StyledContainerEnter>
        <StyledModalBlock>
          <StyledModalFormLogin
            action="#"
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <Link to="/">
              <StyledModalLogo>
                <StyledModalLogoImg src="../img/logo_modal.png" alt="logo" />
              </StyledModalLogo>
            </Link>
            <StyledModalInput type="text" name="login" placeholder="Почта" />
            <StyledModalInput
              type="password"
              name="password"
              placeholder="Пароль"
            />
            <StyledLoginButton onClick={handleClick}>
              {user ? "Выйти" : "Войти"}
            </StyledLoginButton>
            <StyledLinkRegistration to="/registration">
              Зарегистрироваться
            </StyledLinkRegistration>
          </StyledModalFormLogin>
        </StyledModalBlock>
      </StyledContainerEnter>
    </StyledWrapper>
  );
};
