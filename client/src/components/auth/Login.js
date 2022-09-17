import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export const Login = () => {
 //use state variable scan be accessed from anywhere
 const [loginData, setLoginData] = useState({
  email: '',
  password: ''
});

const { email, password } = loginData;

// to be use on every field
const onChange = (e) =>
setLoginData({ ...loginData, [e.target.name]: e.target.value });

const onSubmit = async (e) => {
  e.preventDefault();
    const login = { email, password };
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        crossDomain: true,
      };
      const body = JSON.stringify(login);
      const res = await axios.post('/auth', body, config);
      console.log(res.data);
    } catch (e) {
      console.log(e.response.data);
    }
};


return (
  <section className='container'>
    <h1 className='large text-primary'>Sign Up</h1>
    <p className='lead'>
      <i className='fas fa-user'></i> Sign In to your account
    </p>
    <form className='form' onSubmit={(e) => onSubmit(e)}>
      <div className='form-group'>
        <input
          type='email'
          placeholder='Email Address'
          name='email'
          value={email}
          onChange={(e) => onChange(e)}
          required
        />
      </div>
      <div className='form-group'>
        <input
          type='password'
          placeholder='Password'
          name='password'
          minLength='6'
          value={password}
          onChange={(e) => onChange(e)}
        />
      </div>
      <input type='submit' className='btn btn-primary' />
    </form>
    <p className='my-1'>
      Don't have an account? <Link to='/register'>Sign Up</Link>
    </p>
  </section>
);
};
