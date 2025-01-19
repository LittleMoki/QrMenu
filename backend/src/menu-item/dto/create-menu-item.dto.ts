export class CreateMenuItemDto {
  name: string;
  description?: string;
  price?: number;
  image?: string;
  isAvailable?: boolean;
  isVisible?: boolean;
  categoryId: string;
  variant?: string;
  addons?: any[];
  badge?: string[];
  imageCropParams?: any[];
  croppedImage?: string;
}
