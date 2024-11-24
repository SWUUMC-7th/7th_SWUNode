-- CreateTable
CREATE TABLE `user` (
    `userId` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(255) NOT NULL,
    `name` VARCHAR(100) NOT NULL,
    `gender` VARCHAR(15) NOT NULL,
    `birth` DATE NULL,
    `address` VARCHAR(255) NOT NULL,
    `detailAddress` VARCHAR(255) NULL,
    `phoneNumber` VARCHAR(15) NOT NULL,

    UNIQUE INDEX `email`(`email`),
    PRIMARY KEY (`userId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `foodcategory` (
    `foodCategoryId` INTEGER NOT NULL AUTO_INCREMENT,
    `foodCategoryName` VARCHAR(100) NOT NULL,

    PRIMARY KEY (`foodCategoryId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `userfavorcategory` (
    `userFavorCategoryId` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `foodCategoryId` INTEGER NOT NULL,

    INDEX `f_category_id`(`foodCategoryId`),
    INDEX `user_id`(`userId`),
    PRIMARY KEY (`userFavorCategoryId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `mission` (
    `missionId` INTEGER NOT NULL AUTO_INCREMENT,
    `storeId` INTEGER NOT NULL,
    `missionSpec` TEXT NOT NULL,

    INDEX `m_store_id`(`storeId`),
    PRIMARY KEY (`missionId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `usermission` (
    `userMissionId` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `missionId` INTEGER NOT NULL,
    `status` VARCHAR(15) NOT NULL,

    INDEX `m_id`(`missionId`),
    INDEX `um_user_id`(`userId`),
    PRIMARY KEY (`userMissionId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `store` (
    `storeId` INTEGER NOT NULL AUTO_INCREMENT,
    `regionId` INTEGER NOT NULL,
    `storeName` VARCHAR(50) NOT NULL,
    `address` VARCHAR(50) NOT NULL,

    INDEX `r_id`(`regionId`),
    PRIMARY KEY (`storeId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Region` (
    `regionId` INTEGER NOT NULL AUTO_INCREMENT,
    `regionName` VARCHAR(155) NOT NULL,

    PRIMARY KEY (`regionId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Review` (
    `reviewId` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `storeId` INTEGER NOT NULL,
    `body` TEXT NOT NULL,

    PRIMARY KEY (`reviewId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `userfavorcategory` ADD CONSTRAINT `userfavorcategory_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`userId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `userfavorcategory` ADD CONSTRAINT `userfavorcategory_foodCategoryId_fkey` FOREIGN KEY (`foodCategoryId`) REFERENCES `foodcategory`(`foodCategoryId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `mission` ADD CONSTRAINT `mission_storeId_fkey` FOREIGN KEY (`storeId`) REFERENCES `store`(`storeId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `usermission` ADD CONSTRAINT `usermission_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`userId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `usermission` ADD CONSTRAINT `usermission_missionId_fkey` FOREIGN KEY (`missionId`) REFERENCES `mission`(`missionId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `store` ADD CONSTRAINT `store_regionId_fkey` FOREIGN KEY (`regionId`) REFERENCES `Region`(`regionId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Review` ADD CONSTRAINT `Review_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`userId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Review` ADD CONSTRAINT `Review_storeId_fkey` FOREIGN KEY (`storeId`) REFERENCES `store`(`storeId`) ON DELETE RESTRICT ON UPDATE CASCADE;
