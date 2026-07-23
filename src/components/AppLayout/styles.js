import styled from 'styled-components';
import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  margin: 0;
  padding: 0;
  box-sizing: border-box;

  &:before, &:after { box-sizing: border-box; }

  @font-face {
    font-family: "StratosSkyeng";
    src: url("/fonts/StratosSkyeng.woff2") format("woff2"),
         url("/fonts/StratosSkyeng.woff") format("woff");
    font-weight: 400;
    font-style: normal;
  }

  html, body {
    width: 100%;
    height: 100%;
    font-family: "StratosSkyeng", sans-serif;
    color: #ffffff;
    background: #181818;
  }

  a, a:visited { text-decoration: none; cursor: pointer; }
  button { cursor: pointer; border: none; background: none; padding: 0; }
  ul li { list-style: none; }
`;

export const Wrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #181818;
`;

export const MainContent = styled.main`
  width: 100%;
  flex: 1;
  overflow-y: auto;
  margin: 0;
  padding: 0;
  padding-bottom: 80px; /* Отступ под плеер */
  box-sizing: border-box;
`;
