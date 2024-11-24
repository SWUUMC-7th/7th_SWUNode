import { StatusCodes } from "http-status-codes";
import { bodyToMission } from "../dtos/mission.dto.js";
import { addMission } from "../repositories/mission.repository.js";

export const handleAddMission = async (req, res) => {
  try {
    const mission = bodyToMission(req.body);
    const result = await addMission(mission);
    res.status(StatusCodes.CREATED).json({ result });
  } catch (error) {
    console.error(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send('Server error');
  }
};
