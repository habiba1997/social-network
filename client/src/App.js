import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import React, { Fragment } from 'react';
import { Navbar } from './components/layouts/Navbar';
import { Landing } from './components/layouts/Landing';
import Register from './components/auth/Register';
import { Login } from './components/auth/Login';
import Alert from './components/layouts/Alert';

//Redux
import { Provider } from 'react-redux';
import store from './store';

const App = () => (
  <Provider store={store}>
    <Router>
      <Fragment>
        <Navbar />
        <section className='container'>
          <Alert />
          {/* switch can only have routes so we will put itt below navbar */}
          <Routes>
            <Route path='/' element={<Landing />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
          </Routes>
        </section>
      </Fragment>
    </Router>
  </Provider>
);

export default App;
