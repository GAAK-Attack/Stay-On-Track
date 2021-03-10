import React, { useEffect } from 'react';
import AuthContainer from './components/AuthContainer.jsx';
import Login from './components/Login.jsx';
import Signup from './components/Signup.jsx';
import Todo from './components/Todo.jsx';
import Table from './components/Table.jsx';
import Dashboard from './components/Dashboard.jsx';
import AddContact from './components/AddContact.jsx';

import Contacts from './components/Contacts.jsx';
import AddEngagement from './components/AddEngagement.jsx';

function App() {
  // useEffect(() => {

  // };

  return (
    <div className="mainContainer">
      <AuthContainer />
      <Todo />
      <Table />
      <Dashboard />
      <Contacts />
      <AddContact />
      <AddEngagement />
    </div>
  );
}

export default App;
