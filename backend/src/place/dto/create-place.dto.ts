export class CreatePlaceDto {
  name: string;
  currency: string;
  description?: string;
  address?: string;
  createdAt?: Date;
  updatedAt?: Date;
  bgImage?: any[];
  city?: string;
  country?: string;
  phone?: string;
  wifi?: string;
}
