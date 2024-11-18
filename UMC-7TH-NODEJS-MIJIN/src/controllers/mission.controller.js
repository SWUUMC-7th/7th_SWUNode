import { prisma } from '../db.config.js';
import { createMission } from "../services/mission.service.js";
import { handleGetInProgressMissionsByUserId } from "../services/mission.service.js";
import { handleGetMissionsByStoreId } from "../services/mission.service.js";

export const handleCreateMission = async (req, res) => {
  try {
    const missionData = req.body;
    const missionId = await createMission(missionData);
    res.status(StatusCodes.CREATED).success({ message: "미션이 추가되었습니다.", missionId });
  } catch (error) {
    console.error("미션 추가 중 오류 발생:", error);
    res.status(StatusCodes.BAD_REQUEST).error({
      errorCode: "mission_creation_failed",
      reason: error.message,
    });
  }
};


// 내가 진행 중인 미션 목록 조회
export const getInProgressMissions = async (req, res) => {
  const userId = parseInt(req.params.userId); // URL 파라미터로 전달받은 userId

  try {
    const missions = await handleGetInProgressMissionsByUserId(userId);
    res.status(StatusCodes.OK).success(missions); // 성공 시 결과 반환
  } catch (error) {
    console.error("진행 중인 미션 목록 조회 중 오류 발생:", error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).error({
      errorCode: "mission_fetch_failed",
      reason: error.message,
    });
  }
};


// 진행 중인 미션을 완료로 변경
export const markMissionAsCompleted = async (req, res, next) => {
  const { userId, missionId } = req.params;
  console.log(`미션 완료 요청 - 사용자 ID: ${userId}, 미션 ID: ${missionId}`);

  try {
    const updatedMission = await prisma.userMission.update({
      where: { missionId: Number(missionId), userId: Number(userId) },
      data: { status: "completed" },
    });
    res.status(StatusCodes.OK).success(updatedMission); // 성공 응답
  } catch (error) {
    console.error("미션 완료 처리 중 오류 발생:", error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).error({
      errorCode: "mission_update_failed",
      reason: "미션 완료 처리에 실패했습니다.",
    });
  }
};

// 특정 가게의 미션 목록 조회
export const getMissionsByStore = async (req, res) => {
  const storeId = parseInt(req.params.storeId); // URL 파라미터로 전달받은 storeId

  try {
    const missions = await handleGetMissionsByStoreId(storeId);
    res.status(StatusCodes.OK).success(missions); // 성공 시 미션 목록 반환
  } catch (error) {
    console.error("가게의 미션 목록 조회 중 오류 발생:", error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).error({
      errorCode: "mission_list_fetch_failed",
      reason: error.message,
    });
  }
};

