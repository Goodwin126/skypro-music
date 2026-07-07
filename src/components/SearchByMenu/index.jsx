import React, { useState } from 'react';
import * as S from './styles';

const listTimes = ['По умолчанию', 'Сначала новые', 'Сначала старые'];

const listGenre = [
  { name: 'Рок', value: 'Рок музыка' },
  { name: 'Классика', value: 'Классическая музыка' },
  { name: 'Поп-музыка', value: 'Pop' },
  { name: 'Техно', value: 'Электронная музыка' },
  { name: 'Инди', value: 'Indie' },
];

export default function SearchByMenu({
  setSelectedGenre = () => {},
  selectedGenre = [],
  setDirectionTime = () => {},
  directionTime = 1,
  AuthorsTracks = [],
  searchedByNames = [],
  setsearchedByNames = () => {},
}) {
  const [activeFilter, setActiveFilter] = useState(null);

  const handleFilterClick = (item) => {
    if (item === activeFilter) {
      setActiveFilter(null);
    } else {
      setActiveFilter(item);
    }
  };

  // --- Фильтр по Жанру ---
  const handleFilterClickGenre = (genre) => {
    const isGenreSelected = selectedGenre.some(
      (selected) => selected.value === genre.value
    );

    if (isGenreSelected) {
      const updatedGenres = selectedGenre.filter(
        (selected) => selected.value !== genre.value
      );
      setSelectedGenre(updatedGenres);
    } else {
      setSelectedGenre([...selectedGenre, genre]);
    }

    setActiveFilter(null);
  };

  // --- Фильтр по времени ---
  const handleFilterClickTime = (sortingTime) => {
    switch (sortingTime) {
      case 'По умолчанию':
        setDirectionTime(1);
        break;
      case 'Сначала новые':
        setDirectionTime(2);
        break;
      case 'Сначала старые':
        setDirectionTime(3);
        break;
      default:
        console.warn('Неизвестный вариант сортировки:', sortingTime);
    }
    setActiveFilter(null);
  };

  // --- По исполнителю ---
  const handleFilterClickBySinger = (singer) => {
    const isSelected = searchedByNames.includes(singer);

    setsearchedByNames((prevNames) => {
      if (isSelected) {
        // Если уже выбран - убираем
        return prevNames.filter((name) => name !== singer);
      }
      // Если не выбран - добавляем
      return [...prevNames, singer];
    });

    setActiveFilter(null);
  };

  return (
    <S.StyledCenterblockFilter>
      <S.StyledFilterTitle>Искать по:</S.StyledFilterTitle>

      {/* --- БЛОК ИСПОЛНИТЕЛЕЙ --- */}
      <S.StyledSearchByCategory>
        {activeFilter === 1 && (
          <S.StyledSearchByItemsList data-testid="singers-list">
            {AuthorsTracks.map((singer, index) => (
              <S.StyledSearchByItem
                key={index}
                onClick={(e) => {
                  handleFilterClickBySinger(singer, e);
                }}
                $isActive={searchedByNames.includes(singer)}
              >
                {singer}
              </S.StyledSearchByItem>
            ))}
          </S.StyledSearchByItemsList>
        )}
      </S.StyledSearchByCategory>

      <S.StyledFilterButton
        onClick={() => handleFilterClick(1)}
        $isActive={searchedByNames.length > 0}
      >
        исполнителю
        {searchedByNames.length > 0 && (
          <S.StyledGenreCounter>{searchedByNames.length}</S.StyledGenreCounter>
        )}
      </S.StyledFilterButton>

      {/* --- БЛОК СОРТИРОВКИ --- */}
      <S.StyledSearchByCategory>
        {activeFilter === 2 && (
          <S.StyledSearchByItemsList data-testid="years-list">
            {listTimes.map((sortingTime, index) => {
              const currentIndex = index + 1;
              return (
                <S.StyledSearchByItem
                  key={sortingTime}
                  onClick={(e) => {
                    handleFilterClickTime(sortingTime, e);
                  }}
                  $isActive={directionTime === currentIndex}
                >
                  {sortingTime}
                </S.StyledSearchByItem>
              );
            })}
          </S.StyledSearchByItemsList>
        )}
      </S.StyledSearchByCategory>

      <S.StyledFilterButton
        onClick={() => handleFilterClick(2)}
        $isActive={directionTime !== 1}
      >
        году выпуска
      </S.StyledFilterButton>

      {/* --- БЛОК ЖАНРОВ --- */}
      <S.StyledSearchByCategory>
        {activeFilter === 3 && (
          <S.StyledSearchByItemsList data-testid="genre-list">
            {listGenre.map((genre, index) => (
              <S.StyledSearchByItem
                key={index}
                onClick={(e) => handleFilterClickGenre(genre, e)}
                $isActive={selectedGenre.some(
                  (selected) => selected.value === genre.value
                )}
              >
                {genre.name}
              </S.StyledSearchByItem>
            ))}
          </S.StyledSearchByItemsList>
        )}
      </S.StyledSearchByCategory>

      <S.StyledFilterButton
        onClick={() => handleFilterClick(3)}
        $isActive={selectedGenre.length > 0}
      >
        жанру
        {selectedGenre.length > 0 && (
          <S.StyledGenreCounter>{selectedGenre.length}</S.StyledGenreCounter>
        )}
      </S.StyledFilterButton>
    </S.StyledCenterblockFilter>
  );
}
