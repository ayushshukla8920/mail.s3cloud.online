import React from 'react';
import { Route, Routes } from 'react-router-dom';
import HomePage from './Pages/HomePage';
import LoginSignup from './Pages/LoginSignup';
import ProtectedRoute from './lib/Auth';

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<ProtectedRoute><HomePage/></ProtectedRoute>} />
      <Route path='/auth' element={<LoginSignup/>} />
    </Routes>
  )
}

export default App
