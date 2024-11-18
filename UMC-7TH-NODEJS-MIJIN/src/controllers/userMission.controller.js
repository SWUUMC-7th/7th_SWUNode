import { challengeMission } from "../services/userMission.service.js";

// 미션 도전 API 핸들러
export const handleChallengeMission = async (req, res) => {
  const { user_id, mission_id } = req.body; // 요청 본문에서 user_id와 mission_id 추출

  try {
    const result = await challengeMission(user_id, mission_id);
    return res.status(201).json({
      message: "미션 도전 성공",
      data: result,
    });
  } catch (err) {
    return res.status(400).json({
      message: err.message,
    });
  }
};
