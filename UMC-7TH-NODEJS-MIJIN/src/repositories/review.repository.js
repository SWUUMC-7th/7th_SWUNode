// repositories/review.repository.js
const db = require('../config/db');  // DB 연결 파일

/**
 * 새로운 리뷰를 생성하는 함수
 * @param {number} userId - 사용자 ID
 * @param {number} storeId - 가게 ID
 * @param {string} body - 리뷰 내용
 * @param {number} score - 리뷰 점수
 * @returns {Promise<Object>} - 생성된 리뷰 결과
 */
const createReview = async (userId, storeId, body, score) => {
    const query = `
        INSERT INTO review (user_id, store_id, body, score)
        VALUES (?, ?, ?, ?)
    `;

    try {
        const [result] = await db.execute(query, [userId, storeId, body, score]);
        return result;  // 생성된 리뷰 정보 반환
    } catch (error) {
        console.error("Error creating review:", error);
        throw error;
    }
};

module.exports = {
    createReview,
};
