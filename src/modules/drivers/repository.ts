import { prisma } from "@/lib/prisma";
import type { DriverProfileResponseDto, DriverFilterDto } from "./dto";

export const driverRepository = {
  /**
   * Получить всех водителей с их данными пользователя и маршрутами
   */
  async getDrivers(filter?: DriverFilterDto): Promise<DriverProfileResponseDto[]> {
    const where: any = {};

    if (filter?.transportType) {
      where.transportType = filter.transportType;
    }

    if (filter?.carColor) {
      where.carColor = filter.carColor;
    }

    if (filter?.name) {
      where.user = {
        name: {
          contains: filter.name,
          mode: "insensitive",
        },
      };
    }

    if (filter?.routeName) {
      where.routes = {
        some: {
          name: {
            contains: filter.routeName,
            mode: "insensitive",
          },
        },
      };
    }

    const drivers = await prisma.driverProfile.findMany({
      where,
      include: {
        user: {
          select: {
            id: true,
            name: true,
            phone: true,
            photo: true,
          },
        },
        routes: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    return drivers.map((driver) => ({
      id: driver.id,
      userId: driver.userId,
      carBrand: driver.carBrand,
      carModel: driver.carModel,
      carNumber: driver.carNumber,
      carColor: driver.carColor,
      transportType: driver.transportType,
      carPhoto: driver.carPhoto ?? undefined,
      createdAt: driver.createdAt.toISOString(),
      updatedAt: driver.updatedAt.toISOString(),
      user: {
        id: driver.user.id,
        name: driver.user.name ?? undefined,
        phone: driver.user.phone ?? undefined,
        photo: driver.user.photo ?? undefined,
      },
      routes: driver.routes,
    }));
  },

  /**
   * Получить данные водителя по ID
   */
  async getDriverById(id: string): Promise<DriverProfileResponseDto | null> {
    const driver = await prisma.driverProfile.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            phone: true,
            photo: true,
          },
        },
        routes: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    if (!driver) {
      return null;
    }

    return {
      id: driver.id,
      userId: driver.userId,
      carBrand: driver.carBrand,
      carModel: driver.carModel,
      carNumber: driver.carNumber,
      carColor: driver.carColor,
      transportType: driver.transportType,
      carPhoto: driver.carPhoto ?? undefined,
      createdAt: driver.createdAt.toISOString(),
      updatedAt: driver.updatedAt.toISOString(),
      user: {
        id: driver.user.id,
        name: driver.user.name ?? undefined,
        phone: driver.user.phone ?? undefined,
        photo: driver.user.photo ?? undefined,
      },
      routes: driver.routes,
    };
  },
};
