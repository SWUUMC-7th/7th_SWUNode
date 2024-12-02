import {pool} from "../db.config.js";

// Store 데이터 삽입하기
export const addStore = async (db, data) => {
    const [storeId] = await db("stores").insert(data).returning("id");
  return storeId ? { ...Data, id: storeId } : null;
};


  

// Store 정보 얻기
export const getStoreById = async (db, storeId) => {
    return db("stores").where({ storeId }).first();
};


// Store 존재 여부 확인
export const storeExists = async (storeId) => {
    const conn = await pool.getConnection();
    try {
        const [rows] = await conn.query(`SELECT * FROM store WHERE id = ?;`, [storeId,]);
        return rows.length > 0;
    } catch (err) {
        throw new Error(`오류가 발생했습니다: ${err}`);
    } finally {
        conn.release();
    }
};

