import { addChallenge } from "../repositories/challenge.repository.js";

export const createChallenge = async (data) => {
  const challengeId = await addChallenge(data);
  return { id: challengeId, ...data };
};
