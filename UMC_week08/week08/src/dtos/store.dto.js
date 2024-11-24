export const responseFromReviews = (reviews) => {
    return {
      data: reviews,
      pagination: {
        cursor: reviews.length ? reviews[reviews.length - 1].id : null,
      },
    };
  };

  export const bodyToStore = (body) => {
    return {
        name: body.name
    };
  };

  export const responseFromStore = (store) => {
     return {
    data: reviews.map((review) => ({
      id: review.id,
      content: review.content,
      rating: review.rating,
      createdAt: review.createdAt,
    })),
    pagination: {
      cursor: reviews.length ? reviews[reviews.length - 1].id : null,
    },
  };
};