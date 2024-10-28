// 가게 데이터 전송 객체
export const bodyToStore = (body) => {
    return {
        store_id: body.store_id,
        store_name: body.store_name,
        store_address: body.store_address,
        phone_number: body.phone_number,
        region_id: body.regionId,
    };
};
