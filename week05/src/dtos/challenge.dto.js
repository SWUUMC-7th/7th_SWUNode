export const bodyToChallenge = (body) => {
    return {
      missionId: body.missionId,
      userId: body.userId,
    };
  };
  