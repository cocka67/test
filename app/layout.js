import './globals.css'; 
import { Header } from './components/Header/Header'; 

export default function RootLayout({ children }) {
  return (
    <html lang="ru">
      <body>
         <Header />
        {children}
      </body>
    </html>
  );
}

