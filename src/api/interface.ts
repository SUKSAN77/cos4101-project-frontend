export interface Creator {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
}

export interface Deleter {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
}

export interface Room {
  id: string;
  roomNumber: string;
}

export interface Equipment {
  id: string;
  name: string;
  description: string;
  price: number | null;
  lifetime: number;
  status: number;
  notes: string;
  createdAt: string | null;
  updatedAt: string | null;
  deletedAt: string | null;
  serialNumber: string;
  acquisitionMethod: string;
  disposalDate: string | null;
  createdBy: string | null;
  creator: Creator | null;
  roomId: string | null;
  room: Room | null;
  // deleter: Deleter | null;
}

export interface Pagination {
  total: number;
  limit: number;
  offset: number;
}

export interface EquipmentsResponse {
  data: Equipment[];
  pagination: Pagination;
}

export interface EquipmentPostRequest {
  name: string;
  description: string;
  price: number | null;
  lifetime: number;
  status: number;
  notes: string;
  serialNumber: string;
  acquisitionMethod: string;
  disposalDate: string | null;
  createdBy: string | null;
  creator: Creator;
  roomId: string | null;
}
