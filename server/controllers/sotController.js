const db = require('../models/sotModel.js');
// requiring brypt which is used for encryption
const bcrypt = require('bcrypt');
// current number of salt rounds to be used throughout file
const SALT_WORK_FACTOR = 10;

const sotController = {};

sotController.addUser = async (req, res, next) => {
  // creating the encrypted version of the password received from client
  const hash = bcrypt.hashSync(req.body.password, SALT_WORK_FACTOR);

  // query to the database, will create a new instance under users table, then store username, and encrypted password
  const addUserQuery = 'INSERT INTO users (username, password, first_name, last_name, interval) ' +
  'VALUES ($1, $2, $3, $4, $5) RETURNING username, first_name, last_name';

  // in the query, interval cannot be undefined. A value or null has to be passed in
  let interval;
  if (req.body.interval === undefined) interval = null;
  else interval = req.body.interval;

  const userValues = [
    req.body.username,
    hash,
    req.body.first_name,
    req.body.last_name,
    interval
  ];

  try {
    const response = await db.query(addUserQuery, userValues);
    
    res.locals.response = {
      user: response.rows[0],
      result: true
    }

    return next();
  } catch(err) {
    return next({
      log: `ERROR in sotController.addUser: ${err}`,
      message: { err: 'An error occurred while trying to add a user to the database'}
    });
  }
};

sotController.addContact = async (req, res, next) => {
  const addContactQuery = 'INSERT INTO contacts (first_name, last_name, company, email) ' +
  'VALUES ($1, $2, $3, $4) RETURNING *';

  // in the query, email cannot be undefined. A value or null has to be passed in
  let email;
  if (req.body.email === undefined) email = null;
  else email = req.body.email;

  const contactValues = [
    req.body.first_name,
    req.body.last_name,
    req.body.company,
    email
  ];

  try {
    const response = await db.query(addContactQuery, contactValues);

    res.locals.newContact = response.rows[0];
    return next();
  } catch(err) {
    return next({
      log: `ERROR in sotController.addContact: ${err}`,
      message: { err: 'An error occurred while trying to add a contact to the database'}
    });
  }
};

sotController.addEngagement = async (req, res, next) => {
  const addEngagementQuery = 'INSERT INTO engagements (username, contact_id, method, notes) ' +
  'VALUES ($1, $2, $3, $4) RETURNING *';

  // in the query, notes cannot be undefined. A value or null has to be passed in
  let notes;
  if (req.body.notes === undefined) notes = null;
  else notes = req.body.notes;

  const engagementValues = [
    req.body.username,
    req.body.contact_id,
    req.body.method,
    notes
  ];

  try {
    const response = await db.query(addEngagementQuery, engagementValues);
    // need to get the first and last name of contact person
    const contactId = response.rows[0].contact_id;
    // safe to insert since getting contactId directly back from database
    const contactee = await db.query(`SELECT * FROM contacts WHERE contact_id=${contactId}`);

    // add the contact person's first and last name onto the response
    res.locals.newEngagement = Object.assign(response.rows[0], {
      contact_first_name: contactee.rows[0].first_name,
      contact_last_name: contactee.rows[0].last_name
    });

    return next();
  } catch(err) {
    return next({
      log: `ERROR in sotController.addEngagement: ${err}`,
      message: { err: 'An error occurred while trying to add an engagement to the database'}
    });
  }
}

module.exports = sotController;
