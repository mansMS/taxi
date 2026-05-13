/*
  Warnings:

  - Changed the type of `carColor` on the `DriverProfile` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "CarColor" AS ENUM ('White', 'Black', 'Gray', 'DarkGray', 'Blue', 'DarkBlue', 'LightBlue', 'Red', 'Burgundy', 'GreenDark', 'Green', 'Yellow', 'Orange', 'Brown', 'Purple', 'Gold');

-- AlterTable
ALTER TABLE "DriverProfile" DROP COLUMN "carColor",
ADD COLUMN     "carColor" "CarColor" NOT NULL;
