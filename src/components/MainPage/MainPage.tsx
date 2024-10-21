import {useEffect, useState} from "react";
import axios from "axios";
import Sidebar from './Saidbar/Sidebar';
import Chat from './Chat/Chat';
import Detail from './Detail/Detail';

const MainPage = () => {
  const [message, setMessage] = useState('');
    useEffect(() => {
      if(localStorage.getItem('access_token') === null){                   
          window.location.href = '/login'
      }
      else{
        (async () => {
          try {
            const {data} = await axios.get(   
                          'http://localhost:8000/home/', {
                            headers: {
                              'Content-Type': 'application/json'
                            }}
                          );
            setMessage(data.message);
        } catch (e) {
          console.log('not auth', e)
        }
        })()};
    }, []);
  return (
    <div className='container'>
      <Sidebar />
      <Chat />
      <Detail />
      <div className="form-signin mt-5 text-center">
        <h3>Hi {message}</h3>
      </div>
    </div>
  );
};

export default MainPage;