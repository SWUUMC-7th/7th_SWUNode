import { addReview, getReviewsByStoreId, findStoreById } from "../repositories/review.repository.js";
import { responseFromReview } from "../dtos/review.dto.js"; // 리뷰 데이터를 변환하는 함수가 있다고 가정합니다.

export const createReview = async (data) => {
  // 리뷰를 추가할 가게가 존재하는지 확인
  const store = await findStoreById(data.storeId);
  
  if (!store) {
    throw new Error("해당 가게가 존재하지 않습니다.");
  }

  // 리뷰 추가
  const newReview = await addReview({
    storeId: data.storeId,
    userId: data.userId,
    body: data.body,
    score: data.score,
  });

  return responseFromReview(newReview);
};

// 특정 가게의 리뷰 목록을 조회
export const getReviewsByStore = async (storeId) => {
  const store = await findStoreById(storeId);

  if (!store) {
    throw new Error("해당 가게가 존재하지 않습니다.");
  }

  const review = await getReviewsByStoreId(storeId);
  return review.map(responseFromReview);
};

// 사용자 ID로 리뷰 조회
export const findReviewsByUserId = async (userId) => {
  try {
    const reviews = await prisma.review.findMany({
      where: {
        userId: userId, // 사용자 ID로 필터링
      },
      include: {
        store: true,  // 리뷰와 관련된 가게 정보 포함
      },
      orderBy: {
        createdAt: 'desc', // 최신 리뷰부터 정렬
      },
    });

    return reviews;
  } catch (error) {
    throw new Error(`리뷰 조회 중 오류가 발생했습니다. (${error.message})`);
  }
};
