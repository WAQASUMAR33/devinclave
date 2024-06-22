/*
  Warnings:

  - Added the required column `created_at` to the `Company` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `Company` table without a default value. This is not possible if the table is not empty.
  - Added the required column `created_at` to the `Offers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `offer_details` to the `Offers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `Offers` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `company` ADD COLUMN `created_at` DATETIME(3) NOT NULL,
    ADD COLUMN `updated_at` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `offers` ADD COLUMN `created_at` DATETIME(3) NOT NULL,
    ADD COLUMN `offer_details` VARCHAR(191) NOT NULL,
    ADD COLUMN `updated_at` DATETIME(3) NOT NULL;
