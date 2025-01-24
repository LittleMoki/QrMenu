import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreatePlaceDto } from './dto/create-place.dto';
import { UpdatePlaceDto } from './dto/update-place.dto';

@Injectable()
export class PlaceService {
  constructor(private prisma: PrismaService) {}

  async getPlace() {
    // Проверяем, есть ли уже место в базе данных
    let place = await this.prisma.place.findFirst();
    if (!place) {
      // Инициализируем место, если его нет
      const newPlace: CreatePlaceDto = {
        name: 'Default Place',
        currency: 'USD',
        description: '',
        address: '',
        bgImage: 'default-bg.svg',
        city: '',
        country: '',
        phone: '',
        wifi: '',
      };

      place = await this.prisma.place.create({ data: newPlace });
    }

    return place;
  }

  async updatePlace(id: string, updatePlaceDto: UpdatePlaceDto) {
    // Получаем текущую запись
    const place = await this.prisma.place.findUnique({ where: { id } });

    if (!place) {
      throw new Error(`Place with ID ${id} not found`);
    }

    // Обновляем запись
    return await this.prisma.place.update({
      where: { id },
      data: {
        ...updatePlaceDto, // Обновляем переданные поля
        bgImage: updatePlaceDto.bgImage || place.bgImage, // Сохраняем старое значение, если новое не передано
      },
    });
  }
}
