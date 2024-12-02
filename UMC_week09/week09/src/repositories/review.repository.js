import {pool} from "../db.config.js";

// Review 데이터 삽입
export const addReview = async (db, reviewData) => {
    // 예시 쿼리: 리뷰 데이터를 데이터베이스에 추가
    const [reviewId] = await db("reviews").insert(reviewData).returning("id");
    return reviewId ? { ...reviewData, id: reviewId } : null;
  };

// Review 정보 얻기
export const getReviewById = async (db, id) => {
    return db("reviews").where({ id }).first();
  };