import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import React, { Fragment } from 'react';
import { Navbar } from './components/layouts/Navbar';
import { Landing } from './components/layouts/Landing';
import { Register } from './components/auth/Register';
import { Login } from './components/auth/Login';
const App = () => (
  <Router>
    <Fragment>
      <Navbar />
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
      </Routes>
    </Fragment>
  </Router>
);

export default App;
