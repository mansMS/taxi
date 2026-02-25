import Image from "next/image";
import TaxiItem from "@/components/TaxiItem";
import { appConfig } from "@/config/app.config";
import { getCars } from "@/actions/car";

export default async function Home() {
  const taxisResponse = await getCars();
  const taxis = taxisResponse.success ? taxisResponse.cars : [];

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={100}
          height={20}
          // placeholder="blur"
          // priority
        />
        <header>{appConfig.title}</header>
        <section className="flex flex-col">
          {taxis.map((taxi) => (
            <TaxiItem key={taxi.id} car={taxi} driverName="МахIмутI" />
          ))}
        </section>
      </main>
    </div>
  );
}
