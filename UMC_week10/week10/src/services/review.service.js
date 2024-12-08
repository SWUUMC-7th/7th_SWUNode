import { addReview } from "../repositories/review.repository.js";

export const createReview = async (data) => {
  const reviewId = await addReview(data);
  return { id: reviewId, ...data };
};