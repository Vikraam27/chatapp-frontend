/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import ChatAPI from '../api';
import '../css/SignUp.css';

const SignUp = () => {
  const [fullname, setFullName] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [message, setMessage] = useState('');

  const history = useHistory();

  const clearMessage = () => {
    setMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !password || !fullname) {
      setMessage('Username and Password required');
    } else if (username && password) {
      const response = await ChatAPI.Signup({ fullname, password, username });

      if (response.status === 'success') {
        history.push({
          pathname: '/signin',
          state: response.message,
        });
      }

      if (response.status === 'fail') {
        setMessage(response.message);

        setUsername('');
        setPassword('');
        setFullName('');
      }
    }
  };

  return (
    (
      <div className="align">
        <div className="grid align__item">
          <div className="register">
            <img className="site__logo" src="/icon/whatsapp.png" alt="logo" />
            <h2>Sign Up</h2>
            {message ? (
              <p className={`note ${message === 'successfully registered user' ? 'success' : 'fail'}`}>
                {message}
                <IconButton onClick={clearMessage}><CloseIcon /></IconButton>
              </p>
            ) : null}
            <form className="form">
              <div className="form__field">
                <input type="text" id="fullname" placeholder="Full name" value={fullname} onChange={(e) => setFullName(e.target.value)} required />
              </div>
              <div className="form__field">
                <input type="text" placeholder="username" value={username} onChange={(e) => setUsername(e.target.value)} required />
              </div>
              <div className="form__field">
                <input type="password" autoComplete="on" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
              </div>
              <div className="form__field">
                <input type="submit" value="Sign Up" onClick={handleSubmit} />
              </div>
            </form>
            <p>
              Already have an accout?
              {' '}
              <a href="/signin">Log in</a>
            </p>
          </div>
        </div>
      </div>
    )
  );
};

export default SignUp;
