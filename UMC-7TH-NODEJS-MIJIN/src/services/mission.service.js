// src/services/mission.service.js
import { prisma } from "../db.config.js";
import { MissionUpdateError } from "../errors.js";


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

// 내가 진행 중인 미션 목록 조회
export const handleGetInProgressMissionsByUserId = async (userId) => {
  try {
    const missions = await getInProgressMissionsByUserId(userId);  // 리포지토리 함수 호출
    return missions;
  } catch (error) {
    throw new Error(`진행 중인 미션 목록 조회 오류: ${error.message}`);
  }
};

// 진행 중인 미션을 완료로 변경
export const markMissionAsCompleted = async (userId, missionId) => {
  try {
    return await prisma.userMission.update({
      where: { userId: Number(userId), missionId: Number(missionId) },
      data: { status: "completed" },
    });
  } catch (error) {
    console.error("미션 완료 업데이트 중 오류:", error);
    throw new MissionUpdateError("미션 완료 처리에 실패했습니다.", {
      userId,
      missionId,
      originalError: error.message,
    });
  }
};

// 특정 가게의 미션 목록 조회
export const handleGetMissionsByStoreId = async (storeId) => {
  try {
    const missions = await getMissionsByStoreId(storeId);  // 리포지토리 함수 호출
    return missions;
  } catch (error) {
    throw new Error(`특정 가게 미션 목록 조회 오류: ${error.message}`);
  }
};