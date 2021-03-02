const express = require('express');
const app = express();
const path = require('path');
const PORT = 3000;

app.use(express.json());

app.use('/build', express.static(path.resolve(__dirname, '../build')));
app.use(express.static(path.resolve(__dirname, '../client')));

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
})

module.exports = app;
