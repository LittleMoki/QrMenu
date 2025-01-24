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
        price: createMenuItemDto.price || 0,
        image: createMenuItemDto.image,
        isAvailable: createMenuItemDto.isAvailable,
        isVisible: createMenuItemDto.isVisible,
        category: {
          connect: {
            id: createMenuItemDto.categoryId,
          },
        },
        addons: {
          connect: createMenuItemDto.addons.map((id) => ({ id })),
        },
        variant: {
          create: createMenuItemDto.variant.map((el) => ({
            title: el.title,
            price: Number(el.price),
          })),
        },
      },
    });
  }

  async findAll() {
    return await this.prisma.menuItem.findMany({
      include: {
        category: true,
        addons: true,
      },
    });
  }

  async findOne(id: string) {
    return await this.prisma.menuItem.findUnique({
      where: { id },
      include: {
        category: true,
        addons: true,
      },
    });
  }

  async update(id: string, updateMenuItemDto: UpdateMenuItemDto) {
    const existingItem = await this.prisma.menuItem.findUnique({
      where: { id },
    });

    if (!existingItem) {
      throw new Error(`MenuItem with id ${id} not found`);
    }

    // Убедитесь, что addons и variant существуют и являются массивами
    const addons =
      typeof updateMenuItemDto.addons === 'string'
        ? JSON.parse(updateMenuItemDto.addons || '[]')
        : updateMenuItemDto.addons || [];

    const variant =
      typeof updateMenuItemDto.variant === 'string'
        ? JSON.parse(updateMenuItemDto.variant || '[]')
        : updateMenuItemDto.variant || [];
    return await this.prisma.menuItem.update({
      where: { id },
      data: {
        name: updateMenuItemDto.name,
        description: updateMenuItemDto.description,
        price: Number(updateMenuItemDto.price) || 0,
        image: updateMenuItemDto.image || existingItem.image,
        isAvailable: updateMenuItemDto.isAvailable,
        isVisible: updateMenuItemDto.isVisible,
        menuCategoryId: updateMenuItemDto.categoryId,
        addons: {
          set: [],
          connect: addons.map((id: string) => ({ id })), // Безопасное использование map
        },
        variant: {
          set: [],
          create: variant.map((el: { title: string; price: string }) => ({
            title: el.title,
            price: Number(el.price),
          })),
        },
      },
    });
  }

  async remove(id: string) {
    return await this.prisma.menuItem.delete({
      where: { id },
    });
  }
}
