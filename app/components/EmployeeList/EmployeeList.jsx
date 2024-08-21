'use client';

import Link from 'next/link';
import React, { useState, useEffect, useRef } from 'react';
import { getEmployees } from '../../services/employeeService';
import SearchBar from '../SearchBar/SearchBar';
import { usePathname } from "next/navigation";
import FilterDropdown from '../FilterDropdown/FilterDropdown';
import Styles from './EmployeeList.module.css';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [page, setPage] = useState(1);
  const [count] = useState(10);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    gender: [],
    position: [],
    stack: []
  });
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true); // Следим, есть ли еще данные для загрузки
  const observerRef = useRef(null); // Реф для наблюдателя

  // Сбрасываем страницу и состояние hasMore при изменении поиска или фильтров
  useEffect(() => {
    setPage(1);
    setHasMore(true);
    loadEmployees(true); // Загружаем первую страницу при изменении фильтров или поиска
  }, [searchQuery, filters]);

  useEffect(() => {
    if (!hasMore || isLoading) return; // Если больше нет данных или идет загрузка, выходим

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setPage((prevPage) => prevPage + 1); // Увеличиваем страницу
        }
      },
      { threshold: 1.0 }
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current);
      }
    };
  }, [hasMore, isLoading]);

  useEffect(() => {
    if (page > 1) {
      loadEmployees(false); // Загружаем следующие страницы
    }
  }, [page]);

  const loadEmployees = async (initialLoad = false) => {
    setIsLoading(true);
    try {
      const params = {
        Page: initialLoad ? 1 : page,
        Count: count,
        Name: searchQuery,
        Gender: filters.gender.length > 0 ? filters.gender.join(',') : undefined,
        Position: filters.position.length > 0 ? filters.position.join(',') : undefined,
        Stack: filters.stack.length > 0 ? filters.stack.join(',') : undefined
      };

      const data = await getEmployees(params);
      if (data.length === 0) {
        setHasMore(false); // Если данных больше нет, отключаем подгрузку
      } else {
        if (initialLoad) {
          setEmployees(data); // Заменяем данные на первой странице
        } else {
          setEmployees((prevEmployees) => [...prevEmployees, ...data]); // Добавляем данные к уже загруженным
        }
      }
    } catch (error) {
      console.error('Failed to load employees', error);
      setHasMore(false); // В случае ошибки, тоже отключаем подгрузку
    }
    setIsLoading(false);
  };

  return (
    <div className={Styles['employeeList']}>
      <div className={`${Styles["employeeList-container"]}`}>
        <div className={Styles['page_path']}>
          <div>Главная</div>
          <img
            src="/images/stroke.svg"
            alt="стрелка"
            className={Styles['page_path_img']}
          />
          <div>Список сотрудников</div>
        </div>
        <h2 className={Styles['list']}>Список сотрудников</h2>
        <FilterDropdown filters={filters} setFilters={setFilters} />
        <SearchBar setSearchQuery={setSearchQuery} filters={filters} setFilters={setFilters} />
        <table className={Styles['table']}>
          <thead className={Styles['table_head']}>
            <tr>
              <th>ФИО</th>
              <th>Должность</th>
              <th>Телефон</th>
              <th>Дата рождения</th>
            </tr>
          </thead>
          <tbody className={Styles['table_body']}>
            {employees.length > 0 ? (
              employees.map((employee) => (
                <tr key={employee.id}>
                  <td>
                    <Link href={`/employee/${employee.id}`}>
                      {employee.name}
                    </Link>
                  </td>
                  <td>{employee.position}</td>
                  <td>{employee.phone}</td>
                  <td>{employee.birthdate}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4">Сотрудники не найдены</td>
              </tr>
            )}
          </tbody>
        </table>
        {isLoading && <p>Загрузка...</p>}
        <div ref={observerRef} className={Styles['loading-trigger']}></div>
      </div>
    </div>
  );
};

export default EmployeeList;
