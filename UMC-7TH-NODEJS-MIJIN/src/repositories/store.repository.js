import { pool } from "../db.config.js";

// 가게 추가
export const addStore = async (data) => {
  const conn = await pool.getConnection();

  try {
    const [result] = await pool.query(
      `INSERT INTO store (store_id, store_name, store_address, phone_number, region_id) VALUES (?, ?, ?, ?);`,
      [data.store_id, data.store_name, data.store_address, data.phone_number, data.regionId]
    );

    return result.insertId;
  } catch (err) {
    throw new Error(`가게 추가 중 오류가 발생했습니다. (${err})`);
  } finally {
    conn.release();
  }
};

// 특정 지역의 가게 조회
export const findStoresByRegionId = async (regionId) => {
  const conn = await pool.getConnection();

  try {
    const [stores] = await pool.query(
      `SELECT * FROM store WHERE region_id = ?;`,
      [regionId]
    );

    return stores;
  } catch (err) {
    throw new Error(`가게 조회 중 오류가 발생했습니다. (${err})`);
  } finally {
    conn.release();
  }
};
