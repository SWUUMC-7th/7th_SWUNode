export const bodyToUser = (body) => {
  const dob = new Date(body.dob);

  return {
    email: body.email,
    username: body.username,
    gender: body.gender,
    dob,
    address: body.address || "",
    detail_address: body.detail_address || "",
    phone_number: body.phone_number,
    preferences: body.preferences,
  };
};

export const responseFromUser = (user) => {
  return {
    user_id: user.user_id,
    email: user.email,
    username: user.username,
    gender: user.gender,
    dob: user.dob.toISOString().split('T')[0],  // 날짜를 YYYY-MM-DD 형식으로 변환
    address: user.address || "",
    detail_address: user.detail_address || "",
    phone_number: user.phone_number,
    preferences: user.preferences || [],  // 기본적으로 빈 배열로 설정
    created_at: user.created_at ? user.created_at.toISOString() : null,
    updated_at: user.updated_at ? user.updated_at.toISOString() : null,
  };
};

