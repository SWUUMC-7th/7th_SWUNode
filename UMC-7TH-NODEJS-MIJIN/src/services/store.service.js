import { addStore } from "../repositories/store.repository.js";

// 가게 추가
export const createStore = async (data) => {
  const storeId = await addStore({
    store_id: data.store_id,
    store_name: data.store_name,
    store_address: data.store_address,
    phone_number: data.phone_number,
    region_id: data.regionId,
  });

  return storeId;
};
