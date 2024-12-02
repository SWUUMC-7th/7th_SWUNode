// create mission
export const bodyToMission = (body) => {
    return {
        
        description: body.description,
        regionId: body.regionId,
        reward: body.reward,

    };
};

export const responseFromMission = (mission) => {
    return {
        missionId: mission.missionId,
        storeId: mission.storeId,
        descriptrion: mission.description,
        reward: mission.reward,
    };
}; 