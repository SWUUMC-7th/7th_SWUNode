class ReviewDTO {
    constructor(reviewId, userId, storeId, body, score) {
        this.reviewId = reviewId;
        this.userId = userId;
        this.storeId = storeId;
        this.body = body;
        this.score = score;
    }
}

module.exports = ReviewDTO;
