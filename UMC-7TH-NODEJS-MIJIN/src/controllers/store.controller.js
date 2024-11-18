import { prisma } from '../db.config.js';
import { StatusCodes } from "http-status-codes";
import { createStore } from "../services/store.service.js";

export const handleCreateStore = async (req, res, next) => {
  console.log("가게 추가 요청:", req.body);

  try {
    const store = await prisma.store.create({
      data: req.body,
    });
    res.status(StatusCodes.OK).success(store); // 상태 코드와 함께 성공 응답
  } catch (error) {
    console.error("가게 추가 중 오류 발생:", error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).error({
      errorCode: "store_creation_failed",
      reason: "가게 추가에 실패했습니다.",
    });
  }
};

export const handleListStoreReviews = async (req, res, next) => {
  const reviews = await listStoreReviews(
    parseInt(req.params.storeId),
    typeof req.query.cursor === "string" ? parseInt(req.query.cursor) : 0
  );
  res.status(StatusCodes.OK).success(reviews);
};
