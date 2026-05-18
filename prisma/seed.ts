import prisma from "../src/lib/prisma";

async function main() {
  const users = await Promise.all([
    prisma.user.upsert({
      where: { phone: "+1234567890" },
      update: { name: "Alice", role: "DRIVER" },
      create: {
        phone: "+1234567890",
        name: "Alice",
        role: "DRIVER",
      },
    }),
    prisma.user.upsert({
      where: { phone: "+0987654321" },
      update: { name: "Bob", role: "DRIVER" },
      create: {
        phone: "+0987654321",
        name: "Bob",
        role: "DRIVER",
      },
    }),
    prisma.user.upsert({
      where: { phone: "+1112223333" },
      update: { name: "Charlie", role: "DRIVER" },
      create: {
        phone: "+1112223333",
        name: "Charlie",
        role: "DRIVER",
      },
    }),
    prisma.user.upsert({
      where: { phone: "+4445556666" },
      update: { name: "Diana", role: "DRIVER" },
      create: {
        phone: "+4445556666",
        name: "Diana",
        role: "DRIVER",
      },
    }),
  ]);

  const [alice, bob, charlie, diana] = users;

  const driverProfiles = await Promise.all([
    prisma.driverProfile.upsert({
      where: { userId: alice.id },
      update: {
        carBrand: "Kia",
        carModel: "Rio",
        carNumber: "AAA-101",
        carColor: "BLUE",
        transportType: "PASSENGER",
      },
      create: {
        userId: alice.id,
        carBrand: "Kia",
        carModel: "Rio",
        carNumber: "AAA-101",
        carColor: "BLUE",
        transportType: "PASSENGER",
        carPhoto: "https://example.com/car-alice.jpg",
      },
    }),
    prisma.driverProfile.upsert({
      where: { userId: bob.id },
      update: {
        carBrand: "Hyundai",
        carModel: "Staria",
        carNumber: "BBB-202",
        carColor: "WHITE",
        transportType: "PASSENGER_CARGO",
      },
      create: {
        userId: bob.id,
        carBrand: "Hyundai",
        carModel: "Staria",
        carNumber: "BBB-202",
        carColor: "WHITE",
        transportType: "PASSENGER_CARGO",
        carPhoto: "https://example.com/car-bob.jpg",
      },
    }),
    prisma.driverProfile.upsert({
      where: { userId: charlie.id },
      update: {
        carBrand: "Toyota",
        carModel: "Camry",
        carNumber: "XYZ-111",
        carColor: "BLACK",
        transportType: "PASSENGER",
      },
      create: {
        userId: charlie.id,
        carBrand: "Toyota",
        carModel: "Camry",
        carNumber: "XYZ-111",
        carColor: "BLACK",
        transportType: "PASSENGER",
        carPhoto: "https://example.com/car-charlie.jpg",
      },
    }),
    prisma.driverProfile.upsert({
      where: { userId: diana.id },
      update: {
        carBrand: "Ford",
        carModel: "Transit",
        carNumber: "ABC-222",
        carColor: "WHITE",
        transportType: "CARGO",
      },
      create: {
        userId: diana.id,
        carBrand: "Ford",
        carModel: "Transit",
        carNumber: "ABC-222",
        carColor: "WHITE",
        transportType: "CARGO",
        carPhoto: "https://example.com/car-diana.jpg",
      },
    }),
  ]);

  const [aliceProfile, bobProfile, charlieProfile, dianaProfile] = driverProfiles;

  const routes = await Promise.all([
    prisma.route.upsert({
      where: { id: `${aliceProfile.id}-city-route` },
      update: { name: "Центр города - вокзал" },
      create: {
        id: `${aliceProfile.id}-city-route`,
        name: "Центр города - вокзал",
        driverProfileId: aliceProfile.id,
      },
    }),
    prisma.route.upsert({
      where: { id: `${bobProfile.id}-suburbs-route` },
      update: { name: "Окраина - железнодорожный вокзал" },
      create: {
        id: `${bobProfile.id}-suburbs-route`,
        name: "Окраина - железнодорожный вокзал",
        driverProfileId: bobProfile.id,
      },
    }),
    prisma.route.upsert({
      where: { id: `${charlieProfile.id}-airport-route` },
      update: { name: "Аэропорт - центр города" },
      create: {
        id: `${charlieProfile.id}-airport-route`,
        name: "Аэропорт - центр города",
        driverProfileId: charlieProfile.id,
      },
    }),
    prisma.route.upsert({
      where: { id: `${dianaProfile.id}-cargo-route` },
      update: { name: "Склад - торговый центр" },
      create: {
        id: `${dianaProfile.id}-cargo-route`,
        name: "Склад - торговый центр",
        driverProfileId: dianaProfile.id,
      },
    }),
  ]);

  const defaultGroups = await Promise.all([
    prisma.driverGroup.upsert({
      where: { id: `${alice.id}-favorites` },
      update: {},
      create: {
        id: `${alice.id}-favorites`,
        name: "Избранные",
        type: "FAVORITES",
        userId: alice.id,
        isDefault: true,
      },
    }),
    prisma.driverGroup.upsert({
      where: { id: `${alice.id}-blocked` },
      update: {},
      create: {
        id: `${alice.id}-blocked`,
        name: "Заблокированные",
        type: "BLOCKED",
        userId: alice.id,
        isDefault: true,
      },
    }),
    prisma.driverGroup.upsert({
      where: { id: `${bob.id}-favorites` },
      update: {},
      create: {
        id: `${bob.id}-favorites`,
        name: "Избранные",
        type: "FAVORITES",
        userId: bob.id,
        isDefault: true,
      },
    }),
    prisma.driverGroup.upsert({
      where: { id: `${bob.id}-blocked` },
      update: {},
      create: {
        id: `${bob.id}-blocked`,
        name: "Заблокированные",
        type: "BLOCKED",
        userId: bob.id,
        isDefault: true,
      },
    }),
  ]);

  const now = new Date();
  const later = new Date(Date.now() + 1000 * 60 * 45);
  const tomorrow = new Date(Date.now() + 1000 * 60 * 60 * 24);

  const rides = await Promise.all([
    prisma.ride.upsert({
      where: { id: `${alice.id}-active-ride` },
      update: {
        status: "ACTIVE",
        driverProfileId: charlieProfile.id,
        updatedAt: new Date(),
      },
      create: {
        id: `${alice.id}-active-ride`,
        userId: alice.id,
        driverProfileId: charlieProfile.id,
        addressFrom: "ул. Ленина, 10",
        addressTo: "просп. Мира, 5",
        latitudeFrom: 55.7558,
        longitudeFrom: 37.6173,
        latitudeTo: 55.7601,
        longitudeTo: 37.62,
        status: "ACTIVE",
        scheduledTime: later,
      },
    }),
    prisma.ride.upsert({
      where: { id: `${bob.id}-accepted-ride` },
      update: {
        status: "ACCEPTED",
        driverProfileId: dianaProfile.id,
        updatedAt: new Date(),
      },
      create: {
        id: `${bob.id}-accepted-ride`,
        userId: bob.id,
        driverProfileId: dianaProfile.id,
        addressFrom: "ул. Советская, 22",
        addressTo: "ТЦ Сокол",
        latitudeFrom: 55.7605,
        longitudeFrom: 37.6,
        latitudeTo: 55.7652,
        longitudeTo: 37.615,
        status: "ACCEPTED",
        scheduledTime: tomorrow,
      },
    }),
    prisma.ride.upsert({
      where: { id: `${alice.id}-cancelled-ride` },
      update: {
        status: "CANCELLED",
        driverProfileId: null,
        updatedAt: new Date(),
      },
      create: {
        id: `${alice.id}-cancelled-ride`,
        userId: alice.id,
        addressFrom: "ул. Пушкина, 7",
        addressTo: "Набережная, 1",
        latitudeFrom: 55.748,
        longitudeFrom: 37.61,
        latitudeTo: 55.7512,
        longitudeTo: 37.6181,
        status: "CANCELLED",
        scheduledTime: now,
      },
    }),
  ]);

  console.log(
    `Seeded ${users.length} users, ${driverProfiles.length} driver profiles, ${routes.length} routes, and ${rides.length} rides.`,
  );
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
