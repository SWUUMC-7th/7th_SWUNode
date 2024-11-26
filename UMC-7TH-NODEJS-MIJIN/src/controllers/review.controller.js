import { prisma } from '../db.config.js';
import { StatusCodes } from "http-status-codes";
import { createReview, getReviewsByStore } from "../services/review.service.js";
import { bodyToReview } from "../dtos/review.dto.js"; // 요청 본문에서 리뷰 데이터를 변환하는 함수로 가정
import { findReviewsByUserId } from "../services/review.service.js";

// 리뷰 생성 요청 핸들러
export const handleCreateReview = async (req, res, next) => {
  /*
    #swagger.summary = '리뷰 생성 API';
    #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              storeId: { type: "string", example: "123" },
              userId: { type: "string", example: "456" },
              body: { type: "string", example: "매우 좋은 가게였습니다." },
              score: { type: "integer", example: 5 },
              createdAt: { type: "string", format: "date-time", example: "2024-11-01T10:00:00Z" }
            },
            required: ["storeId", "userId", "body", "score"]
          }
        }
      }
    };
    #swagger.responses[201] = {
      description: '리뷰 생성 성공',
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
                  reviewId: { type: "string", example: "789" },
                  storeId: { type: "string", example: "123" },
                  userId: { type: "string", example: "456" },
                  body: { type: "string", example: "매우 좋은 가게였습니다." },
                  score: { type: "integer", example: 5 },
                  createdAt: { type: "string", format: "date-time", example: "2024-11-01T10:00:00Z" }
                }
              }
            }
          }
        }
      }
    };
    #swagger.responses[400] = {
      description: '리뷰 생성 실패',
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string", example: "FAIL" },
              error: {
                type: "object",
                properties: {
                  errorCode: { type: "string", example: "review_creation_failed" },
                  reason: { type: "string", example: "리뷰 추가에 실패했습니다." }
                }
              },
              success: { type: "object", nullable: true, example: null }
            }
          }
        }
      }
    };
  */
  console.log("리뷰 추가 요청:", req.body);

  try {
    const review = await prisma.review.create({
      data: req.body,
    });
    res.status(StatusCodes.CREATED).success(review); // 상태 코드 201 사용
  } catch (error) {
    console.error("리뷰 추가 중 오류 발생:", error);
    res.status(StatusCodes.BAD_REQUEST).error({
      errorCode: "review_creation_failed",
      reason: "리뷰 추가에 실패했습니다.",
    });
  }
};

// 특정 가게의 리뷰 목록 조회 요청 핸들러
export const handleGetReviewsByStore = async (req, res, next) => {
  /*
    #swagger.summary = '특정 가게의 리뷰 목록 조회 API';
    #swagger.parameters['storeId'] = {
      in: 'path',
      description: '리뷰를 조회할 가게의 ID',
      required: true,
      schema: {
        type: 'string',
        example: '123'
      }
    };
    #swagger.responses[200] = {
      description: '리뷰 목록 조회 성공',
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              result: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    reviewId: { type: "string", example: "789" },
                    storeId: { type: "string", example: "123" },
                    userId: { type: "string", example: "456" },
                    body: { type: "string", example: "매우 좋은 가게였습니다." },
                    score: { type: "integer", example: 5 },
                    createdAt: { type: "string", format: "date-time", example: "2024-11-01T10:00:00Z" }
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
                  errorCode: { type: "string", example: "internal_server_error" },
                  reason: { type: "string", example: "서버 오류 발생" }
                }
              },
              success: { type: "object", nullable: true, example: null }
            }
          }
        }
      }
    };
  */
  const { storeId } = req.params;  // storeId로 파라미터를 받아옵니다.

  try {
    const reviews = await getReviewsByStore(storeId);  // getReviewsByStore 함수에서 리뷰 데이터를 가져옵니다.
    res.status(StatusCodes.OK).json({ result: reviews });
  } catch (error) {
    console.error(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send('Server error');
  }
};

// 내가 작성한 리뷰 목록 조회
export const handleGetReviewsByUser = async (req, res, next) => {
  /*
    #swagger.summary = '사용자가 작성한 리뷰 목록 조회 API';
    #swagger.parameters['userId'] = {
      in: 'path',
      description: '리뷰를 조회할 사용자 ID',
      required: true,
      schema: {
        type: 'string',
        example: '456'
      }
    };
    #swagger.responses[200] = {
      description: '사용자가 작성한 리뷰 목록 조회 성공',
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              result: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    reviewId: { type: "string", example: "789" },
                    storeId: { type: "string", example: "123" },
                    userId: { type: "string", example: "456" },
                    body: { type: "string", example: "매우 좋은 가게였습니다." },
                    score: { type: "integer", example: 5 },
                    createdAt: { type: "string", format: "date-time", example: "2024-11-01T10:00:00Z" }
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
                  errorCode: { type: "string", example: "internal_server_error" },
                  reason: { type: "string", example: "서버 오류 발생" }
                }
              },
              success: { type: "object", nullable: true, example: null }
            }
          }
        }
      }
    };
  */
  const { userId } = req.params;  // URL 파라미터로 사용자 ID를 받음

  try {
    const reviews = await findReviewsByUserId(userId);  // 리뷰 목록 조회
    res.status(StatusCodes.OK).json({ result: reviews });
  } catch (error) {
    console.error(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send('Server error');
  }
};
