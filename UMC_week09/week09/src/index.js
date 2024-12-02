import swaggerAutogen from "swagger-autogen";
import swaggerUiExpress from "swagger-ui-express";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { handleUserSignUp } from "./controllers/user.controller.js";
import { handleListStoreReviews } from "./controllers/store.controller.js";

import { PrismaSessionStore } from "@quixo3/prisma-session-store";
import session from "express-session";
import passport from "passport";
import { googleStrategy } from "./auth.config.js";
import { naverStrategy } from "./naverStrategy.js";
import { localStrategy } from "./localStrategy.js"; // Assuming you have a similar local strategy implementation
import { prisma } from "./db.config.js";




dotenv.config();

passport.use(googleStrategy); //passport 라이브러리에 정의한 로그인 방식 등록 코드
//위의 한줄 코드에서 구글 로그인 방식 등록했지만 네이버, 카카오, 애플등 다양한 로그인 방식 추가 가능
passport.serializeUser((user, done) => done(null, user));
//위의 한줄 코드: Session에 사용자 정보를 저장할 때
passport.deserializeUser((user, done) => done(null, user));
//위의 한줄 코드: Session의 정보를 가져올 때

//네이버
export const configurePassport = () => {
  passport.use(naverStrategy);
  passport.use(localStrategy);

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await prisma.user.findUnique({ where: { id } });
      return done(null, user);
    } catch (error) {
      return done(error);
    }
  });
};


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

app.use(
  session({
    cookie: {
      maxAge: 7 * 24 * 60 * 60 * 1000, // ms
    },
    resave: false,
    saveUninitialized: false,
    secret: process.env.EXPRESS_SESSION_SECRET,
    store: new PrismaSessionStore(prisma, {
      checkPeriod: 2 * 60 * 1000, // ms
      dbRecordIdIsSessionId: true,
      dbRecordIdFunction: undefined,
    }),
  })
);
app.use(passport.initialize());
app.use(passport.session());


app.use(
  "/docs",
  swaggerUiExpress.serve,
  swaggerUiExpress.setup({}, {
    swaggerOptions: {
      url: "/openapi.json",
    },
  })
);





app.get("/openapi.json", async (req, res, next) => {
  // #swagger.ignore = true
  const options = {
    openapi: "3.0.0",
    disableLogs: true,
    writeOutputFile: false,
  };
  const outputFile = "/dev/null"; // 파일 출력은 사용하지 않습니다.
  const routes = ["./src/index.js"];
  const doc = {
    info: {
      title: "UMC 7th",
      description: "UMC 7th Node.js 테스트 프로젝트입니다.",
    },
    host: "localhost:3000",
  };

  const result = await swaggerAutogen(options)(outputFile, routes, doc);
  res.json(result ? result.data : null);
});

app.get("/", (req, res) => {
  // #swagger.ignore = true
  console.log(req.user);
  res.send("Hello World!");
});
app.get("/api/v1/stores/:storeId/reviews", handleListStoreReviews);

app.get("/oauth2/login/google", passport.authenticate("google"));
app.get(
  "/oauth2/callback/google",
  passport.authenticate("google", {
    failureRedirect: "/oauth2/login/google",
    failureMessage: true,
  }),
  (req, res) => res.redirect("/")
);

//네이버로 로그인하기 라우터
app.get("/oauth2/login/naver", passport.authenticate("naver", {authType: "reprompt"}));
//위에서 네이버 로그인 서버가 되면 redirect url 설정에 따라..
app.get(
  "/oauth2/callback/naver",
  passprot.authenticate("naver", {failureRedirect: '/'}),
  (req, res) => {
    res.redirect('/');
  },
);

app.post("/api/v1/users/signup", handleUserSignUp);

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