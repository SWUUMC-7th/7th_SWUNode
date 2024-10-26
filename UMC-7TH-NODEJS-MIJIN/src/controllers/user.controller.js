// controllers/user.controller.js
const userService = require('../services/user.service');

const getUserInfo = async (req, res) => {
    try {
        const userId = req.params.userId;
        const userInfo = await userService.getUserInfo(userId);
        res.json(userInfo);
    } catch (error) {
        res.status(500).json({ error: '내부 서버 오류' });
    }
};

module.exports = {
    getUserInfo,
};
