import prisma from "../src/lib/prisma";

async function main() {
  const users = await Promise.all([
    prisma.user.upsert({
      where: { phone: "+1234567890" },
      update: { name: "Alice" },
      create: {
        phone: "+1234567890",
        name: "Alice",
        role: "CLIENT",
      },
    }),
    prisma.user.upsert({
      where: { phone: "+0987654321" },
      update: { name: "Bob" },
      create: {
        phone: "+0987654321",
        name: "Bob",
        role: "DRIVER",
      },
    }),
  ]);

  // Создание групп по умолчанию для каждого пользователя
  for (const user of users) {
    await prisma.driverGroup.upsert({
      where: { id: `${user.id}-favorites` }, // уникальный id
      update: {},
      create: {
        id: `${user.id}-favorites`,
        name: "Избранные",
        type: "FAVORITES",
        userId: user.id,
        isDefault: true,
      },
    });

    await prisma.driverGroup.upsert({
      where: { id: `${user.id}-blocked` },
      update: {},
      create: {
        id: `${user.id}-blocked`,
        name: "Заблокированные",
        type: "BLOCKED",
        userId: user.id,
        isDefault: true,
      },
    });
  }

  console.log(`Seeded ${users.length} users and their default driver groups.`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
