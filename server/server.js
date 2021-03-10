// allows use of express
const express = require('express');
// used for setting up absolute paths
const path = require('path');

// sets app to express invoked
// the port app will be listening on
const app = express();
const PORT = 3000;

const userRouter = require(path.join(__dirname, 'routers', 'users.js'));
const contactRouter = require(path.join(__dirname, 'routers', 'contacts.js'));
const engagementRouter = require(path.join(
  __dirname,
  'routers',
  'engagements.js'
));

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

app.get('/', (req, res) => {
  return res
    .status(200)
    .sendFile(path.resolve(__dirname, '../client/index.html'));
});

app.use('/user', userRouter);
app.use('/contact', contactRouter);
app.use('/engagement', engagementRouter);

// catch-all route handler for any requests to an unknown route
app.use('*', (req, res) => {
  return res.status(404).send('<h1>Page not found</h1>');
});

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
