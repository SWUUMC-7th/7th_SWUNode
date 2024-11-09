// src/services/mission.service.js
import { addMission, findStoreById } from "../repositories/mission.repository.js"; // findStoreById 추가

// 가게에 미션 추가
export const createMission = async (data) => {
  console.log("미션 추가 요청 데이터:", data); // 요청 데이터 출력

  // 미션을 추가할 가게가 존재하는지 확인
  const store = await findStoreById(data.storeId);

  if (!store) {
    console.error("해당 가게가 존재하지 않습니다."); // 에러 메시지 출력
    throw new Error("해당 가게가 존재하지 않습니다.");
  }

  // 미션 추가
  const missionId = await addMission({
    storeId: data.storeId,
    missionId: data.missionId,
    missionName: data.missionName,
    reward: data.reward,
  });

  console.log("새로운 미션이 추가되었습니다. 미션 ID:", missionId); // 추가된 미션 ID 출력
  return missionId;
};
