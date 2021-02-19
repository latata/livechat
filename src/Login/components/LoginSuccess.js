import React from 'react';

import './LoginSuccess.scss';

export default function LoginSuccess({ onLogout }) {
  return (
    <div className="login-success">
      You are logged in.
      <button onClick={onLogout} type="button" className="login-success__logout">Logout</button>
    </div>
  );
}
