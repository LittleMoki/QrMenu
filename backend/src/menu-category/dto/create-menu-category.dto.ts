export class CreateMenuCategoryDto {
  image?: string;
  croppedImage?: string;
  position?: number;
  isVisible?: boolean;
  imageCropParams?: Record<string, any>;
  name: string;
  description?: string;
  menuId: string;
}
