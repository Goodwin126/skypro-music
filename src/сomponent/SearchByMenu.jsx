import React, { useState } from "react";
import styled from "styled-components";

const StyledCenterblockFilter = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 51px;
`;

const StyledFilterTitle = styled.div`
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  margin-right: 15px;
`;

const StyledSearchByCategory = styled.div`
  position: relative;
`;

const StyledSearchByItemsList = styled.div`
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

const StyledSearchByItem = styled.div`
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
    color: rgba(182, 114, 255, 1);
    font-family: StratosSkyeng;
    font-weight: 400;
    font-style: Regular;
    font-size: 20px;
    line-height: 24px;
    text-decoration: underline;
    text-decoration-style: solid;
  }
`;

const StyledBtnText = styled.div`
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

const StyledFilterButton = styled(StyledBtnText)`
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  border: 1px solid #ffffff;
  border-radius: 60px;
  padding: 6px 20px;

  &:not(:last-child) {
    margin-right: 10px;
  }
`;

const listSingers = [
  "Michael Jackson",
  "Frank Sinatra",
  "Calvin Harris",
  "Zhu",
  "Arctic Monkeys",
  "Valeriy Leontev",
  "Alla Pugacheva",
  "Agata Kristy",
];

const listYears = ["1990", "2000", "2010"];

const listGenre = ["Рок", "Хип-хоп", "Поп-музыка", "Техно", "Инди"];

export function SearchByMenu() {
  const [activeFilter, setActiveFilter] = useState(null);

  const handleFilterClick = (item) => {
    if (item === activeFilter) {
      setActiveFilter(null);
    } else {
      setActiveFilter(item);
    }
  };

  return (
    <StyledCenterblockFilter>
      <StyledFilterTitle>Искать по:</StyledFilterTitle>
      <StyledSearchByCategory>
        {activeFilter === 1 && (
          <StyledSearchByItemsList>
            {listSingers.map((singer, index) => (
              <StyledSearchByItem key={index}>{singer}</StyledSearchByItem>
            ))}
          </StyledSearchByItemsList>
        )}
      </StyledSearchByCategory>
      <StyledFilterButton onClick={() => handleFilterClick(1)}>
        исполнителю
      </StyledFilterButton>
      <StyledSearchByCategory>
        {activeFilter === 2 && (
          <StyledSearchByItemsList>
            {listYears.map((year, index) => (
              <StyledSearchByItem key={year}>{year}</StyledSearchByItem>
            ))}
          </StyledSearchByItemsList>
        )}
      </StyledSearchByCategory>
      <StyledFilterButton onClick={() => handleFilterClick(2)}>
        году выпуска
      </StyledFilterButton>
      <StyledSearchByCategory>
        {activeFilter === 3 && (
          <StyledSearchByItemsList>
            {listGenre.map((genre, index) => (
              <StyledSearchByItem key={index}>{genre}</StyledSearchByItem>
            ))}
          </StyledSearchByItemsList>
        )}
      </StyledSearchByCategory>
      <StyledFilterButton onClick={() => handleFilterClick(3)}>
        жанру
      </StyledFilterButton>
    </StyledCenterblockFilter>
  );
}
