// 가게 데이터 전송 객체
export const bodyToStore = (body) => {
    return {
        storeId: body.storeId,
        storeName: body.storeName,
        storeAddress: body.storeAddress,
        phoneNumber: body.phoneNumber,
        regionId: body.regionId,
    };
};

export const responseFromReviews = (reviews) => {
    return {
      data: reviews,
      pagination: {
        cursor: reviews.length ? reviews[reviews.length - 1].id : null,
      },
    };
  };
