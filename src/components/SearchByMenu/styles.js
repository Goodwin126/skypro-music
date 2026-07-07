import styled from 'styled-components';

export const StyledCenterblockFilter = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 51px;
`;

export const StyledFilterTitle = styled.div`
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  margin-right: 15px;
`;

export const StyledSearchByCategory = styled.div`
  position: relative;
`;

export const StyledSearchByItemsList = styled.div`
  width: auto;
  position: absolute;
  transform: translateY(20px);
  border-radius: 12px;
  gap: 10px;
  margin-top: 10px;
  background-color: rgba(49, 49, 49, 1);
  max-height: 305px;
  overflow-y: auto;
  border: 34px solid rgba(49, 49, 49, 1);
  display: flex;
  gap: 16px;
  flex-direction: column;
`;

export const StyledSearchByItem = styled.div`
  padding-right: 10px;
  font-family: StratosSkyeng;
  font-weight: 400;
  font-style: Regular;
  font-size: 20px;
  line-height: 24px;
  color: rgba(255, 255, 255, 1);
  white-space: nowrap;
  cursor: pointer;

  &:hover {
    color: #d9b6ff;
    font-family: StratosSkyeng;
    font-weight: 400;
    font-style: Regular;
    font-size: 20px;
    line-height: 24px;
    text-decoration: underline;
    text-decoration-style: solid;
  }
  &:active {
    color: #ad61ff;
  }

  ${({ $isActive }) =>
    $isActive &&
    `
    color: #b672ff; /* Цвет активного жанра */
    text-decoration: none;
  `}
`;

export const StyledBtnText = styled.div`
  &:hover {
    border-color: #d9b6ff;
    color: #d9b6ff;
    cursor: pointer;

    &:active {
      border-color: #ad61ff;
      color: #ad61ff;
      cursor: pointer;
    }
  }
`;

export const StyledFilterButton = styled(StyledBtnText)`
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  border: 1px solid #ffffff;
  border-radius: 60px;
  padding: 6px 20px;
  position: relative; /* важно для позиционирования счётчика */

  &:not(:last-child) {
    margin-right: 10px;
  }

  ${({ $isActive }) =>
    $isActive &&
    `
    border-color: #b672ff;
    color: #b672ff;
  `}
`;

export const StyledGenreCounter = styled.div`
  position: absolute;
  top: -8px;
  right: -8px;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: #b672ff;
  color: white;
  font-size: 12px;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
`;
