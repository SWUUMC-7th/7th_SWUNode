import { createRegion } from "../services/region.service.js";
import { StatusCodes } from "http-status-codes";

// 지역 추가
export const handleCreateRegion = async (req, res) => {
  /*
    #swagger.summary = '지역 추가 API';
    #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              regionName: { type: "string", example: "서울" },
              description: { type: "string", example: "서울 특별시" },
              country: { type: "string", example: "대한민국" }
            },
            required: ["regionName", "description", "country"]
          }
        }
      }
    };
    #swagger.responses[201] = {
      description: '지역 추가 성공',
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string", example: "SUCCESS" },
              error: { type: "object", nullable: true, example: null },
              success: {
                type: "object",
                properties: {
                  regionId: { type: "string", example: "456" },
                  regionName: { type: "string", example: "서울" },
                  description: { type: "string", example: "서울 특별시" },
                  country: { type: "string", example: "대한민국" }
                }
              }
            }
          }
        }
      }
    };
    #swagger.responses[400] = {
      description: '잘못된 요청 데이터',
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string", example: "FAIL" },
              error: {
                type: "object",
                properties: {
                  errorCode: { type: "string", example: "region_creation_failed" },
                  reason: { type: "string", example: "지역 생성에 실패했습니다." },
                  data: { type: "object", example: { regionName: "서울", description: "서울 특별시" } }
                }
              },
              success: { type: "object", nullable: true, example: null }
            }
          }
        }
      }
    };
    #swagger.responses[500] = {
      description: '서버 오류',
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string", example: "FAIL" },
              error: {
                type: "object",
                properties: {
                  errorCode: { type: "string", example: "unknown_error" },
                  reason: { type: "string", example: "서버에서 오류가 발생했습니다." }
                }
              },
              success: { type: "object", nullable: true, example: null }
            }
          }
        }
      }
    };
  */
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
