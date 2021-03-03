const db = require('../models/sotModel.js');

const sotController = {};

sotController.addUser = async (req, res, next) => {
  const addUserQuery = 'INSERT INTO users (username, password, first_name, last_name, interval) ' +
  'VALUES ($1, $2, $3, $4, $5) RETURNING username, first_name, last_name';
  
  let interval;
  if (req.body.interval === undefined) interval = null;
  else interval = req.body.interval;

  const userValues = [
    req.body.username,
    req.body.password,
    req.body.first_name,
    req.body.last_name,
    // could've been 'req.body.interval ?? null' but Jest doesn't understand ??
    interval
  ];

  try {
    const response = await db.query(addUserQuery, userValues);
    res.locals.newUser = response.rows[0];
    return next();
  } catch(err) {
    return next({
      log: `ERROR in sotController.addUser: ${err}`,
      message: { err: 'An error occurred while trying to add a user to the database'}
    })
  }
};

module.exports = sotController;
