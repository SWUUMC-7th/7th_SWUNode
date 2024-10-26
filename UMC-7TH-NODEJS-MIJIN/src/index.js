// index.js
const express = require('express');
const bodyParser = require('body-parser');
const userController = require('./controllers/user.controller');
const missionController = require('./controllers/mission.controller');
const reviewController = require('./controllers/review.controller');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json()); // JSON 요청 본문을 파싱

// Routes
app.get('/users/:userId', userController.getUserInfo); // 사용자 정보 조회
app.post('/reviews', reviewController.createReview); // 리뷰 작성
app.get('/missions', missionController.getMissionsByRegion); // 지역별 미션 조회

// 서버 시작
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
