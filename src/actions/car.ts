import { prisma } from "@/lib/prisma";

export async function getCars() {
  try {
    const cars = await prisma.car.findMany({ cacheStrategy: { ttl: 60 } });
    return { success: true, cars };
  } catch (error) {
    console.log("Ошибка загрузки машин:", error);
    return { error: "Ошибка загрузки машин" };
  }
}
