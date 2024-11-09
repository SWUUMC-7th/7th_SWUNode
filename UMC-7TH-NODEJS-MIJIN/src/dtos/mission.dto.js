export class MissionDTO {
    constructor(store_id, missionId, missionName, reward) {
        this.missionId = missionId;
        this.storeId = storeId;
        this.missionName = missionName;
        this.reward = reward;
    }

    static validate(missionData) {
        const { storeId, missionId, missionName, reward } = missionData;

        if (!storeId || !missionId || !missionName || typeof reward !== "number") {
            throw new Error("잘못된 데이터입니다. 모든 필드를 올바르게 입력하세요.");
        }
    }
}
