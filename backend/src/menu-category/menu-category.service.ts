import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateMenuCategoryDto } from './dto/create-menu-category.dto';
import { UpdateMenuCategoryDto } from './dto/update-menu-category.dto';

@Injectable()
export class MenuCategoryService {
  constructor(private prisma: PrismaService) {}

  async create(createMenuCategoryDto: CreateMenuCategoryDto) {
    return await this.prisma.menuCategory.create({
      data: {
        image: createMenuCategoryDto.image,
        croppedImage: createMenuCategoryDto.croppedImage,
        isVisible: createMenuCategoryDto.isVisible,
        imageCropParams: createMenuCategoryDto.imageCropParams,
        name: createMenuCategoryDto.name,
        description: createMenuCategoryDto.description,
        menuId: createMenuCategoryDto.menuId,
      },
    });
  }

  async findAll() {
    return await this.prisma.menuCategory.findMany();
  }

  async findOne(id: string) {
    return await this.prisma.menuCategory.findUnique({
      where: { id },
      include: {
        items: {
          include:{
            variant:true,
            addons:{
              include:{
                options: true,
              }
            }
          }
        },
      },
    });
  }

  async update(id: string, updateMenuCategoryDto: UpdateMenuCategoryDto) {
    return await this.prisma.menuCategory.update({
      where: { id },
      data: {
        image: updateMenuCategoryDto.image,
        croppedImage: updateMenuCategoryDto.croppedImage,
        isVisible: updateMenuCategoryDto.isVisible,
        imageCropParams: updateMenuCategoryDto.imageCropParams,
        name: updateMenuCategoryDto.name,
        description: updateMenuCategoryDto.description,
      },
    });
  }

  async remove(id: string) {
    return await this.prisma.menuCategory.delete({
      where: { id },
    });
  }
}
