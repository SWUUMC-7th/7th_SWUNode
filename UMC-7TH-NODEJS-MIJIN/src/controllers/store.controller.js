import { StatusCodes } from "http-status-codes";
import { createStore } from "../services/store.service.js";

export const handleCreateStore = async (req, res, next) => {
  console.log("가게 추가 요청을 받았습니다!");
  console.log("body:", req.body); // 요청 본문 확인용

  try {
    const storeData = req.body; // 요청 본문에서 가게 정보 가져오기
    const newStore = await createStore(storeData); // 서비스로 가게 생성 요청

    res.status(StatusCodes.CREATED).json({ result: newStore }); // 성공적으로 생성되면 응답
  } catch (error) {
    console.error(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("서버 오류 발생");
  }
};
