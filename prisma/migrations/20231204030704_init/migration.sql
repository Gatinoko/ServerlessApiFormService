/*
  Warnings:

  - You are about to drop the column `userId` on the `apikey` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[applicationId]` on the table `ApiKey` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `applicationId` to the `ApiKey` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `apikey` DROP FOREIGN KEY `ApiKey_userId_fkey`;

-- AlterTable
ALTER TABLE `apikey` DROP COLUMN `userId`,
    ADD COLUMN `applicationId` VARCHAR(191) NOT NULL;

-- CreateTable
CREATE TABLE `Application` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `ApiKey_applicationId_key` ON `ApiKey`(`applicationId`);

-- AddForeignKey
ALTER TABLE `ApiKey` ADD CONSTRAINT `ApiKey_applicationId_fkey` FOREIGN KEY (`applicationId`) REFERENCES `Application`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Application` ADD CONSTRAINT `Application_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
