/*
  Warnings:

  - The values [White,Black,Gray,DarkGray,Blue,DarkBlue,LightBlue,Red,Burgundy,GreenDark,Green,Yellow,Orange,Brown,Purple,Gold] on the enum `CarColor` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "CarColor_new" AS ENUM ('WHITE', 'BLACK', 'GRAY', 'DARK_GRAY', 'BLUE', 'DARK_BLUE', 'LIGHT_BLUE', 'RED', 'BURGUNDY', 'GREEN_DARK', 'GREEN', 'YELLOW', 'ORANGE', 'BROWN', 'PURPLE', 'GOLD');
ALTER TABLE "DriverProfile" ALTER COLUMN "carColor" TYPE "CarColor_new" USING ("carColor"::text::"CarColor_new");
ALTER TYPE "CarColor" RENAME TO "CarColor_old";
ALTER TYPE "CarColor_new" RENAME TO "CarColor";
DROP TYPE "public"."CarColor_old";
COMMIT;
