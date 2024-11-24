import { StatusCodes } from "http-status-codes";
import { bodyToReview } from "../dtos/review.dto.js";
import { addReview } from "../services/review.service.js";

export const handleAddReview = async (req, res, next) => {
  try {
    console.log("리뷰 작성을 요청했습니다!");
    console.log("body:", req.body); // 값이 잘 들어오나 확인하기 위한 테스트용

    const review = await addReview(bodyToReview(req.body));

    res.status(StatusCodes.OK).success(review);
  } catch (err) {
    next(err);
  }
};