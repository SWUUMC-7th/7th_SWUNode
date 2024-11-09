import { pool } from "../db.config.js"; // 데이터베이스 연결 모듈
import { prisma } from '../db.config.js';

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
  const { storeId, missionName, reward } = mission; // mission_id는 필요 없으므로 제거
  const conn = await pool.getConnection(); // 연결 가져오기

  try {
    const [result] = await conn.query(
      `INSERT INTO mission (storeId, missionName, reward) VALUES (?, ?, ?)`,
      [storeId, missionName, reward] // mission_id를 제거하여 삽입
    );

    console.log(`새로운 미션 추가됨: ${result.insertId}`); // 추가된 미션 ID 출력
    return result.insertId; // 새로 추가된 미션의 ID 반환
  } catch (err) {
    throw new Error(`미션 추가 중 오류가 발생했습니다. (${err.message})`); // 오류 메시지 출력
  } finally {
    conn.release(); // 연결 해제
  }
};

// 진행 중인 미션 목록 조회
export const getInProgressMissionsByUserId = async (userId) => {
  try {
    const missions = await prisma.mission.findMany({
      where: {
        userId: userId,
        status: 'in-progress',  // 진행 중인 미션만 조회
      },
      include: {
        store: true,  // 미션이 속한 가게 정보 포함
      },
      orderBy: {
        createdAt: 'desc',  // 미션 생성일 순으로 정렬
      },
    });

    return missions;
  } catch (error) {
    throw new Error(`진행 중인 미션 조회 중 오류가 발생했습니다. (${error.message})`);
  }
};

// 미션을 완료로 변경
export const completeMission = async (missionId) => {
  try {
    const updatedMission = await prisma.mission.update({
      where: {
        id: missionId,
      },
      data: {
        status: 'completed',  // 상태를 "completed"로 변경
      },
    });

    return updatedMission;
  } catch (error) {
    throw new Error(`미션 완료 처리 중 오류가 발생했습니다. (${error.message})`);
  }
};

// 특정 가게의 미션 목록 조회
export const getMissionsByStoreId = async (storeId) => {
  try {
    const missions = await prisma.mission.findMany({
      where: {
        storeId: storeId,  // storeId 기준으로 미션 필터링
      },
      include: {
        user: true,  // 미션을 수행한 사용자 정보 포함
      },
      orderBy: {
        createdAt: 'desc',  // 미션 생성일 순으로 정렬
      },
    });

    return missions;
  } catch (error) {
    throw new Error(`미션 조회 중 오류가 발생했습니다. (${error.message})`);
  }
};