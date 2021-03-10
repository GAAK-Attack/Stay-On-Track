import React, { useState, useEffect } from 'react';
import Rows from './Rows.jsx';

const fetchClick = () => {
  fetch(`/contact`)
    .then((data) => data.json())
    .then((res) => {
      console.log('res.data.columns: ', res.data.rows);
      // const headers = res.data.columns.map((header) => [
      // ]);
      const entries = res.data.rows;
    })
    .catch((error) => console.log('error', error));
};

const Contacts = () => {
  return (
    <div>
      Looks like we made it
      <h1>The table-layout Property</h1>
      <table className="d">
        <tbody>
          <tr>
            <th>first name</th>
            <th>last name</th>
            <th>e-mail</th>
            <th>company</th>
            <th>initial contact</th>
            <th>next contact</th>
          </tr>
          <Rows />
        </tbody>
      </table>
      <button onClick={fetchClick} type="submit">
        Fetch Contacts
      </button>
    </div>
  );
};

export default Contacts;
