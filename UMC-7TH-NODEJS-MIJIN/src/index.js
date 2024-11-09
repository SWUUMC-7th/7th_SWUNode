import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { handleUserSignUp } from "./controllers/user.controller.js";
import { handleCreateReview } from './controllers/review.controller.js';
import { handleCreateStore } from "./controllers/store.controller.js"; 
import { handleCreateMission } from './controllers/mission.controller.js'; 
import { handleChallengeMission } from './controllers/userMission.controller.js'; // 미션 도전 핸들러 추가
import { getUser } from "./controllers/user.controller.js";
import { handleGetReviewsByStore } from './controllers/review.controller.js';



dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(cors()); // CORS 설정
app.use(express.static("public")); // 정적 파일 접근
app.use(express.json()); // JSON 형태의 요청 본문 파싱
app.use(express.urlencoded({ extended: false })); // URL 인코딩된 본문 파싱

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// 사용자 회원가입
app.post("/api/v1/users/signup", handleUserSignUp);

// 사용자 정보 조회 API 추가
app.get("/api/v1/users/:userId", getUser);

// 리뷰 추가
app.post("/api/v1/reviews", handleCreateReview);

// 가게 추가 API
app.post("/api/v1/stores", handleCreateStore);

// 특정 가게의 리뷰 목록 조회
app.get("/api/v1/stores/:storeId/reviews", handleGetReviewsByStore);

// 가게에 미션 추가 API
app.post("/api/v1/missions", handleCreateMission);

// 미션 도전 API
app.post("/api/v1/missions/challenge", handleChallengeMission); // 도전하기 API 추가

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
