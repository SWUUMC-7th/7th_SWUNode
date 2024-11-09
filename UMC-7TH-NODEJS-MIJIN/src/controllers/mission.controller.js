import { createMission } from "../services/mission.service.js";
import { handleGetInProgressMissionsByUserId } from "../services/mission.service.js";
import { handleCompleteMission } from "../services/mission.service.js";
import { handleGetMissionsByStoreId } from "../services/mission.service.js";

export const handleCreateMission = async (req, res) => {
  try {
    const missionData = req.body;
    const missionId = await createMission(missionData);
    res.status(201).json({ message: "미션이 추가되었습니다.", missionId });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message });
  }
};

// 내가 진행 중인 미션 목록 조회
export const getInProgressMissions = async (req, res) => {
  const userId = parseInt(req.params.userId); // URL 파라미터로 전달받은 userId

  try {
    const missions = await handleGetInProgressMissionsByUserId(userId);  // 서비스 함수 호출
    // 응답 형식에 따라 결과 반환
    res.status(200).json({ result: missions });  // result로 감싸서 반환
  } catch (error) {
    res.status(500).json({ message: error.message });  // 오류 발생 시 메시지 반환
  }
};

// 진행 중인 미션을 완료로 변경
export const markMissionAsCompleted = async (req, res) => {
  const userId = parseInt(req.params.userId); // URL 파라미터로 전달받은 userId
  const missionId = parseInt(req.params.missionId); // URL 파라미터로 전달받은 missionId

  try {
    const updatedMission = await handleCompleteMission(userId, missionId);  // 서비스 함수 호출
    res.status(200).json(updatedMission);  // 성공 시 업데이트된 미션 반환
  } catch (error) {
    res.status(500).json({ message: error.message });  // 오류 발생 시 메시지 반환
  }
};

// 특정 가게의 미션 목록 조회
export const getMissionsByStore = async (req, res) => {
  const storeId = parseInt(req.params.storeId); // URL 파라미터로 전달받은 storeId

  try {
    const missions = await handleGetMissionsByStoreId(storeId);  // 서비스 함수 호출
    res.status(200).json(missions);  // 성공 시 미션 목록 반환
  } catch (error) {
    res.status(500).json({ message: error.message });  // 오류 발생 시 메시지 반환
  }
};
