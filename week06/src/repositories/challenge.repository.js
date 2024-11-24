import { pool } from "../db.config.js";

export const addChallenge = async (data) => {
  const conn = await pool.getConnection();
  try {
    const [confirm] = await conn.query(
      "SELECT EXISTS(SELECT 1 FROM mission WHERE id = ?) AS isExistMission;",
      [data.missionId]
    );

    if (!confirm[0].isExistMission) {
      throw new Error("존재하지 않는 미션입니다.");
    }

    const [checkChallenge] = await conn.query(
      "SELECT EXISTS(SELECT 1 FROM user_mission WHERE mission_id = ? AND user_id = ?) AS isAlreadyChallenged;",
      [data.missionId, data.userId]
    );

    if (checkChallenge[0].isAlreadyChallenged) {
      throw new Error("이미 도전 중인 미션입니다.");
    }

    const [result] = await conn.query(
      "INSERT INTO user_mission (mission_id, user_id) VALUES (?, ?);",
      [data.missionId, data.userId]
    );

    return result.insertId;
  } catch (err) {
    throw new Error(`오류가 발생했어요: ${err.message}`);
  } finally {
    conn.release();
  }
};
