export const bodyToReview = (body) => {
    return {
      storeId: body.storeId,
      userId: body.userId,
      body: body.body,
      score: body.score,
    };
  };
  
  export const responseFromReview = (review) => {
    return {
      reviewId: review.reviewId,
      storeId: review.storeId,
      userId: review.userId,
      body: review.body,
      score: review.score,
      createdAt: review.createdAt,
      updatedAt: review.updatedAt,
    };
  };
  