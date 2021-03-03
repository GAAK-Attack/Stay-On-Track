const { Pool } = require('pg');
const { PG_PROD_URI, PG_TEST_URI } = require('../settings.js');

let activeURI;
  
if (process.env.NODE_ENV === 'test') {
  console.log('***Using the testing database***');
  activeURI = PG_TEST_URI;
} else {
  activeURI = PG_PROD_URI;
}

const pool = new Pool({
  connectionString: activeURI
});

module.exports = {
  query: async (text, params, callback) => {
    console.log('Executed query:', text);
    return pool.query(text, params, callback);
  },
  // necessary to bind the 'this' inside pool.end to pool, otherwise
  // end won't work in the test file
  end: pool.end.bind(pool)
};
