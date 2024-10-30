import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import MainPage from './components/MainPage/MainPage';
import SignUp from './components/login/SignUp';
import SignIn from './components/login/SingIn'; // Fix import name here
import './index.css';

const App: React.FC = () => {
  const [user, setUser] = useState<boolean>(false);

  // Check for token in localStorage when the component mounts
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setUser(true);
    }
  }, []);

  return (
    <div className='container'>
      <Routes>
        {/* Redirect to MainPage if user is authenticated, otherwise go to login */}
        <Route
          path="/"
          element={user ? <MainPage /> : <Navigate to="/" replace />} 
        />
        
        {/* Login page */}
        <Route path="/login" element={<SignIn />} />

        {/* Registration page */}
        <Route path="/registration" element={<SignUp />} />
      </Routes>
    </div>
  );
};

export default App;
