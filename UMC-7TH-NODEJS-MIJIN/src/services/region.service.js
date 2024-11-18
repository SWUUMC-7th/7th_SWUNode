import { addRegion } from "../repositories/region.repository.js";

export const createRegion = async (data) => {
  try {
    const regionId = await addRegion(data);
    return regionId;
  } catch (error) {
    throw new Error(`지역 추가 중 오류가 발생했습니다. (${error.message})`);
  }
};
