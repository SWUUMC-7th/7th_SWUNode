export const bodyToMission = (body) => {
    return {
      storeId: body.storeId,
      description: body.description,
      reward: body.reward,
    };
  };
  