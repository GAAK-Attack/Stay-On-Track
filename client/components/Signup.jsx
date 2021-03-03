import React from 'react';

const Signup = () => {
  const handleSignup = (event) => {
    const firstName = document.querySelector('#firstName').value;
    const lastName = document.querySelector('#lastName').value;
    const username = document.querySelector('#usernameSignup').value;
    const password = document.querySelector('#passwordSignup').value;
    console.log('signin button clicked');
    fetch('/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        firstName,
        lastName,
        username,
        password,
      }),
    })
      .then((res) => {
        res.json();
        console.log({ res });
        // window.location.replace('http://localhost:8080/login');
      })
      .then(
        (result) => {},
        (error) => {
          console.log(error);
        }
      );
  };
  return (
    <div className="background">
      <div className="signup">
        <input id="firstName" type="text" placeholder="first name" />
        <input id="lastName" type="text" placeholder="last name" />
        <input id="usernameSignup" type="text" placeholder="username" />
        <input id="passwordSignup" type="password" placeholder="password" />
        <button id="signupButton" onClick={handleSignup}>
          SIGNUP
        </button>
      </div>
    </div>
  );
};
export default Signup;
