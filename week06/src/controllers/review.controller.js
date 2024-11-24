//가게에 리뷰 추가하기
//import { StatusCodes } from "http-status-codes";
//import { bodyToReview } from "../dtos/review.dto.js";
//import { addReview } from "../services/review.service.js";
import { reviewSignUp } from "../services/review.service.js";
/*export const handleAddReview = async (req, res) => {
  try {
    const review = bodyToReview(req.body);
    const result = await addReview(review);
    res.status(StatusCodes.CREATED).json({ result });
  } catch (error) {
    console.error(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send('Server error');
  }
};*/

export const handleReviewSignUp = async (req, res) => {
    try {
        const reviewData = req.body;
        console.log(req.body);
        const reivew = await reivewSignUp(reivewData);
        res.status(201).json(reivew);
    } catch (err) {
        res.status(500).json({message: err.message});
    }
};