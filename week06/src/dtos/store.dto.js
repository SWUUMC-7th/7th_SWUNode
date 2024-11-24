//가게
export const bodyToStore = (body) => {
    return {
      name: body.name,
      regionId: body.regionId,
      address: body.address,
      detailAddress: body.detailAddress || "",
      phone_number: body.phone_number,
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
  export const responseFromStore = (store) => {
    return {
        id : store.id,
        name : store.name
    };
  };