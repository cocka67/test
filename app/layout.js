import './globals.css';  // Подключаем глобальные стили
import { Header } from './components/Header/Header'; // Импортируем Header

export default function RootLayout({ children }) {
  return (
    <html lang="ru">
      <body>
         <Header /> {/* Добавляем Header, чтобы он отображался на всех страницах */}
        {children}
      </body>
    </html>
  );
}

