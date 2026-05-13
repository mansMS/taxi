/*
  Warnings:

  - Added the required column `transportType` to the `DriverProfile` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "TransportType" AS ENUM ('PASSENGER', 'CARGO', 'PASSENGER_CARGO');

-- AlterTable
ALTER TABLE "DriverProfile" ADD COLUMN     "transportType" "TransportType" NOT NULL;
