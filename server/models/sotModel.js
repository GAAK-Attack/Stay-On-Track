const { Pool } = require('pg');
const { PG_URI } = require('../settings.js');

const pool = new Pool({
  connectionString: PG_URI
});

module.exports = {
  query: (text, params, callback) => {
    console.log('Executed query:', text);
    return pool.query(text, params, callback);
  },
  connect: pool.connect
};
