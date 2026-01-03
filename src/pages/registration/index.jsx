import styled from "styled-components";
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
  background-color: #FFFFFF;
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

&:margin-bottom: 30px;
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
  &::-ms-input-placeholder {
    font-style: normal;
    font-weight: 400;
    font-size: 18px;
    line-height: 24px;
    letter-spacing: -0.05px;
    color: #d0cece;
  }
  &::placeholder {
    font-style: normal;
    font-weight: 400;
    font-size: 18px;
    line-height: 24px;
    letter-spacing: -0.05px;
    color: #d0cece;
  }
`;

const StyledModalBtnSignupEnt = styled(Link)`
  width: 278px;
  height: 62px;
  background-color: #580ea2;
  border-radius: 6px;
  margin-left: 4px;
  border: none;
  margin-top: 30px;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  color: #ffffff;

  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 24px;
  letter-spacing: -0.05px;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
`;

export const Registration = () => {
  return (
    <StyledWrapper>
      <StyledContainerEnter>
        <StyledModalBlock>
          <StyledModalFormLogin>
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
            <StyledModalInput
              type="password"
              name="password"
              placeholder="Повторите пароль"
            />
            <StyledModalBtnSignupEnt to="/registration">
              Зарегистрироваться
            </StyledModalBtnSignupEnt>
          </StyledModalFormLogin>
        </StyledModalBlock>
      </StyledContainerEnter>
    </StyledWrapper>
  );
};
