import { pool } from "../db.config.js";
import addMission from "../services/mission.service.js";

export const addMission = async (data) => {
  const conn = await pool.getConnection();
  try {
    const [result] = await conn.query(
      "INSERT INTO mission (store_id, description, reward) VALUES (?, ?, ?);",
      [data.storeId, data.description, data.reward]
    );
    return result.insertId;
  } catch (err) {
    throw new Error(`오류가 발생했어요: ${err.message}`);
  } finally {
    conn.release();
  }
};

