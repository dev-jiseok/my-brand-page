const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: 'brandpage-sqlserver.mysql.database.azure.com',
  user: 'testjiseok',
  password: 'jiseok426',
  database: 'portfolio_db',
  waitForConnections: true,
  connectionLimit: 10,
  port: 3306,
  queueLimit: 0,
  ssl: {
    rejectUnauthorized: true,
    // Azure MySQL은 일반적으로 이 설정이 필요합니다
    // 필요한 경우 인증서 경로도 추가할 수 있습니다
  }
});

module.exports = pool;