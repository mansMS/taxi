import { prisma } from "@/lib/prisma";
import { ICar } from "@/types/car";

export async function getCars() {
  try {
    const cars = await prisma.car.findMany({ cacheStrategy: { ttl: 60 } });
    return { success: true, cars };
  } catch (error) {
    console.log("Ошибка загрузки машин:", error);
    return { error: "Ошибка загрузки машин" };
  }
}

export async function createCar(car: ICar) {
  try {
    const newCar = await prisma.car.create({ data: car });
    return { success: true, car: newCar };
  } catch (error) {
    console.log("Ошибка создания машины:", error);
    return { error: "Ошибка создания машины" };
  }
}
