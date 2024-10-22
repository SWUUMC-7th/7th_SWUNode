const express = require('express');
const app = express();
const userRoutes = require('./routes/userRoutes');

app.use(express.json()); // JSON 파싱을 위한 미들웨어
app.use('/api/users', userRoutes); // 사용자 라우트 설정

module.exports = app;
