// services/mission.service.js
const missionRepository = require('../repositories/mission.repository');

/**
 * 특정 지역의 미션 정보를 조회하는 함수
 * @param {number} selectedRegionId - 선택된 지역 ID
 * @param {number} limit - 결과의 최대 개수
 * @param {number} offset - 결과의 시작 위치
 * @returns {Promise<Array>} - 미션 정보 배열
 */
const fetchMissionsByRegion = async (selectedRegionId, limit, offset) => {
    return await missionRepository.getMissionsByRegion(selectedRegionId, limit, offset);
};

module.exports = {
    fetchMissionsByRegion,
};
