class MissionDTO {
    constructor(missionId, missionName, points, expirationDate, createdAt) {
        this.missionId = missionId;
        this.missionName = missionName;
        this.points = points;
        this.expirationDate = expirationDate;
        this.createdAt = createdAt;
    }
}

module.exports = MissionDTO;
