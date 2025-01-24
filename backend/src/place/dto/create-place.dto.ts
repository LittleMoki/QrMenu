export class CreatePlaceDto {
  name: string;
  currency: string;
  description?: string;
  address?: string;
  createdAt?: Date;
  updatedAt?: Date;
  bgImage?: string;
  city?: string;
  country?: string;
  phone?: string;
  wifi?: string;
}
