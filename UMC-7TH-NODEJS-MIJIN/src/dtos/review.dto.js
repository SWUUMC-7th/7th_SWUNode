export const bodyToReview = (body) => {
    return {
      store_id: body.store_id,
      user_id: body.user_id,
      body: body.body,
      score: body.score,
    };
  };
  
  export const responseFromReview = (review) => {
    return {
      review_id: review.review_id,
      store_id: review.store_id,
      user_id: review.user_id,
      body: review.body,
      score: review.score,
      created_at: review.created_at,
      updated_at: review.updated_at,
    };
  };
  