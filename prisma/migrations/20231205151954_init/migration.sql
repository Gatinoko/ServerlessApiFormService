/*
  Warnings:

  - The primary key for the `application` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `applicationKeyId` on the `application` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[id]` on the table `ApiKey` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `Application` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId]` on the table `Application` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - The required column `id` was added to the `Application` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE `application` DROP PRIMARY KEY,
    DROP COLUMN `applicationKeyId`,
    ADD COLUMN `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- CreateIndex
CREATE UNIQUE INDEX `ApiKey_id_key` ON `ApiKey`(`id`);

-- CreateIndex
CREATE UNIQUE INDEX `Application_id_key` ON `Application`(`id`);

-- CreateIndex
CREATE UNIQUE INDEX `Application_userId_key` ON `Application`(`userId`);

-- CreateIndex
CREATE UNIQUE INDEX `User_id_key` ON `User`(`id`);
