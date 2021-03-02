// allows use of express
const express = require('express');
// sets app to express invoked
const app = express();
// used for setting up absolute paths
const path = require('path');
// the port app will be listening on
const PORT = 3000;

// allows use of methods on the authController object in authController.js
const authController = require('./controllers/authController.js');

// allows app to read .json
app.use(express.json());

// when build is requested, respond with build file
app.use('/build', express.static(path.resolve(__dirname, '../build')));
// make client folder available for use within the app
app.use(express.static(path.resolve(__dirname, '../client')));

app.get('/', (req, res, next) =>
  res.status(200).sendFile(path.resolve(__dirname, '../client/index.html'))
);
// handles routes to login, fires authController.login; if authentication is successful, allow access to protected file
app.post('/login', authController.login, (req, res, next) =>
  res.status(200).sendFile(path.resolve(__dirname, '../client/protected.html'))
);
// handles routes to signup, fires authController.signup; if information is added successfully, respond with 200 status and true
app.post('/signup', authController.signUp, (req, res, next) =>
  res.status(200).send(true)
);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

module.exports = app;
