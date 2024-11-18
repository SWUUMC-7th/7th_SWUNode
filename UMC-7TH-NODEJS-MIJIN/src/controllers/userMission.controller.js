import { challengeMission } from "../services/userMission.service.js";
import { StatusCodes } from "http-status-codes";
import { MissionChallengeError } from "../errors.js";

// 미션 도전 API 핸들러
export const handleChallengeMission = async (req, res) => {
  const { userId, missionId } = req.body;

  try {
    const result = await challengeMission(userId, missionId);
    return res.status(StatusCodes.CREATED).success({
      message: "미션 도전 성공",
      data: result,
    });
  } catch (err) {
    if (err instanceof MissionChallengeError) {
      return res.status(StatusCodes.BAD_REQUEST).error({
        errorCode: err.errorCode,
        reason: err.reason,
        data: err.data,
      });
    }
    console.error("예기치 못한 오류:", err);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).error({
      errorCode: "unknown_error",
      reason: "서버에서 예기치 못한 오류가 발생했습니다.",
    });
  }
};
