import "./css/App.css";
import { Main } from "./сomponent/MainComponent";
import styled, { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  /* Сброс базовых стилей */
  margin: 0;
  padding: 0;
  box-sizing: border-box;

  &:before,
  &:after {
    box-sizing: border-box;
  }

  /* Подключение шрифта */
  @font-face {
    font-family: "StratosSkyeng";
    src: url("/fonts/StratosSkyeng.woff2") format("woff2"),
         url("/fonts/StratosSkyeng.woff") format("woff");
    font-weight: 400;
    font-style: normal;
  }

  /* Стили для html/body */
  html,
  body {
    width: 100%;
    height: 100%;
    font-family: "StratosSkyeng", sans-serif;
    color: #ffffff;
  }

  /* Общие стили для элементов */
  a,
  a:visited {
    text-decoration: none;
    font-family: "StratosSkyeng", sans-serif;
    cursor: pointer;
  }

  button {
    cursor: pointer;
    border: none; /* часто полезно убрать дефолтную рамку */
    background: none; /* убираем дефолтный фон */
    padding: 0; /* убираем дефолтные отступы */
  }

  ul li {
    list-style: none;
  }
`;

const StyledWrapper = styled.div`
  width: 100%;
  min-height: 100%;
  overflow: hidden;
  background-color: #383838;
`;

function App() {
  return (
    <>
      <GlobalStyle />
      <div className="App">
        <StyledWrapper>
          <Main />
        </StyledWrapper>
      </div>
    </>
  );
}
export default App;
