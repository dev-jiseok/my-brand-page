const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'jiseok426',
  database: 'portfolio_db',
});

module.exports = pool;