export class CreateMenuItemDto {
  name: string;
  description?: string;
  price?: number;
  image?: string;
  isAvailable?: boolean;
  isVisible?: boolean;
  categoryId: string;
  variant?: {
    title:string;
    price: number;
  }[];
  addons?: string[];
  badge?: string[];
  imageCropParams?: any[];
  croppedImage?: string;
  category:any[];
}


