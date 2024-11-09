import { prisma } from "../db.config.js";


// User 데이터 삽입
export const addUser = async (data) => {
  try {
    // 1. 이메일 중복 확인
    const user = await prisma.user.findFirst({ where: { email: data.email } });
    if (user) {
      return null; // 중복 이메일이 있으면 null 반환
    }

    // 2. 사용자 데이터 생성
    const createdUser = await prisma.user.create({ data });
    return createdUser.id; // 생성된 사용자의 ID 반환
  } catch (err) {
    throw new Error(`오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`);
  }
};

// 사용자 정보 얻기
export const getUser = async (userId) => {
  const user = await prisma.user.findFirstOrThrow({ where: { id: userId } });
  return user;
};

// 음식 선호 카테고리 매핑
export const setPreference = async (userId, foodCategoryId) => {
  await prisma.userFavorCategory.create({
    data: {
      userId: userId,
      foodCategoryId: foodCategoryId,
    },
  });
};

// 사용자 선호 카테고리 반환
export const getUserPreferencesByUserId = async (userId) => {
  const preferences = await prisma.userFavorCategory.findMany({
    select: {
      id: true,
      userId: true,
      foodCategoryId: true,
      foodCategory: true,
    },
    where: { userId: userId },
    orderBy: { foodCategoryId: "asc" },
  });

  return preferences;
};

export const getAllStoreReviews = async (storeId, cursor) => {
  const reviews = await prisma.userStoreReview.findMany({
    select: { userStoreReviewId: true, content: true, store: true, user: true },
    where: { storeId: storeId, id: { gt: cursor } },
    orderBy: { userStoreReviewId: "asc" },
    take: 5,
  });

  return reviews;
};
