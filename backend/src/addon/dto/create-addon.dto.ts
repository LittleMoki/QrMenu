import { SelectType } from '@prisma/client'

export class CreateAddonDto {
  title: string;
  selectType: SelectType;
  options: {
    title: string;
    price: number;
  }[];
}
