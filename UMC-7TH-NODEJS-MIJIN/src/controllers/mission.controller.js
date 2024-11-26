import { prisma } from '../db.config.js';
import { createMission } from "../services/mission.service.js";
import { handleGetInProgressMissionsByUserId } from "../services/mission.service.js";
import { handleGetMissionsByStoreId } from "../services/mission.service.js";

// 미션 생성 요청 핸들러
export const handleCreateMission = async (req, res) => {
  /*
    #swagger.summary = '미션 생성 API';
    #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              storeId: { type: "string", example: "123" },
              description: { type: "string", example: "가게 방문 후 리뷰 작성" },
              points: { type: "integer", example: 100 },
              deadline: { type: "string", format: "date-time", example: "2024-11-30T23:59:59Z" }
            },
            required: ["storeId", "description", "points", "deadline"]
          }
        }
      }
    };
    #swagger.responses[201] = {
      description: '미션 생성 성공',
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
                  missionId: { type: "string", example: "789" },
                  storeId: { type: "string", example: "123" },
                  description: { type: "string", example: "가게 방문 후 리뷰 작성" },
                  points: { type: "integer", example: 100 },
                  deadline: { type: "string", format: "date-time", example: "2024-11-30T23:59:59Z" }
                }
              }
            }
          }
        }
      }
    };
    #swagger.responses[400] = {
      description: '미션 생성 실패',
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string", example: "FAIL" },
              error: {
                type: "object",
                properties: {
                  errorCode: { type: "string", example: "mission_creation_failed" },
                  reason: { type: "string", example: "미션 추가에 실패했습니다." }
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
    const missionData = req.body;
    const missionId = await createMission(missionData);
    res.status(StatusCodes.CREATED).success({ message: "미션이 추가되었습니다.", missionId });
  } catch (error) {
    console.error("미션 추가 중 오류 발생:", error);
    res.status(StatusCodes.BAD_REQUEST).error({
      errorCode: "mission_creation_failed",
      reason: error.message,
    });
  }
};

// 내가 진행 중인 미션 목록 조회
export const getInProgressMissions = async (req, res) => {
  /*
    #swagger.summary = '사용자가 진행 중인 미션 목록 조회 API';
    #swagger.parameters['userId'] = {
      in: 'path',
      description: '진행 중인 미션을 조회할 사용자 ID',
      required: true,
      schema: {
        type: 'string',
        example: '456'
      }
    };
    #swagger.responses[200] = {
      description: '진행 중인 미션 목록 조회 성공',
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
                    missionId: { type: "string", example: "789" },
                    storeId: { type: "string", example: "123" },
                    description: { type: "string", example: "가게 방문 후 리뷰 작성" },
                    points: { type: "integer", example: 100 },
                    deadline: { type: "string", format: "date-time", example: "2024-11-30T23:59:59Z" },
                    status: { type: "string", example: "in-progress" }
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
  const userId = parseInt(req.params.userId); // URL 파라미터로 전달받은 userId

  try {
    const missions = await handleGetInProgressMissionsByUserId(userId);
    res.status(StatusCodes.OK).success(missions); // 성공 시 결과 반환
  } catch (error) {
    console.error("진행 중인 미션 목록 조회 중 오류 발생:", error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).error({
      errorCode: "mission_fetch_failed",
      reason: error.message,
    });
  }
};

// 진행 중인 미션을 완료로 변경
export const markMissionAsCompleted = async (req, res, next) => {
  /*
    #swagger.summary = '진행 중인 미션을 완료로 변경 API';
    #swagger.parameters['userId'] = {
      in: 'path',
      description: '미션을 완료로 변경할 사용자 ID',
      required: true,
      schema: {
        type: 'string',
        example: '456'
      }
    };
    #swagger.parameters['missionId'] = {
      in: 'path',
      description: '완료할 미션 ID',
      required: true,
      schema: {
        type: 'string',
        example: '789'
      }
    };
    #swagger.responses[200] = {
      description: '미션 완료 성공',
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
                  missionId: { type: "string", example: "789" },
                  status: { type: "string", example: "completed" }
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
                  errorCode: { type: "string", example: "mission_update_failed" },
                  reason: { type: "string", example: "미션 완료 처리에 실패했습니다." }
                }
              },
              success: { type: "object", nullable: true, example: null }
            }
          }
        }
      }
    };
  */
  const { userId, missionId } = req.params;
  console.log(`미션 완료 요청 - 사용자 ID: ${userId}, 미션 ID: ${missionId}`);

  try {
    const updatedMission = await prisma.userMission.update({
      where: { missionId: Number(missionId), userId: Number(userId) },
      data: { status: "completed" },
    });
    res.status(StatusCodes.OK).success(updatedMission); // 성공 응답
  } catch (error) {
    console.error("미션 완료 처리 중 오류 발생:", error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).error({
      errorCode: "mission_update_failed",
      reason: "미션 완료 처리에 실패했습니다.",
    });
  }
};

// 특정 가게의 미션 목록 조회
export const getMissionsByStore = async (req, res) => {
  /*
    #swagger.summary = '특정 가게의 미션 목록 조회 API';
    #swagger.parameters['storeId'] = {
      in: 'path',
      description: '미션을 조회할 가게 ID',
      required: true,
      schema: {
        type: 'string',
        example: '123'
      }
    };
    #swagger.responses[200] = {
      description: '가게의 미션 목록 조회 성공',
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
                    missionId: { type: "string", example: "789" },
                    description: { type: "string", example: "가게 방문 후 리뷰 작성" },
                    points: { type: "integer", example: 100 },
                    deadline: { type: "string", format: "date-time", example: "2024-11-30T23:59:59Z" },
                    status: { type: "string", example: "in-progress" }
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
                  errorCode: { type: "string", example: "mission_list_fetch_failed" },
                  reason: { type: "string", example: "가게 미션 목록 조회 실패" }
                }
              },
              success: { type: "object", nullable: true, example: null }
            }
          }
        }
      }
    };
  */
  const storeId = parseInt(req.params.storeId); // URL 파라미터로 전달받은 storeId

  try {
    const missions = await handleGetMissionsByStoreId(storeId);
    res.status(StatusCodes.OK).success(missions); // 성공 시 미션 목록 반환
  } catch (error) {
    console.error("가게의 미션 목록 조회 중 오류 발생:", error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).error({
      errorCode: "mission_list_fetch_failed",
      reason: error.message,
    });
  }
};
