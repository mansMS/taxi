import type { CarColor, DriverGroupType, RideStatus, TransportType } from "../../generated/prisma/client";

export interface CreateDriverProfileDto {
  userId: string;
  carBrand: string;
  carModel: string;
  carNumber: string;
  carColor: CarColor;
  transportType: TransportType;
  carPhoto?: string;
}

export interface UpdateDriverProfileDto {
  carBrand?: string;
  carModel?: string;
  carNumber?: string;
  carColor?: CarColor;
  transportType?: TransportType;
  carPhoto?: string;
}

export interface DriverUserDto {
  userId: string;
  name?: string;
  phone?: string;
  photo?: string;
}

export interface DriverRouteDto {
  id: string;
  name: string;
}

export interface DriverProfileResponseDto {
  userId: string;
  carBrand: string;
  carModel: string;
  carNumber: string;
  carColor: CarColor;
  transportType: TransportType;
  carPhoto?: string;
  createdAt: string;
  updatedAt: string;
  user?: DriverUserDto;
  routes?: DriverRouteDto[];
}

export interface DriverFilterDto {
  transportType?: TransportType;
  carColor?: CarColor;
  name?: string;
  routeName?: string;
  available?: boolean;
}

export interface DriverGroupDto {
  id: string;
  name: string;
  type: DriverGroupType;
  userId: string;
  isDefault: boolean;
  createdAt: string;
  updatedAt: string;
  members?: Array<{ driverUserId: string }>;
}

export interface CreateRideForGroupDto {
  userId: string;
  groupId?: string;
  driverUserIds?: string[];
  addressFrom: string;
  addressTo: string;
  latitudeFrom: number;
  longitudeFrom: number;
  latitudeTo: number;
  longitudeTo: number;
  scheduledTime: string;
}

export interface RideTargetDriverDto {
  driverUserId: string;
}

export interface RideResponseDto {
  id: string;
  userId: string;
  driverUserId?: string;
  addressFrom: string;
  addressTo: string;
  latitudeFrom: number;
  longitudeFrom: number;
  latitudeTo: number;
  longitudeTo: number;
  status: RideStatus;
  scheduledTime: string;
  createdAt: string;
  updatedAt: string;
  targetedDrivers?: RideTargetDriverDto[];
}
