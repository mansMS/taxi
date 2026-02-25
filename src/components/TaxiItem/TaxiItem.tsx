import { ICar } from "@/types/car";
import Image from "next/image";

interface IProps {
  car: ICar;
  driverName: string;
}

export default function TaxiItem({ car, driverName }: IProps) {
  return (
    <article className="TaxiItem flex items-center">
      <div>
        <Image className="dark:invert" src={car.image} alt="Taxi image" width={100} height={80} />
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex gap-4">
          <div>{car.color}</div>
          <div>{car.name}</div>
          <div>{car.number}</div>
        </div>
        <div>{driverName}</div>
      </div>
    </article>
  );
}
