import React, { useState } from "react";
import * as S from "./styles";

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

export default function SearchByMenu() {
  const [activeFilter, setActiveFilter] = useState(null);

  const handleFilterClick = (item) => {
    if (item === activeFilter) {
      setActiveFilter(null);
    } else {
      setActiveFilter(item);
    }
  };

  return (
    <S.StyledCenterblockFilter>
      <S.StyledFilterTitle>Искать по:</S.StyledFilterTitle>
      <S.StyledSearchByCategory>
        {activeFilter === 1 && (
          <S.StyledSearchByItemsList data-testid="singers-list">
            {listSingers.map((singer, index) => (
              <S.StyledSearchByItem key={index}>{singer}</S.StyledSearchByItem>
            ))}
          </S.StyledSearchByItemsList>
        )}
      </S.StyledSearchByCategory>
      <S.StyledFilterButton onClick={() => handleFilterClick(1)}>
        исполнителю
      </S.StyledFilterButton>
      <S.StyledSearchByCategory>
        {activeFilter === 2 && (
          <S.StyledSearchByItemsList data-testid="years-list">
            {listYears.map((year, index) => (
              <S.StyledSearchByItem key={year}>{year}</S.StyledSearchByItem>
            ))}
          </S.StyledSearchByItemsList>
        )}
      </S.StyledSearchByCategory>
      <S.StyledFilterButton onClick={() => handleFilterClick(2)}>
        году выпуска
      </S.StyledFilterButton>
      <S.StyledSearchByCategory>
        {activeFilter === 3 && (
          <S.StyledSearchByItemsList data-testid="genre-list">
            {listGenre.map((genre, index) => (
              <S.StyledSearchByItem key={index}>{genre}</S.StyledSearchByItem>
            ))}
          </S.StyledSearchByItemsList>
        )}
      </S.StyledSearchByCategory>
      <S.StyledFilterButton onClick={() => handleFilterClick(3)}>
        жанру
      </S.StyledFilterButton>
    </S.StyledCenterblockFilter>
  );
}
