/*
  Warnings:

  - The primary key for the `user` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `birth` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `detail_address` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `phone_number` on the `user` table. All the data in the column will be lost.
  - You are about to drop the `food_category` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user_favor_category` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `phoneNumber` to the `user` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `user_favor_category` DROP FOREIGN KEY `user_favor_category_food_category_id_fkey`;

-- DropForeignKey
ALTER TABLE `user_favor_category` DROP FOREIGN KEY `user_favor_category_user_id_fkey`;

-- AlterTable
ALTER TABLE `user` DROP PRIMARY KEY,
    DROP COLUMN `birth`,
    DROP COLUMN `detail_address`,
    DROP COLUMN `id`,
    DROP COLUMN `phone_number`,
    ADD COLUMN `detailAddress` VARCHAR(255) NULL,
    ADD COLUMN `dob` DATE NULL,
    ADD COLUMN `phoneNumber` VARCHAR(15) NOT NULL,
    ADD COLUMN `userId` BIGINT NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`userId`);

-- DropTable
DROP TABLE `food_category`;

-- DropTable
DROP TABLE `user_favor_category`;

-- CreateTable
CREATE TABLE `foodcategory` (
    `foodCategoryId` BIGINT NOT NULL AUTO_INCREMENT,
    `foodCategoryName` VARCHAR(100) NOT NULL,

    PRIMARY KEY (`foodCategoryId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `userfavorcategory` (
    `userFavorCategoryId` BIGINT NOT NULL AUTO_INCREMENT,
    `userId` BIGINT NOT NULL,
    `foodCategoryId` BIGINT NOT NULL,

    INDEX `f_category_id`(`foodCategoryId`),
    INDEX `user_id`(`userId`),
    PRIMARY KEY (`userFavorCategoryId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `mission` (
    `missionId` BIGINT NOT NULL AUTO_INCREMENT,
    `storeId` BIGINT NOT NULL,
    `missionSpec` TEXT NOT NULL,

    INDEX `m_store_id`(`storeId`),
    PRIMARY KEY (`missionId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `usermission` (
    `userMissionId` BIGINT NOT NULL AUTO_INCREMENT,
    `userId` BIGINT NOT NULL,
    `missionId` BIGINT NOT NULL,
    `status` VARCHAR(15) NOT NULL,

    INDEX `m_id`(`missionId`),
    INDEX `um_user_id`(`userId`),
    PRIMARY KEY (`userMissionId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `store` (
    `storeId` BIGINT NOT NULL AUTO_INCREMENT,
    `regionId` BIGINT NOT NULL,
    `storeName` VARCHAR(50) NOT NULL,
    `address` VARCHAR(50) NOT NULL,

    INDEX `r_id`(`regionId`),
    PRIMARY KEY (`storeId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Region` (
    `regionId` BIGINT NOT NULL AUTO_INCREMENT,
    `regionName` VARCHAR(155) NOT NULL,

    PRIMARY KEY (`regionId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Review` (
    `reviewId` BIGINT NOT NULL AUTO_INCREMENT,
    `userId` BIGINT NOT NULL,
    `storeId` BIGINT NOT NULL,
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
