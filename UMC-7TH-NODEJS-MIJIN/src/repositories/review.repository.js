import { pool } from "../db.config.js";

// 가게 존재 여부 확인
export const findStoreById = async (store_id) => {
  const conn = await pool.getConnection();

  try {
    const [store] = await pool.query(
      `SELECT * FROM store WHERE store_id = ?;`,
      [store_id]
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
      `INSERT INTO review (store_id, user_id, body, score, created_at) VALUES (?, ?, ?, ?, NOW());`,
      [
        reviewData.store_id,
        reviewData.user_id,
        reviewData.body,
        reviewData.score
      ]
    );

    return { review_id: result.insertId, ...reviewData };
  } catch (err) {
    throw new Error(`리뷰 추가 중 오류가 발생했습니다. (${err})`);
  } finally {
    conn.release();
  }
};

// 특정 가게의 리뷰 목록 조회
export const getReviewsByStoreId = async (store_id) => {
  const conn = await pool.getConnection();

  try {
    const [reviews] = await pool.query(
      `SELECT r.review_id, r.user_id, r.body, r.score, r.created_at, r.updated_at, u.username
       FROM review r
       JOIN user u ON r.user_id = u.id
       WHERE r.store_id = ?
       ORDER BY r.created_at DESC;`,
      [store_id]
    );

    return reviews;
  } catch (err) {
    throw new Error(`리뷰 조회 중 오류가 발생했습니다. (${err})`);
  } finally {
    conn.release();
  }
};
