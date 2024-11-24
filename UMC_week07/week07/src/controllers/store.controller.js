import { storeSignUp } from "../services/store.service.js";
import { responseFromReviews } from "../dtos/store.dto.js";
import { addStore } from "../services/store.service.js";

// Store 리뷰 목록 처리 함수
export const handleListStoreReviews = async (req, res, next) => {
  try {
    console.log("가게 추가 요청이 들어왔습니다!");
    console.log("body:", req.body); // 값이 잘 들어오나 확인하기 위한 테스트용

    const store = await addStore(bodyToStore(req.body));

    res.status(StatusCodes.OK).success(store);
  } catch (err) {
    next(err);
  }
};
  

export const handleStoreSignUp = async (req, res, next) => {
    try {
        const storeData = req.body;
        const store = await storeSignUp(storeData);

        // 성공 응답
        res.status(201).json(store);
      } catch (err) {
          next(err);
      }
  };

  export const handleAddStore = async (req, res, next) => {
    try {
      console.log("가게 추가 요청이 들어왔습니다!");
      console.log("body:", req.body); // 값이 잘 들어오나 확인하기 위한 테스트용
  
      const store = await addStore(bodyToStore(req.body));
  
      res.status(StatusCodes.OK).success(store);
    } catch (err) {
      next(err);
    }
  };