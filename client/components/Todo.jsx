import React, { useState, useEffect } from 'react';

const fetchClick = () => {
  fetch(`/engagement`)
    .then((data) => data.json())
    .then((res) => {
      console.log('res.data.rows: ', res.data.rows);

      const entries = res.data.rows;
    })
    .catch((error) => console.log('error', error));
};

const Todo = () => {
  return (
    <div>
      <h1>Todo/Engagements</h1>
      <table className="todos">
        <tbody>
          <tr>
            <th>username</th>
            <th>method</th>
            <th>notes</th>
          </tr>
        </tbody>
      </table>
      <button onClick={fetchClick} type="submit">
        Fetch Engagements
      </button>
    </div>
  );
};

export default Todo;
