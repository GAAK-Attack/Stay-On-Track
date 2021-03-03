const { Pool } = require('pg');
const { PG_PROD_URI, PG_TEST_URI } = require('../settings.js');

let activeURI;
  
if (process.env.NODE_ENV === 'test') {
  activeURI = PG_TEST_URI;
} else {
  activeURI = PG_PROD_URI;
}

const pool = new Pool({
  connectionString: activeURI
});

module.exports = {
  query: (text, params, callback) => {
    console.log('Executed query:', text);
    return pool.query(text, params, callback);
  },
  connect: pool.connect
};
