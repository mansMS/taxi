-- CreateEnum
CREATE TYPE "RideStatus" AS ENUM ('ACTIVE', 'ACCEPTED', 'CANCELLED');

-- CreateTable
CREATE TABLE "Ride" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "driverProfileId" TEXT,
    "addressFrom" TEXT NOT NULL,
    "addressTo" TEXT NOT NULL,
    "latitudeFrom" DOUBLE PRECISION NOT NULL,
    "longitudeFrom" DOUBLE PRECISION NOT NULL,
    "latitudeTo" DOUBLE PRECISION NOT NULL,
    "longitudeTo" DOUBLE PRECISION NOT NULL,
    "status" "RideStatus" NOT NULL DEFAULT 'ACTIVE',
    "scheduledTime" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Ride_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Ride" ADD CONSTRAINT "Ride_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ride" ADD CONSTRAINT "Ride_driverProfileId_fkey" FOREIGN KEY ("driverProfileId") REFERENCES "DriverProfile"("id") ON DELETE SET NULL ON UPDATE CASCADE;
