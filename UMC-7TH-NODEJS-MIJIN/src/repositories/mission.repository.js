import { pool } from "../db.config.js"; // 데이터베이스 연결 모듈

// 가게 존재 여부 확인
export const findStoreById = async (store_id) => {
  const conn = await pool.getConnection(); // 연결 가져오기

  try {
    const [store] = await conn.query(
      `SELECT * FROM store WHERE store_id = ?;`,
      [store_id]
    );

    return store.length > 0 ? store[0] : null; // 가게가 존재하면 가게 정보 반환
  } catch (err) {
    throw new Error(`가게 조회 중 오류가 발생했습니다. (${err.message})`); // 오류 메시지 출력
  } finally {
    conn.release(); // 연결 해제
  }
};

// 미션 추가
export const addMission = async (mission) => {
  const { store_id, mission_name, reward } = mission; // mission_id는 필요 없으므로 제거
  const conn = await pool.getConnection(); // 연결 가져오기

  try {
    const [result] = await conn.query(
      `INSERT INTO mission (store_id, mission_name, reward) VALUES (?, ?, ?)`,
      [store_id, mission_name, reward] // mission_id를 제거하여 삽입
    );

    console.log(`새로운 미션 추가됨: ${result.insertId}`); // 추가된 미션 ID 출력
    return result.insertId; // 새로 추가된 미션의 ID 반환
  } catch (err) {
    throw new Error(`미션 추가 중 오류가 발생했습니다. (${err.message})`); // 오류 메시지 출력
  } finally {
    conn.release(); // 연결 해제
  }
};
