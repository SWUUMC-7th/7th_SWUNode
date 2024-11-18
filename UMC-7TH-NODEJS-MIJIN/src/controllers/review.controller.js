import { StatusCodes } from "http-status-codes";
import { createReview, getReviewsByStore } from "../services/review.service.js";
import { bodyToReview } from "../dtos/review.dto.js"; // 요청 본문에서 리뷰 데이터를 변환하는 함수로 가정
import { findReviewsByUserId } from "../services/review.service.js";

// 리뷰 생성 요청 핸들러
export const handleCreateReview = async (req, res, next) => {
  console.log("리뷰 추가를 요청했습니다!");
  console.log("body:", req.body); // 값이 잘 들어오나 확인하기 위한 테스트용
  
  try {
    const reviewData = bodyToReview(req.body); // 요청 본문에서 리뷰 데이터를 변환
    const review = await createReview(reviewData);
    res.status(StatusCodes.CREATED).json({ result: review });
  } catch (error) {
    console.error(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send('Server error');
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
