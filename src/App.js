import React, { useState } from "react";
import Login from "./Login/components/Login";
import LoginSuccess from "./Login/components/LoginSuccess";

export const LOGGED_IN_KEY = "loggedIn";

function App() {
  const [loggedIn, setLoggedIn] = useState(
    !!localStorage.getItem(LOGGED_IN_KEY)
  );

  return !loggedIn ? (
    <Login
      onSuccess={() => {
        localStorage.setItem(LOGGED_IN_KEY, "1");
        setLoggedIn(true);
      }}
    />
  ) : (
    <LoginSuccess
      onLogout={() => {
        localStorage.removeItem(LOGGED_IN_KEY);
        setLoggedIn(false);
      }}
    />
  );
}

export default App;
