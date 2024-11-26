import { prisma } from '../db.config.js';
import { StatusCodes } from "http-status-codes";
import { createStore } from "../services/store.service.js";

// 가게 추가
export const handleCreateStore = async (req, res, next) => {
  /*
    #swagger.summary = '가게 추가 API';
    #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              storeName: { type: "string", example: "홍길동 카페" },
              location: { type: "string", example: "서울시 강남구" },
              category: { type: "string", example: "카페" },
              description: { type: "string", example: "커피와 디저트를 제공하는 아늑한 공간" }
            },
            required: ["storeName", "location", "category", "description"]
          }
        }
      }
    };
    #swagger.responses[200] = {
      description: '가게 추가 성공',
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
                  storeId: { type: "number", example: 123 },
                  storeName: { type: "string", example: "홍길동 카페" },
                  location: { type: "string", example: "서울시 강남구" },
                  category: { type: "string", example: "카페" },
                  description: { type: "string", example: "커피와 디저트를 제공하는 아늑한 공간" }
                }
              }
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
                  errorCode: { type: "string", example: "store_creation_failed" },
                  reason: { type: "string", example: "가게 추가에 실패했습니다." }
                }
              },
              success: { type: "object", nullable: true, example: null }
            }
          }
        }
      }
    };
  */
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

// 가게 리뷰 목록 조회
export const handleListStoreReviews = async (req, res, next) => {
  /*
    #swagger.summary = '가게의 리뷰 목록 조회 API';
    #swagger.parameters['storeId'] = {
      in: 'path',
      description: '가게 ID',
      required: true,
      schema: { type: 'integer', example: 1 }
    };
    #swagger.parameters['cursor'] = {
      in: 'query',
      description: '페이지네이션을 위한 커서 값',
      required: false,
      schema: { type: 'integer', example: 0 }
    };
    #swagger.responses[200] = {
      description: '가게의 리뷰 목록 조회 성공',
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string", example: "SUCCESS" },
              error: { type: "object", nullable: true, example: null },
              success: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    reviewId: { type: "number", example: 101 },
                    userId: { type: "number", example: 12 },
                    content: { type: "string", example: "좋은 가게!" },
                    rating: { type: "number", example: 5 }
                  }
                }
              }
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
                  errorCode: { type: "string", example: "store_reviews_fetch_failed" },
                  reason: { type: "string", example: "가게의 리뷰 목록을 불러오는 데 실패했습니다." }
                }
              },
              success: { type: "object", nullable: true, example: null }
            }
          }
        }
      }
    };
  */
  const reviews = await listStoreReviews(
    parseInt(req.params.storeId),
    typeof req.query.cursor === "string" ? parseInt(req.query.cursor) : 0
  );
  res.status(StatusCodes.OK).success(reviews);
};
