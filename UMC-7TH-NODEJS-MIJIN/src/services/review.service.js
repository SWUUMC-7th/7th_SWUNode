// services/review.service.js
const reviewRepository = require('../repositories/review.repository');

/**
 * 사용자의 리뷰를 생성하는 함수
 * @param {number} userId - 사용자 ID
 * @param {number} storeId - 가게 ID
 * @param {string} body - 리뷰 내용
 * @param {number} score - 리뷰 점수
 * @returns {Promise<Object>} - 생성된 리뷰 결과
 */
const addReview = async (userId, storeId, body, score) => {
    return await reviewRepository.createReview(userId, storeId, body, score);
};

module.exports = {
    addReview,
};
