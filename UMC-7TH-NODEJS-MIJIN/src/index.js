import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { handleUserSignUp } from "./controllers/user.controller.js";
import { handleCreateReview } from './controllers/review.controller.js';
import { handleCreateStore } from "./controllers/store.controller.js"; 
import { handleCreateMission } from './controllers/mission.controller.js'; 
import { handleChallengeMission } from './controllers/userMission.controller.js';
import { getUser } from "./controllers/user.controller.js";
import { handleGetReviewsByStore } from './controllers/review.controller.js';  // 특정 가게의 리뷰 목록 조회
import { handleGetReviewsByUser } from "./controllers/review.controller.js";  // 내가 작성한 리뷰 목록 가져오기
import { getInProgressMissions } from './controllers/mission.controller.js';  // 진행 중인 미션 목록 조회
import { markMissionAsCompleted } from './controllers/mission.controller.js';       // 진행 중인 미션을 완료로 변경

dotenv.config();

const app = express();
const port = process.env.PORT;

// Express Router 객체 생성
const router = express.Router();

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

// 가게에 미션 추가 API
app.post("/api/v1/missions", handleCreateMission);

// 미션 도전 API
app.post("/api/v1/missions/challenge", handleChallengeMission);

// 내가 작성한 리뷰 목록 가져오기
router.get("/api/v1/reviews/my-reviews", handleGetReviewsByUser);

// 특정 가게의 리뷰 목록 조회
app.get("/api/v1/stores/:storeId/reviews", handleGetReviewsByStore);

// 내가 진행 중인 미션 목록 조회
app.get('/api/v1/missions/in-progress/:userId', getInProgressMissions);

// 내가 진행 중인 미션을 진행 완료로 변경
app.patch('/api/v1/missions/complete/:userId/:missionId', markMissionAsCompleted);

// 라우터를 앱에 연결
app.use(router); // router 객체를 app에 연결

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
