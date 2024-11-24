export const bodyToChallenge = (body) => {
    if (!body.userMissionId) {
        throw new ValidationError("missionId는 필수 값입니다."); // 유효성 검사 오류 처리
    }
    return {
        userMissionId: body.userMissionId,
    };
};

export const responseFromChallenge = (challenge) => {
    return {
        challengeId: challenge.challenge_id,
        missionId: challenge.mission_id,
        status: challenge.status,
    };
};