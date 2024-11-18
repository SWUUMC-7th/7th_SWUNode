/*
  Warnings:

  - Added the required column `phoneNumber` to the `store` table without a default value. This is not possible if the table is not empty.
  - Added the required column `regionId` to the `store` table without a default value. This is not possible if the table is not empty.
  - Added the required column `storeAddress` to the `store` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `store` ADD COLUMN `phoneNumber` VARCHAR(20) NOT NULL,
    ADD COLUMN `regionId` BIGINT NOT NULL,
    ADD COLUMN `storeAddress` VARCHAR(255) NOT NULL;

-- CreateTable
CREATE TABLE `Region` (
    `regionId` BIGINT NOT NULL AUTO_INCREMENT,
    `regionName` VARCHAR(100) NOT NULL,

    PRIMARY KEY (`regionId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `store` ADD CONSTRAINT `store_regionId_fkey` FOREIGN KEY (`regionId`) REFERENCES `Region`(`regionId`) ON DELETE RESTRICT ON UPDATE CASCADE;
