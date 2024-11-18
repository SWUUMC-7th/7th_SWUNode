-- CreateTable
CREATE TABLE `Review` (
    `reviewId` BIGINT NOT NULL AUTO_INCREMENT,
    `storeId` BIGINT NOT NULL,
    `userId` BIGINT NOT NULL,
    `body` VARCHAR(191) NOT NULL,
    `score` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`reviewId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Mission` (
    `missionId` BIGINT NOT NULL AUTO_INCREMENT,
    `description` VARCHAR(191) NOT NULL,
    `status` VARCHAR(191) NOT NULL DEFAULT 'in-progress',
    `storeId` BIGINT NOT NULL,
    `userId` BIGINT NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`missionId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Review` ADD CONSTRAINT `Review_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`userId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Review` ADD CONSTRAINT `Review_storeId_fkey` FOREIGN KEY (`storeId`) REFERENCES `store`(`storeId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Mission` ADD CONSTRAINT `Mission_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`userId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Mission` ADD CONSTRAINT `Mission_storeId_fkey` FOREIGN KEY (`storeId`) REFERENCES `store`(`storeId`) ON DELETE RESTRICT ON UPDATE CASCADE;
