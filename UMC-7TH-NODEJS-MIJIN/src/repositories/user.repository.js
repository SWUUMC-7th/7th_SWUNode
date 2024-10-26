// repositories/user.repositories.js
const db = require('../config/db');  // DB 연결 파일

/**
 * 특정 사용자의 정보를 조회하는 함수
 * @param {number} userId - 조회할 사용자의 ID
 * @returns {Promise<Object>} - 사용자 정보 (username, email, point)
 */
const getUserInfoById = async (userId) => {
    const query = `
        SELECT 
            u.username,
            u.email,
            u.point
        FROM user AS u
        WHERE u.user_id = ?
    `;

    try {
        const [rows] = await db.execute(query, [userId]);
        return rows[0];  // ID는 유니크하므로 첫 번째 결과 반환
    } catch (error) {
        console.error("Error fetching user info:", error);
        throw error;
    }
};

module.exports = {
    getUserInfoById,
};
