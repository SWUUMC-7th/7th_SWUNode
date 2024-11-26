import { challengeMission } from "../services/userMission.service.js";
import { StatusCodes } from "http-status-codes";
import { MissionChallengeError } from "../errors.js";

/**
 * @swagger
 * /challenge-mission:
 *   post:
 *     summary: 사용자가 미션에 도전하는 API
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: number
 *                 example: 1
 *               missionId:
 *                 type: number
 *                 example: 101
 *             required:
 *               - userId
 *               - missionId
 *     responses:
 *       201:
 *         description: 미션 도전 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 미션 도전 성공
 *                 data:
 *                   type: object
 *                   description: 미션 도전 결과 데이터
 *       400:
 *         description: 미션 도전 실패 (잘못된 요청)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errorCode:
 *                   type: string
 *                   example: mission_challenge_failed
 *                 reason:
 *                   type: string
 *                   example: 미션 도전에 실패했습니다.
 *       500:
 *         description: 서버 오류
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errorCode:
 *                   type: string
 *                   example: unknown_error
 *                 reason:
 *                   type: string
 *                   example: 서버에서 예기치 못한 오류가 발생했습니다.
 */

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