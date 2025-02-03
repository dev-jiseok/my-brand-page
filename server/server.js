// server/server.js
const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();

// CORS 설정
app.use(cors({
  origin: '*',  // 모든 출처 허용 (개발 환경에서만 사용)
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

app.use(bodyParser.json());

// MySQL 연결 설정
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'jiseok426',
  database: 'portfolio_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// 데이터베이스 연결 테스트
pool.getConnection()
  .then(connection => {
    console.log('Database connected successfully');
    connection.release();
  })
  .catch(err => {
    console.error('Error connecting to the database:', err);
  });

// pool을 외부에서 사용할 수 있도록 export
module.exports = pool;

// 라우터 불러오기
const userRoutes = require('./routes/user.routes');
const aiRoutes = require('./routes/ai.routes');

// 라우터 설정
app.use('/api/users', userRoutes);
app.use('/api/ai', aiRoutes);

const PORT = 5001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});