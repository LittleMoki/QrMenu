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
        bgImage: [],
        city: '',
        country: '',
        phone: '',
        wifi: '',
      };

      place = await this.prisma.place.create({ data: newPlace });
    }

    return place;
  }

  async updatePlace(id: number, updatePlaceDto: UpdatePlaceDto) {
    const place = await this.prisma.place.findMany({});
    const placeId = place[0].id;
    return await this.prisma.place.update({
      where: { id },
      data: updatePlaceDto,
    });
  }
}
