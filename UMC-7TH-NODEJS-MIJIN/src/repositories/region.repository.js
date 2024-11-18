import { pool } from "../db.config.js";

// 새로운 지역 추가
export const addRegion = async (regionName) => {
  const conn = await pool.getConnection();

  try {
    const [result] = await conn.query(
      'INSERT INTO region (regionName) VALUES (?);',
      [regionName]
    );
    return result.insertId;
  } catch (error) {
    throw new Error(`지역 추가 중 오류가 발생했습니다. (${error})`);
  } finally {
    conn.release();
  }
};
