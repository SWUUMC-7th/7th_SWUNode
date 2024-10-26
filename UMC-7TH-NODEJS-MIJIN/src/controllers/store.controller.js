const storeService = require('../services/store.service');

/**
 * 모든 가게 정보를 조회하는 API
 */
const getAllStores = async (req, res) => {
    try {
        const stores = await storeService.getAllStores();
        res.status(200).json(stores);
    } catch (error) {
        console.error("Error fetching stores:", error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

/**
 * 특정 가게 정보를 조회하는 API
 * @param {Request} req
 * @param {Response} res
 */
const getStoreById = async (req, res) => {
    const { storeId } = req.params;
    try {
        const store = await storeService.getStoreById(storeId);
        if (store) {
            res.status(200).json(store);
        } else {
            res.status(404).json({ message: 'Store not found' });
        }
    } catch (error) {
        console.error("Error fetching store:", error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = {
    getAllStores,
    getStoreById,
};
