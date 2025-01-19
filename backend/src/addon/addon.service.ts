import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateAddonDto } from './dto/create-addon.dto';
import { UpdateAddonDto } from './dto/update-addon.dto';

@Injectable()
export class AddonService {
  constructor(private prisma: PrismaService) {}

  // Create a new addon with options
  async create(createAddonDto: CreateAddonDto) {

    return await this.prisma.itemAddon.create({
      data: {
        title: createAddonDto.title, // Ensure this matches the property name in your DTO
        selectType: createAddonDto.selectType,
        options: {
          create: createAddonDto.options.map((option) => ({
            title: option.title,
            price: Number(option.price),
          })),
        },
      },
      include: {
        options: true,
      },
    });
  }

  // Retrieve all addons with their options
  async findAll() {
    return await this.prisma.itemAddon.findMany({
      include: { options: true },
    });
  }

  // Retrieve a single addon by ID
  async findOne(id: string) {
    const addon = await this.prisma.itemAddon.findUnique({
      where: { id },
      include: { options: true },
    });

    if (!addon) {
      throw new Error(`Addon with id ${id} not found`);
    }

    return addon;
  }

  // Update an existing addon and its options
  async update(id: string, updateAddonDto: UpdateAddonDto) {
    const { title, selectType, options } = updateAddonDto;

    const existingAddon = await this.prisma.itemAddon.findUnique({
      where: { id },
    });

    if (!existingAddon) {
      throw new Error(`Addon with id ${id} not found`);
    }

    // Update the addon and its options
    return await this.prisma.itemAddon.update({
      where: { id },
      data: {
        title,
        selectType,
        options: {
          deleteMany: {}, // Clear existing options
          create: options.map((option) => ({
            title: option.title,
            price: option.price,
          })),
        },
      },
      include: { options: true },
    });
  }

  // Remove an addon and cascade delete its options
  async remove(id: string) {
    const existingAddon = await this.prisma.itemAddon.findUnique({
      where: { id },
    });

    if (!existingAddon) {
      throw new Error(`Addon with id ${id} not found`);
    }

    return await this.prisma.itemAddon.delete({
      where: { id },
      include: { options: true },
    });
  }
}
