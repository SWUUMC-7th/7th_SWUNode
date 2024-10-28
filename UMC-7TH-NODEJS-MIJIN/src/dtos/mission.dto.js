export class MissionDTO {
    constructor(store_id, mission_id, mission_name, reward) {
        this.mission_id = mission_id;
        this.store_id = store_id;
        this.mission_name = mission_name;
        this.reward = reward;
    }

    static validate(missionData) {
        const { store_id, mission_id, mission_name, reward } = missionData;

        if (!store_id || !mission_id || !mission_name || typeof reward !== "number") {
            throw new Error("잘못된 데이터입니다. 모든 필드를 올바르게 입력하세요.");
        }
    }
}
