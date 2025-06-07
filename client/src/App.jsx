import React from 'react';
import { Route, Routes } from 'react-router-dom';
import HomePage from './Pages/HomePage';
import LoginSignup from './Pages/LoginSignup';

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<HomePage/>} />
      <Route path='/auth' element={<LoginSignup/>} />
    </Routes>
  )
}

export default App
