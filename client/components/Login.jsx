import React from 'react';

const Login = () => {
  const loginner = () => {
    const username = document.querySelector('#loginUsername').value;
    const password = document.querySelector('#loginPassword').value;
    //// route is "/login"
    console.log({ username });
    console.log({ password });
    fetch('/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    })
      .then((res) => res.json())
      .then(
        (result) => {
          console.log('result: ', result);
          if (result !== undefined) {
            window.location.replace('http://localhost:3000/protected');
          }
        },
        (error) => {
          console.log(error);
        }
      );
  };

  return (
    <div className="login">
      <input id="loginUsername" type="text" placeholder="username" />
      <input id="loginPassword" type="password" placeholder="password" />
      <button id="loginButton" onClick={loginner}>
        LOGIN
      </button>
    </div>
  );
};
export default Login;
