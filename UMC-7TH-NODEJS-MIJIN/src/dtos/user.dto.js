export const bodyToUser = (body) => {
  const dob = new Date(body.dob);

  return {
    email: body.email,
    userName: body.userName,
    gender: body.gender,
    dob,
    address: body.address || "",
    detailAddress: body.detailAddress || "",
    phoneNumber: body.phoneNumber,
    preferences: body.preferences || null,  
  };
};

export const responseFromUser = ({ user, preferences }) => {
  const preferFoods = preferences.map(
    (preference) => preference.foodCategory.name
  );

  return {
    email: user.email,
    name: user.name,
    preferCategory: preferFoods,
  };
};

