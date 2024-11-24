export const bodyToReview = (body) => {
    if (!body.storeId) {
        throw new ValidationError("storeId가 누락되었습니다.", body);
    }
    return {
        storeId: body.storeId,
        content: body.content || "",
    };
};

export const responseFromReview = (user_store_review) => {
    return {
        id: review.id,
        storeId: review.store_id,
        userId: review.user_id,
        content: review.content,
    };
};