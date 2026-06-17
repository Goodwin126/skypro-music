import React, { useState } from "react";
import * as S from "./styles";

const listTimes = ["По умолчанию", "Сначала новые", "Сначала старые"];

const listGenre = [
  { name: "Рок", value: "Rock" },
  { name: "Хип-хоп", value: "Hip-hop" },
  { name: "Поп-музыка", value: "Pop" },
  { name: "Техно", value: "Techno" },
  { name: "Инди", value: "Indie" },
];

export default function SearchByMenu({
  setSelectedGenre,
  selectedGenre,
  setDirectionTime,
  AuthorsTracks,
  setSearchByName,
}) {
  const [activeFilter, setActiveFilter] = useState(null);

  const handleFilterClick = (item) => {
    if (item === activeFilter) {
      setActiveFilter(null);
    } else {
      setActiveFilter(item);
    }
  };

  const handleFilterClickGenre = (genre, e) => {
    e.stopPropagation();

    // Проверяем, есть ли жанр в массиве
    const isGenreSelected = selectedGenre.some(
      (selected) => selected.value === genre.value,
    );

    if (isGenreSelected) {
      // Удаляем жанр из массива
      const updatedGenres = selectedGenre.filter(
        (selected) => selected.value !== genre.value,
      );
      setSelectedGenre(updatedGenres);
    } else {
      // Добавляем жанр в массив
      setSelectedGenre([...selectedGenre, genre]);
    }

    setActiveFilter(null);
  };

  const handleFilterClickTime = (sortingTime, e) => {
    switch (sortingTime) {
      case "По умолчанию":
        setDirectionTime(1);
        setActiveFilter(null);
        break;
      case "Сначала новые":
        setDirectionTime(2);
        setActiveFilter(null);
        break;
      case "Сначала старые":
        setDirectionTime(3);
        setActiveFilter(null);
        break;
      default:
        console.warn("Неизвестный вариант сортировки:", sortingTime);
        setActiveFilter(null);
    }
  };

  const handleFilterClickBySinger = (Singer, e) => {
    setSearchByName(Singer);
    setActiveFilter(null);
  };

  return (
    <S.StyledCenterblockFilter>
      <S.StyledFilterTitle>Искать по:</S.StyledFilterTitle>
      <S.StyledSearchByCategory>
        {activeFilter === 1 && (
          <S.StyledSearchByItemsList data-testid="singers-list">
            {AuthorsTracks.map((singer, index) => (
              <S.StyledSearchByItem
                key={index}
                onClick={(e) => {
                  handleFilterClickBySinger(singer, e);
                }}
              >
                {singer}
              </S.StyledSearchByItem>
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
            {listTimes.map((sortingTime, index) => (
              <S.StyledSearchByItem
                key={sortingTime}
                onClick={(e) => {
                  handleFilterClickTime(sortingTime, e);
                }}
              >
                {sortingTime}
              </S.StyledSearchByItem>
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
              <S.StyledSearchByItem
                key={index}
                onClick={(e) => handleFilterClickGenre(genre, e)}
                $isActive={selectedGenre?.value === genre.value} // подсветка активного жанра
              >
                {genre.name}
              </S.StyledSearchByItem>
            ))}
          </S.StyledSearchByItemsList>
        )}
      </S.StyledSearchByCategory>
      <S.StyledFilterButton onClick={() => handleFilterClick(3)}>
        жанру
        {selectedGenre.length > 0 && (
          <S.StyledGenreCounter>{selectedGenre.length}</S.StyledGenreCounter>
        )}
      </S.StyledFilterButton>
    </S.StyledCenterblockFilter>
  );
}
