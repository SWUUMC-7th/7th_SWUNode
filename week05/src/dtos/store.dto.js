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
  