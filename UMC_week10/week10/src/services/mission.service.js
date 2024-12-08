import { addMission } from "../repositories/mission.repository.js";

export const createMission = async (data) => {
  const missionId = await addMission(data);
  return { id: missionId, ...data };
};