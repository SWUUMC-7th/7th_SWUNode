//특정 지역에 가게 추가하기
/*import { StatusCodes } from "http-status-codes";
import { bodyToStore } from "../dtos/store.dto.js";
import { addStore } from "../services/store.service.js";

export const handleAddStore = async (req, res) => {
  try {
    const store = bodyToStore(req.body);
    const result = await addStore(store);
    res.status(StatusCodes.CREATED).json({ result });
  } catch (error) {
    console.error(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send('Server error');
  }
};
*/
//Express에서 Query Param 조회
import { storeSignUp } from "../services/store.service.js";

export const handleListStoreReviews = async (req, res, next) => {
    const reviews = await listStoreReviews(
        req.params.storeId
    );
    res.status(StatusCodes.OK).success(reviews);
  };

  export const handleStoreSignUp = async (req, res) => {
    try {
        const storeData = req.body;
        const store = await storeSignUp(storeData);
        res.status(201).json(store);
    } catch (err) {
        res.status(500).json({message: err.message});
    }
};