import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { handleUserSignUp } from "./controllers/user.controller.js";
import { handleCreateRegion } from './controllers/region.controller.js';
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

/**
 * 공통 응답을 사용할 수 있는 헬퍼 함수 등록
 */
app.use((req, res, next) => {
  res.success = (success) => {
    return res.json({ resultType: "SUCCESS", error: null, success });
  };

  res.error = ({ errorCode = "unknown", reason = null, data = null }) => {
    return res.json({
      resultType: "FAIL",
      error: { errorCode, reason, data },
      success: null,
    });
  };

  next();
});

app.use(cors()); // cors 방식 허용
app.use(express.static("public")); // 정적 파일 접근
app.use(express.json()); // request의 본문을 json으로 해석할 수 있도록 함 (JSON 형태의 요청 body를 파싱하기 위함)
app.use(express.urlencoded({ extended: false })); // 단순 객체 문자열 형태로 본문 데이터 해석

// Express Router 객체 생성
const router = express.Router();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// 사용자 회원가입
app.post("/api/v1/users/signup", handleUserSignUp);

// 사용자 정보 조회 API 추가
app.get("/api/v1/users/:userId", getUser);

// 지역 추가 API
app.post('/api/v1/regions', handleCreateRegion);

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

/**
 * 전역 오류를 처리하기 위한 미들웨어
 */
app.use((err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }

  res.status(err.statusCode || 500).error({
    errorCode: err.errorCode || "unknown",
    reason: err.reason || err.message || null,
    data: err.data || null,
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
