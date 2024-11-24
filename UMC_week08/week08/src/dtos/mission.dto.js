export const bodyToMission = (body) => {
    return {
      storeId: body.storeId,
      description: body.description,
      reward: body.reward,
    };
  };
  
export const responseFromMission = (mission) => {
    return {
      id: mission.id,
      storeId: mission.storeId,
      description: mission.description,
      reward: mission.reward,
    };
};