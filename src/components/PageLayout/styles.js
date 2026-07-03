import styled from "styled-components";

export const StyledContainer = styled.div`
  max-width: 1920px;
  height: 100%; /* Высота на 100% от родителя (который теперь имеет скролл) */
  margin: 0 auto;
  position: relative;
  background-color: #181818;
  display: flex; /* Важно для выравнивания сайдбара/меню */
  flex-direction: column;
  width: 100%;
`;

export const StyledMain = styled.main`
  flex: 1 1 auto;
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  overflow: hidden; /* Скрываем лишнее внутри основной области */
`;
