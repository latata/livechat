import React, { useState } from 'react';
import { validatePassword, validateEmail } from '../LoginValidatation';
import { EMAIL_INVALID, PASSWORD_INVALID, NETWORK_ERROR } from '../LoginMessages';
import {login} from '../LoginApi';

import './Login.scss';

function Login({ onSuccess }) {
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });
  const [errorMessages, setErrorMessages] = useState([]);

  const submit = async (event) => {
    event.preventDefault();
    const newErrorMessages = [];
    if (!validateEmail(credentials.email)) {
      newErrorMessages.push(EMAIL_INVALID)
    }

    if (!validatePassword(credentials.password)) {
      newErrorMessages.push(PASSWORD_INVALID)
    }

    setErrorMessages(newErrorMessages);

    if (!newErrorMessages.length) {
      try {
        const data = await login(credentials);

        if(data?.errors) {
          setErrorMessages(data.errors);
        } else
        onSuccess();
      } catch (e) {
        setErrorMessages([NETWORK_ERROR]);
      }
    }
  };

  return (
    <form method="POST" action="" className="login-form" onSubmit={submit}>
      <fieldset>
        <div className="login-form__input-wrapper">
          <label htmlFor="email" className="login-form__label">Email:</label>
          <input type="text" name="email" id="email" value={credentials.email}
                 className="login-form__input" onChange={({ target }) => {
            setCredentials({ ...credentials, email: target.value });
          }} />
        </div>
        <div className="login-form__input-wrapper">
          <label htmlFor="password" className="login-form__label">Password:</label>
          <input type="password" name="password" value={credentials.password} id="password"
                 className="login-form__input" onChange={({ target }) => {
            setCredentials({ ...credentials, password: target.value });
          }} />
        </div>
        <div className="login-form__input-wrapper">
          <label htmlFor="remember">
            <input type="checkbox" name="remember" id="remember" /> Remember me
          </label>
        </div>
        <div className="login-form__submit-wrapper">
          {errorMessages.map((errorMessage) => <div
            className="login-form__error-message"
            key={errorMessage}>{errorMessage}</div>)}
          <button type="submit"
                  className="login-form__submit">Login</button>
        </div>
      </fieldset>
    </form>
  );
}

export default Login;

