import React, { createContext } from 'react';
import { io } from 'socket.io-client';
import { Route, Routes } from 'react-router-dom';
import ChartsPage from 'pages/ChartsPage';
import HomePage from 'pages/HomePage';

const socket = io('http://localhost:4000');
export const SocketContext = createContext(socket);

function App() {
  return (
    <SocketContext.Provider value={socket}>
      <div className=' w-full min-h-screen'>
        <div className='container mx-auto p-3 flex flex-col space-y-2 pt-20'>
          <Routes>
            <Route element={<HomePage />} path='/' index />
            <Route element={<ChartsPage />} path='/chart/:ticker' />
          </Routes>
        </div>
      </div>
    </SocketContext.Provider>
  );
}

export default App;
