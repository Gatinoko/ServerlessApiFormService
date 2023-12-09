/*
  Warnings:

  - Added the required column `applicationId` to the `FormItem` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `formitem` ADD COLUMN `applicationId` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `FormItem` ADD CONSTRAINT `FormItem_applicationId_fkey` FOREIGN KEY (`applicationId`) REFERENCES `Application`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
