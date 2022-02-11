import 'bootstrap/dist/css/bootstrap.min.css';

import React from "react";
import { Route, Routes } from 'react-router-dom';

import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import NoMatch from './pages/NoMatch'

import Navbar from './components/Navbar';

function App() {

  return (
    <div>
      <Routes>
        <Route path='/' element={
          <div>
            <Navbar />
            <Dashboard />
          </div>
        } />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='*' element={<NoMatch />} />
      </Routes>
    </div>
  );
}

export default App;
