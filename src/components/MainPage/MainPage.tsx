import React from 'react';
import Sidebar from './Saidbar/Sidebar';
import Chat from './Chat/Chat';
import Detail from './Detail/Detail';

const MainPage = () => {
  return (
    <div className='container'>
      <Sidebar />
      <Chat />
      <Detail />
    </div>
  );
};

export default MainPage;