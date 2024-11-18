import { createRegion } from "../services/region.service.js";
import { StatusCodes } from "http-status-codes";

// 지역 추가
export const handleCreateRegion = async (req, res) => {
  try {
    const regionDTO = req.body;
    const region = await createRegion(regionDTO);
    res.status(StatusCodes.CREATED).success({
      message: "지역이 성공적으로 추가되었습니다.",
      region,
    });
  } catch (error) {
    if (error instanceof RegionCreationError) {
      res.status(StatusCodes.BAD_REQUEST).error({
        errorCode: error.errorCode,
        reason: error.reason,
        data: error.data,
      });
    } else {
      console.error("예기치 못한 오류:", error);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).error({
        errorCode: "unknown_error",
        reason: "서버에서 오류가 발생했습니다.",
      });
    }
  }
};
