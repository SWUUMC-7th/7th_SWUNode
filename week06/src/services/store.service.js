import { addStore } from "../repositories/store.repository.js";

export const createStore = async (data) => {
  const storeId = await addStore(data);
  return { id: storeId, ...data };
};


export const listStoreReviews = async (storeId) => {
    const reviews = await getAllStoreReviews(storeId);
    return responseFromReviews(reviews);
  };