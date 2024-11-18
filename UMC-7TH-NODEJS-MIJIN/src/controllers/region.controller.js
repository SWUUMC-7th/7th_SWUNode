import { createRegion } from "../services/region.service.js";
import { RegionDTO } from "../dtos/region.dto.js";

// 지역 추가
export const handleCreateRegion = async (req, res) => {
  const { regionName } = req.body;

  try {
    // DTO로 데이터 변환
    const regionDTO = RegionDTO.fromRequestBody(req.body);

    // 지역 추가
    const regionId = await createRegion(regionDTO);

    res.status(201).json({
      message: "지역이 추가되었습니다.",
      regionId,
    });
  } catch (error) {
    res.status(400).json({
      message: `지역 추가 중 오류가 발생했습니다. (${error.message})`,
    });
  }
};
