import React, { Component } from 'react';
import PropTypes from 'prop-types';

const AddContact = () => {
  // an object holding all inputs for a selected field (name, data type)
  // const [addContact, setAddContact] = useState({});

  // useEffect(() => {
  //   // const entries = Object.entries()
  // }, []);

  const handleAdd = (event) => {
    event.preventDefault();
    const first_name = document.querySelector('#first_name').value;
    const last_name = document.querySelector('#last_name').value;
    const company = document.querySelector('#company').value;
    const email = document.querySelector('#email').value;
    //// route is "/test/addContact"

    const data = { first_name, last_name, company, email };
    // data.column_name = event.target.form[1].value;
    // data.data_type = event.target.form.value;
    console.log({ data });
    fetch(`/test/addContact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res) {
          console.log('update is successful');
        } else {
          console.log('update NOT successful');
        }
      })
      .catch((err) => console.error(err));
  };
  return (
    //[first_name, last_name, company, email]

    <div className="addContact">
      <input id="first_name" type="text" placeholder="first name" />
      <input id="last_name" type="text" placeholder="last name" />
      <input id="company" type="text" placeholder="company" />
      <input id="email" type="text" placeholder="email" />
      <button id="signupButton" onClick={handleAdd}>
        Add Contact
      </button>
    </div>
  );
};

export default AddContact;
