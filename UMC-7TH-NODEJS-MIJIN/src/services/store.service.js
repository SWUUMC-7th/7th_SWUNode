import { addStore } from "../repositories/store.repository.js";

// 가게 추가
export const createStore = async (data) => {
  const storeId = await addStore({
    storeId: data.storeId,
    storeName: data.storeName,
    storeAddress: data.storeAddress,
    phoneNumber: data.phoneNumber,
    regionId: data.regionId,
  });

  return storeId;
};

export const listStoreReviews = async (storeId) => {
  const reviews = await getAllStoreReviews(storeId);
  return responseFromReviews(reviews);
};
