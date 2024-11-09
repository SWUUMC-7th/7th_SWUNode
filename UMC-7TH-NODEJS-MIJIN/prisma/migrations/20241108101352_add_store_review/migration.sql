/*
  Warnings:

  - The primary key for the `userFavorCategory` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE `userFavorCategory` DROP FOREIGN KEY `userFavorCategory_user_id_fkey`;

-- AlterTable
ALTER TABLE `foodCategory` MODIFY `FoodCategoryName` VARCHAR(100) NOT NULL;

-- AlterTable
ALTER TABLE `userFavorCategory` DROP PRIMARY KEY,
    MODIFY `userFavorCategoryId` BIGINT NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`userFavorCategoryId`);

-- CreateTable
CREATE TABLE `userStoreReview` (
    `userStoreReviewId` BIGINT NOT NULL AUTO_INCREMENT,
    `storeId` BIGINT NOT NULL,
    `userId` BIGINT NOT NULL,
    `content` TEXT NOT NULL,

    INDEX `userStoreReview_storeId_index`(`storeId`),
    INDEX `userStoreReview_userId_index`(`userId`),
    PRIMARY KEY (`userStoreReviewId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `store` (
    `storeId` BIGINT NOT NULL AUTO_INCREMENT,
    `storeName` VARCHAR(100) NOT NULL,

    PRIMARY KEY (`storeId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `userFavorCategory` ADD CONSTRAINT `userFavorCategory_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`userId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `userStoreReview` ADD CONSTRAINT `userStoreReview_storeId_fkey` FOREIGN KEY (`storeId`) REFERENCES `store`(`storeId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `userStoreReview` ADD CONSTRAINT `userStoreReview_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`userId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- RenameIndex
ALTER TABLE `userFavorCategory` RENAME INDEX `foodCategoryId` TO `userFavorCategory_foodCategoryId_index`;

-- RenameIndex
ALTER TABLE `userFavorCategory` RENAME INDEX `userId` TO `userFavorCategory_userId_index`;
