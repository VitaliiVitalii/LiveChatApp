import React from 'react';
import {Routes, Route} from 'react-router-dom';
import './App.css';
import MainPage from './components/MainPage/MainPage';
import SignUp from './components/Login/SignUp';
import SignIn from './components/Login/SingIn';
import './index.css';
import { ChatProvider } from "./context/Context.tsx";

const App: React.FC = () => {
/*   const [user, setUser] = useState<boolean>(false); */

  // Check for token in localStorage when the component mounts
/*   useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setUser(true);
    }
  }, []); */

  return (
    <div className='container'>
      <ChatProvider>
      <Routes>
        {/* Redirect to MainPage if user is authenticated, otherwise go to login */}
        <Route path="/" element={<MainPage />} 
        />
        {/* Login page */}
        <Route path="/login" element={<SignIn />} />
        {/* Registration page */}
        <Route path="/registration" element={<SignUp />} />
      </Routes>
      </ChatProvider>
    </div>

  );

};

export default App;
