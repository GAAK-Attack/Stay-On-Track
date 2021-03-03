const { Pool } = require('pg');

// direct link to the database
const TESTING_URI =
  'postgres://qtkxnxzk:2BJgdvuEhJ_jDRhjv0mRvHl8HqvbJmF9@ziggy.db.elephantsql.com:5432/qtkxnxzk';
const PG_URI =
  'postgres://jbbzinao:OslM_aTTgi71R38LFvWXUbVw2fz5HVW5@ziggy.db.elephantsql.com:5432/jbbzinao';

// if (process.env.NODE_ENV === 'test') {
const pool = new Pool({
  // setting connection string to allow database connection
  connectionString: TESTING_URI,
});

// } else {
// const pool = new Pool({
//     // setting connection string to allow database connection
//     connectionString: PG_URI
// })
// }

// creating a new constructor function instance
// const pool = new Pool({
//     // setting connection string to allow database connection
//     connectionString: PG_URI
// })

// exporting an object with a query method
module.exports = {
  // query is a function that returns the invocation of poolquery() after logging the query
  query: (text, params, callback) => {
    console.log('executed query', text);
    return pool.query(text, params, callback);
  },
};
