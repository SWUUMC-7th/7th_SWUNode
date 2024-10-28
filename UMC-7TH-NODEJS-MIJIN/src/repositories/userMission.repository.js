import { pool } from "../db.config.js"; // 데이터베이스 연결 모듈

// 특정 사용자와 미션의 도전 여부 확인
export const findUserMission = async (user_id, mission_id) => {
  const conn = await pool.getConnection();

  try {
    const [missions] = await conn.query(
      `SELECT * FROM user_mission WHERE user_id = ? AND mission_id = ?;`,
      [user_id, mission_id]
    );

    return missions.length > 0 ? missions[0] : null; // 도전 중인 미션이 있으면 반환
  } catch (err) {
    throw new Error(`도전 미션 조회 중 오류가 발생했습니다. (${err})`);
  } finally {
    conn.release();
  }
};

// 미션 도전 추가
export const addUserMission = async (userMissionData) => {
  const { user_id, mission_id } = userMissionData;
  const conn = await pool.getConnection();

  try {
    const [result] = await conn.query(
      `INSERT INTO user_mission (user_id, mission_id, is_completed, created_at, updated_at) VALUES (?, ?, ?, NOW(), NOW());`,
      [user_id, mission_id, false] // is_completed는 false로 초기화
    );

    return { user_mission_id: result.insertId, ...userMissionData };
  } catch (err) {
    throw new Error(`미션 도전 추가 중 오류가 발생했습니다. (${err})`);
  } finally {
    conn.release();
  }
};
