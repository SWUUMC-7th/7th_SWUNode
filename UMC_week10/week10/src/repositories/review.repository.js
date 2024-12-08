
import { pool } from "../db.config.js";

export const addReview = async (data) => {
  const conn = await pool.getConnection();
  try {
    const [confirm] = await conn.query(
      "SELECT EXISTS(SELECT 1 FROM store WHERE id = ?) AS isExistStore;",
      [data.storeId]
    );

    if (!confirm[0].isExistStore) {
      throw new Error("존재하지 않는 가게입니다.");
    }

    const [result] = await conn.query(
      "INSERT INTO review (store_id, user_id, rating, comment) VALUES (?, ?, ?, ?);",
      [data.storeId, data.userId, data.rating, data.comment]
    );

    return result.insertId;
  } catch (err) {
    throw new Error(`오류가 발생했어요: ${err.message}`);
  } finally {
    conn.release();
  }
};
