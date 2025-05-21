/*
  Warnings:

  - A unique constraint covering the columns `[level]` on the table `Trainings` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Trainings_level_key` ON `Trainings`(`level`);
