import { StatusCodes } from "http-status-codes";
import { bodyToChallenge } from "../dtos/challenge.dto.js";
import { addChallenge } from "../services/challenge.service.js";

export const handleAddChallenge = async (req, res) => {
  try {
    const challenge = bodyToChallenge(req.body);
    const result = await addChallenge(challenge);
    res.status(StatusCodes.CREATED).json({ result });
  } catch (error) {
    console.error(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send('Server error');
  }
};