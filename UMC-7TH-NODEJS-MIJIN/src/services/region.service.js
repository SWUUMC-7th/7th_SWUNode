import { prisma } from "../db.config.js";
import { RegionCreationError } from "../errors.js";

export const createRegion = async (regionDTO) => {
  try {
    return await prisma.region.create({
      data: regionDTO,
    });
  } catch (error) {
    console.error("지역 추가 중 오류가 발생했습니다.:", error);
    throw new RegionCreationError("지역 생성에 실패했습니다.", {
      regionDTO,
      originalError: error.message,
    });
  }
};
