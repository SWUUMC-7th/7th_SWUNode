import { pool } from "../db.config.js";

// 가게 존재 여부 확인
export const findStoreById = async (storeId) => {
  const conn = await pool.getConnection();

  try {
    const [store] = await pool.query(
      `SELECT * FROM store WHERE storeId = ?;`,
      [storeId]
    );

    return store.length > 0 ? store[0] : null;
  } catch (err) {
    throw new Error(`가게 조회 중 오류가 발생했습니다. (${err})`);
  } finally {
    conn.release();
  }
};

// 리뷰 추가
export const addReview = async (reviewData) => {
  const conn = await pool.getConnection();

  try {
    const [result] = await pool.query(
      `INSERT INTO review (storeId, userId, body, score, createdAt) VALUES (?, ?, ?, ?, NOW());`,
      [
        reviewData.storeId,
        reviewData.userId,
        reviewData.body,
        reviewData.score
      ]
    );

    return { reviewId: result.insertId, ...reviewData };
  } catch (err) {
    throw new Error(`리뷰 추가 중 오류가 발생했습니다. (${err})`);
  } finally {
    conn.release();
  }
};

// 특정 가게의 리뷰 목록 조회
export const getReviewsByStoreId = async (storeId) => {
  const conn = await pool.getConnection();

  try {
    const [reviews] = await pool.query(
      `SELECT r.reviewId, r.userId, r.body, r.score, r.createdAt, r.updatedAt, u.userName
       FROM review r
       JOIN user u ON r.userId = u.id
       WHERE r.storeId = ?
       ORDER BY r.createdAt DESC;`,
      [storeId]
    );

    return reviews;
  } catch (err) {
    throw new Error(`리뷰 조회 중 오류가 발생했습니다. (${err})`);
  } finally {
    conn.release();
  }
};
