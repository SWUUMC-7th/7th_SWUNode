import { pool } from "../db.config.js";

// 가게 추가
export const addStore = async (data) => {
  const conn = await pool.getConnection();

  try {
    const [result] = await pool.query(
      `INSERT INTO store (storeId, storeName, storeAddress, phoneNumber, regionId) VALUES (?, ?, ?, ?);`,
      [data.storeId, data.storeName, data.storeAddress, data.phoneNumber, data.regionId]
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
      `SELECT * FROM store WHERE regionId = ?;`,
      [regionId]
    );

    return stores;
  } catch (err) {
    throw new Error(`가게 조회 중 오류가 발생했습니다. (${err})`);
  } finally {
    conn.release();
  }
};
