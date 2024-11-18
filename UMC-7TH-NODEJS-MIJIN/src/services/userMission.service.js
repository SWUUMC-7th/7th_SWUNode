import { prisma } from "../db.config.js";
import { MissionChallengeError } from "../errors.js";

// 미션 도전하기
export const challengeMission = async (userId, missionId) => {
  try {
    const existingChallenge = await prisma.userMission.findUnique({
      where: { userId_missionId: { userId, missionId } },
    });

    if (existingChallenge) {
      throw new MissionChallengeError("이미 도전 중인 미션입니다.", {
        userId,
        missionId,
      });
    }

    const newChallenge = await prisma.userMission.create({
      data: {
        userId,
        missionId,
        status: "in_progress",
      },
    });

    return newChallenge;
  } catch (error) {
    if (error instanceof MissionChallengeError) {
      throw error; // 사용자 정의 오류 재발생
    }
    console.error("미션 도전 중 오류 발생:", error);
    throw new MissionChallengeError("미션 도전에 실패했습니다.", {
      userId,
      missionId,
      originalError: error.message,
    });
  }
};
