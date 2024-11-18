-- CreateTable
CREATE TABLE `user` (
    `userId` BIGINT NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(100) NOT NULL,
    `userName` VARCHAR(100) NOT NULL,
    `gender` VARCHAR(10) NOT NULL,
    `dob` DATE NOT NULL,
    `address` VARCHAR(255) NOT NULL,
    `detailAddress` VARCHAR(255) NULL,
    `phoneNumber` VARCHAR(100) NOT NULL,

    UNIQUE INDEX `email`(`email`),
    PRIMARY KEY (`userId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `foodCategory` (
    `FoodCategoryId` BIGINT NOT NULL AUTO_INCREMENT,
    `FoodCategoryName` VARCHAR(20) NOT NULL,

    PRIMARY KEY (`FoodCategoryId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `userFavorCategory` (
    `userFavorCategoryId` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` BIGINT NOT NULL,
    `foodCategoryId` BIGINT NOT NULL,

    INDEX `foodCategoryId`(`foodCategoryId`),
    INDEX `userId`(`userId`),
    PRIMARY KEY (`userFavorCategoryId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `userFavorCategory` ADD CONSTRAINT `userFavorCategory_user_id_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`userId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `userFavorCategory` ADD CONSTRAINT `userFavorCategory_foodCategoryId_fkey` FOREIGN KEY (`foodCategoryId`) REFERENCES `foodCategory`(`FoodCategoryId`) ON DELETE RESTRICT ON UPDATE CASCADE;
