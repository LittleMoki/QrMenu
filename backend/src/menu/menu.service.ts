import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class MenuService {
  constructor(private prisma: PrismaService) {}

  async createMenu(data: { name: string, isVisible?: boolean }) {
    const newMenu = await this.prisma.menu.create({
      data,
    });
    return newMenu;
  }

  async findAllMenus() {
    const menus = await this.prisma.menu.findMany();
    return menus;
  }

  async findMenuById(id: string) {
    const menu = await this.prisma.menu.findUnique({
      where: { id },
    });
    return menu;
  }

  async updateMenu(id: string, data: { name?: string, isVisible?: boolean }) {
    const updatedMenu = await this.prisma.menu.update({
      where: { id },
      data,
    });
    return updatedMenu;
  }

  async deleteMenu(id: string) {
    const deletedMenu = await this.prisma.menu.delete({
      where: { id },
    });
    return deletedMenu;
  }
}
