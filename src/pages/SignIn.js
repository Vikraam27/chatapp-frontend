/* eslint-disable react/prop-types */
import { IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import ChatAPI from '../api';
import '../css/SignUp.css';
import Cookies from '../helpers/CookiesHelper';

const SignInPage = () => {
  const history = useHistory();

  const [message, setMessage] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const clearMessage = () => {
    setMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      setMessage('Username and Password required');
    } else if (username && password) {
      const response = await ChatAPI.Signin({ username, password });

      if (response.status === 'success') {
        setMessage(response.message);

        const { accessToken, refreshToken } = response.data;
        Cookies.setCookiesAccessToken('accessToken', accessToken);
        Cookies.setCookiesRefreshToken('refreshToken', refreshToken);

        history.push('/');
      }

      if (response.status === 'fail') {
        setMessage(response.message);

        setUsername('');
        setPassword('');
      }
    }
  };

  useEffect(() => {
    if (history.location.state) {
      setMessage(history.location.state);
    }
  }, []);
  return (
    <div className="align">
      <div className="grid align__item">
        <div className="register login">
          <img className="site__logo" src="/icon/whatsapp.png" alt="logo" />
          <h2>Sign In</h2>
          {message ? (
            <p className={`note ${message === 'successfully registered user' ? 'success' : 'fail'}`}>
              {message}
              <IconButton onClick={clearMessage}><CloseIcon /></IconButton>
            </p>
          ) : null}
          <form className="form">
            <div className="form__field">
              <input type="text" placeholder="username" value={username} onChange={(e) => setUsername(e.target.value)} required />
            </div>
            <div className="form__field">
              <input type="password" autoComplete="on" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <div className="form__field">
              <input type="submit" value="Sign In" onClick={handleSubmit} />
            </div>
          </form>
          <p>
            Don&apos;t have an accout?
            {' '}
            <a href="/signup">Sign Up</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
