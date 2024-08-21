'use client';

import React, { useState, useEffect } from 'react';
import Styles from './SearchBar.module.css';

const SearchBar = ({ setSearchQuery, filters, setFilters }) => {
  const [inputValue, setInputValue] = useState('');
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setIsDarkTheme(savedTheme === "dark");
    }

    const handleThemeChange = () => {
      const theme = localStorage.getItem("theme");
      setIsDarkTheme(theme === "dark");
    };

    window.addEventListener("storage", handleThemeChange);
    return () => window.removeEventListener("storage", handleThemeChange);
  }, []);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSearch = () => {
    setSearchQuery(inputValue);
  };

  const removeFilter = (type, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [type]: prevFilters[type].filter((item) => item !== value),
    }));
  };

  const filterMapping = {
    Male: 'Мужчина',
    Female: 'Женщина',
    backend: 'Backend-разработчик',
    frontend: 'Frontend-разработчик',
    analyst: 'Аналитик',
    manager: 'Менеджер',
    designer: 'Дизайнер',
    CSharp: 'С#',
    react: 'React',
    word: 'Word',
    figma: 'Figma',
  };

  return (
    <div className={Styles['search-field-container']}>
      <input
        className={Styles['search-field']}
        type="text"
        placeholder="Поиск"
        value={inputValue}
        onChange={handleInputChange}
      />
      <section className={Styles['selected-filters']}>
        <section className={Styles['filters-conteiner']}>
          <section className={Styles['filter-items']}>
            <h3>Выбранные фильтры:</h3>
            <section className={Styles['filters']}>
              {Object.keys(filters).map((filterType) =>
                filters[filterType].map((filterValue) => (
                  <span key={filterValue} className={Styles['filter-item']}>
                    {filterMapping[filterValue] || filterValue}
                    <img
                      src={isDarkTheme ? "/images/cancel-dark.svg" : "/images/cancel.svg"} // Меняем изображение в зависимости от темы
                      alt="Удалить фильтр"
                      className={Styles['filter-remove']}
                      onClick={() => removeFilter(filterType, filterValue)}
                    />
                  </span>
                ))
              )}
            </section>
          </section>
          <button className={Styles['button']} onClick={handleSearch}>Найти</button>
        </section>
      </section>
    </div>
  );
};

export default SearchBar;
