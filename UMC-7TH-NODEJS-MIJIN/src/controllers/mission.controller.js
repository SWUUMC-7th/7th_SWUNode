const missionService = require('../services/mission.service');

/**
 * 모든 미션 정보를 조회하는 API
 */
const getAllMissions = async (req, res) => {
    try {
        const missions = await missionService.getAllMissions();
        res.status(200).json(missions);
    } catch (error) {
        console.error("Error fetching missions:", error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

/**
 * 특정 가게의 미션 정보를 조회하는 API
 * @param {Request} req
 * @param {Response} res
 */
const getMissionsByStoreId = async (req, res) => {
    const { storeId } = req.params;
    try {
        const missions = await missionService.getMissionsByStoreId(storeId);
        res.status(200).json(missions);
    } catch (error) {
        console.error("Error fetching missions:", error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = {
    getAllMissions,
    getMissionsByStoreId,
};
