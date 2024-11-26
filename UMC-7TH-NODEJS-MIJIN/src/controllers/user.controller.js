import { prisma } from '../db.config.js';
import { StatusCodes } from "http-status-codes";
import { bodyToUser } from "../dtos/user.dto.js";
import { userSignUp } from "../services/user.service.js";

export const handleUserSignUp = async (req, res, next) => {
  /*
    #swagger.summary = '회원 가입 API';
    #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              email: { type: "string" },
              name: { type: "string" },
              gender: { type: "string" },
              birth: { type: "string", format: "date" },
              address: { type: "string" },
              detailAddress: { type: "string" },
              phoneNumber: { type: "string" },
              preferences: { type: "array", items: { type: "number" } }
            }
          }
        }
      }
    };
    #swagger.responses[200] = {
      description: "회원 가입 성공 응답",
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
                  email: { type: "string" },
                  name: { type: "string" },
                  preferCategory: { type: "array", items: { type: "string" } }
                }
              }
            }
          }
        }
      }
    };
    #swagger.responses[400] = {
      description: "회원 가입 실패 응답",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string", example: "FAIL" },
              error: {
                type: "object",
                properties: {
                  errorCode: { type: "string", example: "U001" },
                  reason: { type: "string" },
                  data: { type: "object" }
                }
              },
              success: { type: "object", nullable: true, example: null }
            }
          }
        }
      }
    };
  */
  console.log("회원가입을 요청했습니다!");
  console.log("body:", req.body); // 값이 잘 들어오나 확인하기 위한 테스트용
  const user = await userSignUp(bodyToUser(req.body));

  res.status(StatusCodes.OK).success(user);
};

// controllers/user.controller.js

export const getUser = async (req, res) => {
  /*
    #swagger.summary = '사용자 정보 조회 API';
    #swagger.parameters['userId'] = {
      in: 'path',
      description: '조회할 사용자 ID',
      required: true,
      schema: {
        type: 'string',
        example: '12345'
      }
    }
    #swagger.responses[200] = {
      description: '사용자 정보 조회 성공 응답',
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              userId: { type: "string", example: "12345" },
              email: { type: "string", example: "john.doe@example.com" },
              name: { type: "string", example: "John Doe" },
              gender: { type: "string", example: "male" },
              birth: { type: "string", format: "date", example: "1990-01-01" }
            }
          }
        }
      }
    };
    #swagger.responses[404] = {
      description: '사용자 찾을 수 없음',
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string", example: "FAIL" },
              error: {
                type: "object",
                properties: {
                  errorCode: { type: "string", example: "U002" },
                  reason: { type: "string", example: "User not found" }
                }
              },
              success: { type: "object", nullable: true, example: null }
            }
          }
        }
      }
    };
    #swagger.responses[500] = {
      description: '서버 내부 오류',
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string", example: "FAIL" },
              error: {
                type: "object",
                properties: {
                  errorCode: { type: "string", example: "INTERNAL_SERVER_ERROR" },
                  reason: { type: "string", example: "Unexpected error occurred" }
                }
              },
              success: { type: "object", nullable: true, example: null }
            }
          }
        }
      }
    };
  */
  console.log('Received request for userId:', req.params.userId); // 로그 추가
  const { userId } = req.params;
  try {
    const user = await prisma.user.findUnique({
      where: { userId: Number(userId) },
    });
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error('Error retrieving user:', error);
    res.status(500).json({ message: "Internal server error" });
  }
};


