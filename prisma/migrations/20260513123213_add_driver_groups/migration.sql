-- CreateEnum
CREATE TYPE "DriverGroupType" AS ENUM ('FAVORITES', 'BLOCKED', 'CUSTOM');

-- CreateTable
CREATE TABLE "DriverGroup" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" "DriverGroupType" NOT NULL,
    "userId" TEXT NOT NULL,
    "isDefault" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DriverGroup_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DriverGroupMember" (
    "id" TEXT NOT NULL,
    "driverGroupId" TEXT NOT NULL,
    "driverProfileId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "DriverGroupMember_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "DriverGroupMember_driverGroupId_driverProfileId_key" ON "DriverGroupMember"("driverGroupId", "driverProfileId");

-- AddForeignKey
ALTER TABLE "DriverGroup" ADD CONSTRAINT "DriverGroup_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DriverGroupMember" ADD CONSTRAINT "DriverGroupMember_driverGroupId_fkey" FOREIGN KEY ("driverGroupId") REFERENCES "DriverGroup"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DriverGroupMember" ADD CONSTRAINT "DriverGroupMember_driverProfileId_fkey" FOREIGN KEY ("driverProfileId") REFERENCES "DriverProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;
