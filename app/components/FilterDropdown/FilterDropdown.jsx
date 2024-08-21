'use client';

import React, { useState } from 'react';
import Styles from './FilterDropdown.module.css';

const FilterDropdown = ({ filters, setFilters }) => {
  const [isOpenPosition, setIsOpenPosition] = useState(false);
  const [isOpenGender, setIsOpenGender] = useState(false);
  const [isOpenStack, setIsOpenStack] = useState(false);

  const toggleDropdown = (type) => {
    if (type === 'position') {
      setIsOpenPosition(!isOpenPosition);
      setIsOpenGender(false);
      setIsOpenStack(false);
    } else if (type === 'gender') {
      setIsOpenGender(!isOpenGender);
      setIsOpenPosition(false);
      setIsOpenStack(false);
    } else if (type === 'stack') {
      setIsOpenStack(!isOpenStack);
      setIsOpenPosition(false);
      setIsOpenGender(false);
    }
  };

  const handleFilterChange = (type, value) => {
    setFilters((prevFilters) => {
      const isSelected = prevFilters[type].includes(value);
      const updatedFilter = isSelected
        ? prevFilters[type].filter((item) => item !== value)
        : [...prevFilters[type], value];

      return {
        ...prevFilters,
        [type]: updatedFilter
      };
    });
  };

  return (
    <div className={Styles['dropdown_conteiner']}>
        <h2>Список сотрудников</h2>
        <div className={Styles['dropdown_menu']}>
          <div className={Styles['dropdown']}>
            <div className={Styles['dropdown-btn']} onClick={() => toggleDropdown('position')}>
              <div className={`${isOpenPosition ? Styles['color-blue'] : ''}`}>Должность</div>
              <img
                src="/images/down.svg"
                alt="Открыть список"
                className={`${Styles['arrow']} ${isOpenPosition ? Styles['up'] : ''}`}
              />
            </div>
            {isOpenPosition && (
              <div className={Styles['dropdown-content']}>
                <label>
                  <input
                    className={Styles['checkbox-input']}
                    type="checkbox"
                    name="position"
                    value="backend"
                    onChange={(e) => handleFilterChange('position', e.target.value)}
                    checked={filters.position.includes('backend')}
                  />
                  Backend-разработчик
                </label>
                <label>
                  <input
                    className={Styles['checkbox-input']}
                    type="checkbox"
                    name="position"
                    value="frontend"
                    onChange={(e) => handleFilterChange('position', e.target.value)}
                    checked={filters.position.includes('frontend')}
                  />
                  Frontend-разработчик
                </label>
                <label>
                  <input
                    className={Styles['checkbox-input']}
                    type="checkbox"
                    name="position"
                    value="analyst"
                    onChange={(e) => handleFilterChange('position', e.target.value)}
                    checked={filters.position.includes('analyst')}
                  />
                  Аналитик
                </label>
                <label>
                  <input
                    className={Styles['checkbox-input']}
                    type="checkbox"
                    name="position"
                    value="manager"
                    onChange={(e) => handleFilterChange('position', e.target.value)}
                    checked={filters.position.includes('manager')}
                  />
                  Менеджер
                </label>
                <label>
                  <input
                    className={Styles['checkbox-input']}
                    type="checkbox"
                    name="position"
                    value="designer"
                    onChange={(e) => handleFilterChange('position', e.target.value)}
                    checked={filters.position.includes('designer')}
                  />
                  Дизайнер
                </label>
              </div>
            )}
          </div>

          <div className={Styles['dropdown']}>
            <div className={Styles['dropdown-btn']} onClick={() => toggleDropdown('gender')}>
              <div className={`${isOpenGender ? Styles['color-blue'] : ''}`}>Пол</div>
              <img
                src="/images/down.svg"
                alt="Открыть список"
                className={`${Styles['arrow']} ${isOpenGender ? Styles['up2'] : ''}`}
              />
            </div>
            {isOpenGender && (
              <div className={Styles['dropdown-content']}>
                <label>
                  <input
                    className={Styles['checkbox-input']}
                    type="checkbox"
                    name="gender"
                    value="Male"
                    onChange={(e) => handleFilterChange('gender', e.target.value)}
                    checked={filters.gender.includes('Male')}
                  />
                  Мужчина
                </label>
                <label>
                  <input
                    className={Styles['checkbox-input']}
                    type="checkbox"
                    name="gender"
                    value="Female"
                    onChange={(e) => handleFilterChange('gender', e.target.value)}
                    checked={filters.gender.includes('Female')}
                  />
                  Женщина
                </label>
              </div>
            )}
          </div>

          <div className={Styles['dropdown']}>
            <div className={Styles['dropdown-btn']} onClick={() => toggleDropdown('stack')}>
              <div className={`${isOpenStack ? Styles['color-blue'] : ''}`}>Стек технологий</div>
              <img
                src="/images/down.svg"
                alt="Открыть список"
                className={`${Styles['arrow']} ${isOpenStack ? Styles['up3'] : ''}`}
              />
            </div>
            {isOpenStack && (
              <div className={Styles['dropdown-content']}>
                <label>
                  <input
                    className={Styles['checkbox-input']}
                    type="checkbox"
                    name="stack"
                    value="CSharp"
                    onChange={(e) => handleFilterChange('stack', e.target.value)}
                    checked={filters.stack.includes('CSharp')}
                  />
                  CSharp
                </label>
                <label>
                  <input
                    className={Styles['checkbox-input']}
                    type="checkbox"
                    name="stack"
                    value="react"
                    onChange={(e) => handleFilterChange('stack', e.target.value)}
                    checked={filters.stack.includes('react')}
                  />
                  React
                </label>
                <label>
                  <input
                    className={Styles['checkbox-input']}
                    type="checkbox"
                    name="stack"
                    value="Java"
                    onChange={(e) => handleFilterChange('stack', e.target.value)}
                    checked={filters.stack.includes('Java')}
                  />
                  Java
                </label>
                <label>
                  <input
                    className={Styles['checkbox-input']}
                    type="checkbox"
                    name="stack"
                    value="PHP"
                    onChange={(e) => handleFilterChange('stack', e.target.value)}
                    checked={filters.stack.includes('PHP')}
                  />
                  PHP
                </label>
                <label>
                  <input
                    className={Styles['checkbox-input']}
                    type="checkbox"
                    name="stack"
                    value="figma"
                    onChange={(e) => handleFilterChange('stack', e.target.value)}
                    checked={filters.stack.includes('figma')}
                  />
                  Figma
                </label>
                <label>
                  <input
                    className={Styles['checkbox-input']}
                    type="checkbox"
                    name="stack"
                    value="word"
                    onChange={(e) => handleFilterChange('stack', e.target.value)}
                    checked={filters.stack.includes('word')}
                  />
                  Word
                </label>
              </div>
            )}
          </div>
        </div>
    </div>
  );
};

export default FilterDropdown;


