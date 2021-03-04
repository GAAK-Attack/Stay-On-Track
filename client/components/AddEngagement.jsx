import React, { Component } from 'react';

const AddEngagement = () => {
  const handleAddEngagement = (event) => {
    event.preventDefault();
    const username = document.querySelector('#username').value;
    const method = document.querySelector('#method').value;
    const notes = document.querySelector('#notes').value;
    //contact_id needs to be sent as well
    const data = { username, method, notes };

    fetch(`/test/addEngagement`, {
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
    <div className="addEngagement">
      {/* need to assess username, make it default, and unchangeable. or... */}
      <label for="username">Need this to be username</label>
      <input id="username" type="text" placeholder="username" />
      <input id="method" type="text" placeholder="method" />
      <input id="notes" type="text" placeholder="notes" />
      <button id="addEngagementButton" onClick={handleAddEngagement}>
        Add Engagement
      </button>
    </div>
  );
};

export default AddEngagement;
