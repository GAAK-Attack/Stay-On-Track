import React, { Component } from 'react';
import PropTypes from 'prop-types';

const Rows = (props) => {
  return (
    //testing layout
    <tr
      id={/*id from db */ 12}
      onClick={() => console.log(event.target.parentNode.id)}
    >
      <td>Gman</td>
      <td>DubDog</td>
      <td>FANG</td>
      <td>gman@gman.com</td>
    </tr>
  );
};
export default Rows;
