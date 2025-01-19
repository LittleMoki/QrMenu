import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateMenuItemDto } from './dto/create-menu-item.dto';
import { UpdateMenuItemDto } from './dto/update-menu-item.dto';

@Injectable()
export class MenuItemService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createMenuItemDto: CreateMenuItemDto) {
    return await this.prisma.menuItem.create({
      data: {
        name: createMenuItemDto.name,
        description: createMenuItemDto.description,
        price: createMenuItemDto.price,
        image: createMenuItemDto.image,
        isAvailable: createMenuItemDto.isAvailable,
        isVisible: createMenuItemDto.isVisible,
        menuCategoryId: createMenuItemDto.categoryId,
      },
    });
  }

  async findAll() {
    return await this.prisma.menuItem.findMany({
      include: {
        category: true,
      },
    });
  }

  async findOne(id: string) {
    return await this.prisma.menuItem.findUnique({
      where: { id },
      include: {
        category: true,
      },
    });
  }

  async update(id: string, updateMenuItemDto: UpdateMenuItemDto) {
    const existingItem = await this.prisma.menuItem.findUnique({
      where: { id },
    });
    console.log(updateMenuItemDto);
    if (!existingItem) {
      throw new Error(`MenuItem with id ${id} not found`);
    }

    return await this.prisma.menuItem.update({
      where: { id },
      data: {
        name: updateMenuItemDto.name,
        description: updateMenuItemDto.description,
        price: updateMenuItemDto.price,
        image: updateMenuItemDto.image,
        isAvailable: updateMenuItemDto.isAvailable,
        isVisible: updateMenuItemDto.isVisible,
        menuCategoryId: updateMenuItemDto.categoryId,
      },
    });
  }

  async remove(id: string) {
    return await this.prisma.menuItem.delete({
      where: { id },
    });
  }
}
