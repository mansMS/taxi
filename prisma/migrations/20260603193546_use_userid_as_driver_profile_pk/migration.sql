/*
  Warnings:

  - The primary key for the `DriverProfile` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `DriverProfile` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "DriverGroupMember" DROP CONSTRAINT "DriverGroupMember_driverProfileId_fkey";

-- DropForeignKey
ALTER TABLE "Ride" DROP CONSTRAINT "Ride_driverProfileId_fkey";

-- DropForeignKey
ALTER TABLE "Route" DROP CONSTRAINT "Route_driverProfileId_fkey";

-- DropIndex
DROP INDEX "DriverProfile_userId_key";

-- AlterTable
ALTER TABLE "DriverProfile" DROP CONSTRAINT "DriverProfile_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "DriverProfile_pkey" PRIMARY KEY ("userId");

-- CreateTable
CREATE TABLE "RideDriverProfile" (
    "id" TEXT NOT NULL,
    "rideId" TEXT NOT NULL,
    "driverProfileId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "RideDriverProfile_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "RideDriverProfile_rideId_driverProfileId_key" ON "RideDriverProfile"("rideId", "driverProfileId");

-- AddForeignKey
ALTER TABLE "Route" ADD CONSTRAINT "Route_driverProfileId_fkey" FOREIGN KEY ("driverProfileId") REFERENCES "DriverProfile"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DriverGroupMember" ADD CONSTRAINT "DriverGroupMember_driverProfileId_fkey" FOREIGN KEY ("driverProfileId") REFERENCES "DriverProfile"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ride" ADD CONSTRAINT "Ride_driverProfileId_fkey" FOREIGN KEY ("driverProfileId") REFERENCES "DriverProfile"("userId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RideDriverProfile" ADD CONSTRAINT "RideDriverProfile_rideId_fkey" FOREIGN KEY ("rideId") REFERENCES "Ride"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RideDriverProfile" ADD CONSTRAINT "RideDriverProfile_driverProfileId_fkey" FOREIGN KEY ("driverProfileId") REFERENCES "DriverProfile"("userId") ON DELETE CASCADE ON UPDATE CASCADE;
