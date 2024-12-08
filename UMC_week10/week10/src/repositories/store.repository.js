
import { pool } from "../db.config.js";

export const addStore = async (data) => {
  const conn = await pool.getConnection();
  try {
    const [result] = await conn.query(
      "INSERT INTO store (name, region_id, address, detail_address) VALUES (?, ?, ?, ?);",
      [data.name, data.regionId, data.address, data.detailAddress]
    );
    return result.insertId;
  } catch (err) {
    throw new Error(`오류가 발생했어요: ${err.message}`);
  } finally {
    conn.release();
  }
};
