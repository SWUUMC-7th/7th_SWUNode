import { addReview, getReviewsByStoreId, findStoreById } from "../repositories/review.repository.js";
import { responseFromReview } from "../dtos/review.dto.js"; // 리뷰 데이터를 변환하는 함수가 있다고 가정합니다.

export const createReview = async (data) => {
  // 리뷰를 추가할 가게가 존재하는지 확인
  const store = await findStoreById(data.store_id);
  
  if (!store) {
    throw new Error("해당 가게가 존재하지 않습니다.");
  }

  // 리뷰 추가
  const newReview = await addReview({
    store_id: data.store_id,
    user_id: data.user_id,
    body: data.body,
    score: data.score,
  });

  return responseFromReview(newReview);
};

// 특정 가게의 리뷰 목록을 조회
export const getReviewsByStore = async (store_id) => {
  const store = await findStoreById(store_id);

  if (!store) {
    throw new Error("해당 가게가 존재하지 않습니다.");
  }

  const review = await getReviewsByStoreId(storeId);
  return review.map(responseFromReview);
};
