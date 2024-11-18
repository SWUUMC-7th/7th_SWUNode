import { prisma } from '../db.config.js';
import { StatusCodes } from "http-status-codes";
import { createReview, getReviewsByStore } from "../services/review.service.js";
import { bodyToReview } from "../dtos/review.dto.js"; // 요청 본문에서 리뷰 데이터를 변환하는 함수로 가정
import { findReviewsByUserId } from "../services/review.service.js";

// 리뷰 생성 요청 핸들러
export const handleCreateReview = async (req, res, next) => {
  console.log("리뷰 추가 요청:", req.body);

  try {
    const review = await prisma.review.create({
      data: req.body,
    });
    res.status(StatusCodes.CREATED).success(review); // 상태 코드 201 사용
  } catch (error) {
    console.error("리뷰 추가 중 오류 발생:", error);
    res.status(StatusCodes.BAD_REQUEST).error({
      errorCode: "review_creation_failed",
      reason: "리뷰 추가에 실패했습니다.",
    });
  }
};

// 특정 가게의 리뷰 목록 조회 요청 핸들러
export const handleGetReviewsByStore = async (req, res, next) => {
  const { storeId } = req.params;  // storeId로 파라미터를 받아옵니다.

  try {
    const reviews = await getReviewsByStore(storeId);  // getReviewsByStore 함수에서 리뷰 데이터를 가져옵니다.
    res.status(StatusCodes.OK).json({ result: reviews });
  } catch (error) {
    console.error(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send('Server error');
  }
};

// 내가 작성한 리뷰 목록 조회
export const handleGetReviewsByUser = async (req, res, next) => {
  const { userId } = req.params;  // URL 파라미터로 사용자 ID를 받음

  try {
    const reviews = await findReviewsByUserId(userId);  // 리뷰 목록 조회
    res.status(StatusCodes.OK).json({ result: reviews });
  } catch (error) {
    console.error(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send('Server error');
  }
};
