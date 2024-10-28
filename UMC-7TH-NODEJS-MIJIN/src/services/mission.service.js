// src/services/mission.service.js
import { addMission, findStoreById } from "../repositories/mission.repository.js"; // findStoreById 추가

// 가게에 미션 추가
export const createMission = async (data) => {
  console.log("미션 추가 요청 데이터:", data); // 요청 데이터 출력

  // 미션을 추가할 가게가 존재하는지 확인
  const store = await findStoreById(data.store_id);

  if (!store) {
    console.error("해당 가게가 존재하지 않습니다."); // 에러 메시지 출력
    throw new Error("해당 가게가 존재하지 않습니다.");
  }

  // 미션 추가
  const mission_id = await addMission({
    store_id: data.store_id,
    mission_id: data.mission_id,
    mission_name: data.mission_name,
    reward: data.reward,
  });

  console.log("새로운 미션이 추가되었습니다. 미션 ID:", mission_id); // 추가된 미션 ID 출력
  return mission_id;
};
