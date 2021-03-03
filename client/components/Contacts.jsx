import React, { useState, useEffect } from 'react';

const Info = () => {
  const [info] = useState(0);
  useEffect(() => {
    fetch(`/api/contacts`)
      .then((data) => data.json())
      .then((res) => {
        // console.log('res.data.columns: ', res.data.rows)
        const headers = res.data.columns.map((header) => [
          header.column_name,
          header.data_type,
        ]);
        const entries = res.data.rows;

        // setActivePage();
        // setHeaders(headers);
        // setEntries(entries);
      })
      .catch((error) => console.log('error', error));
  }, []);
  return (
    <div>
      Looks like we made it
      <h1>The table-layout Property</h1>
      <table className="d">
        <tbody>
          <tr>
            <th>Name</th>
            <th>e-mail</th>
            <th>company</th>
            <th>initial contact</th>
            <th>next contact</th>
          </tr>
          <tr>
            <td>Alfreds Futterkiste</td>
            <td>Maria Anders</td>
            <td>Germany</td>
          </tr>
          <tr>
            <td>Island Trading</td>
            <td>Helen Bennett</td>
            <td>UK</td>
          </tr>
          <tr>
            <td>Magazzini Alimentari Riuniti</td>
            <td>Giovanni Rovelli</td>
            <td>Italy</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Info;
