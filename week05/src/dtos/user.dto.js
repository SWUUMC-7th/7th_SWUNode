export const bodyToUser = (body) => {
    const dob = body.dob ? new Date(body.dob) : null;
  
    return {
      email: body.email,
      username: body.username,
      gender: body.gender,
      dob,
      address: body.address || "",
      detailAddress: body.detailAddress || "",
      phoneNumber: body.phoneNumber,
      preferences: body.preferences,
    };
  };

  export const responseFromUser = (user) => {
    return {
    email: body.email,
    username: body.name, // 'name'으로 수정
    gender: body.gender,
    birth: dob, // 여기서 dob을 사용
    address: body.address || "",
    detailAddress: body.detailAddress || "",
    phoneNumber: body.phoneNumber,
    preferences: body.preferences,
    };
  };