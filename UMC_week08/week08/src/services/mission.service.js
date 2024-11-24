import { addMission } from "../repositories/mission.repository.js";

import { responseFromMission } from "../dtos/mission.dto.js";

export const createMission = async (data) => {
    try {
        const missionId = await addMission(data);
        if (!missionId) {
          throw new MissionCreationError("미션 생성에 실패했습니다.", data);
        }
        return responseFromMission({ id: missionId, ...data });
      } catch (error) {
        throw error;
      }
    };

    // mission.service.js
import { pool } from "../db.config.js";

export default addMission;
