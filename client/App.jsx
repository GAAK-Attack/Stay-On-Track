import React, { useEffect } from 'react';
import AuthContainer from './components/AuthContainer.jsx';
import Login from './components/Login.jsx';
import Signup from './components/Signup.jsx';
import Todo from './components/Todo.jsx';
import Table from './components/Table.jsx';
import Dashboard from './components/Dashboard.jsx';

import Info from './components/Contacts.jsx';

function App() {
  // useEffect(() => {

  // };

  return (
    <div className="mainContainer">
      <AuthContainer />
      <Todo />
      <Table />
      <Dashboard />
      <Info />
    </div>
  );
}

export default App;
