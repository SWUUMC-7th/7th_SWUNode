// repositories/mission.repository.js
const db = require('../config/db');  // DB 연결 파일

/**
 * 특정 지역의 미션을 조회하는 함수
 * @param {number} selectedRegionId - 선택된 지역 ID
 * @param {number} limit - 결과의 최대 개수
 * @param {number} offset - 결과의 시작 위치
 * @returns {Promise<Array>} - 미션 정보 배열
 */
const getMissionsByRegion = async (selectedRegionId, limit, offset) => {
    const query = `
        SELECT 
            mission_id,
            mission_name,
            points,
            expiration_date,
            created_at
        FROM mission
        WHERE store_id IN (
            SELECT store_id
            FROM store
            WHERE region_id = ?
        )
        ORDER BY created_at DESC
        LIMIT ? OFFSET ?
    `;

    try {
        const [rows] = await db.execute(query, [selectedRegionId, limit, offset]);
        return rows;  // 조회된 미션 배열 반환
    } catch (error) {
        console.error("Error fetching missions by region:", error);
        throw error;
    }
};

module.exports = {
    getMissionsByRegion,
};
