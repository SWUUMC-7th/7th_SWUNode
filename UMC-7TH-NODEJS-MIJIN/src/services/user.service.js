// services/user.service.js
const userRepository = require('../repositories/user.repository');

const getUserInfo = async (userId) => {
    return await userRepository.getUserInfoById(userId);
};

module.exports = {
    getUserInfo,
};
