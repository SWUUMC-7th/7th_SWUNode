import { createMission } from "../services/mission.service.js";

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
