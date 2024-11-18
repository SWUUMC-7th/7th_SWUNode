import { findUserMission, addUserMission } from "../repositories/userMission.repository.js";

// 미션 도전하기
export const challengeMission = async (userId, missionId) => {
  // 미션 도전 여부 확인
  const existingMission = await findUserMission(userId, missionId);
  if (existingMission) {
    throw new Error(`이미 도전 중인 미션입니다.`); // 도전 중인 경우 오류 발생
  }

  // 도전 추가
  const newUserMission = await addUserMission({ userId, missionId });
  return newUserMission;
};
