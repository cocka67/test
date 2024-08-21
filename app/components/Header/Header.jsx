"use client";

import { useState, useEffect } from "react";
import Styles from "./Header.module.css";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const Header = () => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  const pathname = usePathname();

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setIsDarkTheme(savedTheme === "dark");
      document.body.classList.toggle("dark-theme", savedTheme === "dark");
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDarkTheme ? "dark" : "light";
    setIsDarkTheme(!isDarkTheme);
    document.body.classList.toggle("dark-theme", !isDarkTheme);
    localStorage.setItem("theme", newTheme);

    // Триггерим событие для изменения изображений в других компонентах
    window.dispatchEvent(new Event("storage"));
  };

  return (
    <header className={Styles["header"]}>
      <div className={`"container" && ${Styles["header-container"]}`}>
        {pathname === "/" ? (
          <div className={Styles["logo"]}>
            <img
              className={Styles["logo__image"]}
              src="/images/logo.svg"
              alt="Логотип"
            />
          </div>
        ) : (
          <Link href="/" className={Styles["logo"]}>
            <img
              className={Styles["logo__image"]}
              src="/images/logo.svg"
              alt="Логотип"
            />
          </Link>
        )}
        <nav className={Styles["menu"]}>
          <ul className={Styles["menu_list"]}>
            <li className={Styles["menu_item"]}>
              <div className={`${Styles["menu_link"]}`}>+7 343 290 84 76</div>
            </li>
            <li className={Styles["menu_item"]}>
              <div className={`${Styles["menu_link"]}`}>info@66bit.ru</div>
            </li>
            <label id="switch" className={Styles["switch"]}>
              <input
                type="checkbox"
                id="slider"
                checked={isDarkTheme}
                onChange={toggleTheme}
              />
              <div className={`${Styles["slider"]} && ${Styles["round"]}`}></div>
            </label>
          </ul>
        </nav>
      </div>
    </header>
  );
};

