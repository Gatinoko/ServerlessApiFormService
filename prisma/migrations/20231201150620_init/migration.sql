/*
  Warnings:

  - Added the required column `alias` to the `ApiKey` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `apikey` ADD COLUMN `alias` VARCHAR(191) NOT NULL;
