/*
  Warnings:

  - A unique constraint covering the columns `[id]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX `Application_id_key` ON `application`;

-- DropIndex
DROP INDEX `BusinessContact_id_key` ON `businesscontact`;

-- DropIndex
DROP INDEX `FormItem_id_key` ON `formitem`;

-- CreateIndex
CREATE UNIQUE INDEX `User_id_key` ON `User`(`id`);
