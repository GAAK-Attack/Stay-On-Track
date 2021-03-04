// allows use of express
const express = require('express');
// used for setting up absolute paths
const path = require('path');

// sets app to express invoked
// the port app will be listening on
const app = express();
const PORT = 3000;

// allows use of methods on the authController object in authController.js
const authController = require('./controllers/authController.js');
const sotController = require('./controllers/sotController.js');

// allows app to read .json
app.use(express.json());

app.get('/', (req, res, next) =>
  res.status(200).sendFile(path.resolve(__dirname, '../client/index.html'))
);
// when build is requested, respond with build file
// app.use('/build', express.static(path.resolve(__dirname, '../build')));
// make client folder available for use within the app
// app.use(express.static(path.resolve(__dirname, '../client')));

if (process.env.NODE_ENV === 'production') {
  // allows build to populate properly when called in index.html
  app.get('/build/bundle.js', (req, res) => {
    console.log(path.join(__dirname, '../build/bundle.js'));
    res.status(200).sendFile(path.join(__dirname, '../build/bundle.js'));
  });
  // homepage, will fire index.html, which calls App.jsx
  app.get('/', (req, res) => {
    res.status(200).sendFile(path.join(__dirname, '../index.html'));
  });
}

app.get('/', (req, res, next) => {
  return res
    .status(200)
    .sendFile(path.resolve(__dirname, '../client/index.html'));
});

// handles routes to login, fires authController.login; if authentication is successful, allow access to protected file
app.post('/login', authController.login, (req, res, next) => {
  return res
    .status(200)
    .sendFile(path.resolve(__dirname, '../client/protected.html'));
});
// handles routes to signup, fires authController.signup; if information is added successfully, respond with 200 status and true
app.post('/signup', authController.signUp, (req, res, next) => {
  return res.status(200).send(true);
});

app.post('/test/addUser', sotController.addUser, (req, res, next) => {
  return res.status(200).json(res.locals.newUser);
});

app.post('/test/addContact', sotController.addContact, (req, res, next) => {
  return res.status(200).json(res.locals.newContact);
});

app.post(
  '/test/addEngagement',
  sotController.addEngagement,
  (req, res, next) => {
    return res.status(200).json(res.locals.newEngagement);
  }
);

app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    error: '',
    status: 500,
    message: { err: 'An error occured' },
  };
  const errorObj = { ...defaultErr, ...err };
  console.log(err);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

module.exports = app;
