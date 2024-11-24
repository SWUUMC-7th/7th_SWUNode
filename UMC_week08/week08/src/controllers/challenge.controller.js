import { challengeSignUp } from "../services/challenge.service.js";
/*
export const handleChallengeSignUp = async (req, res) => {
    try {
        const challengeData = req.body;
        const challenge = await challengeSignUp(challengeData);
        res.status(201).json(challenge);
    } catch (err) {
        res.status(500).json({message: err.message});
    }
};
*/

export const handleChallengeSignUp = async (req, res) => {
    try {
        const challengeData = req.body;
        const challenge = await challengeSignUp(challengeData);
        res.status(201).json(challenge);
    } catch (err) {
        res.status(500).json({message: err.message});
    }
    /*
    #swagger.summary = 'Challenge 등록 API';
    #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              id: { type: "int" },
              missionId: { type: "int" },
              userId: { type: "int" },
              status: { type: "string", description: "챌린지 진행과 완료" },
              
            }
          }
        }
      }
    };
    #swagger.responses[201] = {
      description: "챌린지 등록 성공 응답",
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
                    id: { type: "int" },
                    missionId: { type: "int" },
                    userId: { type: "int" },
                    status: { type: "string" }
                }
              }
            }
          }
        }
      }
    };
    #swagger.responses[400] = {
      description: "챌린지 생성 실패 응답",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string", example: "FAIL" },
              error: {
                type: "object",
                properties: {
                  errorCode: { type: "string", example: "UM001" },
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
  res.success(...);
};