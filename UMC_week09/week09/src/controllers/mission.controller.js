import { StatusCodes } from "http-status-codes";
import { bodyToMission } from "../dtos/mission.dto.js";

//import { addMission } from "../services/mission.service.js";
import { addMission } from "../repositories/mission.repository.js"

export const handleAddMission = async (req, res) => {
    /*
    #swagger.summary = '미션을 생성하는 API';
    #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              missionSpec: { type: "string" }
              
            }
          }
        }
      }
    };
    #swagger.responses[201] = {
      description: "미션 생성 성공 응답",
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
                    id: {type: "int"},
                    missionSpec: { type: "string" },
                    storeId: {type: "int"}

                  
                }
              }
            }
          }
        }
      }
    };
    #swagger.responses[400] = {
      description: "미션 생성 실패 응답",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string", example: "FAIL" },
              error: {
                type: "object",
                properties: {
                  errorCode: { type: "string", example: "M001" },
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
    #swagger.responses[500] = {
      description: "서버 실패",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string", example: "Fail Server" },
              error: { type: "object", nullable: true, example: null },
              success: {
                type: "object",
                properties: {
                  errorCode: { type: "string", example: "DB001" },
                  reason: { type: "string" },
                  data: { type: "object" }
                }
              }
            }
          }
        }
      }
    };
  */
  try {
    const mission = bodyToMission(req.body);
    const result = await addMission(mission);
    res.status(StatusCodes.CREATED).json({ result });
  } catch (error) {
    console.error(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send('Server error');
  }
};