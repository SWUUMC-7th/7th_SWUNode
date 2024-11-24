import {addStore, getStoreById} from "../repositories/store.repository.js";
import {responseFromStore} from "../dtos/store.dto.js";
import { StoreCreationError } from "../errors.js";

export const listStoreReviews = async (storeId) => {
    const reviews = await getAllStoreReviews(storeId);
  if (!reviews) {
    throw new Error("해당 Store에 대한 리뷰가 존재하지 않습니다.");
  }
  return responseFromReviews(reviews);
};

export const storeSignUp = async (data) => {
    const storeId = await addStore({ name: data.name });

  if (!storeId) {
    throw new StoreCreationError("Store 등록에 실패했습니다.", data);
  }

  const store = await getStoreById(storeId);
  if (!store) {
    throw new Error("등록된 Store 정보를 찾을 수 없습니다.");
  }

  return responseFromStore({ store });
};