import { storeSignUp } from "../services/store.service.js";
import { responseFromReviews } from "../dtos/store.dto.js";
import { addStore } from "../services/store.service.js";
import { listStoreReviews } from "../services/store.service.js";

// Store 리뷰 목록 처리 함수
export const handleListStoreReviews = async (req, res, next) => {
     /*
    #swagger.summary = '상점 리뷰 목록 조회 API';
    #swagger.responses[200] = {
      description: "상점 리뷰 목록 조회 성공 응답",
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
                  data: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        id: { type: "number" },
                        store: { type: "object", properties: { id: { type: "number" }, name: { type: "string" } } },
                        user: { type: "object", properties: { id: { type: "number" }, email: { type: "string" }, name: { type: "string" } } },
                        content: { type: "string" }
                      }
                    }
                  },
                  pagination: { type: "object", properties: { cursor: { type: "number", nullable: true } }}
                }
              }
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

export const handleStoreSignUp = async (req, res, next) => {
    try {
        const storeData = req.body;
        const store = await storeSignUp(storeData);

        // 성공 응답
        res.status(201).json(store);
      } catch (err) {
          next(err);
      }
  };

  export const handleAddStore = async (req, res, next) => {
    try {
      console.log("가게 추가 요청이 들어왔습니다!");
      console.log("body:", req.body); // 값이 잘 들어오나 확인하기 위한 테스트용
  
      const store = await addStore(bodyToStore(req.body));
  
      res.status(StatusCodes.OK).success(store);
    } catch (err) {
      next(err);
    }
  };