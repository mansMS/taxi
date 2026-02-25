export interface ICar {
  id: string;
  image: string;
  name: string;
  color: string;
  number: string;
  routes: string[];
  description: string;
  driverId: string;
  createdAt?: Date;
  updatedAt?: Date;
} 