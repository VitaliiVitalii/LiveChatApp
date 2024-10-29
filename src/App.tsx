import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import MainPage from './components/MainPage/MainPage';
import SignUp from './components/login/SignUp';
import SignIn from './components/login/SignIn';

const App: React.FC = () => {
  const [user, setUser] = useState<boolean>(false);

  // Перевіряємо токен у localStorage при монтуванні компонента
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setUser(true);
    }
  }, []);

  return (
    <Router>
      <div className='container'>
        <Routes>
          {/* Якщо користувач авторизований, перенаправляємо його на MainPage */}
          <Route
            path="/"
            element={user ? <MainPage /> : <Navigate to="/login" replace />}
          />
          
          {/* Сторінка входу */}
          <Route path="/login" element={<SignIn />} />

          {/* Сторінка реєстрації */}
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
