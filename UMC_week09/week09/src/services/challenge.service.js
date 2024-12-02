import {addChallenge, getChallengeById, isChallengeExists} from "../repositories/challenge.repository.js";
import {responseFromChallenge} from "../dtos/challenge.dto.js";

export const addChallenge = async (db, data) => {
    const challengeId = await addChallenge(db, data);
  
    if (!challengeId) {
      throw new Error("챌린지를 추가할 수 없습니다.");
    }
  
    const challenge = await getChallengeById(db, challengeId);
    return responseFromChallenge(challenge);
  };