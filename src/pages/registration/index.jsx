import * as S from "./styles";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registrationUser } from "../../store/trackSlice";

export const Registration = () => {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.storage);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    username: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    await dispatch(registrationUser(formData));
  };

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
            <S.StyledModalInput
              type="text"
              name="username"
              placeholder="Логин"
              value={formData.username}
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
            <S.StyledModalBtnSignupEnt
              type="submit"
              disabled={isLoading}
              onClick={handleSubmit}
            >
              {isLoading ? "Регистрация..." : "Зарегистрироваться"}
            </S.StyledModalBtnSignupEnt>
          </S.StyledModalFormLogin>
        </S.StyledModalBlock>
      </S.StyledContainerEnter>
    </S.StyledWrapper>
  );
};
