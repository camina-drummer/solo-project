// Require in node-postgres and dotenv
const { Pool } = require('pg');
require('dotenv').config();

// ElephantSQL database URI
const PG_URI = process.env.PG_URI;

// Create new pool
const pool = new Pool({
  connectionString: PG_URI,
});

// Export the method to be invoked for sending db queries
module.exports = {
  query: (text, params, callback) => {
    // Prints submitted query
    console.log('executed query', text);
    // Returns result of query
    return pool.query(text, params, callback);
  },
};