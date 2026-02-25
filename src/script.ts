import { prisma } from "./lib/prisma";

async function main() {
  const car = await prisma.car.create({
    data: {
      image: "https://s1.iconbird.com/ico/0512/iconspackbyCem/w256h2561337871612256.png",
      name: "Приора",
      color: "Белый",
      number: "О473ТХ05",
      routes: ["По селу", "Хасавюрт", "Махачкала"],
      description: "",
      driverId: "1212",
    },
  });
  console.log("Created car:", car);

  const allCars = await prisma.car.findMany();
  console.log("All users:", JSON.stringify(allCars, null, 2));
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });