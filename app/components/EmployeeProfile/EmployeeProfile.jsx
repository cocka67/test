'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { getEmployeeById } from '../../services/employeeService';
import Styles from './EmployeeProfile.module.css';

const EmployeeProfile = ({ id }) => {
  const [employeeData, setEmployeeData] = useState(null);
  const searchParams = useSearchParams();
  const path = searchParams.get('path');

  useEffect(() => {
    async function fetchData() {
      const data = await getEmployeeById(id);
      setEmployeeData(data);
    }
    fetchData();
  }, [id]);

  if (!employeeData) return <p>Сотрудник не найден</p>;

  return (
    <div className={Styles['employeeProfile']}>
      <div className={Styles['employeeProfile_container']}>
        <div className={Styles['page_path']}>
          <Link href="/" className={Styles['page_path_main']}>
            Главная
          </Link>
          <img
            src="/images/stroke.svg"
            alt="стрелка"
            className={`${Styles['image_gel']} && ${Styles['page_path_img']}`}
          />
          <Link href="/">
            Список сотрудников
          </Link>
          <img
            src="/images/stroke.svg"
            alt="стрелка"
            className={Styles['page_path_img']}
          />
          <span>{employeeData.name}</span>
        </div>
        <div className={Styles['profile']}>
          <div className={Styles['profile_container']}>
            <img
              className={Styles['profile_img']}
              src={employeeData.photo}
              alt={`${employeeData.name}'s photo`}
            />
            <div className={Styles['info']}>
              <h1>{employeeData.name}</h1>
              <p>{employeeData.position}</p>
              <div className={Styles['stack']}>
                {employeeData.stack.map((tech, index) => (
                  <section key={index}>{tech}</section>
                ))}
              </div>
            </div>
          </div>
          <span className={Styles['profile_line']}></span>
          <div className={Styles['profile_info']}>
            <h3>Основная информация</h3>
            <div className={Styles['profile_info_detail']}>
              <p>Контактный телефон: {employeeData.phone}</p>
              <p>Дата рождения: {employeeData.birthdate}</p>
              <p>Дата устройства: {employeeData.dateOfEmployment}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeProfile;
