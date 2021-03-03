import React, { useState, useEffect } from 'react';
import Signup from './Signup.jsx';
import Login from './Login.jsx';
import Protected from './Protected.jsx';

const AuthContainer = () => {
  const [loggedIn, switchLoggedIn] = useState(true);
  const [toggle, switchToggle] = useState(false);

  return (
    <div>
      {loggedIn ? (
        <Protected />
      ) : toggle ? (
        <Login />
      ) : (
        <Signup switchLoggedIn={switchLoggedIn} />
      )}
    </div>
  );
};

export default AuthContainer;
