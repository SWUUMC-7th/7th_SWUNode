import { reviewSignUp } from "../services/review.service.js";
/*
export const handleReviewSignUp = async (req, res) => {
    try {
        const reviewData = req.body;
        console.log(req.body);
        const reivew = await reivewSignUp(reivewData);
        res.status(201).json(reivew);
    } catch (err) {
        res.status(500).json({message: err.message});
    }
};
*/

export const handleReviewSignUp = async (req, res) => {
    try {
        const reviewData = req.body;
        console.log(req.body);
        const reivew = await reivewSignUp(reivewData);
        res.status(201).json(reivew);
    } catch (err) {
        res.status(500).json({message: err.message});
    }

    /*
    #swagger.summary = '리뷰 작성 API';
    #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              id: { type: "int" },
              userId: { type: "int" },
              storeId: { type: "int" },
              body: { type: "string" }
              
            }
          }
        }
      }
    };
    #swagger.responses[201] = {
      description: "리뷰 작성 성공 응답",
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
                    userId: { type: "int" },
                    storeId: { type: "int" },
                    body: { type: "string" }
                }
              }
            }
          }
        }
      }
    };
    #swagger.responses[400] = {
      description: "리뷰 작성 실패 응답",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string", example: "FAIL" },
              error: {
                type: "object",
                properties: {
                  errorCode: { type: "string", example: "R001" },
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

