import React, { useState } from "react";

const listSingers = [
  "Michael Jackson",
  "Frank Sinatra",
  "Calvin Harris",
  "Zhu",
  "Arctic Monkeys",
  "Valeriy Leontev",
  "Alla Pugacheva",
];
const listYears = ["1990", "2000", "2010"];

const listGenre = ["Рок", "Хип-хоп", "Поп-музыка", "Техно", "Инди"];
export function SearchByMenu() {
  // Состояние для хранения выбранного фильтра
  const [activeFilter, setActiveFilter] = useState(null);

  // Обработчик клика по фильтру
  const handleFilterClick = (item) => {
    if (item === activeFilter) {
      setActiveFilter(null);
    } else {
      setActiveFilter(item);
    }
  };
  return (
    <div className="centerblock__filter filter">
      <div className="filter__title">Искать по:</div>
      <div className="search-by-category">
        {activeFilter === 1 ? (
          <div className="search-by-items_list">
            {listSingers.map((singer, index) => (
              <div key={index} className="search-by-item">
                {singer}
              </div>
            ))}
          </div>
        ) : (
          ""
        )}
      </div>
      <div
        onClick={() => handleFilterClick(1)}
        className="filter__button button-author _btn-text"
      >
        исполнителю
      </div>
      <div className="search-by-category">
        {activeFilter === 2 ? (
          <div className="search-by-items_list">
            {listYears.map((year, index) => (
              <div key={year} className="search-by-item">
                {year}
              </div>
            ))}
          </div>
        ) : (
          ""
        )}
      </div>
      <div
        onClick={() => handleFilterClick(2)}
        className="filter__button button-year _btn-text"
      >
        году выпуска
      </div>
      <div className="search-by-category">
        {activeFilter === 3 ? (
          <div className="search-by-items_list">
            {listGenre.map((genre, index) => (
              <div key={index} className="search-by-item">
                {genre}
              </div>
            ))}
          </div>
        ) : (
          ""
        )}
      </div>
      <div
        onClick={() => handleFilterClick(3)}
        className="filter__button button-genre _btn-text"
      >
        жанру
      </div>
    </div>
  );
}
